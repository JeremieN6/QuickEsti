<template>
  <div id="quickesti-app" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gradient">
              QuickEsti 🚀
            </h1>
            <span class="ml-3 text-sm text-gray-500 dark:text-gray-400">
              Estimation de projet web
            </span>
          </div>

          <!-- Version -->
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600 dark:text-gray-300">
              Version MVP
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          Estimez votre projet web
          <span class="text-gradient">en quelques clics</span>
        </h2>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          QuickEsti vous aide à calculer le temps et le coût de votre projet web en prenant en compte
          vos contraintes, technologies et objectifs. Simple, rapide et pensé pour les développeurs et entreprises.
        </p>
      </div>

      <!-- Estimation Form Container -->
      <div class="">
        <EstimationForm />
      </div>
    </main>

    <!-- Bouton toggle dark mode en bas à droite -->
    <div class="fixed right-4 bottom-4 z-50">
      <button
        @click="toggleDarkMode"
        type="button"
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 transition-colors duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600"
        title="Basculer le mode sombre"
      >
        <!-- Icône lune (mode dark) -->
        <svg v-show="!isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <!-- Icône soleil (mode light) -->
        <svg v-show="isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-400">
            © 2024 QuickEsti - Outil d'estimation de projet web
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Développé avec Vue.js, Tailwind CSS et Flowbite
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import EstimationForm from './components/EstimationForm.vue'

export default {
  name: 'App',
  components: {
    EstimationForm
  },
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;

      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    },

    initDarkMode() {
      // Vérifier les préférences sauvegardées ou système
      const savedTheme = localStorage.getItem('color-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        this.isDarkMode = true;
        document.documentElement.classList.add('dark');
      } else {
        this.isDarkMode = false;
        document.documentElement.classList.remove('dark');
      }
    }
  },

  mounted() {
    this.initDarkMode();
  }
}
</script>
