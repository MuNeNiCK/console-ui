import { splitProps, type JSX } from "solid-js"

import { CheckIcon, ChevronDownIcon, XIcon } from "@/registry/solid/lib/icons"
import { cn } from "@/registry/solid/lib/utils"

function Combobox(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="combobox"
      class={cn("relative inline-flex flex-col gap-1.5", local.class)}
      {...rest}
    />
  )
}

function ComboboxInput(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="combobox-input-wrapper"
      class={cn(
        "flex h-10 w-auto items-center rounded-md border border-input bg-card text-sm shadow-[0_1px_1px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/35",
        local.class
      )}
    >
      <input
        data-slot="combobox-input"
        class="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        {...rest}
      />
      <button
        type="button"
        data-slot="combobox-trigger"
        class="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground"
      >
        <ChevronDownIcon class="size-4" />
      </button>
    </div>
  )
}

function ComboboxContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="combobox-content"
      class={cn(
        "max-h-80 overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        local.class
      )}
      {...rest}
    />
  )
}

function ComboboxGroup(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="combobox-group" {...props} />
}

function ComboboxItem(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <div
      data-slot="combobox-item"
      class={cn(
        "relative flex h-8 w-full cursor-default items-center gap-2 rounded-md px-2.5 pr-8 text-sm outline-hidden select-none data-selected:bg-primary/10 data-selected:text-primary hover:bg-primary/10",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <span class="pointer-events-none absolute right-2 hidden size-4 items-center justify-center data-selected:flex">
        <CheckIcon class="size-4" />
      </span>
    </div>
  )
}

function ComboboxEmpty(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="combobox-empty"
      class={cn("py-2 text-center text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

function ComboboxTrigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" data-slot="combobox-trigger" {...props} />
}

function ComboboxClear(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" data-slot="combobox-clear" {...props}>
      <XIcon />
    </button>
  )
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxTrigger,
  ComboboxClear,
}
