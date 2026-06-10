import { defineConfig } from "astro/config"
import react from "@vitejs/plugin-react"
import solid from "vite-plugin-solid"

const reactFiles = /(?:apps\/demo\/src\/components\/(?:component-preview-react|react-demo)|registry\/react\/).*\.tsx$/
const solidFiles = /(?:apps\/demo\/src\/components\/(?:component-preview-solid|solid-demo)|registry\/solid\/).*\.tsx$/

function jsxPlugins() {
  return [
    react({
      include: reactFiles,
    }),
    solid({
      include: solidFiles,
    }),
  ]
}

function jsxEsbuildOptions() {
  return {
    jsx: "automatic",
    jsxImportSource: "react",
  }
}

export default defineConfig(({ command }) => ({
  site: "https://munenick.github.io",
  base: "/console-ui",
  vite: {
    plugins: jsxPlugins(),
    environments: {
      client: {
        plugins: jsxPlugins(),
        esbuild: jsxEsbuildOptions(),
      },
    },
    esbuild: jsxEsbuildOptions(),
    define:
      command === "dev"
        ? {
            "process.env.NODE_ENV": '"development"',
          }
        : undefined,
    optimizeDeps:
      command === "dev"
        ? {
            esbuildOptions: {
              define: {
                "process.env.NODE_ENV": '"development"',
              },
            },
          }
        : undefined,
    resolve: {
      alias: {
        "@/": new URL("../../", import.meta.url).pathname,
      },
    },
  },
}))
