import { createSignal, splitProps, type JSX } from "solid-js"
import { SearchIcon } from "lucide-solid"
import { cn } from "@/registry/solid/lib/utils"
function Command(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="command" class={cn("flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground",l.class)} {...r}/> }
function CommandInput(props: JSX.InputHTMLAttributes<HTMLInputElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="command-input-wrapper" class="flex h-10 items-center gap-2 border-b px-3"><SearchIcon class="size-4 shrink-0 opacity-50"/><input data-slot="command-input" class={cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",l.class)} {...r}/></div> }
function CommandList(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="command-list" class={cn("max-h-[320px] overflow-x-hidden overflow-y-auto",l.class)} {...r}/> }
function CommandEmpty(props: JSX.HTMLAttributes<HTMLDivElement>) { return <div data-slot="command-empty" class="py-6 text-center text-sm" {...props}/> }
function CommandGroup(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="command-group" class={cn("overflow-hidden p-1 text-foreground",l.class)} {...r}/> }
function CommandItem(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="command-item" class={cn("relative flex h-9 cursor-default items-center gap-2 rounded-md px-2.5 text-sm outline-hidden select-none data-[selected=true]:bg-primary/10 data-[selected=true]:text-foreground hover:bg-primary/10",l.class)} {...r}/> }
function CommandSeparator(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="command-separator" class={cn("-mx-1 h-px bg-border",l.class)} {...r}/> }
function CommandShortcut(props: JSX.HTMLAttributes<HTMLSpanElement>) { const [l,r]=splitProps(props,["class"]); return <span data-slot="command-shortcut" class={cn("ml-auto text-xs tracking-widest text-muted-foreground",l.class)} {...r}/> }
function CommandDialog(props: JSX.HTMLAttributes<HTMLDivElement>) { return <Command {...props}/> }
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator }
