import { createApp } from "vue";
import App from "./App.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";

import "./assets/main.css";

const app = createApp(App);

app.component(VueCountdown.name, VueCountdown);

app.mount("#app");