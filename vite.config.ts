// vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

import Components, { kebabCase } from '@uni-helper/vite-plugin-uni-components'

export default defineConfig({
  plugins: [Components({
    resolvers: [
      {
        type: 'component',
        resolve: (name: string) => {
          if (name.match(/^Wd[A-Z]/)) {
            const compName = kebabCase(name)
            return {
              name,
              from: `wot-design-uni/components/${compName}/${compName}.vue`,
            }
          }
        },
      }
    ]
  }), uni()],
});