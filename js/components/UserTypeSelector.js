// UserTypeSelector.js - Composant pour choisir entre freelance et entreprise
const UserTypeSelector = {
    template: `
        <div class="user-type-selector">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                👤 Quel est votre profil ?
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Sélectionnez votre profil pour adapter les questions à vos besoins spécifiques
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Option Freelance -->
                <div 
                    class="user-type-option"
                    :class="optionClasses('freelance')"
                    @click="selectType('freelance')"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="text-3xl mr-4">👨‍💻</div>
                            <div>
                                <h5 class="font-semibold text-gray-900 dark:text-white">
                                    Développeur / Freelance
                                </h5>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Vous travaillez en indépendant
                                </p>
                            </div>
                        </div>
                        <div class="radio-indicator">
                            <div 
                                class="w-4 h-4 rounded-full border-2"
                                :class="selectedType === 'freelance' 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300 dark:border-gray-600'"
                            >
                                <div 
                                    v-if="selectedType === 'freelance'"
                                    class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"
                                ></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Détails pour freelance -->
                    <div v-if="selectedType === 'freelance'" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            <p class="mb-2"><strong>Sections adaptées :</strong></p>
                            <ul class="list-disc list-inside space-y-1 text-xs">
                                <li>Informations de base du projet</li>
                                <li>Contraintes du freelance (compétences, TJM, temps)</li>
                                <li>Fonctionnalités additionnelles</li>
                                <li>Livrables & périmètre attendu</li>
                                <li>Objectifs personnels</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Option Entreprise -->
                <div 
                    class="user-type-option"
                    :class="optionClasses('entreprise')"
                    @click="selectType('entreprise')"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="text-3xl mr-4">🏢</div>
                            <div>
                                <h5 class="font-semibold text-gray-900 dark:text-white">
                                    Entreprise / Agence
                                </h5>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Vous représentez une organisation
                                </p>
                            </div>
                        </div>
                        <div class="radio-indicator">
                            <div 
                                class="w-4 h-4 rounded-full border-2"
                                :class="selectedType === 'entreprise' 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300 dark:border-gray-600'"
                            >
                                <div 
                                    v-if="selectedType === 'entreprise'"
                                    class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"
                                ></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Détails pour entreprise -->
                    <div v-if="selectedType === 'entreprise'" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            <p class="mb-2"><strong>Sections adaptées :</strong></p>
                            <ul class="list-disc list-inside space-y-1 text-xs">
                                <li>Informations de base & contexte business</li>
                                <li>Structure & organisation de l'équipe</li>
                                <li>Fonctionnalités et périmètre fonctionnel</li>
                                <li>Livrables attendus & méthodologie</li>
                                <li>Objectifs business du projet</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Message d'aide -->
            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div class="flex items-start">
                    <div class="text-blue-500 mr-3 mt-0.5">💡</div>
                    <div class="text-sm text-blue-700 dark:text-blue-300">
                        <p class="font-medium mb-1">Pourquoi cette distinction ?</p>
                        <p>
                            Les questions et métriques d'estimation diffèrent selon votre contexte : 
                            un freelance se concentre sur son TJM et sa rentabilité, 
                            tandis qu'une entreprise évalue les coûts d'équipe et la planification projet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    props: {
        selectedType: {
            type: String,
            default: null
        }
    },
    
    emits: ['update:selected-type'],
    
    methods: {
        selectType(type) {
            this.$emit('update:selected-type', type);
        },
        
        optionClasses(type) {
            const baseClasses = [
                'p-6', 'rounded-lg', 'border-2', 'cursor-pointer', 
                'transition-all', 'duration-200', 'hover:shadow-md'
            ];
            
            if (this.selectedType === type) {
                return [
                    ...baseClasses,
                    'border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20', 
                    'shadow-md', 'ring-2', 'ring-blue-200', 'dark:ring-blue-800'
                ].join(' ');
            } else {
                return [
                    ...baseClasses,
                    'border-gray-200', 'dark:border-gray-700', 
                    'bg-white', 'dark:bg-gray-800',
                    'hover:border-gray-300', 'dark:hover:border-gray-600'
                ].join(' ');
            }
        }
    }
};
