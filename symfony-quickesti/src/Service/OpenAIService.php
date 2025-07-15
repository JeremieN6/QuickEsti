<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Psr\Log\LoggerInterface;

class OpenAIService
{
    private const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
    private const CACHE_DURATION = 1800; // 30 minutes

    private array $estimationCache = [];

    public function __construct(
        private HttpClientInterface $httpClient,
        #[Autowire('%env(OPENAI_API_KEY)%')] private string $apiKey,
        private LoggerInterface $logger
    ) {}

    /**
     * Appel générique à l'API OpenAI
     */
    public function callOpenAI(string $prompt, array $options = []): array
    {
        $defaultOptions = [
            'model' => 'gpt-4o-mini',
            'temperature' => 0.3,
            'max_tokens' => 2000,
            'response_format' => ['type' => 'json_object']
        ];
        
        $options = array_merge($defaultOptions, $options);
        
        try {
            $response = $this->httpClient->request('POST', self::OPENAI_API_URL, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => $options['model'],
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => 'Tu es un expert en estimation de projets web. Tu réponds toujours en JSON valide.'
                        ],
                        [
                            'role' => 'user',
                            'content' => $prompt
                        ]
                    ],
                    'temperature' => $options['temperature'],
                    'max_tokens' => $options['max_tokens'],
                    'response_format' => $options['response_format']
                ]
            ]);

            $data = $response->toArray();
            
            if (!isset($data['choices'][0]['message']['content'])) {
                throw new \Exception('Réponse OpenAI invalide');
            }

            $content = $data['choices'][0]['message']['content'];
            $result = json_decode($content, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Réponse JSON invalide: ' . json_last_error_msg());
            }

            return $result;

        } catch (\Exception $e) {
            $this->logger->error('Erreur OpenAI: ' . $e->getMessage(), [
                'prompt' => substr($prompt, 0, 200) . '...',
                'options' => $options
            ]);
            
            throw new \Exception('Erreur lors de l\'appel à OpenAI: ' . $e->getMessage());
        }
    }

    /**
     * Génère une estimation de projet avec OpenAI (avec optimisations)
     */
    public function generateEstimation(array $projectData, string $userType): array
    {
        // 1. Vérifier le cache
        $cacheKey = $this->generateCacheKey($projectData, $userType);
        $cachedResult = $this->getCachedEstimation($cacheKey);

        if ($cachedResult) {
            $this->logger->info('Estimation trouvée en cache', ['cacheKey' => substr($cacheKey, 0, 50)]);
            return $cachedResult;
        }

        // 2. Calculer la complexité et sélectionner le modèle optimal
        $complexityData = $this->calculateComplexityAndModel($projectData, $userType);
        $model = $complexityData['model'];
        $complexityScore = $complexityData['complexityScore'];

        $this->logger->info('Modèle sélectionné', [
            'model' => $model,
            'complexityScore' => $complexityScore,
            'userType' => $userType
        ]);

        // 3. Générer le prompt optimisé
        $prompt = $this->buildOptimizedPrompt($projectData, $userType);

        // 4. Appel OpenAI avec modèle et tokens optimisés
        $maxTokens = $model === 'gpt-4' ? 2000 : 1500;

        try {
            $result = $this->callOpenAI($prompt, [
                'model' => $model,
                'temperature' => 0.2,
                'max_tokens' => $maxTokens
            ]);

            // Ajouter les métadonnées d'optimisation
            $result['optimization'] = [
                'model' => $model,
                'complexityScore' => $complexityScore,
                'fromCache' => false,
                'tokensLimit' => $maxTokens
            ];

        } catch (\Exception $e) {
            // Fallback vers GPT-3.5-turbo si GPT-4 échoue
            if ($model === 'gpt-4') {
                $this->logger->warning('Fallback vers GPT-3.5-turbo', ['error' => $e->getMessage()]);

                $result = $this->callOpenAI($prompt, [
                    'model' => 'gpt-3.5-turbo',
                    'temperature' => 0.2,
                    'max_tokens' => 1500
                ]);

                $result['optimization'] = [
                    'model' => 'gpt-3.5-turbo',
                    'complexityScore' => $complexityScore,
                    'fromCache' => false,
                    'tokensLimit' => 1500,
                    'fallback' => true
                ];
            } else {
                throw $e;
            }
        }

        // 5. Mettre en cache le résultat
        $this->setCachedEstimation($cacheKey, $result);

        return $result;
    }

    /**
     * Construit le prompt d'estimation selon le type d'utilisateur
     */
    private function buildEstimationPrompt(array $data, string $userType): string
    {
        $basePrompt = "Analyse ce projet et fournis une estimation détaillée en JSON avec cette structure exacte :\n\n";
        $basePrompt .= json_encode([
            'estimation' => [
                'totalDays' => 0,
                'totalCost' => 0,
                'confidence' => 'high|medium|low',
                'breakdown' => [
                    'development' => ['days' => 0, 'cost' => 0, 'description' => ''],
                    'design' => ['days' => 0, 'cost' => 0, 'description' => ''],
                    'testing' => ['days' => 0, 'cost' => 0, 'description' => ''],
                    'management' => ['days' => 0, 'cost' => 0, 'description' => ''],
                    'margin' => ['days' => 0, 'cost' => 0, 'description' => '']
                ],
                'recommendations' => [],
                'risks' => [],
                'assumptions' => []
            ]
        ], JSON_PRETTY_PRINT);

        if ($userType === 'freelance') {
            return $this->buildFreelancePrompt($data, $basePrompt);
        } else {
            return $this->buildEnterprisePrompt($data, $basePrompt);
        }
    }

    /**
     * Prompt spécifique pour les freelances
     */
    private function buildFreelancePrompt(array $data, string $basePrompt): string
    {
        $prompt = $basePrompt . "\n\n=== DONNÉES FREELANCE ===\n";
        
        // Section 1 : Basics
        if (isset($data['basics'])) {
            $prompt .= "PROJET: " . ($data['basics']['projectType'] ?? 'Non spécifié') . "\n";
            $prompt .= "TECHNOLOGIES: " . ($data['basics']['technologies'] ?? 'Non spécifiées') . "\n";
            $prompt .= "DESCRIPTION: " . ($data['basics']['description'] ?? 'Non fournie') . "\n";
        }

        // Section 2 : Constraints
        if (isset($data['constraints'])) {
            $prompt .= "DISPONIBILITÉ: " . ($data['constraints']['isFullTime'] ? 'Temps plein' : 'Temps partiel') . "\n";
            if ($data['constraints']['hasTjmTarget'] && $data['constraints']['tjmTarget']) {
                $prompt .= "TJM CIBLE: " . $data['constraints']['tjmTarget'] . "€/jour\n";
            }
            if ($data['constraints']['securityMargin']) {
                $prompt .= "MARGE SÉCURITÉ: " . $data['constraints']['securityMargin'] . "%\n";
            }
        }

        // Section 3 : Features
        if (isset($data['features']['selectedFeatures'])) {
            $prompt .= "FONCTIONNALITÉS: " . implode(', ', $data['features']['selectedFeatures']) . "\n";
        }

        // Section 5 : Objectives
        if (isset($data['objectives'])) {
            $prompt .= "OBJECTIFS: " . implode(', ', $data['objectives']['selectedObjectives'] ?? []) . "\n";
        }

        $prompt .= "\nCALCULE une estimation réaliste pour un freelance, en tenant compte de son niveau d'expérience et de ses objectifs.";
        
        return $prompt;
    }

    /**
     * Prompt spécifique pour les entreprises
     */
    private function buildEnterprisePrompt(array $data, string $basePrompt): string
    {
        $prompt = $basePrompt . "\n\n=== DONNÉES ENTREPRISE ===\n";
        
        // Section 1 : Basics
        if (isset($data['basics'])) {
            $prompt .= "TYPE PROJET: " . ($data['basics']['projectType'] ?? 'Non spécifié') . "\n";
            $prompt .= "PAGES/ÉCRANS: " . ($data['basics']['pageCount'] ?? 'Non spécifié') . "\n";
            $prompt .= "TECHNOLOGIES:\n";
            if (isset($data['basics']['technologies'])) {
                foreach ($data['basics']['technologies'] as $type => $tech) {
                    if ($tech) $prompt .= "  - $type: $tech\n";
                }
            }
        }

        // Section 2 : Structure
        if (isset($data['structure'])) {
            $prompt .= "ÉQUIPE: " . implode(', ', $data['structure']['teamComposition'] ?? []) . "\n";
            if (isset($data['structure']['teamProfiles'])) {
                $prompt .= "PROFILS:\n";
                foreach ($data['structure']['teamProfiles'] as $profile) {
                    if ($profile['type'] && $profile['count']) {
                        $prompt .= "  - " . $profile['type'] . ": " . $profile['count'] . " personne(s)\n";
                    }
                }
            }
        }

        // Section 3 : Functionalities
        if (isset($data['functionalities'])) {
            $prompt .= "FONCTIONNALITÉS: " . implode(', ', $data['functionalities']['selectedFeatures'] ?? []) . "\n";
            $prompt .= "COMPLEXITÉ: " . ($data['functionalities']['functionalComplexity'] ?? 'Non spécifiée') . "\n";
            $prompt .= "SCALABILITÉ: " . ($data['functionalities']['scalability'] ?? 'Non spécifiée') . "\n";
        }

        // Section 5 : Objectives
        if (isset($data['objectives'])) {
            $prompt .= "OBJECTIF: " . ($data['objectives']['projectObjective'] ?? 'Non spécifié') . "\n";
            if ($data['objectives']['budgetContext'] === 'defined' && $data['objectives']['budgetAmount']) {
                $prompt .= "BUDGET: " . $data['objectives']['budgetAmount'] . "€\n";
            }
        }

        // Section 6 : Pricing
        if (isset($data['pricing'])) {
            if ($data['pricing']['hasDailyCosts'] && isset($data['pricing']['dailyCosts'])) {
                $prompt .= "COÛTS JOURNALIERS:\n";
                foreach ($data['pricing']['dailyCosts'] as $cost) {
                    if ($cost['profile'] && $cost['dailyRate']) {
                        $prompt .= "  - " . $cost['profile'] . ": " . $cost['dailyRate'] . "€/jour\n";
                    }
                }
            }
            if ($data['pricing']['securityMargin']) {
                $prompt .= "MARGE SÉCURITÉ: " . $data['pricing']['securityMargin'] . "%\n";
            }
        }

        $prompt .= "\nCALCULE une estimation détaillée pour ce projet d'entreprise, en tenant compte de la complexité et des ressources.";
        
        return $prompt;
    }

    /**
     * Calcule la complexité du projet et sélectionne le modèle optimal
     */
    private function calculateComplexityAndModel(array $data, string $userType): array
    {
        $complexityScore = 0;

        // Scoring basé sur les fonctionnalités
        $features = [];
        if ($userType === 'freelance' && isset($data['features']['selectedFeatures'])) {
            $features = $data['features']['selectedFeatures'];
        } elseif ($userType === 'entreprise' && isset($data['functionalities']['selectedFeatures'])) {
            $features = $data['functionalities']['selectedFeatures'];
        }

        $complexFeatures = [
            'auth-sso', 'api-integration', 'ecommerce', 'roles-permissions',
            'erp-crm', 'gdpr-security', 'automated-tests'
        ];

        foreach ($features as $feature) {
            if (in_array($feature, $complexFeatures)) {
                $complexityScore += 2;
            } else {
                $complexityScore += 1;
            }
        }

        // Scoring basé sur le type de projet
        $projectType = '';
        if (isset($data['basics']['projectType'])) {
            $projectType = strtolower($data['basics']['projectType']);
        }

        if (in_array($projectType, ['saas', 'e-commerce', 'api'])) {
            $complexityScore += 3;
        } elseif (in_array($projectType, ['dashboard', 'app-mobile'])) {
            $complexityScore += 2;
        }

        // Scoring basé sur les technologies
        $techCount = 0;
        if (isset($data['basics']['technologies'])) {
            if (is_array($data['basics']['technologies'])) {
                $techCount = count($data['basics']['technologies']);
            } else {
                $techCount = substr_count($data['basics']['technologies'], ',') + 1;
            }
        }

        if ($techCount > 3) {
            $complexityScore += 2;
        }

        // Scoring spécifique entreprise
        if ($userType === 'entreprise') {
            if (isset($data['functionalities']['scalability']) && $data['functionalities']['scalability'] === 'yes') {
                $complexityScore += 2;
            }
            if (isset($data['functionalities']['functionalComplexity'])) {
                switch ($data['functionalities']['functionalComplexity']) {
                    case 'very-complex':
                        $complexityScore += 3;
                        break;
                    case 'complex':
                        $complexityScore += 2;
                        break;
                }
            }
        }

        // Sélection du modèle basée sur la complexité
        // GPT-4 pour projets complexes (score > 8), GPT-3.5-turbo pour le reste
        $model = $complexityScore > 8 ? 'gpt-4' : 'gpt-3.5-turbo';

        return [
            'complexityScore' => $complexityScore,
            'model' => $model
        ];
    }

    /**
     * Génère une clé de cache basée sur les données principales
     */
    private function generateCacheKey(array $data, string $userType): string
    {
        $keyData = [
            'userType' => $userType,
            'projectType' => $data['basics']['projectType'] ?? '',
            'technologies' => $data['basics']['technologies'] ?? '',
            'features' => $userType === 'freelance'
                ? ($data['features']['selectedFeatures'] ?? [])
                : ($data['functionalities']['selectedFeatures'] ?? []),
            'tjm' => $userType === 'freelance'
                ? ($data['constraints']['tjmTarget'] ?? 0)
                : 0,
            'budget' => $userType === 'entreprise'
                ? ($data['objectives']['budgetAmount'] ?? 0)
                : 0,
            'complexity' => $userType === 'entreprise'
                ? ($data['functionalities']['functionalComplexity'] ?? '')
                : ''
        ];

        // Trier les arrays pour cohérence
        if (is_array($keyData['features'])) {
            sort($keyData['features']);
        }

        return md5(json_encode($keyData));
    }

    /**
     * Récupère une estimation du cache
     */
    private function getCachedEstimation(string $cacheKey): ?array
    {
        if (!isset($this->estimationCache[$cacheKey])) {
            return null;
        }

        $cached = $this->estimationCache[$cacheKey];

        // Vérifier l'expiration
        if ((time() - $cached['timestamp']) > self::CACHE_DURATION) {
            unset($this->estimationCache[$cacheKey]);
            return null;
        }

        return $cached['result'];
    }

    /**
     * Met en cache une estimation
     */
    private function setCachedEstimation(string $cacheKey, array $result): void
    {
        $this->estimationCache[$cacheKey] = [
            'result' => $result,
            'timestamp' => time()
        ];

        // Nettoyage automatique du cache (garder max 100 entrées)
        if (count($this->estimationCache) > 100) {
            $oldestKey = array_key_first($this->estimationCache);
            unset($this->estimationCache[$oldestKey]);
        }
    }

    /**
     * Construit un prompt optimisé (plus compact)
     */
    private function buildOptimizedPrompt(array $data, string $userType): string
    {
        if ($userType === 'freelance') {
            return $this->buildOptimizedFreelancePrompt($data);
        } else {
            return $this->buildOptimizedEnterprisePrompt($data);
        }
    }

    /**
     * Prompt optimisé pour freelance (plus détaillé et calibré)
     */
    private function buildOptimizedFreelancePrompt(array $data): string
    {
        $prompt = "Tu es un expert en estimation de projets web freelance. Analyse ce projet et fournis une estimation RÉALISTE.\n\n";

        // Contexte détaillé
        $prompt .= "=== PROJET FREELANCE ===\n";
        $prompt .= "TYPE: " . ($data['basics']['projectType'] ?? 'Non spécifié') . "\n";
        $prompt .= "DESCRIPTION: " . ($data['basics']['description'] ?? 'Refonte/évolution') . "\n";
        $prompt .= "TECHNOLOGIES: " . ($data['basics']['technologies'] ?? 'Non spécifiées') . "\n";

        // Contraintes importantes
        if (isset($data['constraints'])) {
            $prompt .= "DISPONIBILITÉ: " . ($data['constraints']['isFullTime'] ? 'Temps plein' : 'Temps partiel') . "\n";
            if (isset($data['constraints']['tjmTarget'])) {
                $prompt .= "TJM CIBLE: " . $data['constraints']['tjmTarget'] . "€/jour\n";
            }
        }

        // Fonctionnalités
        if (isset($data['features']['selectedFeatures'])) {
            $prompt .= "FONCTIONNALITÉS: " . implode(', ', $data['features']['selectedFeatures']) . "\n";
        }

        // Livrables
        if (isset($data['deliverables'])) {
            if (isset($data['deliverables']['mockupsProvided']) && $data['deliverables']['mockupsProvided'] === false) {
                $prompt .= "MAQUETTES: À créer (ajouter temps design)\n";
            }
            if (isset($data['deliverables']['specsStatus']) && $data['deliverables']['specsStatus'] === 'to-define') {
                $prompt .= "SPÉCIFICATIONS: À définir (ajouter temps analyse)\n";
            }
        }

        $prompt .= "\n=== RÈGLES D'ESTIMATION ===\n";
        $prompt .= "- Pour WordPress: minimum 10-15j pour une refonte complète\n";
        $prompt .= "- Responsive design: +3-5j\n";
        $prompt .= "- Maquettes à créer: +5-7j\n";
        $prompt .= "- Spécifications à définir: +2-3j\n";
        $prompt .= "- Maintenance setup: +1-2j\n";
        $prompt .= "- Tests et déploiement: +2-3j\n\n";

        $prompt .= "IMPORTANT: Sois réaliste ! Un freelance expert ne peut pas faire une refonte WordPress complète en 5 jours.\n\n";

        $prompt .= "Réponds en JSON strict:\n";
        $prompt .= json_encode([
            'estimation' => [
                'totalDays' => 0,
                'totalCost' => 0,
                'confidence' => 'high|medium|low',
                'breakdown' => [
                    'analysis' => ['days' => 0, 'cost' => 0, 'description' => ''],
                    'design' => ['days' => 0, 'cost' => 0, 'description' => ''],
                    'development' => ['days' => 0, 'cost' => 0, 'description' => ''],
                    'testing' => ['days' => 0, 'cost' => 0, 'description' => ''],
                    'deployment' => ['days' => 0, 'cost' => 0, 'description' => '']
                ],
                'recommendations' => [],
                'risks' => []
            ]
        ], JSON_PRETTY_PRINT);

        return $prompt;
    }

    /**
     * Prompt optimisé pour entreprise (compact)
     */
    private function buildOptimizedEnterprisePrompt(array $data): string
    {
        $prompt = "Expert estimation entreprise. JSON strict:\n";

        // Données essentielles seulement
        $prompt .= "PROJET: " . ($data['basics']['projectType'] ?? 'Non spécifié') . "\n";

        if (isset($data['functionalities']['selectedFeatures'])) {
            $prompt .= "FEATURES: " . implode(', ', $data['functionalities']['selectedFeatures']) . "\n";
        }

        if (isset($data['functionalities']['functionalComplexity'])) {
            $prompt .= "COMPLEXITÉ: " . $data['functionalities']['functionalComplexity'] . "\n";
        }

        if (isset($data['objectives']['budgetAmount'])) {
            $prompt .= "BUDGET: " . $data['objectives']['budgetAmount'] . "€\n";
        }

        $prompt .= "\nJSON:\n";
        $prompt .= json_encode([
            'estimation' => [
                'totalDays' => 0,
                'totalCost' => 0,
                'confidence' => 'high|medium|low',
                'breakdown' => [
                    'development' => ['days' => 0, 'cost' => 0],
                    'design' => ['days' => 0, 'cost' => 0],
                    'testing' => ['days' => 0, 'cost' => 0],
                    'management' => ['days' => 0, 'cost' => 0]
                ],
                'recommendations' => [],
                'risks' => []
            ]
        ]);

        return $prompt;
    }
}
