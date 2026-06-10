import { splitProps, type JSX } from "solid-js"
import { GripVerticalIcon } from "@/registry/solid/lib/icons"
import { cn } from "@/registry/solid/lib/utils"
function ResizablePanelGroup(props: JSX.HTMLAttributes<HTMLDivElement> & { direction?: "horizontal" | "vertical" }) { const [l,r]=splitProps(props,["class","direction"]); return <div data-slot="resizable-panel-group" data-direction={l.direction||"horizontal"} class={cn("flex h-full w-full data-[direction=vertical]:flex-col",l.class)} {...r}/> }
function ResizablePanel(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="resizable-panel" class={cn("min-w-0 flex-1",l.class)} {...r}/> }
function ResizableHandle(props: JSX.HTMLAttributes<HTMLDivElement> & { withHandle?: boolean }) { const [l,r]=splitProps(props,["class","withHandle"]); return <div data-slot="resizable-handle" class={cn("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-[3px] focus-visible:ring-ring/35 focus-visible:outline-hidden",l.class)} {...r}>{l.withHandle && <div class="z-10 flex h-4 w-3 items-center justify-center rounded-md border bg-card text-muted-foreground"><GripVerticalIcon class="size-2.5" /></div>}</div> }
export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
