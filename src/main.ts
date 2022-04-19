import { numberFormats } from './i18n/index';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './app.vue';
import router from './router';
import './index.css';
import { messages, defaultLocale } from './i18n';

const i18n = createI18n({ 
    legacy: false,
    globalInjection: true,
    messages,
    numberFormats,
    fallbackLocale: defaultLocale
})

createApp(App)
.use(i18n)
.use(createPinia())
.use(router)
.mount('#app');
 