import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import { Popover as PopoverPrimitive } from "@kobalte/core/popover"

import { cx } from "@/registry/solid/lib/cva"

export const PopoverPortal = PopoverPrimitive.Portal

export type PopoverProps = ComponentProps<typeof PopoverPrimitive>

export const Popover = (props: PopoverProps) => {
  const merge = mergeProps<PopoverProps[]>(
    {
      gutter: 4,
    },
    props,
  )

  return <PopoverPrimitive data-slot="popover" {...merge} />
}

export type PopoverTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof PopoverPrimitive.Trigger<T>>

export const PopoverTrigger = <T extends ValidComponent = "button">(
  props: PopoverTriggerProps<T>,
) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

export type PopoverContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof PopoverPrimitive.Content<T>>

export const PopoverContent = <T extends ValidComponent = "div">(
  props: PopoverContentProps<T>,
) => {
  const [, rest] = splitProps(props as PopoverContentProps, ["class"])

  return (
    <PopoverPrimitive.Content
      data-slot="popover-content"
      class={cx(
        "z-50 w-72 origin-(--kb-popover-content-transform-origin) rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=popover-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=popover-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=popover-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=popover-content]]:slide-in-from-right-2",
        props.class,
      )}
      {...rest}
    />
  )
}

export type PopoverHeaderProps = ComponentProps<"div">

export const PopoverHeader = (props: PopoverHeaderProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="popover-header"
      class={cx("flex flex-col gap-1 text-sm", props.class)}
      {...rest}
    />
  )
}

export type PopoverTitleProps<T extends ValidComponent = "h2"> =
  ComponentProps<typeof PopoverPrimitive.Title<T>>

export const PopoverTitle = <T extends ValidComponent = "h2">(
  props: PopoverTitleProps<T>,
) => {
  const [, rest] = splitProps(props as PopoverTitleProps, ["class"])

  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      class={cx("font-medium", props.class)}
      {...rest}
    />
  )
}

export type PopoverDescriptionProps<T extends ValidComponent = "p"> =
  ComponentProps<typeof PopoverPrimitive.Description<T>>

export const PopoverDescription = <T extends ValidComponent = "p">(
  props: PopoverDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as PopoverDescriptionProps, ["class"])

  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      class={cx("text-muted-foreground", props.class)}
      {...rest}
    />
  )
}
