import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');

// Print warning so that people don't self XSS themselves

// eslint-disable-next-line no-console
console.log('%cWARNING', 'color: red; font-size: 70px; -webkit-text-stroke: 1px white;');
// eslint-disable-next-line no-console
console.log('Do not paste ANYTHING here that you don\'t trust. By pasting code here you are giving attackers full access to all of your 2FA tokens!');
