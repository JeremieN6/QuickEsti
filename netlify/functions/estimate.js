const { OpenAI } = require("openai");
const { checkRateLimit } = require("./rate-limiter");
require('dotenv').config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cache simple en mémoire pour éviter les appels répétés
const estimationCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Fonction pour calculer la complexité et choisir le modèle
function calculateComplexityAndModel(data, userType) {
  let complexityScore = 0;

  // Scoring basé sur les fonctionnalités
  const features = data.features || [];
  const complexFeatures = [
    'authentification', 'sso', 'api', 'e-commerce', 'paiement',
    'admin crud', 'cms', 'multilingue', 'tests automatisés'
  ];

  features.forEach(feature => {
    if (complexFeatures.some(cf => feature.toLowerCase().includes(cf))) {
      complexityScore += 2;
    } else {
      complexityScore += 1;
    }
  });

  // Scoring basé sur le type de projet
  const projectType = (data.projectType || '').toLowerCase();
  if (['saas', 'e-commerce', 'api'].includes(projectType)) {
    complexityScore += 3;
  } else if (['dashboard', 'app mobile'].includes(projectType)) {
    complexityScore += 2;
  }

  // Scoring basé sur les technologies
  const technologies = data.technologies || [];
  if (technologies.length > 3) {
    complexityScore += 2;
  }

  // Scoring spécifique entreprise
  if (userType === 'entreprise') {
    if (data.scalable) complexityScore += 2;
    if (data.complexity === 'Très complexe') complexityScore += 3;
    if (data.complexity === 'Complexe') complexityScore += 2;
  }

  // Sélection du modèle basée sur la complexité
  // GPT-4 pour projets complexes (score > 8), GPT-3.5-turbo pour le reste
  const model = complexityScore > 8 ? 'gpt-4' : 'gpt-3.5-turbo';

  return { complexityScore, model };
}

// Fonctions de cache
function generateCacheKey(data, userType) {
  // Créer une clé basée sur les données principales
  const keyData = {
    userType,
    projectType: data.projectType,
    technologies: data.technologies?.sort(),
    features: data.features?.sort(),
    pages: data.pages,
    tjm: data.tjm,
    budget: data.budget,
    complexity: data.complexity
  };

  return JSON.stringify(keyData);
}

function getCachedEstimation(cacheKey) {
  const cached = estimationCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.result;
  }
  return null;
}

function setCachedEstimation(cacheKey, result) {
  estimationCache.set(cacheKey, {
    result,
    timestamp: Date.now()
  });

  // Nettoyage automatique du cache (garder max 100 entrées)
  if (estimationCache.size > 100) {
    const firstKey = estimationCache.keys().next().value;
    estimationCache.delete(firstKey);
  }
}

// Fonction de validation de cohérence des estimations
function validateEstimationCoherence(estimation, userType, inputData) {
  const warnings = [];
  let isValid = true;

  try {
    const est = estimation.estimation;
    const breakdown = estimation.breakdown;

    // Validation 1: Cohérence durée vs coût
    if (userType === 'freelance') {
      const tjm = parseInt(inputData.tjm) || 500;
      const expectedCost = est.duree_jours * tjm;
      const actualCost = est.cout_total;

      if (Math.abs(expectedCost - actualCost) / expectedCost > 0.3) {
        warnings.push(`Incohérence coût/durée: ${actualCost}€ vs ${expectedCost}€ attendu`);
        isValid = false;
      }
    }

    // Validation 2: Somme du breakdown vs durée totale
    const breakdownTotal = Object.values(breakdown).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    const totalDays = userType === 'freelance' ? est.duree_jours : est.duree_jours_homme;

    if (Math.abs(breakdownTotal - totalDays) > 2) {
      warnings.push(`Breakdown incohérent: ${breakdownTotal}j vs ${totalDays}j total`);
      isValid = false;
    }

    // Validation 3: Complexité vs durée
    const complexity = est.complexite?.toLowerCase();
    if (complexity === 'faible' && totalDays > 30) {
      warnings.push("Durée élevée pour complexité faible");
    } else if (complexity === 'très élevée' && totalDays < 20) {
      warnings.push("Durée faible pour complexité très élevée");
    }

    // Validation 4: Nombre de features vs durée
    const featuresCount = (inputData.features || []).length;
    if (featuresCount > 8 && totalDays < 15) {
      warnings.push("Durée faible pour nombre élevé de fonctionnalités");
    }

  } catch (error) {
    console.error("Erreur validation cohérence:", error);
    warnings.push("Erreur lors de la validation");
    isValid = false;
  }

  return { isValid, warnings };
}

// Liste blanche des domaines autorisés
const allowedOrigins = [
  "http://localhost:8000",
  "https://quickesti.netlify.app",
  "https://sassify.fr",
  "https://sassify.fr/quickesti"
];

