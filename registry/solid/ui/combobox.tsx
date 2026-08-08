import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"
import { Combobox as ComboboxPrimitive } from "@kobalte/core/combobox"
import CheckIcon from "lucide-solid/icons/check"
import ChevronDownIcon from "lucide-solid/icons/chevron-down"
import XIcon from "lucide-solid/icons/x"

import { cx } from "@/registry/solid/lib/cva"
import { Button } from "@/registry/solid/ui/button"

export const ComboboxPortal = ComboboxPrimitive.Portal

export type ComboboxProps<
  Option,
  Group = never,
  T extends ValidComponent = "div",
> = ComponentProps<typeof ComboboxPrimitive<Option, Group, T>>

export const Combobox = <
  Option,
  Group = never,
  T extends ValidComponent = "div",
>(
  props: ComboboxProps<Option, Group, T>,
) => {
  const merged = mergeProps(
    {
      itemComponent: (itemProps) => (
        <ComboboxItem item={itemProps.item}>
          {itemProps.item.textValue}
        </ComboboxItem>
      ),
    } as Partial<ComboboxProps<Option, Group>>,
    props,
  )
  const [, rest] = splitProps(merged as ComboboxProps<Option, Group>, [
    "class",
    "options",
  ])

  return (
    <ComboboxPrimitive
      data-slot="combobox"
      class={cx(merged.class)}
      options={merged.options ?? []}
      {...rest}
    />
  )
}

export type ComboboxInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof ComboboxPrimitive.Input<T>> & {
    showTrigger?: boolean
    showClear?: boolean
  }

export const ComboboxInput = <T extends ValidComponent = "input">(
  props: ComboboxInputProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxInputProps, [
    "class",
    "children",
    "disabled",
    "showTrigger",
    "showClear",
  ])
  const showTrigger = () => props.showTrigger ?? true

  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={cx(
        "group/input-group relative flex h-9 w-auto min-w-0 items-center rounded-full border border-input bg-background transition-[border-color,box-shadow] outline-none hover:border-ring/45 data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive data-[invalid]:ring-destructive/20 dark:bg-input/20 dark:data-[invalid]:ring-destructive/40",
        props.class,
      )}
    >
      <ComboboxPrimitive.Input
        data-slot="combobox-input"
        class="h-9 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        disabled={props.disabled}
        {...rest}
      />
      {showTrigger() && (
        <ComboboxTrigger
          disabled={props.disabled}
          class="mr-1 size-7 min-w-0 justify-center rounded-full border border-transparent p-0 hover:bg-accent"
        />
      )}
      {props.children}
    </ComboboxPrimitive.Control>
  )
}

export type ComboboxTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof ComboboxPrimitive.Trigger<T>>

export const ComboboxTrigger = <T extends ValidComponent = "button">(
  props: ComboboxTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxTriggerProps, [
    "class",
    "children",
  ])

  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      class={cx(
        "inline-flex items-center gap-2 text-sm outline-none [&_svg:not([class*='size-'])]:size-4",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        class="pointer-events-none size-4 text-muted-foreground"
      />
    </ComboboxPrimitive.Trigger>
  )
}

export type ComboboxControlProps<
  Option,
  T extends ValidComponent = "div",
> = ComponentProps<typeof ComboboxPrimitive.Control<Option, T>>

