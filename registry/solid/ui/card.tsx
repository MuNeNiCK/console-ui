import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"

type DivProps = JSX.HTMLAttributes<HTMLDivElement>
function Card(props: DivProps) { const [l, r] = splitProps(props, ["class"]); return <div data-slot="card" class={cn("bg-card text-card-foreground flex flex-col gap-6 rounded-lg border py-6 shadow-sm", l.class)} {...r} /> }
function CardHeader(props: DivProps) { const [l, r] = splitProps(props, ["class"]); return <div data-slot="card-header" class={cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", l.class)} {...r} /> }
function CardTitle(props: DivProps) { const [l, r] = splitProps(props, ["class"]); return <div data-slot="card-title" class={cn("leading-none font-semibold", l.class)} {...r} /> }
function CardDescription(props: DivProps) { const [l, r] = splitProps(props, ["class"]); return <div data-slot="card-description" class={cn("text-sm text-muted-foreground", l.class)} {...r} /> }
function CardAction(props: DivProps) { const [l, r] = splitProps(props, ["class"]); return <div data-slot="card-action" class={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", l.class)} {...r} /> }
function CardContent(props: DivProps) { const [l, r] = splitProps(props, ["class"]); return <div data-slot="card-content" class={cn("px-6", l.class)} {...r} /> }
function CardFooter(props: DivProps) { const [l, r] = splitProps(props, ["class"]); return <div data-slot="card-footer" class={cn("flex items-center px-6 [.border-t]:pt-6", l.class)} {...r} /> }
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
