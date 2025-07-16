import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';

// Import Vue.js
import { createApp } from 'vue';

// Import Flowbite
import 'flowbite';

// Import main Vue component
import App from './vue/App.vue';

// Create Vue app
const app = createApp(App);

// Mount Vue app
app.mount('#app');
