<?php

namespace App\Service;

use Dompdf\Dompdf;
use Dompdf\Options;
use Twig\Environment;

class DomPDFService
{
    private Environment $twig;

    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }

    /**
     * Génère un PDF d'estimation freelance
     */
    public function generateFreelancePDF(array $estimationData): string
    {
        // Détermine le template selon le type de freelance
        $freelanceType = $estimationData['formData']['constraints']['freelanceType'] ?? 'forfait';
        
        if ($freelanceType === 'regie') {
            $template = 'pdf/freelance_regie.html.twig';
        } else {
            $template = 'pdf/freelance_forfait.html.twig';
        }

        // Prépare les données pour le template
        $templateData = $this->prepareFreelanceData($estimationData);

        // Génère le HTML
        $html = $this->twig->render($template, $templateData);

        // Configure DomPDF
        $options = new Options();
        $options->set('defaultFont', 'DejaVu Sans');
        $options->set('isRemoteEnabled', true);
        $options->set('isHtml5ParserEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        return $dompdf->output();
    }

    /**
     * Génère un PDF d'estimation entreprise
     */
    public function generateEnterprisePDF(array $estimationData): string
    {
        $template = 'pdf/entreprise_devis.html.twig';

        // Prépare les données pour le template
        $templateData = $this->prepareEnterpriseData($estimationData);

        // Génère le HTML
        $html = $this->twig->render($template, $templateData);

        // Configure DomPDF
        $options = new Options();
        $options->set('defaultFont', 'DejaVu Sans');
        $options->set('isRemoteEnabled', true);
        $options->set('isHtml5ParserEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        return $dompdf->output();
    }

    /**
     * Prépare les données pour le template freelance
     */
    private function prepareFreelanceData(array $estimationData): array
    {
        $formData = $estimationData['formData'] ?? [];
        $estimation = $estimationData['estimation'] ?? [];
        
        $freelanceType = $formData['constraints']['freelanceType'] ?? 'forfait';
        
        return [
            'title' => $freelanceType === 'regie' ? 'Devis Commercial' : 'Estimation de Coûts',
            'freelanceType' => $freelanceType,
            'generatedAt' => new \DateTime(),
            'project' => [
                'type' => $this->getProjectTypeLabel($formData['basics'] ?? []),
                'description' => $formData['basics']['description'] ?? '',
                'technologies' => $formData['basics']['technologies'] ?? '',
            ],
            'client' => $this->getClientInfo($formData),
            'constraints' => $formData['constraints'] ?? [],
            'features' => $formData['features']['selectedFeatures'] ?? [],
            'objectives' => $this->translateObjectives($formData['objectives']['selectedObjectives'] ?? []),
            'estimation' => $estimation,
            'breakdown' => $estimation['breakdown'] ?? [],
            'recommendations' => $estimation['recommendations'] ?? [],
            'risks' => $estimation['risks'] ?? [],
            'metadata' => $estimationData['metadata'] ?? [],
        ];
    }

    /**
     * Prépare les données pour le template entreprise
     */
    private function prepareEnterpriseData(array $estimationData): array
    {
        $formData = $estimationData['formData'] ?? [];
        $estimation = $estimationData['estimation'] ?? [];
        $metadata = $estimationData['metadata'] ?? [];

        // Adaptation des données entreprise vers le format template
        $technologies = '';
        if (isset($formData['basics']['technologies'])) {
            $tech = $formData['basics']['technologies'];
            $techParts = [];
            if (!empty($tech['frontend'])) $techParts[] = $tech['frontend'];
            if (!empty($tech['backend'])) $techParts[] = $tech['backend'];
            if (!empty($tech['database'])) $techParts[] = $tech['database'];
            if (!empty($tech['infrastructure'])) $techParts[] = $tech['infrastructure'];
            $technologies = implode(', ', $techParts);
        }

        return [
            'title' => 'Récapitulatif d\'Estimation',
            'generatedAt' => $metadata['generatedAt'] ?? new \DateTime(),
            'client' => [
                'companyName' => $formData['pricing']['companyName'] ?? '',
                'contactName' => $formData['pricing']['contactName'] ?? '',
                'contactEmail' => $formData['pricing']['contactEmail'] ?? '',
                'contactPhone' => $formData['pricing']['contactPhone'] ?? '',
                'projectName' => $formData['basics']['projectName'] ?? '',
                'projectDescription' => $formData['basics']['projectDescription'] ?? '',
                'sector' => $formData['pricing']['sector'] ?? '',
            ],
            'project' => [
                'type' => $this->getProjectTypeLabel($formData['basics'] ?? []),
                'description' => $formData['basics']['projectDescription'] ?? '',
                'technologies' => $technologies,
            ],
            'estimation' => array_merge($estimation, [
                'breakdown' => isset($estimation['breakdown']) ? $this->translatePhases($estimation['breakdown']) : null
            ]),
            'features' => $formData['functionalities']['selectedFeatures'] ?? [],
            'recommendations' => $estimation['recommendations'] ?? [],
            'risks' => $estimation['risks'] ?? [],
            'objectives' => $this->translateObjectives($formData['objectives']['selectedObjectives'] ?? []),
        ];
    }

    /**
     * Extrait les informations client selon le mode
     */
    private function getClientInfo(array $formData): array
    {
        $freelanceType = $formData['constraints']['freelanceType'] ?? 'forfait';
        
        if ($freelanceType === 'regie' && isset($formData['clientInfo'])) {
            return [
                'projectName' => $formData['clientInfo']['projectName'] ?? '',
                'clientName' => $formData['clientInfo']['clientName'] ?? '',
                'companyName' => $formData['clientInfo']['companyName'] ?? '',
                'contactEmail' => $formData['clientInfo']['contactEmail'] ?? '',
                'description' => $formData['clientInfo']['projectDescription'] ?? '',
                'type' => $this->getClientTypeLabel($formData['clientInfo']['clientType'] ?? ''),
                'budget' => $this->getBudgetRangeLabel($formData['clientInfo']['clientBudgetRange'] ?? ''),
                'competition' => $this->getCompetitiveContextLabel($formData['clientInfo']['competitiveContext'] ?? ''),
                'validity' => $formData['clientInfo']['validityDays'] ?? 30,
                'paymentTerms' => $this->getPaymentTermsLabel($formData['clientInfo']['paymentTerms'] ?? ''),
                'warranty' => $formData['clientInfo']['warranty'] ?? 3,
            ];
        }
        
        return [];
    }

    /**
     * Obtient le libellé du type de projet avec gestion du type personnalisé
     */
    private function getProjectTypeLabel(array $basics): string
    {
        $projectType = $basics['projectType'] ?? '';
        $customProjectType = $basics['customProjectType'] ?? '';

        $projectTypeLabels = [
            'site-vitrine' => 'Site vitrine',
            'saas' => 'SaaS',
            'e-commerce' => 'E-commerce',
            'api' => 'API',
            'app-mobile' => 'App mobile',
            'dashboard' => 'Dashboard',
            'portail-b2b' => 'Portail B2B',
            'back-office' => 'Back-office',
            'intranet' => 'Intranet / Portail interne'
        ];

        if ($projectType === 'autre' && !empty($customProjectType)) {
            return "Autre ({$customProjectType})";
        } elseif ($projectType === 'autre') {
            return 'Autre';
        }

        return $projectTypeLabels[$projectType] ?? ($projectType ?: 'Non spécifié');
    }

    /**
     * Traduit les objectifs de leurs IDs vers les libellés français
     */
    private function translateObjectives(array $objectiveIds): array
    {
        $objectiveLabels = [
            'profitability' => 'Rentabilité maximale',
            'portfolio' => 'Projet portfolio',
            'learning' => 'Progression technique',
            'strategic-client' => 'Nouveau client stratégique',
            'fill-gap' => 'Combler un trou dans le planning',
            'positioning' => 'Nouveau positionnement',
            'income' => 'Complément de revenu',
            'other' => 'Autre raison'
        ];

        return array_map(function($id) use ($objectiveLabels) {
            return $objectiveLabels[$id] ?? $id;
        }, $objectiveIds);
    }

    /**
     * Traduit les phases du breakdown de l'anglais vers le français
     */
    private function translatePhases(array $breakdown): array
    {
        $phaseTranslations = [
            'analysis' => 'Analyse',
            'analyse' => 'Analyse',
            'conception' => 'Conception',
            'design' => 'Conception',
            'development' => 'Développement',
            'integration' => 'Intégration',
            'testing' => 'Tests',
            'deployment' => 'Déploiement',
            'formation' => 'Formation',
            'maintenance' => 'Maintenance'
        ];

        $translatedBreakdown = [];
        foreach ($breakdown as $phase => $details) {
            $translatedPhase = $phaseTranslations[strtolower($phase)] ?? ucfirst($phase);
            $translatedBreakdown[$translatedPhase] = $details;
        }

        return $translatedBreakdown;
    }

    /**
     * Labels pour les types de client
     */
    private function getClientTypeLabel(string $value): string
    {
        $labels = [
            'startup' => 'Startup / Jeune entreprise',
            'pme' => 'PME (10-250 salariés)',
            'grande-entreprise' => 'Grande entreprise (250+ salariés)',
            'association' => 'Association / ONG',
            'particulier' => 'Particulier'
        ];
        return $labels[$value] ?? $value;
    }

    /**
     * Labels pour les gammes de budget
     */
    private function getBudgetRangeLabel(string $value): string
    {
        $labels = [
            'low' => '< 5 000€',
            'medium' => '5 000€ - 15 000€',
            'high' => '15 000€ - 50 000€',
            'enterprise' => '50 000€+'
        ];
        return $labels[$value] ?? 'Budget non communiqué';
    }

    /**
     * Labels pour le contexte concurrentiel
     */
    private function getCompetitiveContextLabel(string $value): string
    {
        $labels = [
            'low' => 'Peu de concurrence',
            'medium' => 'Concurrence modérée',
            'high' => 'Forte concurrence'
        ];
        return $labels[$value] ?? $value;
    }

    /**
     * Labels pour les conditions de paiement
     */
    private function getPaymentTermsLabel(string $value): string
    {
        $labels = [
            '30-70' => '30% acompte, 70% livraison',
            '50-50' => '50% acompte, 50% livraison',
            '33-33-34' => '3 fois (33% - 33% - 34%)',
            'monthly' => 'Paiement mensuel',
            'custom' => 'Personnalisé'
        ];
        return $labels[$value] ?? $value;
    }

    /**
     * Génère un nom de fichier pour le PDF
     */
    public function generateFilename(array $formData): string
    {
        $projectType = $formData['basics']['projectType'] ?? 'projet';
        $date = (new \DateTime())->format('Y-m-d');

        // Nettoie le nom du type de projet
        $cleanProjectType = preg_replace('/[^a-zA-Z0-9-_]/', '-', $projectType);

        // Format: estimation-[type]-quickesti-[date]
        return sprintf('estimation-%s-quickesti-%s.pdf', $cleanProjectType, $date);
    }
}
