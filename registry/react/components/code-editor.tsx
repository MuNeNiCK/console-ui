"use client";

import * as React from "react";
import type * as Monaco from "monaco-editor";

export type CodeEditorMarker = {
  severity: "error" | "warning" | "info" | "hint";
  message: string;
  code?: string;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

export type CodeEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  language?: "yaml" | "json";
  readOnly?: boolean;
  ariaLabel?: string;
  markers?: CodeEditorMarker[];
  markerOwner?: string;
  height?: string;
  className?: string;
};
type MonacoEnvironment = {
  getWorker: (_moduleId: string, label: string) => Worker;
};
type MonacoModule = typeof import("monaco-editor/editor/editor.api.js");
let monacoPromise: Promise<MonacoModule> | undefined;

async function loadMonaco(): Promise<MonacoModule> {
  if (!monacoPromise)
    monacoPromise = Promise.all([
      import("monaco-editor/editor/editor.api.js"),
      import("monaco-editor/languages/definitions/yaml/register.js"),
      // Monaco exports this contribution without a declaration file.
      // @ts-expect-error -- runtime module is part of monaco-editor.
      import("monaco-editor/language/json/monaco.contribution.js"),
      import("monaco-editor/editor/editor.worker.js?worker"),
      import("monaco-editor/language/json/json.worker.js?worker"),
    ]).then(([monaco, , , editorWorkerModule, jsonWorkerModule]) => {
      const EditorWorker = editorWorkerModule.default;
      const JsonWorker = jsonWorkerModule.default;
      (self as typeof self & { MonacoEnvironment?: MonacoEnvironment }).MonacoEnvironment = {
        getWorker: (_moduleId, label) => (label === "json" ? new JsonWorker() : new EditorWorker()),
      };
      return monaco;
    });
  return monacoPromise;
}

export function CodeEditor({
  value,
  onChange,
  language = "yaml",
  readOnly = false,
  ariaLabel = "Code editor",
  markers = [],
  markerOwner = "code-editor",
  height = "400px",
  className,
}: CodeEditorProps) {
  const [loadState, setLoadState] = React.useState<"loading" | "ready" | "error">("loading");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<Monaco.editor.IStandaloneCodeEditor | undefined>(undefined);
  const monacoRef = React.useRef<MonacoModule | undefined>(undefined);
  const onChangeRef = React.useRef(onChange);
  const valueRef = React.useRef(value);
  const languageRef = React.useRef(language);
  const readOnlyRef = React.useRef(readOnly);
  const ariaLabelRef = React.useRef(ariaLabel);
  const markersRef = React.useRef(markers);
  const markerOwnerRef = React.useRef(markerOwner);
  const suppressChange = React.useRef(false);
  valueRef.current = value;
  languageRef.current = language;
  readOnlyRef.current = readOnly;
  ariaLabelRef.current = ariaLabel;
  markersRef.current = markers;
  markerOwnerRef.current = markerOwner;
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React.useEffect(() => {
    let disposed = false;
    let subscription: Monaco.IDisposable | undefined;
    const themeObserver = new MutationObserver(() => {
      monacoRef.current?.editor.setTheme(
        document.documentElement.classList.contains("dark") ? "vs-dark" : "vs",
      );
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    void loadMonaco()
      .then((monaco) => {
        if (disposed || !containerRef.current) return;
        monacoRef.current = monaco;
        const editor = monaco.editor.create(containerRef.current, {
          value: valueRef.current,
          language: languageRef.current,
          readOnly: readOnlyRef.current,
          ariaLabel: ariaLabelRef.current,
          theme: document.documentElement.classList.contains("dark") ? "vs-dark" : "vs",
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
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
        });
        editorRef.current = editor;
        updateMarkers(monaco, editor.getModel(), markerOwnerRef.current, markersRef.current);
        subscription = editor.onDidChangeModelContent(() => {
          if (!suppressChange.current) onChangeRef.current?.(editor.getValue());
        });
        setLoadState("ready");
      })
      .catch(() => {
        if (!disposed) setLoadState("error");
      });
    return () => {
      disposed = true;
      themeObserver.disconnect();
      subscription?.dispose();
      const model = editorRef.current?.getModel();
      editorRef.current?.dispose();
      model?.dispose();
      editorRef.current = undefined;
      monacoRef.current = undefined;
    };
  }, []);
  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor || editor.getValue() === value) return;
    suppressChange.current = true;
    editor.setValue(value);
    suppressChange.current = false;
  }, [value]);
  React.useEffect(() => {
    editorRef.current?.updateOptions({ readOnly });
  }, [readOnly]);
  React.useEffect(() => {
    const model = editorRef.current?.getModel();
    if (model) monacoRef.current?.editor.setModelLanguage(model, language);
  }, [language]);
  React.useEffect(() => {
    editorRef.current?.updateOptions({ ariaLabel });
  }, [ariaLabel]);
  React.useEffect(() => {
    updateMarkers(monacoRef.current, editorRef.current?.getModel(), markerOwner, markers);
  }, [markerOwner, markers]);
  return (
    <div className={`relative ${className ?? ""}`} style={{ height }}>
      <div
        ref={containerRef}
        className="h-full w-full overflow-hidden rounded border border-border/60 bg-card shadow-xs"
      />
      {loadState !== "ready" && (
        <div className="absolute inset-0 grid place-items-center rounded border border-border/60 bg-card text-sm text-muted-foreground">
          {loadState === "loading" ? (
            <span className="flex items-center gap-2" role="status">
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground"
              />
              Loading editor…
            </span>
          ) : (
            <span role="alert">Unable to load editor.</span>
          )}
        </div>
      )}
    </div>
  );
}

function updateMarkers(
  monaco: MonacoModule | undefined,
  model: Monaco.editor.ITextModel | null | undefined,
  owner: string,
  markers: CodeEditorMarker[],
) {
  if (!monaco || !model) return;
  monaco.editor.setModelMarkers(
    model,
    owner,
    markers.map((marker) => ({
      ...marker,
      severity: markerSeverity(monaco, marker.severity),
    })),
  );
}

function markerSeverity(monaco: MonacoModule, severity: CodeEditorMarker["severity"]) {
  switch (severity) {
    case "error":
      return monaco.MarkerSeverity.Error;
    case "warning":
      return monaco.MarkerSeverity.Warning;
    case "info":
      return monaco.MarkerSeverity.Info;
    case "hint":
      return monaco.MarkerSeverity.Hint;
  }
}
