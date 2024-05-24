import { createApp, watch } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import router from "./router/router.js";
import "./assets/css/example.css";

import "ayoflex/dist/ayoflex.min.css";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

//app.config.globalProperties.$eventBus = eventBus;

app.use(router);

app.mount("#app");

watch(
  () => pinia.state.value.cart,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem("products", JSON.stringify(state.products));
  },
  { deep: true },
);

watch(
  () => pinia.state.value.theme,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem("brandColor", JSON.stringify(state.brandColor));
  },
  { deep: true },
);
