<template>
  <div class="estimation-results bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <div class="flex items-center mb-6">
      <span class="text-purple-500 text-2xl mr-3">🎯</span>
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
          Résultats de l'estimation
        </h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Votre estimation personnalisée pour {{ userType }}
        </p>
      </div>
    </div>
    
    <div v-if="result" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ getDuration() }} jours
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Durée estimée</div>
        </div>

        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">
            {{ formatPrice(getCost()) }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Coût total</div>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {{ getComplexity() }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Complexité</div>
        </div>
      </div>

      <!-- Détails supplémentaires -->
      <div v-if="result.estimation.breakdown" class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h5 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Répartition détaillée</h5>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div v-for="(item, key) in result.estimation.breakdown" :key="key" class="text-center">
            <div class="font-medium text-gray-900 dark:text-white">{{ item.days || 0 }}j</div>
            <div class="text-xs text-gray-600 dark:text-gray-400 capitalize">{{ getBreakdownLabel(key) }}</div>
          </div>
        </div>
      </div>

      <!-- Recommandations -->
      <div v-if="result.estimation.recommendations && result.estimation.recommendations.length" class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h5 class="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">💡 Recommandations</h5>
        <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li v-for="(rec, index) in result.estimation.recommendations" :key="index" class="flex items-start">
            <span class="mr-2">•</span>
            <span>{{ rec }}</span>
          </li>
        </ul>
      </div>

      <!-- Risques -->
      <div v-if="result.estimation.risks && result.estimation.risks.length" class="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
        <h5 class="text-sm font-medium text-orange-900 dark:text-orange-200 mb-2">⚠️ Risques identifiés</h5>
        <ul class="text-sm text-orange-800 dark:text-orange-300 space-y-1">
          <li v-for="(risk, index) in result.estimation.risks" :key="index" class="flex items-start">
            <span class="mr-2">•</span>
            <span>{{ risk }}</span>
          </li>
        </ul>
      </div>

      <div class="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
        Estimation générée par {{ getModel() }} • Confiance: {{ getConfidence() }}
        <span v-if="getComplexityScore()"> • Score: {{ getComplexityScore() }}/10</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EstimationResults',
  props: {
    result: {
      type: Object,
      default: null
    },
    userType: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatPrice(price) {
      if (!price || isNaN(price)) return '0 €';
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price);
    },

    // Méthodes pour gérer les deux formats (ancien et nouveau)
    getDuration() {
      if (!this.result?.estimation) return 0;
      // Nouveau format
      if (this.result.estimation.totalDays) {
        return this.result.estimation.totalDays;
      }
      // Ancien format
      if (this.result.estimation.duree_jours) {
        return this.result.estimation.duree_jours;
      }
      return 0;
    },

    getCost() {
      if (!this.result?.estimation) return 0;
      // Nouveau format
      if (this.result.estimation.totalCost) {
        return this.result.estimation.totalCost;
      }
      // Ancien format
      if (this.result.estimation.cout_total) {
        return this.result.estimation.cout_total;
      }
      return 0;
    },

    getComplexity() {
      if (!this.result?.estimation) return 'Non définie';
      // Nouveau format
      if (this.result.estimation.confidence) {
        const confidenceMap = {
          'high': 'Élevée',
          'medium': 'Moyenne',
          'low': 'Faible'
        };
        return confidenceMap[this.result.estimation.confidence] || this.result.estimation.confidence;
      }
      // Ancien format
      if (this.result.estimation.complexite) {
        return this.result.estimation.complexite;
      }
      return 'Non définie';
    },

    getModel() {
      // Nouveau format avec optimisation
      if (this.result?.optimization?.model) {
        return this.result.optimization.model;
      }
      // Ancien format
      if (this.result?.model) {
        return this.result.model;
      }
      // Fallback
      if (this.result?.metadata?.version?.includes('fallback')) {
        return 'Algorithme interne';
      }
      return 'IA';
    },

    getConfidence() {
      if (this.result?.estimation?.confidence) {
        const confidenceMap = {
          'high': 'Élevée',
          'medium': 'Moyenne',
          'low': 'Faible'
        };
        return confidenceMap[this.result.estimation.confidence] || this.result.estimation.confidence;
      }
      return 'Moyenne';
    },

    getComplexityScore() {
      // Nouveau format avec optimisation
      if (this.result?.optimization?.complexityScore) {
        return this.result.optimization.complexityScore;
      }
      // Ancien format
      if (this.result?.complexityScore) {
        return this.result.complexityScore;
      }
      return null;
    },

    getBreakdownLabel(key) {
      const labels = {
        'development': 'Développement',
        'design': 'Design',
        'testing': 'Tests',
        'management': 'Gestion',
        'margin': 'Marge',
        'deploiement': 'Déploiement',
        'integration': 'Intégration'
      };
      return labels[key] || key;
    }
  }
}
</script>
