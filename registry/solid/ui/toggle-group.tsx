import type { ComponentProps, ValidComponent } from "solid-js"
import { createContext, splitProps, useContext } from "solid-js"
import { ToggleGroup as ToggleGroupPrimitive } from "@kobalte/core/toggle-group"
import type { VariantProps } from "cva"

import { cx } from "@/registry/solid/lib/cva"

import { toggleButtonVariants } from "./toggle"

const ToggleGroupContext =
  createContext<
    VariantProps<typeof toggleButtonVariants> & {
      spacing?: number
      orientation?: "horizontal" | "vertical"
    }
  >()

export type ToggleGroupProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof ToggleGroupPrimitive<T>
> &
  VariantProps<typeof toggleButtonVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }

export const ToggleGroup = <T extends ValidComponent = "div">(
  props: ToggleGroupProps<T>,
) => {
  const [, rest] = splitProps(props as ToggleGroupProps, [
    "class",
    "variant",
    "size",
    "children",
    "spacing",
    "orientation",
  ])

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={props.variant}
      data-size={props.size}
      data-spacing={props.spacing ?? 2}
      data-orientation={props.orientation ?? "horizontal"}
      style={{ "--gap": `${props.spacing ?? 2}` }}
      class={cx(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-full data-[spacing=0]:gap-0 data-[spacing=0]:border data-[spacing=0]:border-border data-[spacing=0]:bg-card data-[spacing=0]:p-0.5 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-vertical:flex-col data-vertical:items-stretch",
        props.class,
      )}
      {...rest}
    >
      <ToggleGroupContext.Provider
        value={{
          get size() {
            return props.size
          },
          get variant() {
            return props.variant
          },
          get spacing() {
            return props.spacing ?? 2
          },
          get orientation() {
            return props.orientation ?? "horizontal"
          },
        }}
      >
        {props.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

export type ToggleGroupItemProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof ToggleGroupPrimitive.Item<T>> &
    VariantProps<typeof toggleButtonVariants>

export const ToggleGroupItem = <T extends ValidComponent = "button">(
  props: ToggleGroupItemProps<T>,
) => {
  const [, rest] = splitProps(props as ToggleGroupItemProps, [
    "class",
    "variant",
    "size",
  ])
  const context = useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context?.variant ?? props.variant}
      data-size={context?.size ?? props.size}
      data-spacing={context?.spacing}
      class={toggleButtonVariants({
        variant: context?.variant ?? props.variant,
        size: context?.size ?? props.size,
        class: [
          "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-full group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-full group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-full group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-full group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-full group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-full group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-full group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-full",
          props.class,
        ],
      })}
      {...rest}
    />
  )
}
