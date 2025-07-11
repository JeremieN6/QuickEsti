// EnterpriseBasics.js - Section 1 : Informations de base entreprise
const EnterpriseBasics = {
    template: `
        <div class="enterprise-basics bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center mb-6">
                <span class="text-blue-500 text-2xl mr-3">🏢</span>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Section 1 : Informations de base du projet
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Décrivez les caractéristiques principales de votre projet d'entreprise
                    </p>
                </div>
            </div>

            <div class="space-y-6">
                <!-- Type de projet -->
                <div>
                    <label for="enterprise-project-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type de projet *
                    </label>
                    <select 
                        id="enterprise-project-type"
                        v-model="localFormData.projectType"
                        @change="updateFormData"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Sélectionnez un type</option>
                        <option value="site-vitrine">Site vitrine</option>
                        <option value="e-commerce">E-commerce</option>
                        <option value="saas">SaaS</option>
                        <option value="portail-b2b">Portail B2B</option>
                        <option value="app-mobile">Application mobile</option>
                        <option value="back-office">Back-office</option>
                        <option value="api">API / Microservices</option>
                        <option value="intranet">Intranet / Portail interne</option>
                        <option value="autre">Autre</option>
                    </select>
                    
                    <!-- Champ texte pour "Autre" -->
                    <div v-if="localFormData.projectType === 'autre'" class="mt-3">
                        <input 
                            type="text"
                            v-model="localFormData.customProjectType"
                            @input="updateFormData"
                            placeholder="Décrivez votre type de projet"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                    </div>
                </div>

                <!-- Projet existant ou nouveau -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Nature du projet *
                    </label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="existing-project"
                                :value="false"
                                v-model="localFormData.isExistingProject"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Projet from scratch (nouveau développement)
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="existing-project"
                                :value="true"
                                v-model="localFormData.isExistingProject"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Projet existant à améliorer / refactorer
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Technologies -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Technologies imposées ou recommandées
                    </label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="frontend-tech" class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Frontend
                            </label>
                            <input 
                                type="text"
                                id="frontend-tech"
                                v-model="localFormData.technologies.frontend"
                                @input="updateFormData"
                                placeholder="React, Vue.js, Angular..."
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                        </div>
                        <div>
                            <label for="backend-tech" class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Backend
                            </label>
                            <input 
                                type="text"
                                id="backend-tech"
                                v-model="localFormData.technologies.backend"
                                @input="updateFormData"
                                placeholder="Node.js, PHP, Python, Java..."
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                        </div>
                        <div>
                            <label for="database-tech" class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Base de données
                            </label>
                            <input 
                                type="text"
                                id="database-tech"
                                v-model="localFormData.technologies.database"
                                @input="updateFormData"
                                placeholder="PostgreSQL, MySQL, MongoDB..."
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                        </div>
                        <div>
                            <label for="infrastructure-tech" class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Infrastructure
                            </label>
                            <input 
                                type="text"
                                id="infrastructure-tech"
                                v-model="localFormData.technologies.infrastructure"
                                @input="updateFormData"
                                placeholder="AWS, Docker, Kubernetes..."
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                        </div>
                    </div>
                </div>

                <!-- Nombre de pages/écrans -->
                <div>
                    <label for="page-count" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre de pages ou écrans *
                    </label>
                    <select 
                        id="page-count"
                        v-model="localFormData.pageCount"
                        @change="updateFormData"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Sélectionnez une fourchette</option>
                        <option value="1-5">1 à 5 pages</option>
                        <option value="6-10">6 à 10 pages</option>
                        <option value="11-20">11 à 20 pages</option>
                        <option value="21-50">21 à 50 pages</option>
                        <option value="50+">Plus de 50 pages</option>
                    </select>
                </div>

                <!-- Deadline -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Deadline du projet
                    </label>
                    <div class="space-y-3">
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="deadline-type"
                                value="duration"
                                v-model="localFormData.deadlineType"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Durée imposée
                            </span>
                        </label>
                        <div v-if="localFormData.deadlineType === 'duration'" class="ml-6 flex items-center space-x-3">
                            <input 
                                type="number"
                                v-model="localFormData.deadlineDuration"
                                @input="updateFormData"
                                placeholder="12"
                                min="1"
                                class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                            <select 
                                v-model="localFormData.deadlineUnit"
                                @change="updateFormData"
                                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="semaines">semaines</option>
                                <option value="mois">mois</option>
                            </select>
                        </div>
                        
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="deadline-type"
                                value="date"
                                v-model="localFormData.deadlineType"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Date limite imposée
                            </span>
                        </label>
                        <div v-if="localFormData.deadlineType === 'date'" class="ml-6">
                            <input 
                                type="date"
                                v-model="localFormData.deadlineDate"
                                @input="updateFormData"
                                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                        </div>
                        
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="deadline-type"
                                value="flexible"
                                v-model="localFormData.deadlineType"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Pas de contrainte de temps particulière
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Raison du chiffrage -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Pourquoi souhaitez-vous chiffrer ce projet ? *
                    </label>
                    <div class="space-y-2">
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="pricing-reason"
                                value="client-billing"
                                v-model="localFormData.pricingReason"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">🧑‍💻 Pour le facturer à un client</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Vous êtes une agence ou prestataire qui va facturer ce projet
                                </p>
                            </div>
                        </label>
                        
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="pricing-reason"
                                value="internal-budget"
                                v-model="localFormData.pricingReason"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">🚀 Pour budgéter un projet interne</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Projet interne de votre entreprise ou startup
                                </p>
                            </div>
                        </label>
                        
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="pricing-reason"
                                value="roadmap-priority"
                                v-model="localFormData.pricingReason"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">🏢 Pour prioriser dans une roadmap</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Arbitrage entre plusieurs projets IT ou produit
                                </p>
                            </div>
                        </label>
                        
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="pricing-reason"
                                value="feasibility"
                                v-model="localFormData.pricingReason"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">📈 Pour évaluer la faisabilité</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Étude de faisabilité technique et financière
                                </p>
                            </div>
                        </label>
                        
                        <label class="flex items-start">
                            <input 
                                type="radio" 
                                name="pricing-reason"
                                value="other"
                                v-model="localFormData.pricingReason"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <span class="font-medium text-gray-900 dark:text-white">❓ Autre raison</span>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Précisez votre contexte spécifique
                                </p>
                            </div>
                        </label>
                    </div>
                    
                    <!-- Champ texte pour "Autre" -->
                    <div v-if="localFormData.pricingReason === 'other'" class="mt-3">
                        <textarea 
                            v-model="localFormData.customPricingReason"
                            @input="updateFormData"
                            placeholder="Décrivez votre contexte et objectif pour ce chiffrage..."
                            rows="3"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                        ></textarea>
                    </div>
                </div>
            </div>

            <!-- Résumé des données saisies -->
            <div v-if="hasData" class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📝 Résumé des informations saisies :
                </h5>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p v-if="localFormData.projectType">
                        <strong>Type :</strong> {{ getProjectTypeLabel() }}
                    </p>
                    <p v-if="localFormData.isExistingProject !== null">
                        <strong>Nature :</strong> {{ localFormData.isExistingProject ? 'Projet existant' : 'Nouveau projet' }}
                    </p>
                    <p v-if="localFormData.pageCount">
                        <strong>Pages :</strong> {{ localFormData.pageCount }}
                    </p>
                    <p v-if="hasTechnologies">
                        <strong>Technologies :</strong> {{ getTechnologiesSummary() }}
                    </p>
                    <p v-if="localFormData.deadlineType && localFormData.deadlineType !== 'flexible'">
                        <strong>Deadline :</strong> {{ getDeadlineSummary() }}
                    </p>
                    <p v-if="localFormData.pricingReason">
                        <strong>Objectif :</strong> {{ getPricingReasonLabel() }}
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
                projectType: '',
                customProjectType: '',
                isExistingProject: null,
                technologies: {
                    frontend: '',
                    backend: '',
                    database: '',
                    infrastructure: ''
                },
                pageCount: '',
                deadlineType: '',
                deadlineDuration: null,
                deadlineUnit: 'semaines',
                deadlineDate: '',
                pricingReason: '',
                customPricingReason: '',
                ...this.formData
            }
        }
    },
    
    computed: {
        hasData() {
            return this.localFormData.projectType || 
                   this.localFormData.pageCount || 
                   this.hasTechnologies ||
                   this.localFormData.isExistingProject !== null ||
                   this.localFormData.deadlineType ||
                   this.localFormData.pricingReason;
        },
        
        hasTechnologies() {
            const tech = this.localFormData.technologies;
            return tech.frontend || tech.backend || tech.database || tech.infrastructure;
        }
    },
    
    methods: {
        updateFormData() {
            this.$emit('update:form-data', { ...this.localFormData });
        },
        
        getProjectTypeLabel() {
            const types = {
                'site-vitrine': 'Site vitrine',
                'e-commerce': 'E-commerce',
                'saas': 'SaaS',
                'portail-b2b': 'Portail B2B',
                'app-mobile': 'Application mobile',
                'back-office': 'Back-office',
                'api': 'API / Microservices',
                'intranet': 'Intranet / Portail interne',
                'autre': this.localFormData.customProjectType || 'Autre'
            };
            return types[this.localFormData.projectType] || this.localFormData.projectType;
        },
        
        getTechnologiesSummary() {
            const tech = this.localFormData.technologies;
            const parts = [];
            if (tech.frontend) parts.push(`Front: ${tech.frontend}`);
            if (tech.backend) parts.push(`Back: ${tech.backend}`);
            if (tech.database) parts.push(`DB: ${tech.database}`);
            if (tech.infrastructure) parts.push(`Infra: ${tech.infrastructure}`);
            return parts.join(' | ');
        },
        
        getDeadlineSummary() {
            if (this.localFormData.deadlineType === 'duration') {
                return `${this.localFormData.deadlineDuration} ${this.localFormData.deadlineUnit}`;
            } else if (this.localFormData.deadlineType === 'date') {
                return `Avant le ${this.localFormData.deadlineDate}`;
            }
            return '';
        },
        
        getPricingReasonLabel() {
            const reasons = {
                'client-billing': 'Facturation client',
                'internal-budget': 'Budget interne',
                'roadmap-priority': 'Priorisation roadmap',
                'feasibility': 'Étude de faisabilité',
                'other': this.localFormData.customPricingReason || 'Autre'
            };
            return reasons[this.localFormData.pricingReason] || this.localFormData.pricingReason;
        }
    },
    
    watch: {
        formData: {
            handler(newData) {
                this.localFormData = { 
                    projectType: '',
                    customProjectType: '',
                    isExistingProject: null,
                    technologies: {
                        frontend: '',
                        backend: '',
                        database: '',
                        infrastructure: ''
                    },
                    pageCount: '',
                    deadlineType: '',
                    deadlineDuration: null,
                    deadlineUnit: 'semaines',
                    deadlineDate: '',
                    pricingReason: '',
                    customPricingReason: '',
                    ...this.localFormData, 
                    ...newData 
                };
            },
            deep: true
        }
    }
};
