import { For, Show, type Component, type JSX } from "solid-js"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface DetailSectionProps {
  title: string
  meta?: string
  children: JSX.Element
  class?: string
}

export function DetailSection(props: DetailSectionProps) {
  return (
    <section
      class={cn(
        "min-w-0 border-t border-border min-[980px]:col-span-6",
        props.class,
      )}
    >
      <div class="flex min-h-11 items-center justify-between gap-4">
        <h2 class="m-0 text-[15px] font-[750]">{props.title}</h2>
        {props.meta ? (
          <span class="text-xs font-semibold text-muted-foreground">
            {props.meta}
          </span>
        ) : null}
      </div>
      {props.children}
    </section>
  )
}

export function DetailSummaryGrid(props: {
  children: JSX.Element
  class?: string
}) {
  return (
    <section class={cn("grid grid-cols-1 border-y border-border", props.class)}>
      {props.children}
    </section>
  )
}

export function DetailSummaryItem(props: {
  label: string
  children: JSX.Element
  icon?: Component<{ class?: string }>
  detail?: string
}) {
  const Icon = props.icon

  return (
    <div class="flex min-w-0 gap-2.5 border-border px-4 py-3.5 min-[980px]:border-r min-[980px]:last:border-r-0">
      {Icon ? (
        <Icon class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      ) : null}
      <div class="min-w-0">
        <span class="block min-w-0 truncate text-xs text-muted-foreground">
          {props.label}
        </span>
        <strong class="block min-w-0 truncate text-sm font-bold">
          {props.children}
        </strong>
        <Show when={props.detail}>
          {(detail) => (
            <small class="mt-0.5 block min-w-0 truncate text-xs text-muted-foreground">
              {detail()}
            </small>
          )}
        </Show>
      </div>
    </div>
  )
}

export function DetailRows(props: { children: JSX.Element; class?: string }) {
  return (
    <div class={cn("border-t border-border", props.class)}>
      {props.children}
    </div>
  )
}

export function DetailFieldGrid(props: {
  children: JSX.Element
  class?: string
}) {
  return (
    <dl
      class={cn(
        "m-0 grid grid-cols-1 border-t border-border min-[980px]:grid-cols-2",
        props.class,
      )}
    >
      {props.children}
    </dl>
  )
}

export function DetailField(props: {
  label: string
  children: JSX.Element
  class?: string
}) {
  return (
    <div
      class={cn(
        "min-w-0 border-b border-border px-3.5 py-3 min-[980px]:border-r min-[980px]:even:border-r-0",
        props.class,
      )}
    >
      <dt class="text-xs text-muted-foreground">{props.label}</dt>
      <dd class="mt-1.5 min-w-0 truncate text-[13px] font-semibold">
        {props.children}
      </dd>
    </div>
  )
}

export function MetadataLabels(props: { labels: [string, string][] }) {
  return (
    <Show
      when={props.labels.length > 0}
      fallback={
        <p class="border-t border-border py-3 text-sm text-muted-foreground">
          No labels defined.
        </p>
      }
    >
      <div class="flex flex-wrap gap-2 border-t border-border py-3">
        <For each={props.labels}>
          {([key, value]) => (
            <span class="inline-flex min-w-0 items-center rounded-md border border-border bg-card">
              <span class="border-r border-border px-2.5 py-1.5 text-xs text-muted-foreground">
                {key}
              </span>
              <span class="min-w-0 truncate px-2.5 py-1.5 text-xs font-semibold">
                {value}
              </span>
            </span>
          )}
        </For>
      </div>
    </Show>
  )
}

export interface ConditionRow {
  type?: string
  status?: string
  reason?: string
  message?: string
  lastTransitionTime?: string
}

export function ConditionsTable(props: { conditions: ConditionRow[] }) {
  return (
    <div class="border-t border-border">
      <Show
        when={props.conditions.length > 0}
        fallback={
          <p class="border-b border-border py-3 text-sm text-muted-foreground">
            No conditions reported.
          </p>
        }
      >
        <div class="hidden border-b border-border py-2 text-xs font-semibold text-muted-foreground min-[900px]:grid min-[900px]:grid-cols-[minmax(130px,0.8fr)_100px_minmax(140px,0.9fr)_150px_minmax(0,1.4fr)] min-[900px]:gap-4">
          <span>Type</span>
          <span>Status</span>
          <span>Reason</span>
          <span>Last transition</span>
          <span>Message</span>
        </div>
        <For each={props.conditions}>
          {(condition) => (
            <div class="grid gap-2 border-b border-border py-3 min-[900px]:grid-cols-[minmax(130px,0.8fr)_100px_minmax(140px,0.9fr)_150px_minmax(0,1.4fr)] min-[900px]:gap-4">
              <div class="flex min-w-0 items-center gap-2">
                <span
                  class={cn(
                    "size-2 shrink-0 rounded-full",
                    condition.status === "True"
                      ? "bg-success"
                      : condition.status === "False"
                        ? "bg-destructive"
                        : "bg-warning",
                  )}
                />
                <span class="min-w-0 truncate text-[13px] font-semibold">
                  {condition.type || "-"}
                </span>
              </div>
              <Badge variant="ghost" class="w-fit px-0">
                {condition.status || "-"}
              </Badge>
              <span class="min-w-0 truncate text-sm text-foreground/80">
                {condition.reason || "-"}
              </span>
              <span class="min-w-0 truncate text-xs text-muted-foreground">
                {formatConditionTimestamp(condition.lastTransitionTime)}
              </span>
              <p class="min-w-0 text-sm leading-5 text-foreground/80">
                {condition.message || "-"}
              </p>
            </div>
          )}
        </For>
      </Show>
    </div>
  )
}

function formatConditionTimestamp(value: string | undefined): string {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}
