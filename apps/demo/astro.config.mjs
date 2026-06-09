import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import solidJs from "@astrojs/solid-js"

export default defineConfig({
  site: "https://munenick.github.io",
  base: "/console-ui",
  integrations: [
    react({ include: ["**/components/react-*", "**/demos/react/**"] }),
    solidJs({ include: ["**/components/solid-*", "**/demos/solid/**"] }),
  ],
  vite: {
    resolve: {
      alias: {
        "@/": new URL("../../", import.meta.url).pathname,
      },
    },
  },
})
