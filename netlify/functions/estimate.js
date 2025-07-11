const { OpenAI } = require("openai");
require('dotenv').config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Liste blanche des domaines autorisés
const allowedOrigins = [
  "http://localhost:8000",
  "https://quickesti.netlify.app",
  "https://sassify.fr",
  "https://sassify.fr/quickesti"
];

// Fonction pour générer le prompt spécialisé
function generatePrompt(data, userType) {
  if (userType === 'freelance') {
    return generateFreelancePrompt(data);
  } else {
    return generateEnterprisePrompt(data);
  }
}

// Prompt spécialisé pour freelance
function generateFreelancePrompt(data) {
  const prompt = `
Tu es un expert en estimation de projets web pour développeurs freelance. 

DONNÉES DU PROJET :
- Type de projet : ${data.projectType || 'Non spécifié'}
- Technologies : ${data.technologies ? data.technologies.join(', ') : 'Non spécifiées'}
- Nombre de pages : ${data.pages || 'Non spécifié'}
- Deadline : ${data.deadline || 'Non spécifiée'}
- Niveau de compétence : ${data.skillLevel || 'Non spécifié'}
- Travail temps plein : ${data.fullTime ? 'Oui' : 'Non'}
- TJM cible : ${data.tjm || 'Non spécifié'}€
- Marge de sécurité : ${data.securityMargin || 0}%
- Fonctionnalités : ${data.features ? data.features.join(', ') : 'Aucune spécifiée'}
- Périmètre : ${data.scope || 'Non spécifié'}
- Objectifs : ${data.objectives ? data.objectives.join(', ') : 'Non spécifiés'}

SCORING INTERNE À APPLIQUER :
- Authentification/Espace membre : +3-5 jours
- Tableau de bord/back-office : +5-8 jours  
- Intégration API externe : +2-4 jours
- Paiement en ligne : +3-5 jours
- Système de recherche/filtres : +2-4 jours
- Admin CRUD complet : +4-7 jours
- CMS/contenu dynamique : +3-6 jours
- Tests automatisés : +2-3 jours
- Niveau débutant : +20% durée totale
- Pas de maquettes : +2-3 jours
- Design à faire : +5-8 jours
- Deadline courte : coefficient d'urgence x1.2-1.5

RÉPONSE ATTENDUE (format JSON strict) :
{
  "estimation": {
    "duree_jours": [nombre],
    "duree_semaines": [nombre], 
    "cout_total": [nombre],
    "tjm_recommande": [nombre],
    "marge_projetee": [nombre],
    "complexite": "[Faible/Moyenne/Élevée/Très élevée]"
  },
  "breakdown": {
    "developpement": [nombre de jours],
    "design_ui": [nombre de jours],
    "integration": [nombre de jours],
    "tests": [nombre de jours],
    "deploiement": [nombre de jours]
  },
  "recommandations": [
    "Recommandation 1",
    "Recommandation 2", 
    "Recommandation 3"
  ],
  "risques": [
    "Risque identifié 1",
    "Risque identifié 2"
  ]
}

Analyse ces données et fournis une estimation réaliste en tenant compte du profil freelance (rentabilité, TJM, marge de sécurité).
`;

  return prompt;
}

// Prompt spécialisé pour entreprise  
function generateEnterprisePrompt(data) {
  const prompt = `
Tu es un expert en estimation de projets web pour entreprises et équipes.

DONNÉES DU PROJET :
- Type de projet : ${data.projectType || 'Non spécifié'}
- Technologies : ${data.technologies ? data.technologies.join(', ') : 'Non spécifiées'}
- Nombre de pages : ${data.pages || 'Non spécifié'}
- Deadline : ${data.deadline || 'Non spécifiée'}
- Raison du chiffrage : ${data.reason || 'Non spécifiée'}
- Rôle du demandeur : ${data.role || 'Non spécifié'}
- Équipe : ${data.team ? data.team.join(', ') : 'Non spécifiée'}
- Méthodologie : ${data.methodology || 'Non spécifiée'}
- Fonctionnalités : ${data.features ? data.features.join(', ') : 'Aucune spécifiée'}
- Scalabilité : ${data.scalable ? 'Oui' : 'Non'}
- Complexité : ${data.complexity || 'Non spécifiée'}
- Budget indicatif : ${data.budget || 'Non spécifié'}€
- Urgence : ${data.urgent || 'Non spécifiée'}
- Coûts par profil : ${data.costs ? JSON.stringify(data.costs) : 'Non spécifiés'}
- Marge : ${data.margin || 0}%
- Modèle : ${data.model || 'Non spécifié'}

SCORING INTERNE ENTREPRISE :
- Authentification/SSO : +5-8 jours
- API à créer/connecter : +8-12 jours
- E-commerce : +10-15 jours
- Gestion rôles/permissions : +4-6 jours
- Intégration ERP/CRM : +8-15 jours
- Multilingue : +3-5 jours
- RGPD/sécurité renforcée : +5-8 jours
- CI/CD : +3-5 jours
- Monitoring : +2-3 jours
- Équipe distribuée : +15% temps coordination
- Méthodologie Agile : +10% temps ceremonies

RÉPONSE ATTENDUE (format JSON strict) :
{
  "estimation": {
    "duree_jours_homme": [nombre],
    "duree_calendaire_semaines": [nombre],
    "cout_total": [nombre],
    "cout_par_profil": {
      "developpeur": [nombre],
      "designer": [nombre], 
      "chef_projet": [nombre]
    },
    "marge_appliquee": [nombre],
    "complexite": "[Faible/Moyenne/Élevée/Très élevée]"
  },
  "breakdown": {
    "analyse_specs": [nombre de jours],
    "developpement": [nombre de jours],
    "design_ux_ui": [nombre de jours],
    "integration": [nombre de jours],
    "tests_qa": [nombre de jours],
    "deploiement_devops": [nombre de jours],
    "gestion_projet": [nombre de jours]
  },
  "recommandations": [
    "Recommandation stratégique 1",
    "Recommandation technique 2",
    "Recommandation organisationnelle 3"
  ],
  "risques": [
    "Risque projet identifié 1", 
    "Risque technique identifié 2"
  ]
}

Analyse ces données et fournis une estimation adaptée au contexte entreprise (équipe, budget, ROI, scalabilité).
`;

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

    // Génération du prompt spécialisé
    const prompt = generatePrompt(body.data, body.userType);

    // Appel à OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "Tu es un expert en estimation de projets web. Tu réponds toujours en JSON valide selon le format demandé." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.3, // Plus déterministe pour les estimations
      max_tokens: 2000,
    });

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

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        success: true,
        userType: body.userType,
        estimation: parsedResult 
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
