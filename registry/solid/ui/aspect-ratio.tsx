import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function AspectRatio(props: JSX.HTMLAttributes<HTMLDivElement> & { ratio: number }) { const [l,r]=splitProps(props,["class","ratio","style"]); return <div data-slot="aspect-ratio" style={{ ...(typeof l.style === "object" ? l.style : {}), "--ratio": String(l.ratio) } as JSX.CSSProperties} class={cn("relative aspect-(--ratio)",l.class)} {...r}/> }
export { AspectRatio }
