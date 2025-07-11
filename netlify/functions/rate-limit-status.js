// rate-limit-status.js - Vérifier le statut des limitations sans consommer
const { getRateLimitStatus } = require("./rate-limiter");

// Liste blanche des domaines autorisés
const allowedOrigins = [
  "http://localhost:8000",
  "http://localhost:8888",
  "https://sassify.fr",
  "https://sassify.fr/quickesti"
];

exports.handler = async function(event) {
  const origin = event.headers.origin;

  // Gestion des pré-requêtes CORS (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    if (allowedOrigins.includes(origin)) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Demo-Key",
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
  if (event.httpMethod !== "GET") {
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
    // Obtenir le statut sans consommer
    const status = getRateLimitStatus(event);
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json",
        "X-RateLimit-Limit": status.isDemo ? "999" : "3",
        "X-RateLimit-Remaining": status.remaining.toString(),
        "X-RateLimit-Reset": status.resetDate?.toISOString()
      },
      body: JSON.stringify({
        success: true,
        rateLimit: {
          remaining: status.remaining,
          resetDate: status.resetDate,
          isDemo: status.isDemo,
          bypassType: status.bypassType,
          message: status.isDemo 
            ? `Mode ${status.bypassType} - Estimations illimitées`
            : `${status.remaining} estimation(s) restante(s) ce mois`
        }
      }),
    };

  } catch (error) {
    console.error("Erreur lors de la vérification du statut :", error.message);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Erreur serveur" }),
    };
  }
};
