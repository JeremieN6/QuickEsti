// app.js - Application principale QuickEsti
const { createApp } = Vue;

// Configuration de l'application Vue
const QuickEstiApp = {
    data() {
        return {
            appName: 'QuickEsti',
            version: '1.0.0-MVP',
            isLoading: false
        }
    },

    mounted() {
        console.log('🚀 QuickEsti démarré avec succès !');
        console.log('Version:', this.version);

        // Initialisation de Flowbite après le montage
        if (typeof initFlowbite !== 'undefined') {
            initFlowbite();
        }
    },

    methods: {
        // Méthodes globales de l'application si nécessaire
        showNotification(message, type = 'info') {
            console.log(`[${type.toUpperCase()}] ${message}`);
            // TODO: Implémenter un système de notifications plus tard
        }
    }
};

// Création et montage de l'application
const app = createApp(QuickEstiApp);

// Enregistrement des composants
app.component('estimation-form', EstimationForm);
app.component('user-type-selector', UserTypeSelector);
// Freelance components
app.component('freelance-basics', FreelanceBasics);
app.component('freelance-constraints', FreelanceConstraints);
app.component('freelance-features', FreelanceFeatures);
app.component('freelance-deliverables', FreelanceDeliverables);
app.component('freelance-objectives', FreelanceObjectives);
// Enterprise components
app.component('enterprise-basics', EnterpriseBasics);
app.component('enterprise-structure', EnterpriseStructure);
app.component('enterprise-functionalities', EnterpriseFunctionalities);
app.component('enterprise-deliverables', EnterpriseDeliverables);
app.component('enterprise-objectives', EnterpriseObjectives);
app.component('enterprise-pricing', EnterprisePricing);

// Configuration globale
app.config.globalProperties.$appName = 'QuickEsti';

// Gestion des erreurs globales
app.config.errorHandler = (err, vm, info) => {
    console.error('Erreur Vue.js:', err);
    console.error('Informations:', info);
    console.error('Composant:', vm);
};

// Montage de l'application
app.mount('#app');

// Gestion du mode sombre (optionnel pour plus tard)
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Initialisation du mode sombre depuis localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
}

// Export pour utilisation dans d'autres fichiers si nécessaire
window.QuickEstiApp = app;