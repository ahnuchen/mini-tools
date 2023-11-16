import { createSSRApp } from "vue";
import App from "./App.vue";
import zpMixins from "@/uni_modules/zp-mixins/index.js";

// #ifdef H5
import fastclick from "fastclick";

fastclick(document.body);

// #endif
export function createApp() {
  const app = createSSRApp(App);
  app.mixin(zpMixins);

  return {
    app,
  };
}
