import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import solid from "@astrojs/solid-js"

export default defineConfig({
  site: "https://munenick.github.io",
  base: "/console-ui",
  integrations: [
    react({
      include: [
        "**/react-*.tsx",
        "**/theme-toggle.tsx",
        "../../registry/react/**/*.tsx",
      ],
    }),
    solid({
      include: ["**/solid-*.tsx", "../../registry/solid/**/*.tsx"],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@/": new URL("../../", import.meta.url).pathname,
      },
    },
  },
})
