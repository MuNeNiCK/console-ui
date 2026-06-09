import { createContext, createSignal, splitProps, useContext, Show, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
type Ctx={open:()=>boolean;setOpen:(v:boolean)=>void}; const C=createContext<Ctx>()
function Popover(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["children"]); const [open,setOpen]=createSignal(false); return <C.Provider value={{open,setOpen}}><div data-slot="popover" class="relative inline-block" {...r}>{l.children}</div></C.Provider> }
function PopoverTrigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) { const c=useContext(C); return <button type="button" data-slot="popover-trigger" onClick={() => c?.setOpen(!c.open())} {...props}/> }
function PopoverContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); const c=useContext(C); return <Show when={c?.open()}><div data-slot="popover-content" class={cn("absolute z-50 mt-2 w-72 origin-top rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-hidden",l.class)} {...r}/></Show> }
function PopoverHeader(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="popover-header" class={cn("flex flex-col gap-1 text-sm",l.class)} {...r}/> }
function PopoverTitle(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="popover-title" class={cn("font-medium",l.class)} {...r}/> }
function PopoverDescription(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="popover-description" class={cn("text-muted-foreground",l.class)} {...r}/> }
export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger }
