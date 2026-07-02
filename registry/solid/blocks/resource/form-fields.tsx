import type { JSX } from "solid-js"

import { cn } from "@/lib/utils"

export interface FormSectionProps {
  title: string
  meta?: JSX.Element
  children: JSX.Element
  columns?: 2 | 3
  class?: string
  gridClass?: string
}

export function FormSection(props: FormSectionProps) {
  return (
    <section
      class={cn(
        "min-w-0 border-t border-border py-[18px] first:border-t-0 first:pt-0",
        props.class,
      )}
    >
      <div class="mb-3.5 flex min-w-0 items-center justify-between gap-4">
        <h2 class="m-0 text-[15px] font-[750]">{props.title}</h2>
        {props.meta ? (
          <div class="text-xs font-semibold text-muted-foreground">
            {props.meta}
          </div>
        ) : null}
      </div>
      <div
        class={cn(
          "grid grid-cols-1 gap-x-[18px] gap-y-3.5",
          props.columns === 2
            ? "min-[980px]:grid-cols-2"
            : "min-[980px]:grid-cols-3",
          props.gridClass,
        )}
      >
        {props.children}
      </div>
    </section>
  )
}

export interface FormFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  description?: string
  children: JSX.Element
  class?: string
}

export function FormField(props: FormFieldProps) {
  return (
    <div class={cn("grid min-w-0 content-start gap-1.5", props.class)}>
      <label for={props.htmlFor} class="text-xs font-semibold text-muted-foreground">
        {props.label}
        {props.required ? <span class="ml-1 text-destructive">*</span> : null}
      </label>
      {props.children}
      {props.description ? (
        <p class="text-xs text-muted-foreground">{props.description}</p>
      ) : null}
    </div>
  )
}
