// EnterprisePricing.js - Section 6 : Coûts et tarification
const EnterprisePricing = {
    template: `
        <div class="enterprise-pricing bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center mb-6">
                <span class="text-emerald-500 text-2xl mr-3">💰</span>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Section 6 : Coûts et tarification
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Définissez la structure de coûts et le modèle de tarification
                    </p>
                </div>
            </div>

            <div class="space-y-8">
                <!-- Coût journalier par profil -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">
                        👥 Estimation du coût journalier par profil
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Avez-vous une estimation du coût journalier moyen par profil ?
                    </p>
                    
                    <div class="space-y-4">
                        <label class="flex items-center">
                            <input 
                                type="checkbox"
                                v-model="localFormData.hasDailyCosts"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                Oui, j'ai des estimations de coûts journaliers
                            </span>
                        </label>
                        
                        <div v-if="localFormData.hasDailyCosts" class="ml-7 space-y-4">
                            <div v-for="(profile, index) in localFormData.dailyCosts" :key="index" 
                                 class="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <select 
                                    v-model="profile.type"
                                    @change="updateFormData"
                                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                                >
                                    <option value="">Type de profil</option>
                                    <option value="dev-junior">Développeur Junior</option>
                                    <option value="dev-senior">Développeur Senior</option>
                                    <option value="lead-dev">Lead Developer</option>
                                    <option value="fullstack">Développeur Fullstack</option>
                                    <option value="frontend">Développeur Frontend</option>
                                    <option value="backend">Développeur Backend</option>
                                    <option value="devops">DevOps</option>
                                    <option value="designer">Designer UI/UX</option>
                                    <option value="po">Product Owner</option>
                                    <option value="qa">QA / Testeur</option>
                                    <option value="chef-projet">Chef de projet</option>
                                    <option value="architecte">Architecte technique</option>
                                    <option value="autre">Autre</option>
                                </select>
                                
                                <input 
                                    v-if="profile.type === 'autre'"
                                    type="text"
                                    v-model="profile.customType"
                                    @input="updateFormData"
                                    placeholder="Précisez"
                                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                                >
                                
                                <div class="flex items-center space-x-2">
                                    <input 
                                        type="number"
                                        v-model="profile.dailyRate"
                                        @input="updateFormData"
                                        placeholder="500"
                                        min="100"
                                        max="2000"
                                        step="50"
                                        class="w-24 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                                    >
                                    <span class="text-sm text-gray-600 dark:text-gray-400">€/jour</span>
                                </div>
                                
                                <button 
                                    @click="removeDailyCost(index)"
                                    type="button"
                                    class="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                >
                                    🗑️
                                </button>
                            </div>
                            
                            <button 
                                @click="addDailyCost"
                                type="button"
                                class="flex items-center px-4 py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            >
                                ➕ Ajouter un profil
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Marge dans l'estimation -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        📈 Marge dans l'estimation finale
                    </h5>
                    <label class="flex items-center mb-4">
                        <input 
                            type="checkbox"
                            v-model="localFormData.includeMargin"
                            @change="updateFormData"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        >
                        <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                            Souhaitez-vous intégrer un taux de marge dans l'estimation finale ?
                        </span>
                    </label>
                    
                    <div v-if="localFormData.includeMargin" class="ml-7 space-y-4">
                        <div class="flex items-center space-x-4">
                            <input 
                                type="number"
                                v-model="localFormData.marginRate"
                                @input="updateFormData"
                                placeholder="20"
                                min="0"
                                max="100"
                                step="5"
                                class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                            <span class="text-sm text-gray-600 dark:text-gray-400">% de marge</span>
                        </div>
                        
                        <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p class="text-sm text-blue-700 dark:text-blue-300">
                                💡 Avec {{ localFormData.marginRate || 0 }}% de marge, un coût de développement de 10 000€ 
                                sera facturé {{ Math.round(10000 * (1 + (localFormData.marginRate || 0) / 100)).toLocaleString() }}€ HT.
                            </p>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Type de marge
                            </label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="margin-type"
                                        value="commercial"
                                        v-model="localFormData.marginType"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Marge commerciale (revente client)
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="margin-type"
                                        value="risk"
                                        v-model="localFormData.marginType"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Marge de risque (aléas projet)
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="margin-type"
                                        value="operational"
                                        v-model="localFormData.marginType"
                                        @change="updateFormData"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Marge opérationnelle (frais généraux)
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modèle de facturation -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        📋 Modèle de facturation
                    </h5>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Comment facturez-vous habituellement vos projets ?
                    </label>
                    <div class="space-y-3">
                        <label v-for="model in billingModels" :key="model.id" class="flex items-start">
                            <input 
                                type="radio" 
                                name="billing-model"
                                :value="model.id"
                                v-model="localFormData.billingModel"
                                @change="updateFormData"
                                class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <div class="ml-3">
                                <div class="flex items-center">
                                    <span class="text-lg mr-2">{{ model.icon }}</span>
                                    <span class="font-medium text-gray-900 dark:text-white">{{ model.name }}</span>
                                    <span v-if="model.risk" 
                                          :class="getRiskClass(model.risk)"
                                          class="ml-2 px-2 py-0.5 text-xs rounded-full">
                                        {{ model.risk }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ model.description }}</p>
                                <p v-if="model.advantages" class="text-xs text-green-600 dark:text-green-400 mt-1">
                                    ✅ {{ model.advantages }}
                                </p>
                                <p v-if="model.disadvantages" class="text-xs text-red-600 dark:text-red-400 mt-1">
                                    ⚠️ {{ model.disadvantages }}
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Contexte de facturation -->
                <div>
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                        🏢 Contexte de facturation
                    </h5>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Dans quel contexte cette estimation sera-t-elle utilisée ?
                    </label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="billing-context"
                                value="client-external"
                                v-model="localFormData.billingContext"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Facturation à un client externe
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="billing-context"
                                value="budget-internal"
                                v-model="localFormData.billingContext"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Budget interne (coûts de développement)
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                name="billing-context"
                                value="comparison"
                                v-model="localFormData.billingContext"
                                @change="updateFormData"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Comparaison de prestataires
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Résumé de la tarification -->
            <div v-if="hasPricingData" class="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📝 Résumé de la structure tarifaire :
                </h5>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <div v-if="localFormData.hasDailyCosts && getValidDailyCosts().length > 0">
                        <strong>Coûts journaliers ({{ getValidDailyCosts().length }} profils) :</strong>
                        <ul class="list-disc list-inside mt-1 ml-4">
                            <li v-for="cost in getValidDailyCosts()" :key="cost.type">
                                {{ getDailyCostLabel(cost) }} : {{ cost.dailyRate }}€/jour
                            </li>
                        </ul>
                    </div>
                    <p v-if="localFormData.includeMargin && localFormData.marginRate">
                        <strong>Marge :</strong> {{ localFormData.marginRate }}% ({{ getMarginTypeLabel() }})
                    </p>
                    <p v-if="localFormData.billingModel">
                        <strong>Modèle :</strong> {{ getBillingModelLabel() }}
                    </p>
                    <p v-if="localFormData.billingContext">
                        <strong>Contexte :</strong> {{ getBillingContextLabel() }}
                    </p>
                </div>
                
                <!-- Estimation moyenne -->
                <div v-if="getAverageDailyRate() > 0" class="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <p class="text-sm text-emerald-700 dark:text-emerald-300">
                        💰 <strong>Coût journalier moyen :</strong> {{ getAverageDailyRate() }}€/jour
                        <span v-if="localFormData.includeMargin && localFormData.marginRate">
                            ({{ Math.round(getAverageDailyRate() * (1 + localFormData.marginRate / 100)) }}€/jour avec marge)
                        </span>
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
                hasDailyCosts: false,
                dailyCosts: [{ type: '', customType: '', dailyRate: null }],
                includeMargin: false,
                marginRate: null,
                marginType: '',
                billingModel: '',
                billingContext: '',
                ...this.formData
            },
            billingModels: [
                {
                    id: 'fixed-price',
                    name: 'Forfait',
                    description: 'Prix fixe défini à l\'avance pour l\'ensemble du projet',
                    icon: '📦',
                    risk: 'Risque élevé',
                    advantages: 'Budget prévisible pour le client',
                    disadvantages: 'Risque de dépassement pour le prestataire'
                },
                {
                    id: 'time-material',
                    name: 'Régie',
                    description: 'Facturation au temps passé (jours/homme)',
                    icon: '⏱️',
                    risk: 'Risque faible',
                    advantages: 'Flexibilité et transparence',
                    disadvantages: 'Budget moins prévisible pour le client'
                },
                {
                    id: 'mixed',
                    name: 'Mix selon projets',
                    description: 'Adaptation du modèle selon le type et la taille du projet',
                    icon: '🔄',
                    risk: 'Variable',
                    advantages: 'Approche adaptée à chaque contexte',
                    disadvantages: 'Complexité de gestion'
                }
            ]
        }
    },
    
    computed: {
        hasPricingData() {
            return this.localFormData.hasDailyCosts ||
                   this.localFormData.includeMargin ||
                   this.localFormData.billingModel ||
                   this.localFormData.billingContext;
        }
    },
    
    methods: {
        updateFormData() {
            this.$emit('update:form-data', { ...this.localFormData });
        },
        
        addDailyCost() {
            this.localFormData.dailyCosts.push({ type: '', customType: '', dailyRate: null });
            this.updateFormData();
        },
        
        removeDailyCost(index) {
            this.localFormData.dailyCosts.splice(index, 1);
            this.updateFormData();
        },
        
        getRiskClass(risk) {
            const classes = {
                'Risque élevé': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
                'Risque faible': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
                'Variable': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
            };
            return classes[risk] || '';
        },
        
        getValidDailyCosts() {
            return this.localFormData.dailyCosts.filter(cost => 
                cost.type && cost.dailyRate && parseInt(cost.dailyRate) > 0
            );
        },
        
        getDailyCostLabel(cost) {
            const labels = {
                'dev-junior': 'Dev Junior',
                'dev-senior': 'Dev Senior',
                'lead-dev': 'Lead Dev',
                'fullstack': 'Fullstack',
                'frontend': 'Frontend',
                'backend': 'Backend',
                'devops': 'DevOps',
                'designer': 'Designer',
                'po': 'Product Owner',
                'qa': 'QA',
                'chef-projet': 'Chef de projet',
                'architecte': 'Architecte',
                'autre': cost.customType || 'Autre'
            };
            return labels[cost.type] || cost.type;
        },
        
        getMarginTypeLabel() {
            const labels = {
                'commercial': 'commerciale',
                'risk': 'de risque',
                'operational': 'opérationnelle'
            };
            return labels[this.localFormData.marginType] || this.localFormData.marginType;
        },
        
        getBillingModelLabel() {
            const model = this.billingModels.find(m => m.id === this.localFormData.billingModel);
            return model ? model.name : this.localFormData.billingModel;
        },
        
        getBillingContextLabel() {
            const labels = {
                'client-external': 'Facturation client externe',
                'budget-internal': 'Budget interne',
                'comparison': 'Comparaison prestataires'
            };
            return labels[this.localFormData.billingContext] || this.localFormData.billingContext;
        },
        
        getAverageDailyRate() {
            const validCosts = this.getValidDailyCosts();
            if (validCosts.length === 0) return 0;
            
            const total = validCosts.reduce((sum, cost) => sum + parseInt(cost.dailyRate), 0);
            return Math.round(total / validCosts.length);
        }
    },
    
    watch: {
        formData: {
            handler(newData) {
                this.localFormData = { 
                    hasDailyCosts: false,
                    dailyCosts: [{ type: '', customType: '', dailyRate: null }],
                    includeMargin: false,
                    marginRate: null,
                    marginType: '',
                    billingModel: '',
                    billingContext: '',
                    ...this.localFormData, 
                    ...newData 
                };
            },
            deep: true
        }
    }
};
