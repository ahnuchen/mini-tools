import { createSSRApp } from "vue";
import App from "./App.vue";

// #ifdef H5
import fastclick from "fastclick";

fastclick(document.body);

// #endif
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
