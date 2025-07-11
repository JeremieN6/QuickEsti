// FreelanceObjectives.js - Section 5 : Objectifs personnels
const FreelanceObjectives = {
    template: `
        <div class="freelance-objectives bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center mb-6">
                <span class="text-indigo-500 text-2xl mr-3">🎯</span>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Section 5 : Objectifs personnels
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Définissez vos objectifs pour ce projet afin d'adapter l'estimation à votre stratégie
                    </p>
                </div>
            </div>

            <div class="space-y-6">
                <!-- Introduction -->
                <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <p class="text-sm text-indigo-700 dark:text-indigo-300">
                        💡 <strong>Pourquoi ces questions ?</strong> Vos objectifs personnels influencent la stratégie tarifaire. 
                        Un projet "portfolio" peut justifier un tarif plus bas, tandis qu'un objectif de "rentabilité maximale" 
                        orientera vers un TJM plus élevé.
                    </p>
                </div>

                <!-- Objectifs principaux -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        🚀 Quel est votre objectif principal pour ce projet ?
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Vous pouvez sélectionner plusieurs objectifs
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-for="objective in availableObjectives" :key="objective.id" 
                             class="objective-item p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <label class="flex items-start cursor-pointer">
                                <input 
                                    type="checkbox"
                                    :value="objective.id"
                                    v-model="localFormData.selectedObjectives"
                                    @change="updateFormData"
                                    class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                >
                                <div class="ml-3 flex-1">
                                    <div class="flex items-center">
                                        <span class="text-lg mr-2">{{ objective.icon }}</span>
                                        <span class="font-medium text-gray-900 dark:text-white">{{ objective.name }}</span>
                                        <span v-if="objective.impact" 
                                              :class="getImpactClass(objective.impact)"
                                              class="ml-2 px-2 py-0.5 text-xs rounded-full">
                                            {{ objective.impact }}
                                        </span>
                                    </div>
                                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ objective.description }}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Objectif personnalisé -->
                <div v-if="localFormData.selectedObjectives.includes('other')">
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        ✏️ Précisez votre objectif personnalisé
                    </h5>
                    <textarea 
                        v-model="localFormData.customObjective"
                        @input="updateFormData"
                        placeholder="Décrivez votre objectif spécifique pour ce projet..."
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    ></textarea>
                </div>

                <!-- Priorité des objectifs -->
                <div v-if="localFormData.selectedObjectives.length > 1">
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        📊 Quel est votre objectif prioritaire ?
                    </h5>
                    <select 
                        v-model="localFormData.primaryObjective"
                        @change="updateFormData"
                        class="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Sélectionnez l'objectif principal</option>
                        <option v-for="objectiveId in localFormData.selectedObjectives" 
                                :key="objectiveId" 
                                :value="objectiveId">
                            {{ getObjectiveName(objectiveId) }}
                        </option>
                    </select>
                </div>

                <!-- Contexte du projet -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        🏢 Contexte du projet
                    </h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Type de client
                            </label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="clientType"
                                        value="new"
                                        v-model="localFormData.clientType"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Nouveau client
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="clientType"
                                        value="existing"
                                        v-model="localFormData.clientType"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Client existant
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="clientType"
                                        value="strategic"
                                        v-model="localFormData.clientType"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Client stratégique
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Situation actuelle
                            </label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="situation"
                                        value="busy"
                                        v-model="localFormData.currentSituation"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Planning chargé
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="situation"
                                        value="gap"
                                        v-model="localFormData.currentSituation"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Trou dans le planning
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="situation"
                                        value="normal"
                                        v-model="localFormData.currentSituation"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Situation normale
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Résumé des objectifs -->
            <div v-if="hasObjectiveData" class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📝 Résumé de vos objectifs :
                </h5>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <div v-if="localFormData.selectedObjectives.length > 0">
                        <strong>Objectifs :</strong>
                        <div class="flex flex-wrap gap-2 mt-1">
                            <span v-for="objectiveId in localFormData.selectedObjectives" :key="objectiveId"
                                  class="inline-flex items-center px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-full">
                                {{ getObjectiveName(objectiveId) }}
                            </span>
                        </div>
                    </div>
                    <p v-if="localFormData.primaryObjective">
                        <strong>Objectif prioritaire :</strong> {{ getObjectiveName(localFormData.primaryObjective) }}
                    </p>
                    <p v-if="localFormData.clientType">
                        <strong>Type de client :</strong> {{ getClientTypeLabel() }}
                    </p>
                    <p v-if="localFormData.currentSituation">
                        <strong>Situation :</strong> {{ getSituationLabel() }}
                    </p>
                    <p v-if="localFormData.customObjective">
                        <strong>Objectif personnalisé :</strong> {{ localFormData.customObjective }}
                    </p>
                </div>
                
                <!-- Impact sur le TJM -->
                <div class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p class="text-sm text-yellow-700 dark:text-yellow-300">
                        💰 <strong>Impact sur votre TJM :</strong> {{ getTjmImpactMessage() }}
                    </p>
                </div>
            </div>
        </div>
    `,
    
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    
    emits: ['update:form-data'],
    
    data() {
        return {
            localFormData: {
                selectedObjectives: [],
                customObjective: '',
                primaryObjective: '',
                clientType: '',
                currentSituation: '',
                ...this.formData
            },
            availableObjectives: [
                {
                    id: 'profitability',
                    name: 'Rentabilité maximale',
                    description: 'Optimiser le retour sur investissement de ce projet',
                    icon: '💰',
                    impact: 'TJM +'
                },
                {
                    id: 'portfolio',
                    name: 'Projet portfolio',
                    description: 'Montrer mon savoir-faire et enrichir mes références',
                    icon: '🎨',
                    impact: 'TJM -'
                },
                {
                    id: 'learning',
                    name: 'Progression technique',
                    description: 'Apprendre une nouvelle technologie ou type de projet',
                    icon: '📚',
                    impact: 'TJM -'
                },
                {
                    id: 'strategic-client',
                    name: 'Nouveau client stratégique',
                    description: 'Établir une relation long terme avec un client important',
                    icon: '🤝',
                    impact: 'TJM ='
                },
                {
                    id: 'fill-gap',
                    name: 'Combler un trou dans le planning',
                    description: 'Maintenir l\'activité entre deux gros projets',
                    icon: '📅',
                    impact: 'TJM -'
                },
                {
                    id: 'positioning',
                    name: 'Nouveau positionnement',
                    description: 'Expérimenter un nouveau secteur ou type de prestation',
                    icon: '🎯',
                    impact: 'TJM ='
                },
                {
                    id: 'income',
                    name: 'Complément de revenu',
                    description: 'Projet d\'appoint pour augmenter le chiffre d\'affaires',
                    icon: '💵',
                    impact: 'TJM ='
                },
                {
                    id: 'other',
                    name: 'Autre raison',
                    description: 'Objectif spécifique non listé ci-dessus',
                    icon: '✏️',
                    impact: 'Variable'
                }
            ]
        }
    },
    
    computed: {
        hasObjectiveData() {
            return this.localFormData.selectedObjectives.length > 0 ||
                   this.localFormData.clientType ||
                   this.localFormData.currentSituation ||
                   this.localFormData.customObjective;
        }
    },
    
    methods: {
        updateFormData() {
            this.$emit('update:form-data', { ...this.localFormData });
        },
        
        getImpactClass(impact) {
            const classes = {
                'TJM +': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
                'TJM -': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
                'TJM =': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
                'Variable': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
            };
            return classes[impact] || '';
        },
        
        getObjectiveName(objectiveId) {
            const objective = this.availableObjectives.find(o => o.id === objectiveId);
            return objective ? objective.name : objectiveId;
        },
        
        getClientTypeLabel() {
            const labels = {
                'new': 'Nouveau client',
                'existing': 'Client existant',
                'strategic': 'Client stratégique'
            };
            return labels[this.localFormData.clientType] || this.localFormData.clientType;
        },
        
        getSituationLabel() {
            const labels = {
                'busy': 'Planning chargé',
                'gap': 'Trou dans le planning',
                'normal': 'Situation normale'
            };
            return labels[this.localFormData.currentSituation] || this.localFormData.currentSituation;
        },
        
        getTjmImpactMessage() {
            const selectedObjectives = this.localFormData.selectedObjectives;
            const primaryObjective = this.localFormData.primaryObjective;
            
            if (primaryObjective) {
                const objective = this.availableObjectives.find(o => o.id === primaryObjective);
                if (objective) {
                    const messages = {
                        'TJM +': 'Vos objectifs justifient un TJM plus élevé',
                        'TJM -': 'Vos objectifs peuvent justifier un TJM plus flexible',
                        'TJM =': 'Vos objectifs suggèrent un TJM standard',
                        'Variable': 'L\'impact dépend de votre objectif personnalisé'
                    };
                    return messages[objective.impact] || 'Impact à évaluer selon le contexte';
                }
            }
            
            if (selectedObjectives.includes('profitability')) {
                return 'Objectif de rentabilité : visez un TJM élevé';
            } else if (selectedObjectives.includes('portfolio') || selectedObjectives.includes('learning')) {
                return 'Objectifs de développement : TJM plus flexible acceptable';
            }
            
            return 'Définissez vos priorités pour optimiser votre stratégie tarifaire';
        }
    },
    
    watch: {
        formData: {
            handler(newData) {
                this.localFormData = { 
                    selectedObjectives: [],
                    customObjective: '',
                    primaryObjective: '',
                    clientType: '',
                    currentSituation: '',
                    ...this.localFormData, 
                    ...newData 
                };
            },
            deep: true
        }
    }
};
