import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cx } from "@/registry/solid/lib/cva"

export type CardProps = ComponentProps<"div"> & {
  size?: "default" | "sm"
}

export const Card = (props: CardProps) => {
  const [, rest] = splitProps(props, ["class", "size"])

  return (
    <div
      data-slot="card"
      data-size={props.size ?? "default"}
      class={cx(
        "group/card flex flex-col gap-(--card-spacing) rounded-lg border bg-card py-(--card-spacing) text-card-foreground shadow-xs [--card-spacing:--spacing(6)] data-[size=sm]:[--card-spacing:--spacing(4)]",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CardHeaderProps = ComponentProps<"div">

export const CardHeader = (props: CardHeaderProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-header"
      class={cx(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-(--card-spacing)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CardTitleProps = ComponentProps<"div">

export const CardTitle = (props: CardTitleProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-title"
      class={cx(
        "leading-none font-semibold group-data-[size=sm]/card:text-sm",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CardDescriptionProps = ComponentProps<"div">

export const CardDescription = (props: CardDescriptionProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

export type CardActionProps = ComponentProps<"div">

export const CardAction = (props: CardActionProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-action"
      class={cx(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CardContentProps = ComponentProps<"div">

export const CardContent = (props: CardContentProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-content"
      class={cx("px-(--card-spacing)", props.class)}
      {...rest}
    />
  )
}

export type CardFooterProps = ComponentProps<"div">

export const CardFooter = (props: CardFooterProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-footer"
      class={cx(
        "flex items-center px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
        props.class,
      )}
      {...rest}
    />
  )
}
