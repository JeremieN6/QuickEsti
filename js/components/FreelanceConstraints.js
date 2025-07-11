// FreelanceConstraints.js - Section 2 : Contraintes du freelance
const FreelanceConstraints = {
    template: `
        <div class="freelance-constraints bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
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

            <div class="space-y-8">
                <!-- Niveau de compétence par technologie -->
                <div v-if="technologies.length > 0">
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        🎯 Niveau de compétence par technologie
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Évaluez votre niveau sur chaque technologie mentionnée dans la section précédente
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-for="tech in technologies" :key="tech" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
                                <tooltip
                                    title="TJM (Taux Journalier Moyen)"
                                    content="Le TJM est le prix que vous facturez par jour de travail. Il dépend de votre expérience, vos compétences et votre marché."
                                    example="Un développeur React senior : 600-800€/jour"
                                    position="top"
                                ></tooltip>
                            </label>

                            <div v-if="localFormData.hasTjmTarget" class="ml-7 flex items-center space-x-3">
                                <input
                                    type="number"
                                    v-model="localFormData.tjmTarget"
                                    @input="updateFormData"
                                    placeholder="500"
                                    min="100"
                                    max="2000"
                                    step="50"
                                    class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                <span class="text-sm text-gray-600 dark:text-gray-400">€ HT / jour</span>
                                <a href="https://sassify.fr/calculateur-de-tjm/calculateur" target="_blank" class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
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
                        <tooltip
                            title="Marge de sécurité"
                            content="Pourcentage ajouté à votre estimation pour gérer les imprévus, changements de scope et risques projet."
                            example="15-25% pour un projet classique, 30-40% pour un projet complexe"
                            position="top"
                        ></tooltip>
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
            </div>

            <!-- Résumé des contraintes -->
            <div v-if="hasConstraintData" class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📝 Résumé de vos contraintes :
                </h5>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p v-if="localFormData.isFullTime !== null">
                        <strong>Disponibilité :</strong> {{ localFormData.isFullTime ? 'Temps plein' : 'Temps partiel' }}
                    </p>
                    <p v-if="localFormData.hasTjmTarget && localFormData.tjmTarget">
                        <strong>TJM cible :</strong> {{ localFormData.tjmTarget }}€ HT/jour
                    </p>
                    <p v-if="localFormData.securityMargin">
                        <strong>Marge de sécurité :</strong> {{ localFormData.securityMargin }}%
                    </p>
                    <p v-if="skillLevelsCount > 0">
                        <strong>Compétences :</strong> {{ skillLevelsCount }} technologie(s) évaluée(s)
                    </p>
                </div>
            </div>
        </div>
    `,
    
    props: {
        formData: {
            type: Object,
            default: () => ({})
        },
        technologies: {
            type: Array,
            default: () => []
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
                securityMargin: '',
                ...this.formData
            }
        }
    },
    
    computed: {
        hasConstraintData() {
            return this.localFormData.isFullTime !== null ||
                   (this.localFormData.hasTjmTarget && this.localFormData.tjmTarget) ||
                   this.localFormData.securityMargin ||
                   this.skillLevelsCount > 0;
        },
        
        skillLevelsCount() {
            return Object.values(this.localFormData.skillLevels).filter(level => level).length;
        }
    },
    
    methods: {
        updateFormData() {
            this.$emit('update:form-data', { ...this.localFormData });
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
            handler(newTechs) {
                // Initialiser les niveaux de compétence pour les nouvelles technologies
                newTechs.forEach(tech => {
                    if (!this.localFormData.skillLevels[tech]) {
                        this.localFormData.skillLevels[tech] = '';
                    }
                });
                this.updateFormData();
            },
            immediate: true
        }
    }
};
