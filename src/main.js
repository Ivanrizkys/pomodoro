import { createApp } from "vue";
import App from "./App.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import print from "vue3-print-nb";

import "./assets/main.css";

const app = createApp(App);

app.use(print);
app.component(VueCountdown.name, VueCountdown);

app.mount("#app");
