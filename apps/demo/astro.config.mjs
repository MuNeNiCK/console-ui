import { defineConfig } from "astro/config"
import babel from "@babel/core"
import typescriptPreset from "@babel/preset-typescript"
import solidPreset from "babel-preset-solid"
import { existsSync } from "node:fs"

const solidFiles =
  /(?:apps\/demo\/src\/components\/(?:component-preview-solid|solid-demo|block-preview-solid|solid-block-demo)|src\/components\/(?:component-preview-solid|solid-demo|block-preview-solid|solid-block-demo)|registry\/solid\/).*\.tsx$/

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

      if (source.startsWith("@/components/ui/")) {
        return `${root}registry/${framework}/ui/${source.slice("@/components/ui/".length)}.tsx`
      }

      if (source.startsWith("@/components/blocks/")) {
        const name = source.slice("@/components/blocks/".length)
        const blockFile = `${root}registry/${framework}/blocks/${name}.tsx`
        const blockPage = `${root}registry/${framework}/blocks/${name}/page.tsx`

        if (existsSync(blockFile)) return blockFile
        if (existsSync(blockPage)) return blockPage

        return null
      }

      if (source.startsWith("@/components/")) {
        const name = source.slice("@/components/".length)
        const componentPath = `${root}registry/${framework}/components/${name}.tsx`
        const blockPath = `${root}registry/${framework}/blocks/${name}.tsx`
        const blockPage = `${root}registry/${framework}/blocks/${name}/page.tsx`

        if (existsSync(componentPath)) return componentPath
        if (existsSync(blockPath)) return blockPath
        if (existsSync(blockPage)) return blockPage

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
