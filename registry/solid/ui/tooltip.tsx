import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function TooltipProvider(props: JSX.HTMLAttributes<HTMLDivElement>) { return <>{props.children}</> }
function Tooltip(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <span data-slot="tooltip" class={cn("group/tooltip relative inline-flex",l.class)} {...r}/> }
function TooltipTrigger(props: JSX.HTMLAttributes<HTMLSpanElement>) { return <span data-slot="tooltip-trigger" {...props}/> }
function TooltipContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <span data-slot="tooltip-content" class={cn("invisible absolute bottom-full left-1/2 z-50 mb-2 w-fit -translate-x-1/2 rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground opacity-0 shadow-md group-hover/tooltip:visible group-hover/tooltip:opacity-100",l.class)} {...r}/> }
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
