// EstimationResults.js - Composant d'affichage des résultats d'estimation
const EstimationResults = {
    props: {
        result: {
            type: Object,
            required: true
        },
        userType: {
            type: String,
            required: true
        }
    },
    
    template: `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mt-8">
            <!-- Header des résultats -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-primary text-white rounded-t-lg">
                <h3 class="text-lg font-semibold flex items-center">
                    <span class="mr-2">🎯</span>
                    Estimation de votre projet
                </h3>
                <p class="text-blue-100 text-sm mt-1">
                    Résultats générés par IA - {{ userType === 'freelance' ? 'Profil Freelance' : 'Profil Entreprise' }}
                </p>
                <div class="flex items-center space-x-4 mt-2 text-xs text-blue-200" v-if="result.model || result.complexityScore">
                    <span v-if="result.model">🤖 {{ result.model }}</span>
                    <span v-if="result.complexityScore">📊 Score: {{ result.complexityScore }}</span>
                    <span v-if="result.fromCache">⚡ Cache</span>
                </div>
            </div>

            <!-- Contenu des résultats -->
            <div class="p-6">
                <!-- Résumé principal -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <!-- Durée -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Durée estimée</p>
                                <p class="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                    {{ formatDuration() }}
                                </p>
                            </div>
                            <span class="text-blue-500 text-2xl">⏱️</span>
                        </div>
                    </div>

                    <!-- Coût -->
                    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-green-600 dark:text-green-400">Coût total</p>
                                <p class="text-2xl font-bold text-green-900 dark:text-green-100">
                                    {{ formatCost() }}
                                </p>
                            </div>
                            <span class="text-green-500 text-2xl">💰</span>
                        </div>
                    </div>

                    <!-- TJM ou Coût par profil -->
                    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-purple-600 dark:text-purple-400">
                                    {{ userType === 'freelance' ? 'TJM recommandé' : 'Coût moyen/jour' }}
                                </p>
                                <p class="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                    {{ formatTjm() }}
                                </p>
                            </div>
                            <span class="text-purple-500 text-2xl">📊</span>
                        </div>
                    </div>

                    <!-- Complexité -->
                    <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-orange-600 dark:text-orange-400">Complexité</p>
                                <p class="text-2xl font-bold text-orange-900 dark:text-orange-100">
                                    {{ result.estimation.complexite }}
                                </p>
                            </div>
                            <span class="text-orange-500 text-2xl">{{ getComplexityIcon() }}</span>
                        </div>
                    </div>
                </div>

                <!-- Indicateurs de qualité -->
                <div class="mb-8" v-if="showQualityIndicators()">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span class="mr-2">🎯</span>
                        Qualité de l'estimation
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                            <div class="flex items-center">
                                <span class="text-green-500 mr-2">✅</span>
                                <span class="text-sm font-medium text-green-800 dark:text-green-200">Contexte métier détecté</span>
                            </div>
                        </div>
                        <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div class="flex items-center">
                                <span class="text-blue-500 mr-2">🤖</span>
                                <span class="text-sm font-medium text-blue-800 dark:text-blue-200">{{ getModelQuality() }}</span>
                            </div>
                        </div>
                        <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                            <div class="flex items-center">
                                <span class="text-purple-500 mr-2">📊</span>
                                <span class="text-sm font-medium text-purple-800 dark:text-purple-200">Scoring avancé</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Breakdown détaillé -->
                <div class="mb-8">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span class="mr-2">📋</span>
                        Répartition détaillée
                    </h4>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-for="(value, key) in result.breakdown" :key="key" class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                    {{ formatBreakdownLabel(key) }}
                                </span>
                                <span class="text-sm font-bold text-gray-900 dark:text-white">
                                    {{ value }} {{ value > 1 ? 'jours' : 'jour' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recommandations -->
                <div class="mb-8" v-if="result.recommandations && result.recommandations.length > 0">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span class="mr-2">💡</span>
                        Recommandations
                    </h4>
                    <div class="space-y-3">
                        <div v-for="(recommendation, index) in result.recommandations" :key="index" 
                             class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <p class="text-blue-800 dark:text-blue-200">{{ recommendation }}</p>
                        </div>
                    </div>
                </div>

                <!-- Risques identifiés -->
                <div class="mb-8" v-if="result.risques && result.risques.length > 0">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span class="mr-2">⚠️</span>
                        Risques identifiés
                    </h4>
                    <div class="space-y-3">
                        <div v-for="(risk, index) in result.risques" :key="index" 
                             class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <p class="text-yellow-800 dark:text-yellow-200">{{ risk }}</p>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        type="button"
                        class="flex-1 px-4 py-2 bg-gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                        @click="exportToPdf"
                    >
                        📄 Exporter en PDF
                    </button>
                    <button 
                        type="button"
                        class="flex-1 px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                        @click="shareEstimation"
                    >
                        🔗 Partager l'estimation
                    </button>
                    <button 
                        type="button"
                        class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        @click="newEstimation"
                    >
                        🔄 Nouvelle estimation
                    </button>
                </div>
            </div>
        </div>
    `,
    
    methods: {
        formatDuration() {
            const estimation = this.result.estimation;
            if (this.userType === 'freelance') {
                if (estimation.duree_semaines && estimation.duree_semaines > 0) {
                    return `${estimation.duree_semaines} sem.`;
                }
                return `${estimation.duree_jours || 0} jours`;
            } else {
                if (estimation.duree_calendaire_semaines) {
                    return `${estimation.duree_calendaire_semaines} sem.`;
                }
                return `${estimation.duree_jours_homme || 0} j/h`;
            }
        },

        formatCost() {
            const cost = this.result.estimation.cout_total;
            if (!cost) return 'N/A';
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0
            }).format(cost);
        },

        formatTjm() {
            if (this.userType === 'freelance') {
                const tjm = this.result.estimation.tjm_recommande;
                if (!tjm) return 'N/A';
                return `${tjm}€/jour`;
            } else {
                // Pour entreprise, calculer un coût moyen par jour
                const total = this.result.estimation.cout_total;
                const jours = this.result.estimation.duree_jours_homme;
                if (!total || !jours) return 'N/A';
                const moyenne = Math.round(total / jours);
                return `${moyenne}€/jour`;
            }
        },

        getComplexityIcon() {
            const complexity = this.result.estimation.complexite?.toLowerCase();
            switch (complexity) {
                case 'faible': return '🟢';
                case 'moyenne': return '🟡';
                case 'élevée': return '🟠';
                case 'très élevée': return '🔴';
                default: return '❓';
            }
        },

        formatBreakdownLabel(key) {
            const labels = {
                'developpement': 'Développement',
                'design_ui': 'Design UI',
                'design_ux_ui': 'Design UX/UI',
                'integration': 'Intégration',
                'tests': 'Tests',
                'tests_qa': 'Tests & QA',
                'deploiement': 'Déploiement',
                'deploiement_devops': 'Déploiement DevOps',
                'analyse_specs': 'Analyse & Specs',
                'gestion_projet': 'Gestion de projet'
            };
            return labels[key] || key.replace(/_/g, ' ');
        },

        exportToPdf() {
            // TODO: Implémenter l'export PDF (Phase 4)
            alert('Fonctionnalité d\'export PDF à venir dans la Phase 4 !');
        },

        shareEstimation() {
            // TODO: Implémenter le partage (Phase 4)
            alert('Fonctionnalité de partage à venir dans la Phase 4 !');
        },

        newEstimation() {
            this.$emit('new-estimation');
        },

        showQualityIndicators() {
            return this.result.model || this.result.complexityScore;
        },

        getModelQuality() {
            if (this.result.model === 'gpt-4') {
                return 'Qualité premium (GPT-4)';
            } else if (this.result.model === 'gpt-3.5-turbo') {
                return 'Qualité optimisée (GPT-3.5)';
            }
            return 'IA avancée';
        }
    }
};
