import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import Knob from 'primevue/knob';
import Interface from './Interface.vue';
import ToastService from 'primevue/toastservice';
import Lara from './presets/lara'; 
import './index.css'

if (process.env.NODE_ENV !== 'production') {
  import.meta.hot.on('reload-dsp', () => {
    console.log('Sending reload dsp message');
    
    if (typeof globalThis.__postNativeMessage__ === 'function') {
      globalThis.__postNativeMessage__('reload');
    }
  });
}

const app = createApp(Interface);

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
});

app.use(ToastService);
app.component('Button', Button);
app.component('Knob', Knob);

const pinia = createPinia();
app.use(pinia);

app.mount('#app');

globalThis.__receiveError__ = (err) => {
  errorStore.setState({ error: err });
};

if (typeof globalThis.__postNativeMessage__ === 'function') {
  globalThis.__postNativeMessage__("ready");
}
