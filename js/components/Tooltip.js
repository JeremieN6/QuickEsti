// Tooltip.js - Composant tooltip réutilisable
const Tooltip = {
    template: `
        <div class="relative inline-block">
            <!-- Élément déclencheur -->
            <div 
                @mouseenter="showTooltip = true"
                @mouseleave="showTooltip = false"
                @click="toggleTooltip"
                class="cursor-help"
            >
                <slot name="trigger">
                    <span class="inline-flex items-center justify-center w-4 h-4 text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </slot>
            </div>

            <!-- Tooltip content -->
            <div 
                v-show="showTooltip"
                :class="[
                    'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300',
                    'dark:bg-gray-700',
                    positionClasses
                ]"
                role="tooltip"
            >
                <div class="max-w-xs">
                    <!-- Titre du tooltip -->
                    <div v-if="title" class="font-semibold mb-1">{{ title }}</div>
                    
                    <!-- Contenu principal -->
                    <div class="text-xs leading-relaxed">
                        <slot>{{ content }}</slot>
                    </div>
                    
                    <!-- Exemple optionnel -->
                    <div v-if="example" class="mt-2 pt-2 border-t border-gray-600 dark:border-gray-500">
                        <div class="text-xs text-gray-300 dark:text-gray-400">
                            <strong>Exemple :</strong> {{ example }}
                        </div>
                    </div>
                </div>
                
                <!-- Flèche du tooltip -->
                <div 
                    :class="[
                        'absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45',
                        arrowClasses
                    ]"
                ></div>
            </div>
        </div>
    `,
    
    props: {
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        example: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'top', // top, bottom, left, right
            validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
        }
    },
    
    data() {
        return {
            showTooltip: false
        };
    },
    
    computed: {
        positionClasses() {
            const positions = {
                top: '-top-2 left-1/2 transform -translate-x-1/2 -translate-y-full',
                bottom: '-bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full',
                left: 'top-1/2 -left-2 transform -translate-x-full -translate-y-1/2',
                right: 'top-1/2 -right-2 transform translate-x-full -translate-y-1/2'
            };
            return positions[this.position] || positions.top;
        },
        
        arrowClasses() {
            const arrows = {
                top: 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                bottom: 'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2',
                left: 'left-full top-1/2 transform -translate-y-1/2 translate-x-1/2',
                right: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-1/2'
            };
            return arrows[this.position] || arrows.top;
        }
    },
    
    methods: {
        toggleTooltip() {
            this.showTooltip = !this.showTooltip;
        }
    },
    
    mounted() {
        // Fermer le tooltip si on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) {
                this.showTooltip = false;
            }
        });
    }
};
