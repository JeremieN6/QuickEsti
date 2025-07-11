// EstimationForm.js - Composant principal de l'application d'estimation
const EstimationForm = {
    template: `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <!-- Header du formulaire -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Formulaire d'estimation de projet
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Remplissez les informations ci-dessous pour obtenir une estimation personnalisée
                </p>
            </div>

            <!-- Contenu du formulaire -->
            <div class="p-6">
                <!-- Sélecteur de type d'utilisateur -->
                <user-type-selector 
                    :selected-type="selectedUserType"
                    @update:selected-type="updateUserType"
                ></user-type-selector>

                <!-- Sections conditionnelles selon le type d'utilisateur -->
                <div v-if="selectedUserType" class="mt-8">
                    <!-- Section pour Freelance -->
                    <div v-if="selectedUserType === 'freelance'" class="space-y-6">
                        <!-- Section 1 : Informations de base -->
                        <freelance-basics
                            :form-data="freelanceData.basics"
                            @update:form-data="updateFreelanceBasics"
                        ></freelance-basics>

                        <!-- Section 2 : Contraintes du freelance -->
                        <freelance-constraints
                            :form-data="freelanceData.constraints"
                            :technologies="extractedTechnologies"
                            @update:form-data="updateFreelanceConstraints"
                        ></freelance-constraints>

                        <!-- Section 3 : Fonctionnalités additionnelles -->
                        <freelance-features
                            :form-data="freelanceData.features"
                            @update:form-data="updateFreelanceFeatures"
                        ></freelance-features>

                        <!-- Section 4 : Livrables & périmètre -->
                        <freelance-deliverables
                            :form-data="freelanceData.deliverables"
                            @update:form-data="updateFreelanceDeliverables"
                        ></freelance-deliverables>

                        <!-- Section 5 : Objectifs personnels -->
                        <freelance-objectives
                            :form-data="freelanceData.objectives"
                            @update:form-data="updateFreelanceObjectives"
                        ></freelance-objectives>
                    </div>

                    <!-- Section pour Entreprise -->
                    <div v-if="selectedUserType === 'entreprise'" class="space-y-6">
                        <!-- Section 1 : Informations de base -->
                        <enterprise-basics
                            :form-data="entrepriseData.basics"
                            @update:form-data="updateEnterpriseBasics"
                        ></enterprise-basics>

                        <!-- Section 2 : Structure & organisation -->
                        <enterprise-structure
                            :form-data="entrepriseData.structure"
                            @update:form-data="updateEnterpriseStructure"
                        ></enterprise-structure>

                        <!-- Section 3 : Fonctionnalités et périmètre fonctionnel -->
                        <enterprise-functionalities
                            :form-data="entrepriseData.functionalities"
                            @update:form-data="updateEnterpriseFunctionalities"
                        ></enterprise-functionalities>

                        <!-- Section 4 : Livrables attendus & périmètre -->
                        <enterprise-deliverables
                            :form-data="entrepriseData.deliverables"
                            @update:form-data="updateEnterpriseDeliverables"
                        ></enterprise-deliverables>

                        <!-- Section 5 : Objectifs business -->
                        <enterprise-objectives
                            :form-data="entrepriseData.objectives"
                            @update:form-data="updateEnterpriseObjectives"
                        ></enterprise-objectives>

                        <!-- Section 6 : Coûts et tarification -->
                        <enterprise-pricing
                            :form-data="entrepriseData.pricing"
                            @update:form-data="updateEnterprisePricing"
                        ></enterprise-pricing>
                    </div>
                </div>

                <!-- Message d'invitation si aucun type sélectionné -->
                <div v-if="!selectedUserType" class="mt-8 text-center py-12">
                    <div class="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                        👆
                    </div>
                    <p class="text-gray-600 dark:text-gray-400">
                        Sélectionnez votre profil ci-dessus pour commencer l'estimation
                    </p>
                </div>

                <!-- Barre de progression -->
                <div v-if="selectedUserType" class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Progression du formulaire
                            </span>
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                                {{ completionPercentage }}%
                            </span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div
                                class="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                                :style="{ width: completionPercentage + '%' }"
                            ></div>
                        </div>
                    </div>

                    <!-- Bouton d'action -->
                    <div class="flex justify-center">
                        <button
                            type="button"
                            class="px-6 py-3 bg-gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center space-x-2"
                            :disabled="!canSubmit || isGenerating"
                            @click="generateEstimation"
                        >
                            <span v-if="isGenerating" class="animate-spin">⏳</span>
                            <span v-else>🚀</span>
                            <span>{{ buttonText }}</span>
                        </button>
                    </div>
                    <p v-if="!isGenerating" class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Estimation intelligente powered by OpenAI
                    </p>

                    <!-- Affichage des erreurs -->
                    <div v-if="estimationError" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <span class="text-red-400">❌</span>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-sm font-medium text-red-800">
                                    Erreur lors de la génération
                                </h3>
                                <div class="mt-2 text-sm text-red-700">
                                    {{ estimationError }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Affichage des résultats -->
                <estimation-results
                    v-if="estimationResult"
                    :result="estimationResult"
                    :user-type="selectedUserType"
                    @new-estimation="resetEstimation"
                ></estimation-results>
            </div>
        </div>
    `,
    
    data() {
        return {
            selectedUserType: null, // 'freelance' ou 'entreprise'
            isGenerating: false, // État de génération de l'estimation
            estimationError: null, // Erreur d'estimation
            estimationResult: null, // Résultat de l'estimation
            freelanceData: {
                basics: {
                    projectType: '',
                    customProjectType: '',
                    pageCount: '',
                    technologies: '',
                    isExistingProject: null,
                    deadlineDays: null
                },
                constraints: {
                    skillLevels: {},
                    isFullTime: null,
                    hasTjmTarget: false,
                    tjmTarget: null,
                    securityMargin: ''
                },
                features: {
                    selectedFeatures: [],
                    customFeatures: []
                },
                deliverables: {
                    scope: '',
                    mockupsProvided: '',
                    specsProvided: '',
                    frequentMeetings: '',
                    additionalServices: []
                },
                objectives: {
                    selectedObjectives: [],
                    customObjective: '',
                    primaryObjective: '',
                    clientType: '',
                    currentSituation: ''
                }
            },
            entrepriseData: {
                basics: {
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
                    customPricingReason: ''
                },
                structure: {
                    userRole: '',
                    customUserRole: '',
                    teamComposition: [],
                    teamProfiles: [{ type: '', customType: '', count: null }],
                    methodology: ''
                },
                functionalities: {
                    selectedFeatures: [],
                    hasPhase2: false,
                    phase2Description: '',
                    phase2Priority: '',
                    scalability: '',
                    functionalComplexity: ''
                },
                deliverables: {
                    uiUxManagement: '',
                    mockupsStatus: '',
                    specsStatus: '',
                    clientMeetings: '',
                    includedServices: []
                },
                objectives: {
                    projectObjective: '',
                    budgetContext: '',
                    budgetAmount: null,
                    budgetFlexibility: '',
                    projectUrgency: '',
                    specificConstraints: ''
                },
                pricing: {
                    hasDailyCosts: false,
                    dailyCosts: [{ type: '', customType: '', dailyRate: null }],
                    includeMargin: false,
                    marginRate: null,
                    marginType: '',
                    billingModel: '',
                    billingContext: ''
                }
            }
        }
    },
    
    computed: {
        canSubmit() {
            // Logique améliorée pour vérifier les données essentielles
            if (this.selectedUserType === 'freelance') {
                const basics = this.freelanceData.basics;
                return basics.projectType && basics.pageCount;
            } else if (this.selectedUserType === 'entreprise') {
                const basics = this.entrepriseData.basics;
                return basics.projectType && basics.pageCount && basics.pricingReason;
            }
            return false;
        },

        extractedTechnologies() {
            // Extraire les technologies depuis le champ texte pour les passer aux contraintes
            const techText = this.freelanceData.basics.technologies || '';
            if (!techText.trim()) return [];

            // Séparer par virgules, points-virgules ou retours à la ligne
            return techText
                .split(/[,;\n]/)
                .map(tech => tech.trim())
                .filter(tech => tech.length > 0)
                .slice(0, 10); // Limiter à 10 technologies max
        },

        completionPercentage() {
            // Calculer le pourcentage de completion du formulaire
            if (this.selectedUserType === 'freelance') {
                let totalFields = 0;
                let completedFields = 0;

                // Section basics
                const basics = this.freelanceData.basics;
                totalFields += 3; // projectType, pageCount, technologies
                if (basics.projectType) completedFields++;
                if (basics.pageCount) completedFields++;
                if (basics.technologies) completedFields++;

                // Section constraints
                const constraints = this.freelanceData.constraints;
                totalFields += 2; // isFullTime, securityMargin
                if (constraints.isFullTime !== null) completedFields++;
                if (constraints.securityMargin) completedFields++;

                // Section features
                const features = this.freelanceData.features;
                totalFields += 1;
                if (features.selectedFeatures.length > 0 || features.customFeatures.some(f => f.name)) {
                    completedFields++;
                }

                // Section deliverables
                const deliverables = this.freelanceData.deliverables;
                totalFields += 2; // scope, mockupsProvided
                if (deliverables.scope) completedFields++;
                if (deliverables.mockupsProvided) completedFields++;

                // Section objectives
                const objectives = this.freelanceData.objectives;
                totalFields += 1;
                if (objectives.selectedObjectives.length > 0) completedFields++;

                return Math.round((completedFields / totalFields) * 100);

            } else if (this.selectedUserType === 'entreprise') {
                let totalFields = 0;
                let completedFields = 0;

                // Section basics
                const basics = this.entrepriseData.basics;
                totalFields += 3; // projectType, pageCount, pricingReason
                if (basics.projectType) completedFields++;
                if (basics.pageCount) completedFields++;
                if (basics.pricingReason) completedFields++;

                // Section structure
                const structure = this.entrepriseData.structure;
                totalFields += 2; // userRole, teamComposition
                if (structure.userRole) completedFields++;
                if (structure.teamComposition.length > 0) completedFields++;

                // Section functionalities
                const functionalities = this.entrepriseData.functionalities;
                totalFields += 1;
                if (functionalities.selectedFeatures.length > 0) completedFields++;

                // Section deliverables
                const deliverables = this.entrepriseData.deliverables;
                totalFields += 2; // uiUxManagement, mockupsStatus
                if (deliverables.uiUxManagement) completedFields++;
                if (deliverables.mockupsStatus) completedFields++;

                // Section objectives
                const objectives = this.entrepriseData.objectives;
                totalFields += 1;
                if (objectives.projectObjective) completedFields++;

                // Section pricing
                const pricing = this.entrepriseData.pricing;
                totalFields += 1;
                if (pricing.billingModel) completedFields++;

                return Math.round((completedFields / totalFields) * 100);
            }
            return 0;
        },

        buttonText() {
            return this.isGenerating ? 'Génération en cours...' : 'Générer l\'estimation';
        }
    },
    
    methods: {
        updateUserType(newType) {
            this.selectedUserType = newType;
            console.log('Type d\'utilisateur sélectionné:', newType);
        },
        
        updateFreelanceBasics(newData) {
            this.freelanceData.basics = { ...this.freelanceData.basics, ...newData };
            console.log('Données basics mises à jour:', this.freelanceData.basics);
        },

        updateFreelanceConstraints(newData) {
            this.freelanceData.constraints = { ...this.freelanceData.constraints, ...newData };
            console.log('Données constraints mises à jour:', this.freelanceData.constraints);
        },

        updateFreelanceFeatures(newData) {
            this.freelanceData.features = { ...this.freelanceData.features, ...newData };
            console.log('Données features mises à jour:', this.freelanceData.features);
        },

        updateFreelanceDeliverables(newData) {
            this.freelanceData.deliverables = { ...this.freelanceData.deliverables, ...newData };
            console.log('Données deliverables mises à jour:', this.freelanceData.deliverables);
        },

        updateFreelanceObjectives(newData) {
            this.freelanceData.objectives = { ...this.freelanceData.objectives, ...newData };
            console.log('Données objectives mises à jour:', this.freelanceData.objectives);
        },

        // Méthodes pour les données entreprise
        updateEnterpriseBasics(newData) {
            this.entrepriseData.basics = { ...this.entrepriseData.basics, ...newData };
            console.log('Données enterprise basics mises à jour:', this.entrepriseData.basics);
        },

        updateEnterpriseStructure(newData) {
            this.entrepriseData.structure = { ...this.entrepriseData.structure, ...newData };
            console.log('Données enterprise structure mises à jour:', this.entrepriseData.structure);
        },

        updateEnterpriseFunctionalities(newData) {
            this.entrepriseData.functionalities = { ...this.entrepriseData.functionalities, ...newData };
            console.log('Données enterprise functionalities mises à jour:', this.entrepriseData.functionalities);
        },

        updateEnterpriseDeliverables(newData) {
            this.entrepriseData.deliverables = { ...this.entrepriseData.deliverables, ...newData };
            console.log('Données enterprise deliverables mises à jour:', this.entrepriseData.deliverables);
        },

        updateEnterpriseObjectives(newData) {
            this.entrepriseData.objectives = { ...this.entrepriseData.objectives, ...newData };
            console.log('Données enterprise objectives mises à jour:', this.entrepriseData.objectives);
        },

        updateEnterprisePricing(newData) {
            this.entrepriseData.pricing = { ...this.entrepriseData.pricing, ...newData };
            console.log('Données enterprise pricing mises à jour:', this.entrepriseData.pricing);
        },

        // Méthode pour générer l'estimation via OpenAI
        async generateEstimation() {
            this.isGenerating = true;
            this.estimationError = null;
            this.estimationResult = null;

            try {
                // Préparer les données selon le type d'utilisateur
                const estimationData = this.prepareEstimationData();

                console.log('Données envoyées pour estimation:', estimationData);

                // Appel à l'API Netlify Function
                const response = await fetch('/api/estimate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userType: this.selectedUserType,
                        data: estimationData
                    })
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    this.estimationResult = result.estimation;
                    console.log('Estimation reçue:', this.estimationResult);
                } else {
                    throw new Error(result.error || 'Erreur inconnue');
                }

            } catch (error) {
                console.error('Erreur lors de la génération:', error);
                this.estimationError = error.message || 'Une erreur est survenue lors de la génération de l\'estimation';
            } finally {
                this.isGenerating = false;
            }
        },

        // Méthode pour préparer les données d'estimation
        prepareEstimationData() {
            if (this.selectedUserType === 'freelance') {
                return this.prepareFreelanceData();
            } else {
                return this.prepareEnterpriseData();
            }
        },

        // Préparer les données freelance pour l'API
        prepareFreelanceData() {
            const data = this.freelanceData;

            // Extraire les technologies sous forme de tableau
            const technologies = data.basics.technologies ?
                data.basics.technologies.split(',').map(t => t.trim()).filter(t => t) : [];

            return {
                projectType: data.basics.projectType || data.basics.customProjectType,
                technologies: technologies,
                pages: data.basics.pageCount,
                deadline: data.basics.deadlineDays ? `${data.basics.deadlineDays} jours` : null,
                skillLevel: this.getAverageSkillLevel(data.constraints.skillLevels),
                fullTime: data.constraints.isFullTime,
                tjm: data.constraints.tjmTarget,
                securityMargin: data.constraints.securityMargin,
                features: data.features.selectedFeatures.concat(data.features.customFeatures),
                scope: data.deliverables.scope,
                objectives: data.objectives.selectedObjectives
            };
        },

        // Préparer les données entreprise pour l'API
        prepareEnterpriseData() {
            const data = this.entrepriseData;

            // Extraire les technologies
            const technologies = Object.values(data.basics.technologies).filter(t => t);

            return {
                projectType: data.basics.projectType || data.basics.customProjectType,
                technologies: technologies,
                pages: data.basics.pageCount,
                deadline: this.formatEnterpriseDeadline(data.basics),
                reason: data.basics.pricingReason,
                role: data.structure.role,
                team: data.structure.teamComposition,
                methodology: data.structure.methodology,
                features: data.functionalities.selectedFeatures,
                scalable: data.functionalities.scalable,
                complexity: data.functionalities.complexity,
                budget: data.objectives.budget,
                urgent: data.objectives.urgent,
                costs: data.pricing.profileCosts,
                margin: data.pricing.margin,
                model: data.pricing.billingModel
            };
        },

        // Calculer le niveau de compétence moyen
        getAverageSkillLevel(skillLevels) {
            const levels = Object.values(skillLevels).filter(level => level);
            if (levels.length === 0) return 'Non spécifié';

            const levelMap = { 'débutant': 1, 'intermédiaire': 2, 'expert': 3 };
            const average = levels.reduce((sum, level) => sum + (levelMap[level] || 2), 0) / levels.length;

            if (average <= 1.5) return 'débutant';
            if (average <= 2.5) return 'intermédiaire';
            return 'expert';
        },

        // Formater la deadline entreprise
        formatEnterpriseDeadline(basics) {
            if (basics.deadlineType === 'duration' && basics.deadlineDuration) {
                return `${basics.deadlineDuration} ${basics.deadlineUnit}`;
            } else if (basics.deadlineType === 'date' && basics.deadlineDate) {
                return `Date limite: ${basics.deadlineDate}`;
            }
            return null;
        },

        // Réinitialiser l'estimation pour en faire une nouvelle
        resetEstimation() {
            this.estimationResult = null;
            this.estimationError = null;
        },
        
        // Méthode pour sauvegarder en localStorage (optionnel)
        saveToLocalStorage() {
            const data = {
                selectedUserType: this.selectedUserType,
                freelanceData: this.freelanceData,
                entrepriseData: this.entrepriseData,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('quickesti_data', JSON.stringify(data));
        },
        
        // Méthode pour charger depuis localStorage (optionnel)
        loadFromLocalStorage() {
            const saved = localStorage.getItem('quickesti_data');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    this.selectedUserType = data.selectedUserType || null;
                    this.freelanceData = { ...this.freelanceData, ...data.freelanceData };
                    this.entrepriseData = { ...this.entrepriseData, ...data.entrepriseData };
                } catch (e) {
                    console.warn('Erreur lors du chargement des données sauvegardées:', e);
                }
            }
        }
    },
    
    mounted() {
        // Charger les données sauvegardées au montage du composant
        this.loadFromLocalStorage();
        
        // Sauvegarder automatiquement les changements
        this.$watch(() => [this.selectedUserType, this.freelanceData, this.entrepriseData], () => {
            this.saveToLocalStorage();
        }, { deep: true });
    }
};
