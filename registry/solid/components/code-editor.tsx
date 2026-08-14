import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
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
  class?: string;
};

type MonacoEnvironment = {
  getWorker: (_moduleId: string, label: string) => Worker;
};

type MonacoModule = typeof import("monaco-editor/editor/editor.api.js");

let monacoPromise: Promise<MonacoModule> | undefined;

async function loadMonaco(): Promise<MonacoModule> {
  if (!monacoPromise) {
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
      const globalScope = self as typeof self & {
        MonacoEnvironment?: MonacoEnvironment;
      };

      globalScope.MonacoEnvironment = {
        getWorker: (_moduleId, label) => {
          if (label === "json") return new JsonWorker();
          return new EditorWorker();
        },
      };

      return monaco;
    });
  }

  return monacoPromise;
}

export function CodeEditor(props: CodeEditorProps) {
  const [loadState, setLoadState] = createSignal<"loading" | "ready" | "error">("loading");
  let container: HTMLDivElement | undefined;
  let editor: Monaco.editor.IStandaloneCodeEditor | undefined;
  let monacoModule: MonacoModule | undefined;
  let suppressChange = false;

  onMount(() => {
    let disposed = false;
    let disposable: Monaco.IDisposable | undefined;
    const themeObserver = new MutationObserver(() => {
      monacoModule?.editor.setTheme(
        document.documentElement.classList.contains("dark") ? "vs-dark" : "vs",
      );
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    void loadMonaco()
      .then((monaco) => {
        if (disposed || !container) return;

        monacoModule = monaco;
        editor = monaco.editor.create(container, {
          value: props.value,
          language: props.language ?? "yaml",
          readOnly: props.readOnly ?? false,
          ariaLabel: props.ariaLabel ?? "Code editor",
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
        updateMarkers(
          monaco,
          editor.getModel(),
          props.markerOwner ?? "code-editor",
          props.markers ?? [],
        );

        disposable = editor.onDidChangeModelContent(() => {
          if (!editor || suppressChange) return;
          props.onChange?.(editor.getValue());
        });
        setLoadState("ready");
      })
      .catch(() => {
        if (!disposed) setLoadState("error");
      });

    onCleanup(() => {
      disposed = true;
      themeObserver.disconnect();
      disposable?.dispose();
      const model = editor?.getModel();
      editor?.dispose();
      model?.dispose();
    });
  });

  createEffect(() => {
    const value = props.value;
    if (!editor) return;
    if (editor.getValue() === value) return;

    suppressChange = true;
    editor.setValue(value);
    suppressChange = false;
  });

  createEffect(() => {
    const markers = props.markers ?? [];
    const owner = props.markerOwner ?? "code-editor";
    updateMarkers(monacoModule, editor?.getModel(), owner, markers);
  });

  createEffect(() => {
    const readOnly = props.readOnly ?? false;
    editor?.updateOptions({ readOnly });
  });

  createEffect(() => {
    const language = props.language ?? "yaml";
    const model = editor?.getModel();
    if (monacoModule && model) monacoModule.editor.setModelLanguage(model, language);
  });

  return (
    <div class={`relative ${props.class ?? ""}`} style={{ height: props.height ?? "400px" }}>
      <div
        ref={(element) => {
          container = element;
        }}
        class="h-full w-full overflow-hidden rounded border border-border/60 bg-card shadow-xs"
      />
      <Show when={loadState() !== "ready"}>
        <div class="absolute inset-0 grid place-items-center rounded border border-border/60 bg-card text-sm text-muted-foreground">
          <Show
            when={loadState() === "loading"}
            fallback={<span role="alert">Unable to load editor.</span>}
          >
            <span class="flex items-center gap-2" role="status">
              <span
                aria-hidden="true"
                class="size-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground"
              />
              Loading editor…
            </span>
          </Show>
        </div>
      </Show>
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
