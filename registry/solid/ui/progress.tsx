import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function Progress(props: JSX.HTMLAttributes<HTMLDivElement> & { value?: number }) { const [l,r]=splitProps(props,["class","value","children"]); const value=l.value ?? 0; return <div data-slot="progress" role="progressbar" aria-valuenow={value} class={cn("relative h-2 w-full overflow-hidden rounded-full bg-border/70",l.class)} {...r}>{l.children}<ProgressTrack><ProgressIndicator style={{ width: value + "%" }} /></ProgressTrack></div> }
function ProgressTrack(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="progress-track" class={cn("relative flex h-full w-full items-center overflow-x-hidden rounded-full bg-border/70",l.class)} {...r}/> }
function ProgressIndicator(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="progress-indicator" class={cn("h-full bg-primary transition-all",l.class)} {...r}/> }
function ProgressLabel(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="progress-label" class={cn("text-sm font-medium",l.class)} {...r}/> }
function ProgressValue(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="progress-value" class={cn("ml-auto text-sm text-muted-foreground tabular-nums",l.class)} {...r}/> }
export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue }
