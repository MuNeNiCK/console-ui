import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function Separator(props: JSX.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) { const [l,r]=splitProps(props,["class","orientation"]); const orientation = l.orientation || "horizontal"; return <div role="separator" data-slot="separator" data-orientation={orientation} data-horizontal={orientation === "horizontal" ? "" : undefined} data-vertical={orientation === "vertical" ? "" : undefined} class={cn("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:h-full data-vertical:w-px", l.class)} {...r}/> }
export { Separator }
