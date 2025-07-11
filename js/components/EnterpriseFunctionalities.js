// EnterpriseFunctionalities.js - Section 3 : Fonctionnalités et périmètre fonctionnel
const EnterpriseFunctionalities = {
    template: `
        <div class="enterprise-functionalities bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center mb-6">
                <span class="text-purple-500 text-2xl mr-3">⚙️</span>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Section 3 : Fonctionnalités et périmètre fonctionnel
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Définissez les fonctionnalités et la complexité technique de votre projet
                    </p>
                </div>
            </div>

            <div class="space-y-8">
                <!-- Fonctionnalités principales -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        🔧 Fonctionnalités principales
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Sélectionnez toutes les fonctionnalités nécessaires pour votre projet
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-for="feature in enterpriseFeatures" :key="feature.id" 
                             class="feature-item p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <label class="flex items-start cursor-pointer">
                                <input 
                                    type="checkbox"
                                    :value="feature.id"
                                    v-model="localFormData.selectedFeatures"
                                    @change="updateFormData"
                                    class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                >
                                <div class="ml-3 flex-1">
                                    <div class="flex items-center">
                                        <span class="text-lg mr-2">{{ feature.icon }}</span>
                                        <span class="font-medium text-gray-900 dark:text-white">{{ feature.name }}</span>
                                        <span v-if="feature.complexity" 
                                              :class="getComplexityClass(feature.complexity)"
                                              class="ml-2 px-2 py-0.5 text-xs rounded-full">
                                            {{ feature.complexity }}
                                        </span>
                                    </div>
                                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ feature.description }}</p>
                                    <p v-if="feature.businessValue" class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                        💼 {{ feature.businessValue }}
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Phase 2 -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        🚀 Développement en phases
                    </h5>
                    <label class="flex items-center mb-4">
                        <input 
                            type="checkbox"
                            v-model="localFormData.hasPhase2"
                            @change="updateFormData"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        >
                        <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                            Y aura-t-il des fonctionnalités à développer dans une phase 2 ?
                        </span>
                    </label>
                    
                    <div v-if="localFormData.hasPhase2" class="ml-7 space-y-3">
                        <textarea 
                            v-model="localFormData.phase2Description"
                            @input="updateFormData"
                            placeholder="Décrivez les fonctionnalités prévues pour la phase 2..."
                            rows="3"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                        ></textarea>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Priorité de la phase 2
                            </label>
                            <select 
                                v-model="localFormData.phase2Priority"
                                @change="updateFormData"
                                class="w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Sélectionnez</option>
                                <option value="high">Haute - Indispensable</option>
                                <option value="medium">Moyenne - Importante</option>
                                <option value="low">Basse - Nice to have</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Scalabilité -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        📈 Scalabilité et montée en charge
                    </h5>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Le projet doit-il être scalable (prévu pour montée en charge) ?
                    </label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="scalability"
                                value="yes"
                                v-model="localFormData.scalability"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Oui, architecture scalable nécessaire
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="scalability"
                                value="no"
                                v-model="localFormData.scalability"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Non, volume d'usage limité
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="scalability"
                                value="unknown"
                                v-model="localFormData.scalability"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Pas encore déterminé
                            </span>
                        </label>
                    </div>
                    
                    <div v-if="localFormData.scalability === 'yes'" class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p class="text-sm text-blue-700 dark:text-blue-300">
                            💡 Une architecture scalable nécessite des choix techniques spécifiques (microservices, cache, CDN, etc.) 
                            qui impactent la complexité et les coûts de développement.
                        </p>
                    </div>
                </div>

                <!-- Degré de complexité -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        🎯 Degré de complexité fonctionnelle estimé
                    </h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label v-for="complexity in complexityLevels" :key="complexity.id" class="flex items-start">
                            <input 
                                type="radio" 
                                name="functional-complexity"
                                :value="complexity.id"
                                v-model="localFormData.functionalComplexity"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <div class="flex items-center">
                                    <span class="font-medium text-gray-900 dark:text-white">{{ complexity.label }}</span>
                                    <span :class="getComplexityClass(complexity.label)" 
                                          class="ml-2 px-2 py-0.5 text-xs rounded-full">
                                        {{ complexity.label }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ complexity.description }}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">{{ complexity.examples }}</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Résumé des fonctionnalités -->
            <div v-if="hasFunctionalityData" class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📝 Résumé du périmètre fonctionnel :
                </h5>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <div v-if="localFormData.selectedFeatures.length > 0">
                        <strong>Fonctionnalités ({{ localFormData.selectedFeatures.length }}) :</strong>
                        <div class="flex flex-wrap gap-2 mt-1">
                            <span v-for="featureId in localFormData.selectedFeatures" :key="featureId"
                                  class="inline-flex items-center px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full">
                                {{ getFeatureName(featureId) }}
                            </span>
                        </div>
                    </div>
                    <p v-if="localFormData.hasPhase2">
                        <strong>Phase 2 :</strong> {{ localFormData.phase2Priority ? getPriorityLabel() : 'Prévue' }}
                    </p>
                    <p v-if="localFormData.scalability">
                        <strong>Scalabilité :</strong> {{ getScalabilityLabel() }}
                    </p>
                    <p v-if="localFormData.functionalComplexity">
                        <strong>Complexité :</strong> {{ getFunctionalComplexityLabel() }}
                    </p>
                </div>
                
                <!-- Estimation de complexité globale -->
                <div class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p class="text-sm text-yellow-700 dark:text-yellow-300">
                        📊 <strong>Complexité globale estimée :</strong> {{ getOverallComplexity() }}
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
                selectedFeatures: [],
                hasPhase2: false,
                phase2Description: '',
                phase2Priority: '',
                scalability: '',
                functionalComplexity: '',
                ...this.formData
            },
            enterpriseFeatures: [
                {
                    id: 'auth-sso',
                    name: 'Authentification / SSO',
                    description: 'Système d\'authentification avec Single Sign-On',
                    icon: '🔐',
                    complexity: 'Modéré',
                    businessValue: 'Sécurité et expérience utilisateur'
                },
                {
                    id: 'dashboard',
                    name: 'Tableau de bord',
                    description: 'Interface de pilotage avec métriques et KPIs',
                    icon: '📊',
                    complexity: 'Modéré',
                    businessValue: 'Aide à la décision'
                },
                {
                    id: 'api-integration',
                    name: 'API à connecter ou créer',
                    description: 'Intégrations avec systèmes tiers ou création d\'APIs',
                    icon: '🔌',
                    complexity: 'Modéré',
                    businessValue: 'Interopérabilité'
                },
                {
                    id: 'ecommerce',
                    name: 'E-commerce',
                    description: 'Fonctionnalités de vente en ligne complètes',
                    icon: '🛒',
                    complexity: 'Complexe',
                    businessValue: 'Génération de revenus'
                },
                {
                    id: 'admin-crud',
                    name: 'Admin CRUD complet',
                    description: 'Interface d\'administration complète',
                    icon: '⚙️',
                    complexity: 'Modéré',
                    businessValue: 'Gestion opérationnelle'
                },
                {
                    id: 'notifications',
                    name: 'Notifications / emails transactionnels',
                    description: 'Système de notifications push et emails automatiques',
                    icon: '📧',
                    complexity: 'Modéré',
                    businessValue: 'Engagement utilisateur'
                },
                {
                    id: 'roles-permissions',
                    name: 'Gestion de rôles / permissions',
                    description: 'Système de droits d\'accès granulaire',
                    icon: '👥',
                    complexity: 'Complexe',
                    businessValue: 'Sécurité et gouvernance'
                },
                {
                    id: 'advanced-search',
                    name: 'Système de recherche avancée',
                    description: 'Moteur de recherche avec filtres et facettes',
                    icon: '🔍',
                    complexity: 'Modéré',
                    businessValue: 'Expérience utilisateur'
                },
                {
                    id: 'erp-crm',
                    name: 'Intégration avec ERP / CRM',
                    description: 'Connexion avec systèmes de gestion existants',
                    icon: '🏢',
                    complexity: 'Complexe',
                    businessValue: 'Efficacité opérationnelle'
                },
                {
                    id: 'multilingual',
                    name: 'Multilingue',
                    description: 'Support de plusieurs langues et localisations',
                    icon: '🌍',
                    complexity: 'Modéré',
                    businessValue: 'Expansion internationale'
                },
                {
                    id: 'automated-tests',
                    name: 'Tests automatisés / CI',
                    description: 'Pipeline de tests et intégration continue',
                    icon: '🧪',
                    complexity: 'Modéré',
                    businessValue: 'Qualité et fiabilité'
                },
                {
                    id: 'responsive',
                    name: 'Responsive mobile',
                    description: 'Adaptation complète pour appareils mobiles',
                    icon: '📱',
                    complexity: 'Simple',
                    businessValue: 'Accessibilité mobile'
                },
                {
                    id: 'gdpr-security',
                    name: 'RGPD / sécurité renforcée',
                    description: 'Conformité RGPD et mesures de sécurité avancées',
                    icon: '🛡️',
                    complexity: 'Complexe',
                    businessValue: 'Conformité légale'
                }
            ],
            complexityLevels: [
                {
                    id: 'basic',
                    label: 'Basique',
                    description: 'Logique métier simple, fonctionnalités standard',
                    examples: 'CRUD simple, peu de règles business'
                },
                {
                    id: 'moderate',
                    label: 'Modéré',
                    description: 'Logique métier modérée, quelques intégrations',
                    examples: 'Workflows simples, APIs tierces'
                },
                {
                    id: 'complex',
                    label: 'Complexe',
                    description: 'Logique métier forte, flux multi-utilisateurs',
                    examples: 'Règles business complexes, intégrations multiples'
                },
                {
                    id: 'very-complex',
                    label: 'Très complexe',
                    description: 'Architecture distribuée, traitement de données massives',
                    examples: 'Microservices, Big Data, IA/ML'
                }
            ]
        }
    },
    
    computed: {
        hasFunctionalityData() {
            return this.localFormData.selectedFeatures.length > 0 ||
                   this.localFormData.hasPhase2 ||
                   this.localFormData.scalability ||
                   this.localFormData.functionalComplexity;
        }
    },
    
    methods: {
        updateFormData() {
            this.$emit('update:form-data', { ...this.localFormData });
        },
        
        getComplexityClass(complexity) {
            const classes = {
                'Simple': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
                'Basique': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
                'Modéré': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
                'Complexe': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
                'Très complexe': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
            };
            return classes[complexity] || '';
        },
        
        getFeatureName(featureId) {
            const feature = this.enterpriseFeatures.find(f => f.id === featureId);
            return feature ? feature.name : featureId;
        },
        
        getPriorityLabel() {
            const labels = {
                'high': 'Priorité haute',
                'medium': 'Priorité moyenne',
                'low': 'Priorité basse'
            };
            return labels[this.localFormData.phase2Priority] || this.localFormData.phase2Priority;
        },
        
        getScalabilityLabel() {
            const labels = {
                'yes': 'Architecture scalable requise',
                'no': 'Volume limité',
                'unknown': 'Non déterminé'
            };
            return labels[this.localFormData.scalability] || this.localFormData.scalability;
        },
        
        getFunctionalComplexityLabel() {
            const complexity = this.complexityLevels.find(c => c.id === this.localFormData.functionalComplexity);
            return complexity ? complexity.label : this.localFormData.functionalComplexity;
        },
        
        getOverallComplexity() {
            const selectedFeatures = this.enterpriseFeatures.filter(f => 
                this.localFormData.selectedFeatures.includes(f.id)
            );
            
            const complexityScores = {
                'Simple': 1,
                'Modéré': 2,
                'Complexe': 3
            };
            
            let totalScore = 0;
            let count = selectedFeatures.length;
            
            selectedFeatures.forEach(f => {
                totalScore += complexityScores[f.complexity] || 2;
            });
            
            // Ajuster selon la complexité fonctionnelle
            if (this.localFormData.functionalComplexity) {
                const functionalScore = {
                    'basic': 1,
                    'moderate': 2,
                    'complex': 3,
                    'very-complex': 4
                }[this.localFormData.functionalComplexity] || 2;
                
                totalScore += functionalScore;
                count++;
            }
            
            // Ajuster selon la scalabilité
            if (this.localFormData.scalability === 'yes') {
                totalScore += 1;
            }
            
            if (count === 0) return 'Non évaluée';
            
            const avgScore = totalScore / count;
            if (avgScore <= 1.5) return 'Simple';
            if (avgScore <= 2.5) return 'Modérée';
            if (avgScore <= 3.5) return 'Complexe';
            return 'Très complexe';
        }
    },
    
    watch: {
        formData: {
            handler(newData) {
                this.localFormData = { 
                    selectedFeatures: [],
                    hasPhase2: false,
                    phase2Description: '',
                    phase2Priority: '',
                    scalability: '',
                    functionalComplexity: '',
                    ...this.localFormData, 
                    ...newData 
                };
            },
            deep: true
        }
    }
};
