import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import LoginVue from "./views/Login.vue";
import router from "./router";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { createPinia } from "pinia";

import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).use(vuetify);

app.mount("#app");
