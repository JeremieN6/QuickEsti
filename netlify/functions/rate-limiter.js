// rate-limiter.js - Système de limitation d'estimations avec bypass démo/investisseur

// Stockage en mémoire des limitations (en production, utiliser Redis ou base de données)
const rateLimitStore = new Map();
const LIMIT_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 jours en millisecondes
const FREE_LIMIT = 3; // 3 estimations gratuites par mois

// Clés de bypass sécurisées (à changer en production)
const DEMO_KEYS = {
  'demo_quickesti_2024': 'Démonstration QuickEsti',
  'investor_access_vip': 'Accès Investisseur',
  'presentation_mode': 'Mode Présentation'
};

// Fonction pour nettoyer les anciennes entrées
function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.firstRequest > LIMIT_DURATION) {
      rateLimitStore.delete(key);
    }
  }
}

// Fonction pour obtenir l'identifiant client (IP + User-Agent hash)
function getClientId(event) {
  const ip = event.headers['x-forwarded-for'] || 
             event.headers['x-real-ip'] || 
             'unknown';
  const userAgent = event.headers['user-agent'] || '';
  
  // Simple hash pour anonymiser
  const hash = Buffer.from(ip + userAgent).toString('base64').slice(0, 16);
  return `client_${hash}`;
}

// Fonction pour vérifier les clés de bypass
function checkBypassKey(event) {
  // Vérifier dans les headers
  const bypassKey = event.headers['x-demo-key'] || 
                   event.queryStringParameters?.demo_key ||
                   event.queryStringParameters?.key;
  
  if (bypassKey && DEMO_KEYS[bypassKey]) {
    return {
      isValid: true,
      type: DEMO_KEYS[bypassKey]
    };
  }
  
  return { isValid: false };
}

// Fonction principale de vérification des limites
function checkRateLimit(event) {
  // Nettoyage périodique
  if (Math.random() < 0.1) { // 10% de chance à chaque appel
    cleanupOldEntries();
  }
  
  // Vérifier d'abord les clés de bypass
  const bypass = checkBypassKey(event);
  if (bypass.isValid) {
    return {
      allowed: true,
      remaining: 999,
      resetDate: null,
      bypassType: bypass.type,
      isDemo: true
    };
  }
  
  const clientId = getClientId(event);
  const now = Date.now();
  
  // Récupérer ou créer l'entrée client
  let clientData = rateLimitStore.get(clientId);
  
  if (!clientData) {
    // Nouveau client
    clientData = {
      count: 0,
      firstRequest: now,
      lastRequest: now
    };
  }
  
  // Vérifier si la période a expiré (reset mensuel)
  if (now - clientData.firstRequest > LIMIT_DURATION) {
    clientData = {
      count: 0,
      firstRequest: now,
      lastRequest: now
    };
  }
  
  // Vérifier la limite
  if (clientData.count >= FREE_LIMIT) {
    const resetDate = new Date(clientData.firstRequest + LIMIT_DURATION);
    return {
      allowed: false,
      remaining: 0,
      resetDate: resetDate,
      message: `Limite de ${FREE_LIMIT} estimations gratuites atteinte. Réinitialisation le ${resetDate.toLocaleDateString('fr-FR')}.`
    };
  }
  
  // Incrémenter le compteur
  clientData.count += 1;
  clientData.lastRequest = now;
  rateLimitStore.set(clientId, clientData);
  
  const resetDate = new Date(clientData.firstRequest + LIMIT_DURATION);
  
  return {
    allowed: true,
    remaining: FREE_LIMIT - clientData.count,
    resetDate: resetDate,
    isDemo: false
  };
}

// Fonction pour obtenir le statut actuel sans incrémenter
function getRateLimitStatus(event) {
  const bypass = checkBypassKey(event);
  if (bypass.isValid) {
    return {
      remaining: 999,
      resetDate: null,
      bypassType: bypass.type,
      isDemo: true
    };
  }
  
  const clientId = getClientId(event);
  const clientData = rateLimitStore.get(clientId);
  const now = Date.now();
  
  if (!clientData || (now - clientData.firstRequest > LIMIT_DURATION)) {
    return {
      remaining: FREE_LIMIT,
      resetDate: new Date(now + LIMIT_DURATION),
      isDemo: false
    };
  }
  
  const resetDate = new Date(clientData.firstRequest + LIMIT_DURATION);
  return {
    remaining: Math.max(0, FREE_LIMIT - clientData.count),
    resetDate: resetDate,
    isDemo: false
  };
}

module.exports = {
  checkRateLimit,
  getRateLimitStatus,
  DEMO_KEYS
};
