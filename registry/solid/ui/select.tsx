import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"
import { Select as SelectPrimitive } from "@kobalte/core/select"
import { CheckIcon, ChevronDownIcon } from "lucide-solid"

import { cx } from "@/registry/solid/lib/cva"

export const SelectPortal = SelectPrimitive.Portal
export const HiddenSelect = SelectPrimitive.HiddenSelect

export type SelectProps<
  Option,
  OptGroup = never,
  T extends ValidComponent = "div",
> = ComponentProps<typeof SelectPrimitive<Option, OptGroup, T>>

export const Select = <
  Option,
  OptGroup = never,
  T extends ValidComponent = "div",
>(
  props: SelectProps<Option, OptGroup, T>,
) => {
  const merged = mergeProps(
    {
      itemComponent: (itemProps) => (
        <SelectItem item={itemProps.item}>{itemProps.item.textValue}</SelectItem>
      ),
    } as Partial<SelectProps<Option, OptGroup>>,
    props,
  )
  const [, rest] = splitProps(merged as SelectProps<Option, OptGroup>, [
    "class",
    "options",
  ])

  return (
    <SelectPrimitive
      data-slot="select"
      class={cx("space-y-2", merged.class)}
      options={merged.options ?? []}
      {...rest}
    />
  )
}

export type SelectValueProps<
  Options,
  T extends ValidComponent = "span",
> = ComponentProps<typeof SelectPrimitive.Value<Options, T>>

export const SelectValue = <Options, T extends ValidComponent = "span">(
  props: SelectValueProps<Options, T>,
) => {
  const [, rest] = splitProps(props as SelectValueProps<Options>, ["class"])

  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      class={cx("flex flex-1 text-left", props.class)}
      {...rest}
    />
  )
}

export type SelectTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof SelectPrimitive.Trigger<T>> & {
    size?: "sm" | "default"
  }

export const SelectTrigger = <T extends ValidComponent = "button">(
  props: SelectTriggerProps<T>,
) => {
  const merge = mergeProps({ size: "default" } as SelectTriggerProps, props)
  const [, rest] = splitProps(merge, ["class", "size", "children"])

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={merge.size}
      class={cx(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm whitespace-nowrap transition-[border-color,box-shadow] outline-none hover:border-input focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-10 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      <SelectPrimitive.Icon as={ChevronDownIcon} class="size-4 opacity-50" />
    </SelectPrimitive.Trigger>
  )
}

export type SelectContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SelectPrimitive.Content<T>>

export const SelectContent = <T extends ValidComponent = "div">(
  props: SelectContentProps<T>,
) => {
  const [, rest] = splitProps(props as SelectContentProps, ["class"])

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        class={cx(
          "relative isolate z-50 max-h-(--available-height) w-(--kb-popper-anchor-width) min-w-[8rem] origin-(--kb-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
          "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=select-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=select-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=select-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=select-content]]:slide-in-from-right-2",
          props.class,
        )}
        {...rest}
      >
        <SelectPrimitive.Listbox class="p-1 outline-none" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export type SelectItemProps<T extends ValidComponent = "li"> = ComponentProps<
  typeof SelectPrimitive.Item<T>
>

export const SelectItem = <T extends ValidComponent = "li">(
  props: SelectItemProps<T>,
) => {
  const [, rest] = splitProps(props as SelectItemProps, ["class", "children"])

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      class={cx(
        "relative flex h-8 w-full cursor-default items-center gap-2 rounded-md pr-8 pl-2.5 text-sm outline-hidden select-none data-[highlighted]:bg-primary/10 data-[highlighted]:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        props.class,
      )}
      {...rest}
    >
      <SelectPrimitive.ItemLabel class="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
        {(props as SelectItemProps).children}
      </SelectPrimitive.ItemLabel>
      <SelectPrimitive.ItemIndicator
        class="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center"
        as={CheckIcon}
      />
    </SelectPrimitive.Item>
  )
}

export type SelectSectionProps<T extends ValidComponent = "li"> =
  ComponentProps<typeof SelectPrimitive.Section<T>>

export const SelectSection = <T extends ValidComponent = "li">(
  props: SelectSectionProps<T>,
) => {
  const [, rest] = splitProps(props as SelectSectionProps, ["class"])

  return (
    <SelectPrimitive.Section
      data-slot="select-section"
      class={cx("px-2.5 py-1.5 text-xs font-semibold text-muted-foreground", props.class)}
      {...rest}
    />
  )
}

export type SelectDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SelectPrimitive.Description<T>>

export const SelectDescription = <T extends ValidComponent = "div">(
  props: SelectDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as SelectDescriptionProps, ["class"])

  return (
    <SelectPrimitive.Description
      data-slot="select-description"
      class={cx(
        "text-muted-foreground text-sm data-[disabled]:opacity-50",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SelectLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof SelectPrimitive.Label<T>>

export const SelectLabel = <T extends ValidComponent = "label">(
  props: SelectLabelProps<T>,
) => {
  const [, rest] = splitProps(props as SelectLabelProps, ["class"])

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      class={cx(
        "px-2.5 py-1.5 text-xs font-semibold text-muted-foreground",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SelectErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SelectPrimitive.ErrorMessage<T>>

export const SelectErrorMessage = <T extends ValidComponent = "div">(
  props: SelectErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as SelectErrorMessageProps, ["class"])

  return (
    <SelectPrimitive.ErrorMessage
      data-slot="select-errormessage"
      class={cx(
        "text-destructive text-sm data-[disabled]:opacity-50",
        props.class,
      )}
      {...rest}
    />
  )
}
