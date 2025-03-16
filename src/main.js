import '@/assets/style/index.scss';
import axios from 'axios';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

axios.defaults.headers['X-Master-Key'] = '$2a$10$jeo1f5JbWFpdaFSKU3yp5uC9i38Fi3KVKH6iI1a0yJjMNteAQkmpq';

app.use(createPinia());
app.use(router);

app.mount('#app');