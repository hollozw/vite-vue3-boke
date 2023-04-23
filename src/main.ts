import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import elementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import store from '@/store';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(elementPlus)
app.mount('#app')
