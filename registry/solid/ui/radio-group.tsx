import type { VoidProps } from "solid-js"
import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"
import { RadioGroup as RadioGroupPrimitive } from "@kobalte/core/radio-group"

import { cx } from "@/registry/solid/lib/cva"

export type RadioGroupProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof RadioGroupPrimitive<T>
>

export const RadioGroup = <T extends ValidComponent = "div">(
  props: RadioGroupProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupProps, ["class"])

  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      class={cx("grid w-full gap-3", props.class)}
      {...rest}
    />
  )
}

export type RadioGroupItemsProps = ComponentProps<"div">

export const RadioGroupItems = (props: RadioGroupItemsProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      role="presentation"
      data-slot="radio-group-items"
      class={cx("flex gap-3", props.class)}
      {...rest}
    />
  )
}

export type RadioGroupItemInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof RadioGroupPrimitive.ItemInput<T>>

export const RadioGroupItemInput = <T extends ValidComponent = "input">(
  props: RadioGroupItemInputProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupItemInputProps, ["class"])

  return (
    <RadioGroupPrimitive.ItemInput
      data-slot="radio-group-item-input"
      class={cx("peer/radio-group", props.class)}
      {...rest}
    />
  )
}

export type RadioGroupItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof RadioGroupPrimitive.Item<T>>

export const RadioGroupItem = <T extends ValidComponent = "div">(
  props: RadioGroupItemProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupItemProps, [
    "class",
    "children",
  ])

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      class={cx(
        "group relative grid aspect-square size-4 shrink-0 place-items-center rounded-full border border-border bg-card text-primary transition-[border-color,box-shadow] outline-none hover:border-input focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[checked]:border-primary dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        props.class,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.ItemInput />
      <RadioGroupPrimitive.ItemControl class="absolute inset-0 flex items-center justify-center rounded-full">
        <RadioGroupPrimitive.ItemIndicator
          forceMount
          data-slot="radio-group-indicator"
          class="absolute inset-0 flex items-center justify-center opacity-0 group-data-[checked]:opacity-100 data-[checked]:opacity-100"
        >
          <span class="size-2 rounded-full bg-primary" />
        </RadioGroupPrimitive.ItemIndicator>
      </RadioGroupPrimitive.ItemControl>
      {props.children}
    </RadioGroupPrimitive.Item>
  )
}

export type RadioGroupItemControlProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof RadioGroupPrimitive.ItemControl<T>>

export const RadioGroupItemControl = <T extends ValidComponent = "div">(
  props: RadioGroupItemControlProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupItemControlProps, ["class"])

  return (
    <RadioGroupPrimitive.ItemControl
      data-slot="radio-group-item-control"
      class={cx(
        "border-border bg-card text-primary dark:bg-input/30 flex size-4 items-center justify-center rounded-full border transition-[border-color,box-shadow] outline-none hover:border-input disabled:cursor-not-allowed disabled:opacity-50",
        "data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40 data-[invalid]:border-destructive",
        "peer-focus-visible/radio-group:ring-ring/35 peer-focus-visible/radio-group:border-ring peer-focus-visible/radio-group:ring-[3px]",
        props.class,
      )}
      {...rest}
    />
  )
}

export type RadioGroupItemIndicatorProps<T extends ValidComponent = "div"> =
  VoidProps<ComponentProps<typeof RadioGroupPrimitive.ItemIndicator<T>>>

export const RadioGroupItemIndicator = <T extends ValidComponent = "div">(
  props: RadioGroupItemIndicatorProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupItemIndicatorProps, ["class"])

  return (
    <RadioGroupPrimitive.ItemIndicator
      forceMount
      data-slot="radio-group-item-indicator"
      class={cx("data-[checked]:bg-primary size-2 rounded-full", props.class)}
      {...rest}
    />
  )
}

export type RadioGroupLabelProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof RadioGroupPrimitive.Label<T>>

export const RadioGroupLabel = <T extends ValidComponent = "span">(
  props: RadioGroupLabelProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupLabelProps, ["class"])

  return (
    <RadioGroupPrimitive.Label
      forceMount
      data-slot="radio-group-label"
      class={cx("text-sm font-medium select-none", props.class)}
      {...rest}
    />
  )
}

export type RadioGroupItemLabelProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof RadioGroupPrimitive.ItemLabel<T>>

export const RadioGroupItemLabel = <T extends ValidComponent = "span">(
  props: RadioGroupItemLabelProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupItemLabelProps, ["class"])

  return (
    <RadioGroupPrimitive.ItemLabel
      forceMount
      data-slot="radio-group-item-label"
      class={cx(
        "data-invalid:text-destructive text-sm font-medium select-none",
        props.class,
      )}
      {...rest}
    />
  )
}

export type RadioGroupDescriptionProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof RadioGroupPrimitive.Label<T>>

export const RadioGroupDescription = <T extends ValidComponent = "span">(
  props: RadioGroupDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupDescriptionProps, ["class"])

  return (
    <RadioGroupPrimitive.Description
      forceMount
      data-slot="radio-group-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

export type RadioGroupErrorMessageProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof RadioGroupPrimitive.ErrorMessage<T>>

export const RadioGroupErrorMessage = <T extends ValidComponent = "span">(
  props: RadioGroupErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as RadioGroupErrorMessageProps, ["class"])

  return (
    <RadioGroupPrimitive.ErrorMessage
      forceMount
      data-slot="radio-group-error-message"
      class={cx("text-destructive text-sm", props.class)}
      {...rest}
    />
  )
}
