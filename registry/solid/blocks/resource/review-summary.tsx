import { createSignal, For, Show, type JSX } from "solid-js"
import CopyIcon from "lucide-solid/icons/copy"

import { FormSection } from "@/components/form-fields"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export interface ReviewItem {
  label: JSX.Element
  value: JSX.Element
  detail?: JSX.Element
}

export interface ReviewSummaryProps {
  items: ReviewItem[]
  manifest?: JSX.Element | string
  title: string
  meta?: JSX.Element
  manifestTitle?: string
  manifestMeta?: JSX.Element
}

function renderManifest(manifest: JSX.Element | string | undefined) {
  if (typeof manifest === "string") return <ManifestPreview value={manifest} />

  return (
    manifest ?? (
      <p class="text-sm text-muted-foreground min-[980px]:col-span-3">
        No manifest preview available.
      </p>
    )
  )
}

export function ReviewSummary(props: ReviewSummaryProps) {
  return (
    <Tabs defaultValue="summary" class="min-h-0">
      <TabsList class="mb-4 ml-auto">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="manifest">Manifest</TabsTrigger>
      </TabsList>
      <TabsContent value="summary" class="pt-0">
        <FormSection title={props.title} meta={props.meta ?? "Step 2 of 2"}>
          <dl class="grid grid-cols-1 overflow-hidden rounded-md border border-border bg-card min-[840px]:col-span-3 min-[840px]:grid-cols-3">
            <For each={props.items}>
              {(item) => (
                <div class="relative min-w-0 border-b border-border px-4 py-4 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-primary/55 last:border-b-0 min-[840px]:border-r min-[840px]:border-b-0 min-[840px]:last:border-r-0">
                  <dt class="block min-w-0 break-words text-xs leading-5 font-semibold text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd class="min-w-0">
                    <strong class="mt-1 block min-w-0 break-words text-[15px] leading-5">
                      {item.value || "-"}
                    </strong>
                    <Show when={item.detail}>
                      {(detail) => (
                        <small class="mt-2.5 block border-t border-border pt-2.5 text-xs leading-5 break-words text-muted-foreground">
                          {detail()}
                        </small>
                      )}
                    </Show>
                  </dd>
                </div>
              )}
            </For>
          </dl>
        </FormSection>
      </TabsContent>
      <TabsContent value="manifest" class="pt-0">
        <FormSection
          title={props.manifestTitle ?? "Manifest"}
          meta={props.manifestMeta ?? "Preview"}
        >
          {renderManifest(props.manifest)}
        </FormSection>
      </TabsContent>
    </Tabs>
  )
}

export function ReviewDetails(props: {
  items: Array<{ label: JSX.Element; value: JSX.Element }>
}) {
  return (
    <span class="grid gap-1.5">
      <For each={props.items}>
        {(item) => (
          <span class="grid min-w-0 gap-0.5">
            <span class="font-semibold text-foreground">{item.label}</span>
            <span class="break-words">{item.value}</span>
          </span>
        )}
      </For>
    </span>
  )
}

export function ReviewLabels(props: {
  labels: Array<{ key: string; value: string }>
}) {
  const visibleLabels = () => props.labels.filter((label) => label.key.trim())

  return (
    <Show
      when={visibleLabels().length > 0}
      fallback={<span class="text-muted-foreground">No labels</span>}
    >
      <span class="flex flex-col gap-1">
        <For each={visibleLabels()}>
          {(label) => (
            <span class="break-all">
              {label.key}={label.value || "\"\""}
            </span>
          )}
        </For>
      </span>
    </Show>
  )
}

export interface ManifestPreviewProps {
  value: string
  copy?: boolean
}

export function ManifestPreview(props: ManifestPreviewProps) {
  const [copied, setCopied] = createSignal(false)

  async function copyManifest() {
    await writeTextToClipboard(props.value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div class="min-[980px]:col-span-3">
      <Show when={props.copy !== false}>
        <div class="mb-2 flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="xs"
            aria-label="Copy manifest"
            onClick={copyManifest}
          >
            <CopyIcon />
            {copied() ? "Copied" : "Copy"}
          </Button>
        </div>
      </Show>
      <pre class="max-h-[360px] min-h-[220px] overflow-auto rounded border border-border/60 bg-card p-3 text-xs leading-5 text-foreground">
        <code>{props.value}</code>
      </pre>
    </div>
  )
}

async function writeTextToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return
  } catch {
    // Fallback for non-secure contexts.
  }

  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.top = "-9999px"
  document.body.append(textarea)
  textarea.select()
  document.execCommand("copy")
  textarea.remove()
}