export const ComboboxControl = <Option, T extends ValidComponent = "div">(
  props: ComboboxControlProps<Option, T>,
) => {
  const [, rest] = splitProps(props as ComboboxControlProps<Option>, ["class"])

  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={cx(
        "group/input-group relative flex h-9 w-full min-w-0 items-center rounded-full border border-input bg-background transition-[border-color,box-shadow] outline-none hover:border-ring/45 data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive data-[invalid]:ring-destructive/20 dark:bg-input/20 dark:data-[invalid]:ring-destructive/40",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Content<T>>

export const ComboboxContent = <T extends ValidComponent = "div">(
  props: ComboboxContentProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxContentProps, ["class"])

  return (
    <ComboboxPrimitive.Content
      data-slot="combobox-content"
      class={cx(
        "group/combobox-content relative z-50 max-h-(--kb-popper-content-available-height) min-w-[8rem] origin-(--kb-combobox-content-transform-origin) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=combobox-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=combobox-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=combobox-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=combobox-content]]:slide-in-from-right-2",
        props.class,
      )}
      {...rest}
    >
      <ComboboxPrimitive.Listbox
        data-slot="combobox-list"
        class="max-h-80 overflow-y-auto overscroll-contain p-1 data-empty:p-0"
      />
    </ComboboxPrimitive.Content>
  )
}

export type ComboboxItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Item<T>>

export const ComboboxItem = <T extends ValidComponent = "div">(
  props: ComboboxItemProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxItemProps, ["class", "children"])

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      class={cx(
        "relative flex h-8 w-full cursor-default items-center gap-2 rounded-md px-2.5 pr-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-primary/10 data-[highlighted]:text-foreground data-[selected]:bg-primary/10 data-[selected]:text-primary [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      <ComboboxPrimitive.ItemIndicator class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <CheckIcon class="pointer-events-none size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

export type ComboboxItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.ItemLabel<T>>

export const ComboboxItemLabel = <T extends ValidComponent = "div">(
  props: ComboboxItemLabelProps<T>,
) => {
  return (
    <ComboboxPrimitive.ItemLabel data-slot="combobox-itemlabel" {...props} />
  )
}

export type ComboboxDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Description<T>>

export const ComboboxDescription = <T extends ValidComponent = "div">(
  props: ComboboxDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxDescriptionProps, ["class"])

  return (
    <ComboboxPrimitive.Description
      data-slot="combobox-description"
      class={cx(
        "text-muted-foreground text-sm data-[disabled]:opacity-50",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof ComboboxPrimitive.Label<T>>

export const ComboboxLabel = <T extends ValidComponent = "label">(
  props: ComboboxLabelProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxLabelProps, ["class"])

  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-label"
      class={cx(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.ErrorMessage<T>>

export const ComboboxErrorMessage = <T extends ValidComponent = "div">(
  props: ComboboxErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxErrorMessageProps, ["class"])

  return (
    <ComboboxPrimitive.ErrorMessage
      data-slot="combobox-errormessage"
      class={cx(
        "text-destructive text-sm data-[disabled]:opacity-50",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxSectionProps<T extends ValidComponent = "li"> =
  ComponentProps<typeof ComboboxPrimitive.Section<T>>

export const ComboboxSection = <T extends ValidComponent = "li">(
  props: ComboboxSectionProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxSectionProps, ["class"])

  return (
    <ComboboxPrimitive.Section
      data-slot="combobox-section"
      class={cx(
        "not-first-of-type:mt-1 text-muted-foreground",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxEmptyProps<T extends ValidComponent = "div"> =
  ComponentProps<T>

export const ComboboxEmpty = <T extends ValidComponent = "div">(
  props: ComboboxEmptyProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxEmptyProps, ["class"])

  return (
    <div
      data-slot="combobox-empty"
      class={cx("py-6 text-center text-sm text-muted-foreground", props.class)}
      {...rest}
    />
  )
}

export type ComboboxListProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Listbox<T>>

export const ComboboxList = <T extends ValidComponent = "div">(
  props: ComboboxListProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxListProps, ["class"])

  return (
    <ComboboxPrimitive.Listbox
      data-slot="combobox-list"
      class={cx(
        "max-h-80 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        props.class,
      )}
      {...rest}
    />
  )
}

export const ComboboxGroup = ComboboxSection

export type ComboboxValueProps = ComponentProps<"span">

export const ComboboxValue = (props: ComboboxValueProps) => {
  return <span data-slot="combobox-value" {...props} />
}

export type ComboboxCollectionProps = ComponentProps<"div">

export const ComboboxCollection = (props: ComboboxCollectionProps) => {
  return <div data-slot="combobox-collection" {...props} />
}

export type ComboboxSeparatorProps = ComponentProps<"div">

export const ComboboxSeparator = (props: ComboboxSeparatorProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="combobox-separator"
      class={cx("-mx-1 my-1 h-px bg-border", props.class)}
      {...rest}
    />
  )
}

export type ComboboxChipsProps = ComponentProps<"div">

export const ComboboxChips = (props: ComboboxChipsProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="combobox-chips"
      class={cx(
        "flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-sm transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/35 has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1.5 dark:bg-input/30 dark:has-aria-invalid:ring-destructive/40",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxChipProps = ComponentProps<"span"> & {
  showRemove?: boolean
}

export const ComboboxChip = (props: ComboboxChipProps) => {
  const [, rest] = splitProps(props, ["class", "children", "showRemove"])

  return (
    <span
      data-slot="combobox-chip"
      class={cx(
        "flex h-6 w-fit items-center justify-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 text-xs font-medium whitespace-nowrap text-primary has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      {(props.showRemove ?? true) && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          class="-ml-1 opacity-70 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon class="pointer-events-none" />
        </Button>
      )}
    </span>
  )
}

export type ComboboxChipsInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof ComboboxPrimitive.Input<T>>

export const ComboboxChipsInput = <T extends ValidComponent = "input">(
  props: ComboboxChipsInputProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxChipsInputProps, ["class"])

  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      class={cx("min-w-16 flex-1 outline-none", props.class)}
      {...rest}
    />
  )
}

export function useComboboxAnchor() {
  return undefined
}
