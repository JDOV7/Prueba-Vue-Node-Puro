import { createApp } from "vue";
import "./style.css";
import router from "./router/index";
import App from "./App.vue";
import Login from "./views/Login.vue";
import Header from "./components/Header.vue";
import Home from "./views/Home.vue";
import Principal from "./views/Principal.vue";

createApp(App)
  .use(router)
  .component("Login", Login)
  .component("Header", Header)
  .component("Home", Home)
  .component("Principal", Principal)
  .mount("#app");
