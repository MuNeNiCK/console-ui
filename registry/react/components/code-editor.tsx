"use client"

import * as React from "react"
import type * as Monaco from "monaco-editor"
import "monaco-editor/min/vs/editor/editor.main.css"

export type CodeEditorProps = {
  value: string
  onChange?: (value: string) => void
  language?: "yaml" | "json"
  readOnly?: boolean
  height?: string
  className?: string
}
type MonacoEnvironment = {
  getWorker: (_moduleId: string, label: string) => Worker
}
type MonacoModule = typeof import("monaco-editor")
let monacoPromise: Promise<MonacoModule> | undefined

async function loadMonaco(): Promise<MonacoModule> {
  if (!monacoPromise)
    monacoPromise = Promise.all([
      import("monaco-editor"),
      import("monaco-editor/esm/vs/editor/editor.worker.js?worker"),
      import("monaco-editor/esm/vs/language/json/json.worker.js?worker"),
    ]).then(([monaco, editorWorkerModule, jsonWorkerModule]) => {
      const EditorWorker = editorWorkerModule.default
      const JsonWorker = jsonWorkerModule.default
      ;(
        self as typeof self & { MonacoEnvironment?: MonacoEnvironment }
      ).MonacoEnvironment = {
        getWorker: (_moduleId, label) =>
          label === "json" ? new JsonWorker() : new EditorWorker(),
      }
      return monaco
    })
  return monacoPromise
}

export function CodeEditor({
  value,
  onChange,
  language = "yaml",
  readOnly = false,
  height = "400px",
  className,
}: CodeEditorProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const editorRef = React.useRef<
    Monaco.editor.IStandaloneCodeEditor | undefined
  >(undefined)
  const onChangeRef = React.useRef(onChange)
  const suppressChange = React.useRef(false)
  React.useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])
  React.useEffect(() => {
    let disposed = false
    let subscription: Monaco.IDisposable | undefined
    void loadMonaco().then((monaco) => {
      if (disposed || !containerRef.current) return
      const editor = monaco.editor.create(containerRef.current, {
        value,
        language,
        readOnly,
        theme: document.documentElement.classList.contains("dark")
          ? "vs-dark"
          : "vs",
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
      editorRef.current = editor
      subscription = editor.onDidChangeModelContent(() => {
        if (!suppressChange.current) onChangeRef.current?.(editor.getValue())
      })
    })
    return () => {
      disposed = true
      subscription?.dispose()
      editorRef.current?.dispose()
      editorRef.current = undefined
    }
  }, [])
  React.useEffect(() => {
    const editor = editorRef.current
    if (!editor || editor.getValue() === value) return
    suppressChange.current = true
    editor.setValue(value)
    suppressChange.current = false
  }, [value])
  React.useEffect(() => {
    editorRef.current?.updateOptions({ readOnly })
  }, [readOnly])
  return (
    <div className={className} style={{ height }}>
      <div
        ref={containerRef}
        className="h-full w-full overflow-hidden rounded border border-border/60 bg-card shadow-xs"
      />
    </div>
  )
}
