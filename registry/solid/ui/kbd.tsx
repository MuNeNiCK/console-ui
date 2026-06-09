import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function Kbd(props: JSX.HTMLAttributes<HTMLElement>) { const [l,r]=splitProps(props,["class"]); return <kbd data-slot="kbd" class={cn("pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm border border-border bg-card px-1 font-sans text-xs font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",l.class)} {...r}/> }
function KbdGroup(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="kbd-group" class={cn("inline-flex items-center gap-1",l.class)} {...r}/> }
export { Kbd, KbdGroup }
