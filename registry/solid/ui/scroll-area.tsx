import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function ScrollArea(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="scroll-area" class={cn("relative overflow-auto",l.class)} {...r}/> }
function ScrollBar(props: JSX.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) { const [l,r]=splitProps(props,["class","orientation"]); return <div data-slot="scroll-area-scrollbar" data-orientation={l.orientation||"vertical"} class={cn("hidden",l.class)} {...r}/> }
export { ScrollArea, ScrollBar }
