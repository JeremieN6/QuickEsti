// EnterpriseObjectives.js - Section 5 : Objectifs business du projet
const EnterpriseObjectives = {
    template: `
        <div class="enterprise-objectives bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center mb-6">
                <span class="text-indigo-500 text-2xl mr-3">🎯</span>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Section 5 : Objectifs business du projet
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Définissez les objectifs business pour adapter l'estimation aux enjeux
                    </p>
                </div>
            </div>

            <div class="space-y-8">
                <!-- Introduction -->
                <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <p class="text-sm text-indigo-700 dark:text-indigo-300">
                        💡 <strong>Pourquoi ces questions ?</strong> Les objectifs business influencent les choix techniques, 
                        la qualité attendue et les délais. Un MVP nécessite une approche différente d'un projet destiné 
                        à la production à grande échelle.
                    </p>
                </div>

                <!-- Objectif du projet -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        🚀 Quel est l'objectif de ce projet ?
                    </h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label v-for="objective in projectObjectives" :key="objective.id" class="flex items-start">
                            <input 
                                type="radio" 
                                name="project-objective"
                                :value="objective.id"
                                v-model="localFormData.projectObjective"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
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
                                <p v-if="objective.implications" class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    {{ objective.implications }}
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Contexte budgétaire -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        💰 Contexte budgétaire du projet
                    </h5>
                    <div class="space-y-4">
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="budget-context"
                                value="defined"
                                v-model="localFormData.budgetContext"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3 flex-1">
                                <span class="font-medium text-gray-900 dark:text-white">Budget défini</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Vous avez une enveloppe budgétaire précise
                                </p>
                            </div>
                        </label>
                        
                        <div v-if="localFormData.budgetContext === 'defined'" class="ml-7 space-y-3">
                            <div class="flex items-center space-x-3">
                                <input 
                                    type="number"
                                    v-model="localFormData.budgetAmount"
                                    @input="updateFormData"
                                    placeholder="50000"
                                    min="1000"
                                    step="1000"
                                    class="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                <span class="text-sm text-gray-600 dark:text-gray-400">€ HT</span>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Flexibilité du budget
                                </label>
                                <select 
                                    v-model="localFormData.budgetFlexibility"
                                    @change="updateFormData"
                                    class="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Sélectionnez</option>
                                    <option value="strict">Budget strict (non négociable)</option>
                                    <option value="flexible">Budget flexible (+/- 20%)</option>
                                    <option value="indicative">Budget indicatif (ordre de grandeur)</option>
                                </select>
                            </div>
                        </div>
                        
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="budget-context"
                                value="undefined"
                                v-model="localFormData.budgetContext"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">Pas encore défini</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Le budget sera défini en fonction de l'estimation
                                </p>
                            </div>
                        </label>
                        
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="budget-context"
                                value="estimation-only"
                                v-model="localFormData.budgetContext"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">Estimation seulement</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Pour cadrer le besoin et évaluer la faisabilité
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Urgence du projet -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        ⏰ Urgence et priorité du projet
                    </h5>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Le projet est-il urgent / prioritaire pour l'entreprise ?
                    </label>
                    <div class="space-y-3">
                        <label v-for="urgency in urgencyLevels" :key="urgency.id" class="flex items-start">
                            <input 
                                type="radio" 
                                name="project-urgency"
                                :value="urgency.id"
                                v-model="localFormData.projectUrgency"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <div class="flex items-center">
                                    <span class="text-lg mr-2">{{ urgency.icon }}</span>
                                    <span class="font-medium text-gray-900 dark:text-white">{{ urgency.name }}</span>
                                    <span :class="getUrgencyClass(urgency.id)" 
                                          class="ml-2 px-2 py-0.5 text-xs rounded-full">
                                        {{ urgency.name }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ urgency.description }}</p>
                                <p v-if="urgency.impact" class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    💡 {{ urgency.impact }}
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Contraintes spécifiques -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        📋 Contraintes spécifiques (optionnel)
                    </h5>
                    <textarea 
                        v-model="localFormData.specificConstraints"
                        @input="updateFormData"
                        placeholder="Décrivez toute contrainte spécifique : réglementaire, technique, organisationnelle..."
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    ></textarea>
                </div>
            </div>

            <!-- Résumé des objectifs business -->
            <div v-if="hasObjectiveData" class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📝 Résumé des objectifs business :
                </h5>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <p v-if="localFormData.projectObjective">
                        <strong>Objectif :</strong> {{ getProjectObjectiveLabel() }}
                    </p>
                    <p v-if="localFormData.budgetContext">
                        <strong>Budget :</strong> {{ getBudgetContextLabel() }}
                    </p>
                    <p v-if="localFormData.projectUrgency">
                        <strong>Urgence :</strong> {{ getProjectUrgencyLabel() }}
                    </p>
                    <p v-if="localFormData.specificConstraints">
                        <strong>Contraintes :</strong> {{ localFormData.specificConstraints }}
                    </p>
                </div>
                
                <!-- Recommandations stratégiques -->
                <div class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p class="text-sm text-yellow-700 dark:text-yellow-300">
                        🎯 <strong>Recommandations :</strong> {{ getStrategicRecommendations() }}
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
                projectObjective: '',
                budgetContext: '',
                budgetAmount: null,
                budgetFlexibility: '',
                projectUrgency: '',
                specificConstraints: '',
                ...this.formData
            },
            projectObjectives: [
                {
                    id: 'mvp',
                    name: 'MVP pour tester un concept',
                    description: 'Version minimale pour valider l\'idée et le marché',
                    icon: '🧪',
                    impact: 'Rapide',
                    implications: 'Focus sur les fonctionnalités essentielles, qualité suffisante'
                },
                {
                    id: 'production-scale',
                    name: 'Projet destiné à la production à grande échelle',
                    description: 'Application robuste pour un usage intensif',
                    icon: '🏭',
                    impact: 'Qualité',
                    implications: 'Architecture scalable, tests approfondis, documentation complète'
                },
                {
                    id: 'demo',
                    name: 'Démonstrateur interne',
                    description: 'Prototype pour présentation ou validation interne',
                    icon: '🎨',
                    impact: 'Visuel',
                    implications: 'Focus sur l\'interface et l\'expérience utilisateur'
                },
                {
                    id: 'v1-production',
                    name: 'Version 1 en production',
                    description: 'Première version fonctionnelle pour les utilisateurs finaux',
                    icon: '🚀',
                    impact: 'Équilibré',
                    implications: 'Fonctionnalités complètes avec possibilité d\'évolution'
                }
            ],
            urgencyLevels: [
                {
                    id: 'high',
                    name: 'Oui - Très urgent',
                    description: 'Projet critique avec deadline serrée',
                    icon: '🔥',
                    impact: 'Peut nécessiter des ressources supplémentaires'
                },
                {
                    id: 'medium',
                    name: 'Moyen - Prioritaire',
                    description: 'Important mais avec une certaine flexibilité',
                    icon: '⚡',
                    impact: 'Planning standard avec quelques ajustements possibles'
                },
                {
                    id: 'low',
                    name: 'Non - Planning flexible',
                    description: 'Pas de contrainte de temps particulière',
                    icon: '🕐',
                    impact: 'Permet d\'optimiser les coûts et la qualité'
                }
            ]
        }
    },
    
    computed: {
        hasObjectiveData() {
            return this.localFormData.projectObjective ||
                   this.localFormData.budgetContext ||
                   this.localFormData.projectUrgency ||
                   this.localFormData.specificConstraints;
        }
    },
    
    methods: {
        updateFormData() {
            this.$emit('update:form-data', { ...this.localFormData });
        },
        
        getImpactClass(impact) {
            const classes = {
                'Rapide': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
                'Qualité': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
                'Visuel': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
                'Équilibré': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
            };
            return classes[impact] || '';
        },
        
        getUrgencyClass(urgencyId) {
            const classes = {
                'high': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
                'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
                'low': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
            };
            return classes[urgencyId] || '';
        },
        
        getProjectObjectiveLabel() {
            const objective = this.projectObjectives.find(o => o.id === this.localFormData.projectObjective);
            return objective ? objective.name : this.localFormData.projectObjective;
        },
        
        getBudgetContextLabel() {
            if (this.localFormData.budgetContext === 'defined') {
                let label = `Budget défini`;
                if (this.localFormData.budgetAmount) {
                    label += ` (${this.localFormData.budgetAmount.toLocaleString()}€ HT)`;
                }
                if (this.localFormData.budgetFlexibility) {
                    const flexLabels = {
                        'strict': 'strict',
                        'flexible': 'flexible',
                        'indicative': 'indicatif'
                    };
                    label += ` - ${flexLabels[this.localFormData.budgetFlexibility]}`;
                }
                return label;
            }
            
            const labels = {
                'undefined': 'Pas encore défini',
                'estimation-only': 'Estimation seulement'
            };
            return labels[this.localFormData.budgetContext] || this.localFormData.budgetContext;
        },
        
        getProjectUrgencyLabel() {
            const urgency = this.urgencyLevels.find(u => u.id === this.localFormData.projectUrgency);
            return urgency ? urgency.name : this.localFormData.projectUrgency;
        },
        
        getStrategicRecommendations() {
            const recommendations = [];
            
            if (this.localFormData.projectObjective === 'mvp') {
                recommendations.push('Prioriser le time-to-market sur la perfection technique');
            } else if (this.localFormData.projectObjective === 'production-scale') {
                recommendations.push('Investir dans une architecture robuste et des tests complets');
            }
            
            if (this.localFormData.projectUrgency === 'high') {
                recommendations.push('Prévoir des ressources supplémentaires pour respecter les délais');
            } else if (this.localFormData.projectUrgency === 'low') {
                recommendations.push('Opportunité d\'optimiser les coûts et la qualité');
            }
            
            if (this.localFormData.budgetContext === 'defined' && this.localFormData.budgetFlexibility === 'strict') {
                recommendations.push('Adapter le périmètre fonctionnel au budget disponible');
            }
            
            return recommendations.length > 0 ? recommendations.join(' • ') : 'Approche équilibrée recommandée';
        }
    },
    
    watch: {
        formData: {
            handler(newData) {
                this.localFormData = { 
                    projectObjective: '',
                    budgetContext: '',
                    budgetAmount: null,
                    budgetFlexibility: '',
                    projectUrgency: '',
                    specificConstraints: '',
                    ...this.localFormData, 
                    ...newData 
                };
            },
            deep: true
        }
    }
};
