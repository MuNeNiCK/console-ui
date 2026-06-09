import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function Skeleton(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="skeleton" class={cn("animate-pulse rounded-md bg-border/70", l.class)} {...r}/> }
export { Skeleton }
