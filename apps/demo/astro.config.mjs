import { defineConfig } from "astro/config"
export default defineConfig({
  site: "https://munenick.github.io",
  base: "/console-ui",
  integrations: [],
  vite: {
    resolve: {
      alias: {
        "@/": new URL("../../", import.meta.url).pathname,
      },
    },
  },
})
