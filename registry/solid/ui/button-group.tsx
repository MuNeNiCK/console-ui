import type { ValidComponent } from "solid-js"
import { mergeProps, splitProps, type ComponentProps } from "solid-js"
import {
  Polymorphic,
  type ElementOf,
  type PolymorphicProps,
} from "@kobalte/core"
import type { VariantProps } from "cva"

import { cva, cx } from "@/registry/solid/lib/cva"

import { Separator, type SeparatorProps } from "./separator"

export const buttonGroupVariants = cva({
  base: [
    "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*:focus-visible]:relative [&>*:focus-visible]:z-10 [&>*:hover]:relative [&>*:hover]:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  ],
  variants: {
    orientation: {
      horizontal:
        "[&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full [&>*:not(:first-child)]:-ml-0.5 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
      vertical:
        "flex-col [&>*:first-child]:rounded-t-full [&>*:last-child]:rounded-b-full [&>*:not(:first-child)]:-mt-0.5 [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export type ButtonGroupProps = ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants>

export const ButtonGroup = (props: ButtonGroupProps) => {
  const [, rest] = splitProps(props, ["class", "orientation"])

  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={props.orientation}
      class={buttonGroupVariants({
        orientation: props.orientation,
        class: props.class,
      })}
      {...rest}
    />
  )
}

export type ButtonTextProps<T extends ValidComponent = "div"> = Partial<
  ElementOf<T>
>

export const ButtonText = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ButtonTextProps<T>>,
) => {
  const merge = mergeProps({ as: "div" }, props)
  const [, rest] = splitProps(merge, ["as", "class"])

  return (
    <Polymorphic
      as={merge.as}
      data-slot="button-group-text"
      class={cx(
        "flex h-10 items-center gap-2 border border-border bg-card px-3 text-sm font-medium text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        merge.class,
      )}
      {...rest}
    />
  )
}

export type ButtonSeparatorProps<T extends ValidComponent = "hr"> =
  SeparatorProps<T>

export const ButtonSeparator = <T extends ValidComponent = "hr">(
  props: ButtonSeparatorProps<T>,
) => {
  const merge = mergeProps({ orientation: "vertical" }, props)
  const [, rest] = splitProps(merge as ButtonSeparatorProps, ["class"])

  return (
    <Separator
      data-slot="button-group-separator"
      class={cx(
        "relative m-0! self-stretch bg-border data-[orientation=vertical]:h-auto data-vertical:h-auto",
        merge.class,
      )}
      {...rest}
    />
  )
}


export const ButtonGroupText = ButtonText
export const ButtonGroupSeparator = ButtonSeparator
