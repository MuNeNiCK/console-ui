import { type JSX, splitProps } from "solid-js"

import { cn } from "@/registry/solid/lib/utils"

function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card"
      class={cn("bg-card text-card-foreground rounded-xl border shadow-sm", local.class)}
      {...rest}
    />
  )
}

function CardHeader(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-header"
      class={cn("flex flex-col gap-1.5 p-6", local.class)}
      {...rest}
    />
  )
}

function CardTitle(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-title"
      class={cn("leading-none font-semibold tracking-tight", local.class)}
      {...rest}
    />
  )
}

function CardDescription(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-description"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  )
}

function CardContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-content"
      class={cn("p-6 pt-0", local.class)}
      {...rest}
    />
  )
}

function CardFooter(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="card-footer"
      class={cn("flex items-center p-6 pt-0", local.class)}
      {...rest}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
