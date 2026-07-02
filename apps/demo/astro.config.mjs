import { defineConfig } from "astro/config"
import babel from "@babel/core"
import typescriptPreset from "@babel/preset-typescript"
import solidPreset from "babel-preset-solid"
import { existsSync } from "node:fs"

const solidFiles = /(?:apps\/demo\/src\/components\/(?:component-preview-solid|solid-demo|block-preview-solid|solid-block-demo|resource-block-demo)|src\/components\/(?:component-preview-solid|solid-demo|block-preview-solid|solid-block-demo|resource-block-demo)|registry\/solid\/).*\.tsx$/

function jsxPlugins() {
  return [registryBlockAliasPlugin(), solidTransformPlugin()]
}

function registryBlockAliasPlugin() {
  return {
    name: "console-ui:registry-block-alias",
    enforce: "pre",
    resolveId(source, importer) {
      if (!importer) return null

      const cleanImporter = importer.replace(/\?.*$/, "")
      const match = cleanImporter.match(/registry\/(react|solid)\/blocks\//)

      if (!match) return null

      const framework = match[1]
      const root = new URL("../../", import.meta.url).pathname
      const resourceBlockImporter = cleanImporter.includes(
        `registry/${framework}/blocks/resource/`,
      )

      if (source.startsWith("@/components/ui/")) {
        return `${root}registry/${framework}/ui/${source.slice("@/components/ui/".length)}.tsx`
      }

      if (source.startsWith("@/components/blocks/")) {
        return `${root}registry/${framework}/blocks/${source.slice("@/components/blocks/".length)}.tsx`
      }

      if (resourceBlockImporter && source.startsWith("@/components/layouts/")) {
        const resourceLayoutPath = `${root}registry/${framework}/blocks/resource/layouts/${source.slice("@/components/layouts/".length)}.tsx`

        return existsSync(resourceLayoutPath) ? resourceLayoutPath : null
      }

      if (resourceBlockImporter && source.startsWith("@/components/")) {
        const name = source.slice("@/components/".length)
        const componentPath = `${root}registry/${framework}/components/${name}.tsx`
        const resourcePath = `${root}registry/${framework}/blocks/resource/${name}.tsx`

        if (existsSync(componentPath)) return componentPath
        if (existsSync(resourcePath)) return resourcePath

        return null
      }

      return null
    },
  }
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