// Fonctions de détection du contexte métier
function detectSecteur(data) {
  const projectType = (data.projectType || '').toLowerCase();
  const features = (data.features || []).join(' ').toLowerCase();

  if (projectType.includes('e-commerce') || features.includes('paiement')) {
    return 'E-commerce';
  } else if (projectType.includes('saas') || features.includes('api')) {
    return 'SaaS/Tech';
  } else if (features.includes('cms') || features.includes('blog')) {
    return 'Média/Contenu';
  } else if (features.includes('crm') || features.includes('erp')) {
    return 'Entreprise/B2B';
  } else if (projectType.includes('vitrine')) {
    return 'Vitrine/Corporate';
  } else {
    return 'Généraliste';
  }
}

function detectTailleClient(data) {
  const budget = parseInt(data.budget) || 0;
  const tjm = parseInt(data.tjm) || 0;
  const features = (data.features || []).length;

  // Estimation basée sur budget, TJM et complexité
  if (budget > 100000 || tjm > 800 || features > 8) {
    return 'Grande entreprise';
  } else if (budget > 30000 || tjm > 500 || features > 5) {
    return 'PME';
  } else if (budget > 5000 || tjm > 300) {
    return 'Startup/TPE';
  } else {
    return 'Particulier/Micro';
  }
}

// Fonction pour générer le prompt spécialisé
function generatePrompt(data, userType) {
  if (userType === 'freelance') {
    return generateFreelancePrompt(data);
  } else {
    return generateEnterprisePrompt(data);
  }
}

// Prompt optimisé pour freelance avec contexte métier enrichi
function generateFreelancePrompt(data) {
  // Détection automatique du secteur basée sur le type de projet et features
  const secteur = detectSecteur(data);
  const tailleClient = detectTailleClient(data);

  const prompt = `Expert estimation projets web freelance.

PROJET:
Type: ${data.projectType || 'NS'}
Secteur: ${secteur}
Taille client: ${tailleClient}
Tech: ${data.technologies ? data.technologies.join(',') : 'NS'}
Pages: ${data.pages || 'NS'}
Deadline: ${data.deadline || 'NS'}
Compétence: ${data.skillLevel || 'NS'}
Temps plein: ${data.fullTime ? 'Oui' : 'Non'}
TJM: ${data.tjm || 'NS'}€
Marge: ${data.securityMargin || 0}%
Features: ${data.features ? data.features.join(',') : 'NS'}
Scope: ${data.scope || 'NS'}

SCORING CONTEXTUEL:
Base par secteur: E-commerce +20%, SaaS +30%, B2B +25%
Taille client: Grande entreprise +40%, PME +20%, Startup +10%
Features: Auth +3-5j, Dashboard +5-8j, API +2-4j, Paiement +3-5j
CRUD +4-7j, CMS +3-6j, Tests +2-3j
Compétence: Débutant +20%, Pas maquettes +2-3j, Design +5-8j
Tech moderne (React/Vue): -10%, Legacy (PHP/jQuery): +15%

JSON strict:
{
  "estimation": {
    "duree_jours": [nb],
    "duree_semaines": [nb],
    "cout_total": [nb],
    "tjm_recommande": [nb],
    "marge_projetee": [nb],
    "complexite": "[Faible/Moyenne/Élevée/Très élevée]"
  },
  "breakdown": {
    "developpement": [nb],
    "design_ui": [nb],
    "integration": [nb],
    "tests": [nb],
    "deploiement": [nb]
  },
  "recommandations": ["rec1","rec2","rec3"],
  "risques": ["risque1","risque2"]
}`;

  return prompt;
}

// Prompt optimisé pour entreprise avec contexte métier enrichi
function generateEnterprisePrompt(data) {
  const secteur = detectSecteur(data);
  const tailleClient = detectTailleClient(data);

  const prompt = `Expert estimation projets web entreprise.

PROJET:
Type: ${data.projectType || 'NS'}
Secteur: ${secteur}
Taille: ${tailleClient}
Tech: ${data.technologies ? data.technologies.join(',') : 'NS'}
Pages: ${data.pages || 'NS'}
Deadline: ${data.deadline || 'NS'}
Raison: ${data.reason || 'NS'}
Équipe: ${data.team ? data.team.join(',') : 'NS'}
Features: ${data.features ? data.features.join(',') : 'NS'}
Scalable: ${data.scalable ? 'Oui' : 'Non'}
Complexité: ${data.complexity || 'NS'}
Budget: ${data.budget || 'NS'}€
Marge: ${data.margin || 0}%

SCORING ENTREPRISE:
Secteur: E-commerce +25%, SaaS +35%, B2B +30%, Fintech +50%
Taille: Grande entreprise +50%, PME +25%, Startup +15%
Features: SSO +5-8j, API +8-12j, E-commerce +10-15j, ERP +8-15j
RGPD +5-8j, CI/CD +3-5j, Monitoring +2-3j
Organisation: Équipe distribuée +15%, Agile +10%, Waterfall +20%
Scalabilité: Haute +30%, Moyenne +15%

JSON strict:
{
  "estimation": {
    "duree_jours_homme": [nb],
    "duree_calendaire_semaines": [nb],
    "cout_total": [nb],
    "cout_par_profil": {
      "developpeur": [nb],
      "designer": [nb],
      "chef_projet": [nb]
    },
    "marge_appliquee": [nb],
    "complexite": "[Faible/Moyenne/Élevée/Très élevée]"
  },
  "breakdown": {
    "analyse_specs": [nb],
    "developpement": [nb],
    "design_ux_ui": [nb],
    "integration": [nb],
    "tests_qa": [nb],
    "deploiement_devops": [nb],
    "gestion_projet": [nb]
  },
  "recommandations": ["rec1","rec2","rec3"],
  "risques": ["risque1","risque2"]
}`;

  return prompt;
}

