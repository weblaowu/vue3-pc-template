import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "tdesign-vue-next/es/style/index.css";
import "@/assets/styles/common.scss";
import "animate.css";
import "./permission";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");
