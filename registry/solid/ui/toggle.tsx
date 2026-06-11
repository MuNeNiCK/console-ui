import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"
import { ToggleButton as ToggleButtonPrimitive } from "@kobalte/core/toggle-button"
import type { VariantProps } from "cva"

import { cva } from "@/registry/solid/lib/cva"

export const toggleButtonVariants = cva({
  base: "inline-flex items-center justify-center gap-2 rounded-full border border-transparent text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow] outline-none hover:border-input hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary data-[pressed]:border-primary data-[pressed]:bg-primary/10 data-[pressed]:text-primary dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border-border bg-card hover:border-primary/60 hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export type ToggleButtonProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof ToggleButtonPrimitive<T>> &
    VariantProps<typeof toggleButtonVariants>

export const ToggleButton = <T extends ValidComponent = "button">(
  props: ToggleButtonProps<T>,
) => {
  const [, rest] = splitProps(props as ToggleButtonProps, [
    "class",
    "variant",
    "size",
  ])

  return (
    <ToggleButtonPrimitive
      data-slot="toggle"
      class={toggleButtonVariants({
        variant: props.variant,
        size: props.size,
        class: props.class,
      })}
      {...rest}
    />
  )
}


export const Toggle = ToggleButton
export const toggleVariants = toggleButtonVariants
