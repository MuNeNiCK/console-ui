import { createContext, createSignal, splitProps, useContext, Show, type JSX } from "solid-js"
import { XIcon } from "@/registry/solid/lib/icons"
import { cn } from "@/registry/solid/lib/utils"
import { Button, buttonVariants } from "@/registry/solid/ui/button"
type Ctx = { open: () => boolean; setOpen: (open: boolean) => void }
const DialogContext = createContext<Ctx>()
function Drawer(props: JSX.HTMLAttributes<HTMLDivElement> & { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }) { const [l,r]=splitProps(props,["open","defaultOpen","onOpenChange","children"]); const [open,setOpenSignal]=createSignal(!!l.defaultOpen); const ctx={ open:()=>l.open ?? open(), setOpen:(v:boolean)=>{setOpenSignal(v); l.onOpenChange?.(v)} }; return <DialogContext.Provider value={ctx}><div data-slot="drawer" {...r}>{l.children}</div></DialogContext.Provider> }
function DrawerTrigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) { const ctx=useContext(DialogContext); return <button type="button" data-slot="drawer-trigger" onClick={() => ctx?.setOpen(true)} {...props}/> }
function DrawerPortal(props: JSX.HTMLAttributes<HTMLDivElement>) { return <>{props.children}</> }
function DrawerOverlay(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="drawer-overlay" class={cn("fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out",l.class)} {...r}/> }
function DrawerContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class","children"]); const ctx=useContext(DialogContext); return <Show when={ctx?.open()}><DrawerOverlay/><div role="dialog" data-slot="drawer-content" class={cn("fixed inset-x-0 bottom-0 z-50 grid max-h-[85vh] gap-4 rounded-t-lg border bg-background p-6 shadow-lg",l.class)} {...r}>{l.children}<DrawerClose class="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:outline-hidden disabled:pointer-events-none"><XIcon class="size-4"/><span class="sr-only">Close</span></DrawerClose></div></Show> }
function DrawerHeader(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="drawer-header" class={cn("flex flex-col gap-2 text-center sm:text-left",l.class)} {...r}/> }
function DrawerFooter(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="drawer-footer" class={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",l.class)} {...r}/> }
function DrawerTitle(props: JSX.HTMLAttributes<HTMLHeadingElement>) { const [l,r]=splitProps(props,["class"]); return <h2 data-slot="drawer-title" class={cn("text-lg leading-none font-semibold",l.class)} {...r}/> }
function DrawerDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) { const [l,r]=splitProps(props,["class"]); return <p data-slot="drawer-description" class={cn("text-sm text-muted-foreground",l.class)} {...r}/> }
function DrawerClose(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) { const ctx=useContext(DialogContext); return <button type="button" data-slot="drawer-close" onClick={() => ctx?.setOpen(false)} {...props}/> }
function DrawerAction(props: Parameters<typeof Button>[0]) { return <Button data-slot="drawer-action" {...props}/> }
function DrawerCancel(props: Parameters<typeof Button>[0]) { return <Button data-slot="drawer-cancel" variant="outline" {...props}/> }
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerAction, DrawerCancel }
