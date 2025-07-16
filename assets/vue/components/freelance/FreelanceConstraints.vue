<template>
  <div class="freelance-constraints bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
    <div class="flex items-center mb-6">
      <span class="text-orange-500 text-2xl mr-3">⚙️</span>
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
          Section 2 : Contraintes du freelance
        </h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Définissez vos contraintes personnelles et professionnelles
        </p>
      </div>
    </div>

    <div class="space-y-8 flex-grow">
      <!-- Mode d'estimation -->
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
          🎯 Type d'estimation
        </h5>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Choisissez si vous estimez vos coûts internes ou le prix de vente à proposer au client
        </p>
        <div class="space-y-3">
          <label class="flex items-center">
            <input
              type="radio"
              name="estimationMode"
              value="internal"
              v-model="localFormData.estimationMode"
              @change="updateFormData"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            >
            <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>Estimation interne</strong> - Mon coût projet (temps × TJM personnel)
            </span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              name="estimationMode"
              value="client-quote"
              v-model="localFormData.estimationMode"
              @change="updateFormData"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            >
            <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>Devis client</strong> - Prix de vente recommandé (benchmark marché)
            </span>
          </label>
        </div>
      </div>

      <!-- Niveau de compétence par technologie -->
      <div v-if="technologiesList.length > 0">
        <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          🎯 Niveau de compétence par technologie
        </h5>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Évaluez votre niveau sur chaque technologie mentionnée dans la section précédente
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="tech in technologiesList" :key="tech" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ tech }}</span>
            <select
              v-model="localFormData.skillLevels[tech]"
              @change="updateFormData"
              class="ml-3 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
            >
              <option value="">Niveau</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Message si pas de technologies -->
      <div v-else class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p class="text-sm text-yellow-700 dark:text-yellow-300">
          💡 Remplissez d'abord les technologies dans la section précédente pour évaluer vos compétences
        </p>
      </div>

      <!-- Grid pour optimiser l'espace -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Travail à temps plein -->
        <div>
          <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
            ⏰ Disponibilité pour ce projet
          </h5>
          <div class="space-y-3">
            <label class="flex items-center">
              <input
                type="radio"
                name="fullTime"
                :value="true"
                v-model="localFormData.isFullTime"
                @change="updateFormData"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              >
              <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                <strong>Temps plein</strong> - Je peux me consacrer entièrement à ce projet
              </span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="fullTime"
                :value="false"
                v-model="localFormData.isFullTime"
                @change="updateFormData"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              >
              <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                <strong>Temps partiel</strong> - J'ai d'autres projets en parallèle
              </span>
            </label>
          </div>
        </div>

        <!-- TJM cible -->
        <div>
          <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
            💰 TJM (Taux Journalier Moyen)
          </h5>
          <div class="space-y-4">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="localFormData.hasTjmTarget"
                @change="updateFormData"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              >
              <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Je veux me baser sur un TJM cible
              </span>
              <!-- TODO: Ajouter tooltip component -->
            </label>

            <div v-if="localFormData.hasTjmTarget" class="ml-7 flex items-center space-x-3">
              <input
                type="number"
                v-model.number="localFormData.tjmTarget"
                @input="updateFormData"
                placeholder="500"
                min="100"
                max="2000"
                step="50"
                class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
              <span class="text-sm text-gray-600 dark:text-gray-400">€ HT / jour</span>
              <a href="https://sassify.fr/calculateur-de-tjm" target="_blank" class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                (Référence : calculateur TJM)
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Marge de sécurité -->
      <div>
        <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <span>🛡️ Marge de sécurité</span>
          <!-- TODO: Ajouter tooltip component -->
        </h5>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Pour gérer les aléas, bugs, retours clients et autres imprévus
        </p>
        <select
          v-model="localFormData.securityMargin"
          @change="updateFormData"
          class="w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Sélectionnez une marge</option>
          <option value="0">0% - Pas de marge</option>
          <option value="10">10% - Marge faible</option>
          <option value="20">20% - Marge standard</option>
          <option value="30">30% - Marge élevée</option>
        </select>

        <div v-if="localFormData.securityMargin" class="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            💡 Avec {{ localFormData.securityMargin }}% de marge, si votre estimation initiale est de 10 jours,
            vous facturerez {{ Math.round(10 * (1 + localFormData.securityMargin / 100)) }} jours.
          </p>
        </div>
      </div>

      <!-- Informations client (mode devis uniquement) -->
      <div v-if="localFormData.estimationMode === 'client-quote'" class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          🏢 Informations sur le client
        </h5>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Type de client -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de client
            </label>
            <select
              v-model="localFormData.clientType"
              @change="updateFormData"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Sélectionnez le type de client</option>
              <option value="startup">Startup / Jeune entreprise</option>
              <option value="pme">PME (10-250 salariés)</option>
              <option value="grande-entreprise">Grande entreprise (250+ salariés)</option>
              <option value="association">Association / ONG</option>
              <option value="particulier">Particulier</option>
            </select>
          </div>

          <!-- Budget indicatif -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Budget indicatif du client
            </label>
            <select
              v-model="localFormData.clientBudgetRange"
              @change="updateFormData"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Budget non communiqué</option>
              <option value="low">&lt; 5 000€</option>
              <option value="medium">5 000€ - 15 000€</option>
              <option value="high">15 000€ - 50 000€</option>
              <option value="enterprise">50 000€+</option>
            </select>
          </div>
        </div>

        <!-- Contexte concurrentiel -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contexte concurrentiel
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="radio"
                name="competitive"
                value="low"
                v-model="localFormData.competitiveContext"
                @change="updateFormData"
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
              >
              <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Peu de concurrence - Client me fait confiance
              </span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="competitive"
                value="medium"
                v-model="localFormData.competitiveContext"
                @change="updateFormData"
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
              >
              <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Concurrence modérée - Quelques devis en parallèle
              </span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="competitive"
                value="high"
                v-model="localFormData.competitiveContext"
                @change="updateFormData"
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
              >
              <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                Forte concurrence - Appel d'offres ou nombreux devis
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Résumé des contraintes -->
      <div v-if="hasConstraintData" class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          📝 Résumé de vos contraintes :
        </h5>
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p v-if="localFormData.estimationMode">
            <strong>Mode :</strong> {{ localFormData.estimationMode === 'internal' ? 'Estimation interne' : 'Devis client' }}
          </p>
          <p v-if="localFormData.isFullTime !== null">
            <strong>Disponibilité :</strong> {{ localFormData.isFullTime ? 'Temps plein' : 'Temps partiel' }}
          </p>
          <p v-if="localFormData.hasTjmTarget && localFormData.tjmTarget">
            <strong>TJM cible :</strong> {{ localFormData.tjmTarget }}€ HT/jour
          </p>
          <p v-if="localFormData.securityMargin">
            <strong>Marge de sécurité :</strong> {{ localFormData.securityMargin }}%
          </p>
          <!-- Informations client pour mode devis -->
          <p v-if="localFormData.estimationMode === 'client-quote' && localFormData.clientType">
            <strong>Type de client :</strong> {{ getClientTypeLabel(localFormData.clientType) }}
          </p>
          <p v-if="localFormData.estimationMode === 'client-quote' && localFormData.clientBudgetRange">
            <strong>Budget client :</strong> {{ getBudgetRangeLabel(localFormData.clientBudgetRange) }}
          </p>
          <p v-if="localFormData.estimationMode === 'client-quote' && localFormData.competitiveContext">
            <strong>Concurrence :</strong> {{ getCompetitiveContextLabel(localFormData.competitiveContext) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Indicateur de progression -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-400">
          Section {{ hasData ? 'complétée' : 'en cours' }}
        </span>
        <div class="flex items-center">
          <div class="w-2 h-2 rounded-full mr-2" :class="hasData ? 'bg-green-500' : 'bg-gray-300'"></div>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ hasData ? '✓' : '○' }} Contraintes freelance
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FreelanceConstraints',
  props: {
    formData: {
      type: Object,
      default: () => ({
        estimationMode: 'internal', // 'internal' ou 'client-quote'
        skillLevels: {},
        isFullTime: null,
        hasTjmTarget: false,
        tjmTarget: null,
        hasWorkingDaysTarget: false,
        workingDaysTarget: null,
        hasMarginTarget: false,
        marginTarget: null,
        securityMargin: '',
        // Champs pour mode devis client
        clientType: '',
        clientBudgetRange: '',
        competitiveContext: ''
      })
    },
    technologies: {
      type: String,
      default: ''
    }
  },
  emits: ['update:form-data'],
  data() {
    return {
      localFormData: {
        skillLevels: {},
        isFullTime: null,
        hasTjmTarget: false,
        tjmTarget: null,
        hasWorkingDaysTarget: false,
        workingDaysTarget: null,
        hasMarginTarget: false,
        marginTarget: null,
        securityMargin: '',
        ...this.formData
      }
    }
  },
  computed: {
    technologiesList() {
      if (!this.technologies) return [];

      // Parse les technologies depuis le texte
      return this.technologies
        .split(/[,\n]/)
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0)
        .slice(0, 10); // Limite à 10 technologies max
    },

    hasData() {
      return this.localFormData.isFullTime !== null ||
             this.localFormData.hasTjmTarget ||
             this.localFormData.hasWorkingDaysTarget ||
             this.localFormData.hasMarginTarget ||
             this.localFormData.securityMargin ||
             Object.keys(this.localFormData.skillLevels).length > 0;
    },

    hasConstraintData() {
      return this.localFormData.isFullTime !== null ||
             (this.localFormData.hasTjmTarget && this.localFormData.tjmTarget) ||
             this.localFormData.securityMargin;
    }
  },
  methods: {
    updateFormData() {
      this.$emit('update:form-data', { ...this.localFormData });
    },

    initializeSkillLevels() {
      // Initialise les niveaux de compétence pour les nouvelles technologies
      this.technologiesList.forEach(tech => {
        if (!this.localFormData.skillLevels[tech]) {
          this.localFormData.skillLevels[tech] = '';
        }
      });

      // Supprime les technologies qui ne sont plus dans la liste
      Object.keys(this.localFormData.skillLevels).forEach(tech => {
        if (!this.technologiesList.includes(tech)) {
          delete this.localFormData.skillLevels[tech];
        }
      });
    },

    getClientTypeLabel(value) {
      const labels = {
        'startup': 'Startup / Jeune entreprise',
        'pme': 'PME (10-250 salariés)',
        'grande-entreprise': 'Grande entreprise (250+ salariés)',
        'association': 'Association / ONG',
        'particulier': 'Particulier'
      };
      return labels[value] || value;
    },

    getBudgetRangeLabel(value) {
      const labels = {
        'low': '< 5 000€',
        'medium': '5 000€ - 15 000€',
        'high': '15 000€ - 50 000€',
        'enterprise': '50 000€+'
      };
      return labels[value] || value;
    },

    getCompetitiveContextLabel(value) {
      const labels = {
        'low': 'Peu de concurrence',
        'medium': 'Concurrence modérée',
        'high': 'Forte concurrence'
      };
      return labels[value] || value;
    }
  },
  watch: {
    formData: {
      handler(newData) {
        this.localFormData = { ...this.localFormData, ...newData };
      },
      deep: true
    },

    technologies: {
      handler() {
        this.initializeSkillLevels();
        this.updateFormData();
      },
      immediate: true
    }
  },

  mounted() {
    this.initializeSkillLevels();
  }
}
</script>
