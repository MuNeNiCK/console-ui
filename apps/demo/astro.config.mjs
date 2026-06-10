import { defineConfig } from "astro/config"
import babel from "@babel/core"
import typescriptPreset from "@babel/preset-typescript"
import solidPreset from "babel-preset-solid"

const solidFiles = /(?:apps\/demo\/src\/components\/(?:component-preview-solid|solid-demo)|src\/components\/(?:component-preview-solid|solid-demo)|registry\/solid\/).*\.tsx$/

function jsxPlugins() {
  return [solidTransformPlugin()]
}

function solidTransformPlugin() {
  return {
    name: "console-ui:solid-transform",
    enforce: "pre",
    async transform(code, id) {
      const cleanId = id.replace(/\?.*$/, "")

      if (!solidFiles.test(cleanId)) return null

      const result = await babel.transformAsync(code, {
        filename: cleanId,
        sourceMaps: true,
        babelrc: false,
        configFile: false,
        presets: [
          [
            typescriptPreset,
            {
              allExtensions: true,
              isTSX: true,
            },
          ],
          [
            solidPreset,
            {
              generate: "dom",
              hydratable: false,
            },
          ],
        ],
      })

      if (!result?.code) return null

      return {
        code: result.code,
        map: result.map,
      }
    },
  }
}

function jsxEsbuildOptions() {
  return {
    jsx: "automatic",
    jsxImportSource: "react",
  }
}

export default defineConfig({
  site: "https://munenick.github.io",
  base: "/console-ui",
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: jsxPlugins(),
    environments: {
      client: {
        plugins: jsxPlugins(),
        esbuild: jsxEsbuildOptions(),
      },
    },
    esbuild: jsxEsbuildOptions(),
    resolve: {
      alias: {
        "@/": new URL("../../", import.meta.url).pathname,
      },
    },
  },
})
