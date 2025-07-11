// FreelanceBasics.js - Section des informations de base pour les freelances
const FreelanceBasics = {
    template: `
        <div class="freelance-basics bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center mb-6">
                <span class="text-blue-500 text-2xl mr-3">📋</span>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Section 1 : Informations de base
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Décrivez les caractéristiques principales de votre projet
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Type de projet -->
                <div>
                    <label for="project-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type de projet *
                    </label>
                    <select 
                        id="project-type"
                        v-model="localFormData.projectType"
                        @change="updateFormData"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Sélectionnez un type</option>
                        <option value="site-vitrine">Site vitrine</option>
                        <option value="saas">SaaS</option>
                        <option value="e-commerce">E-commerce</option>
                        <option value="api">API</option>
                        <option value="app-mobile">App mobile</option>
                        <option value="dashboard">Dashboard</option>
                        <option value="autre">Autre</option>
                    </select>
                    
                    <!-- Champ texte pour "Autre" -->
                    <div v-if="localFormData.projectType === 'autre'" class="mt-3">
                        <input 
                            type="text"
                            v-model="localFormData.customProjectType"
                            @input="updateFormData"
                            placeholder="Décrivez brièvement votre type de projet"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                    </div>
                </div>

                <!-- Nombre de pages -->
                <div>
                    <label for="page-count" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre de pages / écrans *
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

                <!-- Technologies -->
                <div>
                    <label for="technologies" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Technologies à utiliser
                    </label>
                    <textarea 
                        id="technologies"
                        v-model="localFormData.technologies"
                        @input="updateFormData"
                        placeholder="Ex: React, Node.js, PostgreSQL, AWS..."
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    ></textarea>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Listez les technologies imposées ou que vous comptez utiliser
                    </p>
                </div>

                <!-- Projet existant ou nouveau -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Le projet est-il existant ?
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
                                Nouveau projet (from scratch)
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
                                Projet existant à améliorer
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Deadline -->
                <div class="md:col-span-2">
                    <label for="deadline" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deadline (optionnel)
                    </label>
                    <div class="flex items-center space-x-4">
                        <input 
                            type="number"
                            id="deadline"
                            v-model="localFormData.deadlineDays"
                            @input="updateFormData"
                            placeholder="30"
                            min="1"
                            class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                        <span class="text-sm text-gray-600 dark:text-gray-400">jours pour réaliser le projet</span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Si vous avez une contrainte de temps, indiquez le nombre de jours disponibles
                    </p>
                </div>
            </div>

            <!-- Résumé des données saisies -->
            <div v-if="hasData" class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    📝 Résumé des informations saisies :
                </h5>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p v-if="localFormData.projectType">
                        <strong>Type :</strong> {{ getProjectTypeLabel() }}
                    </p>
                    <p v-if="localFormData.pageCount">
                        <strong>Pages :</strong> {{ localFormData.pageCount }}
                    </p>
                    <p v-if="localFormData.technologies">
                        <strong>Technologies :</strong> {{ localFormData.technologies }}
                    </p>
                    <p v-if="localFormData.isExistingProject !== null">
                        <strong>Projet :</strong> {{ localFormData.isExistingProject ? 'Existant' : 'Nouveau' }}
                    </p>
                    <p v-if="localFormData.deadlineDays">
                        <strong>Deadline :</strong> {{ localFormData.deadlineDays }} jours
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
                pageCount: '',
                technologies: '',
                isExistingProject: null,
                deadlineDays: null,
                ...this.formData
            }
        }
    },
    
    computed: {
        hasData() {
            return this.localFormData.projectType || 
                   this.localFormData.pageCount || 
                   this.localFormData.technologies ||
                   this.localFormData.isExistingProject !== null ||
                   this.localFormData.deadlineDays;
        }
    },
    
    methods: {
        updateFormData() {
            this.$emit('update:form-data', { ...this.localFormData });
        },
        
        getProjectTypeLabel() {
            const types = {
                'site-vitrine': 'Site vitrine',
                'saas': 'SaaS',
                'e-commerce': 'E-commerce',
                'api': 'API',
                'app-mobile': 'App mobile',
                'dashboard': 'Dashboard',
                'autre': this.localFormData.customProjectType || 'Autre'
            };
            return types[this.localFormData.projectType] || this.localFormData.projectType;
        }
    },
    
    watch: {
        formData: {
            handler(newData) {
                this.localFormData = { ...this.localFormData, ...newData };
            },
            deep: true
        }
    }
};
