// estimate-test.js - Version de test sans OpenAI pour valider l'intégration
const allowedOrigins = [
  "http://localhost:8000",
  "https://quickesti.netlify.app",
  "https://quickesti.fr"
];

// Fonction pour générer une réponse de test
function generateTestResponse(data, userType) {
  if (userType === 'freelance') {
    return {
      "estimation": {
        "duree_jours": 25,
        "duree_semaines": 5,
        "cout_total": 12500,
        "tjm_recommande": 500,
        "marge_projetee": 2500,
        "complexite": "Moyenne"
      },
      "breakdown": {
        "developpement": 18,
        "design_ui": 3,
        "integration": 2,
        "tests": 1,
        "deploiement": 1
      },
      "recommandations": [
        "Prévoir une marge de sécurité de 20% pour les imprévus",
        "Considérer l'utilisation de frameworks modernes pour accélérer le développement",
        "Planifier des points de validation réguliers avec le client"
      ],
      "risques": [
        "Délai serré qui pourrait impacter la qualité",
        "Complexité des intégrations API externes"
      ]
    };
  } else {
    return {
      "estimation": {
        "duree_jours_homme": 45,
        "duree_calendaire_semaines": 8,
        "cout_total": 35000,
        "cout_par_profil": {
          "developpeur": 25000,
          "designer": 6000,
          "chef_projet": 4000
        },
        "marge_appliquee": 7000,
        "complexite": "Élevée"
      },
      "breakdown": {
        "analyse_specs": 5,
        "developpement": 25,
        "design_ux_ui": 8,
        "integration": 4,
        "tests_qa": 2,
        "deploiement_devops": 1
      },
      "recommandations": [
        "Mettre en place une méthodologie Agile avec sprints de 2 semaines",
        "Prévoir des tests utilisateurs dès les premières itérations",
        "Considérer une architecture microservices pour la scalabilité"
      ],
      "risques": [
        "Coordination complexe entre équipes multiples",
        "Intégrations avec systèmes legacy potentiellement problématiques",
        "Montée en charge non testée"
      ]
    };
  }
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

    console.log('Données reçues pour test:', body);

    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Génération de la réponse de test
    const testResult = generateTestResponse(body.data, body.userType);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        success: true,
        userType: body.userType,
        estimation: testResult,
        isTest: true
      }),
    };

  } catch (error) {
    console.error("Erreur lors du test :", error.message);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Erreur serveur lors du test" }),
    };
  }
};
