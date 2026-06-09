import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function HoverCard(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="hover-card" class={cn("group/hover-card relative inline-block",l.class)} {...r}/> }
function HoverCardTrigger(props: JSX.HTMLAttributes<HTMLSpanElement>) { return <span data-slot="hover-card-trigger" {...props}/> }
function HoverCardContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="hover-card-content" class={cn("invisible absolute z-50 mt-2 w-64 rounded-lg border bg-popover p-4 text-popover-foreground opacity-0 shadow-md group-hover/hover-card:visible group-hover/hover-card:opacity-100",l.class)} {...r}/> }
export { HoverCard, HoverCardTrigger, HoverCardContent }
