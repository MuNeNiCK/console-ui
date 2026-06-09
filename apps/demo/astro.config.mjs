import { defineConfig } from "astro/config"
import react from "@astrojs/react"

export default defineConfig({
  site: "https://munenick.github.io",
  base: "/console-ui",
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@/": new URL("../../", import.meta.url).pathname,
      },
    },
  },
})
