// EnterpriseDeliverables.js - Section 4 : Livrables attendus & périmètre
const EnterpriseDeliverables = {
    template: `
        <div class="enterprise-deliverables bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center mb-6">
                <span class="text-green-500 text-2xl mr-3">📦</span>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Section 4 : Livrables attendus & périmètre
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Définissez ce qui est inclus dans le projet et les responsabilités
                    </p>
                </div>
            </div>

            <div class="space-y-8">
                <!-- Gestion UI/UX -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        🎨 Gestion de l'UI/UX
                    </h5>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Qui gère l'UI/UX du projet ?
                    </label>
                    <div class="space-y-3">
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="ui-ux-management"
                                value="internal"
                                v-model="localFormData.uiUxManagement"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">Géré en interne</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Votre équipe design s'occupe de l'UI/UX
                                </p>
                            </div>
                        </label>
                        
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="ui-ux-management"
                                value="external"
                                v-model="localFormData.uiUxManagement"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">Prestataire externe</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Agence ou freelance design externe
                                </p>
                            </div>
                        </label>
                        
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="ui-ux-management"
                                value="included"
                                v-model="localFormData.uiUxManagement"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">À inclure dans le chiffrage</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    L'équipe de développement gère aussi l'UI/UX
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Maquettes et spécifications -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        📋 Maquettes et spécifications
                    </h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Maquettes ou wireframes
                            </label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="mockups"
                                        value="available"
                                        v-model="localFormData.mockupsStatus"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Déjà disponibles
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="mockups"
                                        value="partial"
                                        v-model="localFormData.mockupsStatus"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Partiellement disponibles
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="mockups"
                                        value="none"
                                        v-model="localFormData.mockupsStatus"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Aucune maquette
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Spécifications fonctionnelles
                            </label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="specs"
                                        value="detailed"
                                        v-model="localFormData.specsStatus"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Spécifications détaillées prêtes
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="specs"
                                        value="basic"
                                        v-model="localFormData.specsStatus"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Cahier des charges basique
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="specs"
                                        value="none"
                                        v-model="localFormData.specsStatus"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Spécifications à définir
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Communication avec le client final -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        💬 Communication projet
                    </h5>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Des réunions régulières sont-elles prévues avec le client final ?
                    </label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="client-meetings"
                                value="frequent"
                                v-model="localFormData.clientMeetings"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Oui, suivi régulier prévu (hebdomadaire/bi-hebdomadaire)
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="client-meetings"
                                value="milestone"
                                v-model="localFormData.clientMeetings"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Points d'étape uniquement (jalons projet)
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="client-meetings"
                                value="minimal"
                                v-model="localFormData.clientMeetings"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Communication minimale (début/fin de projet)
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Services techniques inclus -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        🚀 Services techniques inclus
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Sélectionnez les services à inclure dans le projet
                    </p>
                    <div class="space-y-3">
                        <label v-for="service in technicalServices" :key="service.id" class="flex items-start">
                            <input 
                                type="checkbox"
                                :value="service.id"
                                v-model="localFormData.includedServices"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <div class="flex items-center">
                                    <span class="text-lg mr-2">{{ service.icon }}</span>
                                    <span class="font-medium text-gray-900 dark:text-white">{{ service.name }}</span>
                                    <span v-if="service.complexity" 
                                          :class="getComplexityClass(service.complexity)"
                                          class="ml-2 px-2 py-0.5 text-xs rounded-full">
                                        {{ service.complexity }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ service.description }}</p>
                                <p v-if="service.impact" class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    💡 {{ service.impact }}
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Résumé des livrables -->
            <div v-if="hasDeliverableData" class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📝 Résumé des livrables et périmètre :
                </h5>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <p v-if="localFormData.uiUxManagement">
                        <strong>UI/UX :</strong> {{ getUiUxLabel() }}
                    </p>
                    <p v-if="localFormData.mockupsStatus">
                        <strong>Maquettes :</strong> {{ getMockupsLabel() }}
                    </p>
                    <p v-if="localFormData.specsStatus">
                        <strong>Spécifications :</strong> {{ getSpecsLabel() }}
                    </p>
                    <p v-if="localFormData.clientMeetings">
                        <strong>Communication :</strong> {{ getClientMeetingsLabel() }}
                    </p>
                    <div v-if="localFormData.includedServices.length > 0">
                        <strong>Services inclus ({{ localFormData.includedServices.length }}) :</strong>
                        <div class="flex flex-wrap gap-2 mt-1">
                            <span v-for="serviceId in localFormData.includedServices" :key="serviceId"
                                  class="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">
                                {{ getServiceName(serviceId) }}
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Impact sur la complexité -->
                <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                        📊 <strong>Impact sur le projet :</strong> {{ getProjectImpact() }}
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
                uiUxManagement: '',
                mockupsStatus: '',
                specsStatus: '',
                clientMeetings: '',
                includedServices: [],
                ...this.formData
            },
            technicalServices: [
                {
                    id: 'deployment-only',
                    name: 'Déploiement uniquement',
                    description: 'Mise en production sur l\'environnement cible',
                    icon: '🚀',
                    complexity: 'Simple',
                    impact: 'Livraison opérationnelle'
                },
                {
                    id: 'deployment-cicd',
                    name: 'Déploiement & CI/CD',
                    description: 'Pipeline d\'intégration et déploiement continu',
                    icon: '🔄',
                    complexity: 'Modéré',
                    impact: 'Automatisation des livraisons'
                },
                {
                    id: 'monitoring',
                    name: 'Monitoring (Sentry, Datadog...)',
                    description: 'Surveillance applicative et infrastructure',
                    icon: '📊',
                    complexity: 'Modéré',
                    impact: 'Observabilité et détection d\'incidents'
                },
                {
                    id: 'maintenance',
                    name: 'Maintenance évolutive',
                    description: 'Support technique et évolutions post-livraison',
                    icon: '🔧',
                    complexity: 'Simple',
                    impact: 'Pérennité du projet'
                },
                {
                    id: 'sla-support',
                    name: 'SLA ou support après mise en prod',
                    description: 'Engagement de niveau de service et support',
                    icon: '🛡️',
                    complexity: 'Modéré',
                    impact: 'Garantie de disponibilité'
                }
            ]
        }
    },
    
    computed: {
        hasDeliverableData() {
            return this.localFormData.uiUxManagement ||
                   this.localFormData.mockupsStatus ||
                   this.localFormData.specsStatus ||
                   this.localFormData.clientMeetings ||
                   this.localFormData.includedServices.length > 0;
        }
    },
    
    methods: {
        updateFormData() {
            this.$emit('update:form-data', { ...this.localFormData });
        },
        
        getComplexityClass(complexity) {
            const classes = {
                'Simple': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
                'Modéré': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
                'Complexe': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
            };
            return classes[complexity] || '';
        },
        
        getUiUxLabel() {
            const labels = {
                'internal': 'Géré en interne',
                'external': 'Prestataire externe',
                'included': 'Inclus dans le chiffrage'
            };
            return labels[this.localFormData.uiUxManagement] || this.localFormData.uiUxManagement;
        },
        
        getMockupsLabel() {
            const labels = {
                'available': 'Déjà disponibles',
                'partial': 'Partiellement disponibles',
                'none': 'Aucune maquette'
            };
            return labels[this.localFormData.mockupsStatus] || this.localFormData.mockupsStatus;
        },
        
        getSpecsLabel() {
            const labels = {
                'detailed': 'Spécifications détaillées prêtes',
                'basic': 'Cahier des charges basique',
                'none': 'Spécifications à définir'
            };
            return labels[this.localFormData.specsStatus] || this.localFormData.specsStatus;
        },
        
        getClientMeetingsLabel() {
            const labels = {
                'frequent': 'Suivi régulier',
                'milestone': 'Points d\'étape',
                'minimal': 'Communication minimale'
            };
            return labels[this.localFormData.clientMeetings] || this.localFormData.clientMeetings;
        },
        
        getServiceName(serviceId) {
            const service = this.technicalServices.find(s => s.id === serviceId);
            return service ? service.name : serviceId;
        },
        
        getProjectImpact() {
            let impact = [];
            
            if (this.localFormData.uiUxManagement === 'included') {
                impact.push('UI/UX à prévoir dans l\'estimation');
            }
            
            if (this.localFormData.mockupsStatus === 'none') {
                impact.push('Temps supplémentaire pour la conception');
            }
            
            if (this.localFormData.specsStatus === 'none') {
                impact.push('Phase d\'analyse fonctionnelle nécessaire');
            }
            
            if (this.localFormData.clientMeetings === 'frequent') {
                impact.push('Temps de communication à intégrer');
            }
            
            if (this.localFormData.includedServices.length > 2) {
                impact.push('Périmètre technique étendu');
            }
            
            return impact.length > 0 ? impact.join(' • ') : 'Périmètre standard';
        }
    },
    
    watch: {
        formData: {
            handler(newData) {
                this.localFormData = { 
                    uiUxManagement: '',
                    mockupsStatus: '',
                    specsStatus: '',
                    clientMeetings: '',
                    includedServices: [],
                    ...this.localFormData, 
                    ...newData 
                };
            },
            deep: true
        }
    }
};
