import { For, Show, type JSX } from "solid-js"

import { FormSection } from "@/components/form-fields"
import { ManifestPreview } from "@/components/review-summary"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type FormStep = "configure" | "review"

export interface FormStepIndicatorProps {
  current: FormStep
  reviewDetail?: string
}

const steps: { id: FormStep; label: string; description: string }[] = [
  { id: "configure", label: "Configure", description: "Edit form or manifest" },
  { id: "review", label: "Review", description: "Confirm before submit" },
]

export function FormStepIndicator(props: FormStepIndicatorProps) {
  const currentIndex = () => steps.findIndex((step) => step.id === props.current)

  return (
    <ol class="flex shrink-0 flex-wrap items-center justify-end gap-x-4 gap-y-2">
      <For each={steps}>
        {(step, index) => {
          const active = () => index() === currentIndex()
          const complete = () => index() < currentIndex()
          return (
            <li class="flex min-w-0 items-center gap-2.5">
              <span
                class={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full border text-xs font-bold",
                  active() &&
                    "border-primary bg-primary text-primary-foreground",
                  complete() &&
                    "border-primary bg-primary text-primary-foreground",
                  !active() &&
                    !complete() &&
                    "border-border bg-card text-muted-foreground",
                )}
              >
                {index() + 1}
              </span>
              <span class="min-w-0">
                <strong
                  class={cn(
                    "block truncate text-sm",
                    active() || complete()
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </strong>
                <span class="block text-xs text-muted-foreground">
                  {step.id === "review"
                    ? props.reviewDetail ?? step.description
                    : step.description}
                </span>
              </span>
            </li>
          )
        }}
      </For>
    </ol>
  )
}

export interface ConfigureTabsProps {
  children: JSX.Element
  manifest?: JSX.Element | string
  value?: string
  onValueChange?: (value: string) => void
  yamlError?: string
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

export function ConfigureTabs(props: ConfigureTabsProps) {
  return (
    <Tabs
      defaultValue="general"
      value={props.value}
      onChange={props.onValueChange}
      class="min-h-full"
    >
      <TabsList class="mb-4 ml-auto">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="manifest">Manifest</TabsTrigger>
      </TabsList>
      <TabsContent value="general" class="pt-0">
        {props.children}
      </TabsContent>
      <TabsContent value="manifest" class="pt-0">
        <FormSection
          title={props.manifestTitle ?? "Manifest"}
          meta={props.manifestMeta ?? "Preview"}
        >
          <Show when={props.yamlError}>
            {(yamlError) => (
              <p class="mb-1 text-xs text-destructive min-[980px]:col-span-3">
                {yamlError()}
              </p>
            )}
          </Show>
          {renderManifest(props.manifest)}
        </FormSection>
      </TabsContent>
    </Tabs>
  )
}
