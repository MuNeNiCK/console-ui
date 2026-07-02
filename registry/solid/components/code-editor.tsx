import { createEffect, onCleanup, onMount } from "solid-js"
import type * as Monaco from "monaco-editor"
import "monaco-editor/min/vs/editor/editor.main.css"

export type CodeEditorProps = {
  value: string
  onChange?: (value: string) => void
  language?: "yaml" | "json"
  readOnly?: boolean
  height?: string
  class?: string
}

type MonacoEnvironment = {
  getWorker: (_moduleId: string, label: string) => Worker
}

type MonacoModule = typeof import("monaco-editor")

let monacoPromise: Promise<MonacoModule> | undefined

async function loadMonaco(): Promise<MonacoModule> {
  if (!monacoPromise) {
    monacoPromise = Promise.all([
      import("monaco-editor"),
      import("monaco-editor/esm/vs/editor/editor.worker.js?worker"),
      import("monaco-editor/esm/vs/language/json/json.worker.js?worker"),
    ]).then(([monaco, editorWorkerModule, jsonWorkerModule]) => {
      const EditorWorker = editorWorkerModule.default
      const JsonWorker = jsonWorkerModule.default
      const globalScope = self as typeof self & {
        MonacoEnvironment?: MonacoEnvironment
      }

      globalScope.MonacoEnvironment = {
        getWorker: (_moduleId, label) => {
          if (label === "json") return new JsonWorker()
          return new EditorWorker()
        },
      }

      return monaco
    })
  }

  return monacoPromise
}

export function CodeEditor(props: CodeEditorProps) {
  let container!: HTMLDivElement
  let editor: Monaco.editor.IStandaloneCodeEditor | undefined
  let suppressChange = false

  onMount(() => {
    let disposed = false
    let disposable: Monaco.IDisposable | undefined

    void loadMonaco().then((monaco) => {
      if (disposed) return

      editor = monaco.editor.create(container, {
        value: props.value,
        language: props.language ?? "yaml",
        readOnly: props.readOnly ?? false,
        theme: document.documentElement.classList.contains("dark") ? "vs-dark" : "vs",
        minimap: { enabled: false },
        fontSize: 13,
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
        padding: { top: 12, bottom: 12 },
        renderLineHighlight: "none",
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          vertical: "auto",
          horizontal: "auto",
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      })

      disposable = editor.onDidChangeModelContent(() => {
        if (!editor || suppressChange) return
        props.onChange?.(editor.getValue())
      })
    })

    onCleanup(() => {
      disposed = true
      disposable?.dispose()
      editor?.dispose()
    })
  })

  createEffect(() => {
    if (!editor) return
    if (editor.getValue() === props.value) return

    suppressChange = true
    editor.setValue(props.value)
    suppressChange = false
  })

  createEffect(() => {
    editor?.updateOptions({ readOnly: props.readOnly ?? false })
  })

  return (
    <div
      class={props.class}
      style={{ height: props.height ?? "400px" }}
    >
      <div
        ref={container}
        class="h-full w-full overflow-hidden rounded border border-border/60 bg-card shadow-xs"
      />
    </div>
  )
}