exports.handler = async function(event) {
  const origin = event.headers.origin;

  // Gestion des pré-requêtes CORS (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    if (allowedOrigins.includes(origin)) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: "",
      };
    } else {
      return {
        statusCode: 403,
        body: "Origin non autorisée",
      };
    }
  }

  // Vérification de la méthode HTTP
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Méthode non autorisée" }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    // Validation des données requises
    if (!body.userType || !body.data) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: "Données manquantes (userType et data requis)" }),
      };
    }

    // Vérification des limites de taux
    const rateLimitResult = checkRateLimit(event);

    if (!rateLimitResult.allowed) {
      return {
        statusCode: 429, // Too Many Requests
        headers: {
          "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
          "Content-Type": "application/json",
          "X-RateLimit-Limit": "3",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": rateLimitResult.resetDate?.toISOString()
        },
        body: JSON.stringify({
          error: "Limite d'estimations atteinte",
          message: rateLimitResult.message,
          resetDate: rateLimitResult.resetDate,
          upgradeMessage: "Passez à la version premium pour des estimations illimitées !"
        }),
      };
    }

    // Vérification du cache
    const cacheKey = generateCacheKey(body.data, body.userType);
    const cachedResult = getCachedEstimation(cacheKey);

    if (cachedResult) {
      console.log('Résultat trouvé en cache');
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
          "Content-Type": "application/json",
          "X-RateLimit-Limit": rateLimitResult.isDemo ? "999" : "3",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetDate?.toISOString()
        },
        body: JSON.stringify({
          success: true,
          userType: body.userType,
          estimation: cachedResult,
          fromCache: true,
          rateLimit: {
            remaining: rateLimitResult.remaining,
            resetDate: rateLimitResult.resetDate,
            isDemo: rateLimitResult.isDemo,
            bypassType: rateLimitResult.bypassType
          }
        }),
      };
    }

    // Calcul de la complexité et sélection du modèle
    const { complexityScore, model } = calculateComplexityAndModel(body.data, body.userType);
    console.log(`Complexité: ${complexityScore}, Modèle sélectionné: ${model}`);

    // Génération du prompt spécialisé
    const prompt = generatePrompt(body.data, body.userType);

    // Appel à OpenAI avec modèle optimisé
    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content: "Expert estimation projets web. Réponds en JSON valide uniquement."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: model === 'gpt-4' ? 2000 : 1500, // Moins de tokens pour GPT-3.5
      });
    } catch (modelError) {
      // Fallback vers GPT-3.5-turbo si GPT-4 échoue
      console.log('Fallback vers GPT-3.5-turbo:', modelError.message);
      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Expert estimation projets web. Réponds en JSON valide uniquement."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      });
    }

    let result = completion.choices[0].message.content;
    
    // Nettoyage du résultat pour s'assurer qu'il s'agit de JSON valide
    result = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Validation JSON
    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch (parseError) {
      console.error("Erreur parsing JSON:", parseError.message);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: "Erreur de format de réponse IA" }),
      };
    }

    // Validation de cohérence des résultats
    const validationResult = validateEstimationCoherence(parsedResult, body.userType, body.data);
    if (!validationResult.isValid) {
      console.warn("Incohérence détectée:", validationResult.warnings);
      // Ajouter les avertissements aux risques
      if (parsedResult.risques) {
        parsedResult.risques.push(...validationResult.warnings);
      } else {
        parsedResult.risques = validationResult.warnings;
      }
    }

    // Mise en cache du résultat
    setCachedEstimation(cacheKey, parsedResult);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json",
        "X-RateLimit-Limit": rateLimitResult.isDemo ? "999" : "3",
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": rateLimitResult.resetDate?.toISOString()
      },
      body: JSON.stringify({
        success: true,
        userType: body.userType,
        estimation: parsedResult,
        model: model,
        complexityScore: complexityScore,
        fromCache: false,
        rateLimit: {
          remaining: rateLimitResult.remaining,
          resetDate: rateLimitResult.resetDate,
          isDemo: rateLimitResult.isDemo,
          bypassType: rateLimitResult.bypassType
        }
      }),
    };

  } catch (error) {
    console.error("Erreur OpenAI :", error.message);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Erreur serveur lors de l'estimation" }),
    };
  }
};
