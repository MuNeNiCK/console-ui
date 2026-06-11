import { splitProps, type ComponentProps } from "solid-js"

import { cx } from "@/registry/solid/lib/cva"

export type KbdProps = ComponentProps<"kbd">

export const Kbd = (props: KbdProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <kbd
      data-slot="kbd"
      class={cx(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm border border-border bg-card px-1 font-sans text-xs font-medium text-muted-foreground select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        props.class,
      )}
      {...rest}
    />
  )
}

export type KbdGroupProps = ComponentProps<"div">

export const KbdGroup = (props: KbdGroupProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="kbd-group"
      class={cx("inline-flex items-center gap-1", props.class)}
      {...rest}
    />
  )
}
