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



      <!-- Actions d'export -->
      <div class="mt-6 flex justify-center">
        <button
          @click="exportToPDF"
          :disabled="isExporting"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg v-if="!isExporting" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <svg v-else class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isExporting ? 'Génération...' : 'Télécharger PDF' }}
        </button>
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
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isExporting: false
    };
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
    },

    async exportToPDF() {
      if (!this.result || !this.formData) {
        alert('Données manquantes pour l\'export PDF');
        return;
      }

      this.isExporting = true;

      try {

        // Prépare les données pour l'export
        const exportData = {
          userType: this.userType,
          formData: this.formData,
          estimation: this.result.estimation,
          metadata: this.result.metadata || {}
        };

        // Appel à l'API d'export PDF
        const response = await fetch('/api/estimation/export-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(exportData)
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la génération du PDF');
        }

        // Télécharge le PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;

        // Génère un nom de fichier basé sur le type de freelance
        const freelanceType = this.formData.constraints?.freelanceType || 'forfait';
        const projectType = this.formData.basics?.projectType || 'projet';
        const date = new Date().toISOString().split('T')[0];
        const prefix = freelanceType === 'regie' ? 'devis' : 'estimation';

        a.download = `${prefix}-${projectType.replace(/[^a-zA-Z0-9]/g, '-')}-${date}.pdf`;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

      } catch (error) {
        console.error('Erreur export PDF:', error);
        alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
      } finally {
        this.isExporting = false;
      }
    }
  }
}
</script>
