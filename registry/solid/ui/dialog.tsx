import { createContext, createSignal, splitProps, useContext, Show, type JSX } from "solid-js"
import { XIcon } from "lucide-solid"
import { cn } from "@/registry/solid/lib/utils"
import { Button, buttonVariants } from "@/registry/solid/ui/button"
type Ctx = { open: () => boolean; setOpen: (open: boolean) => void }
const DialogContext = createContext<Ctx>()
function Dialog(props: JSX.HTMLAttributes<HTMLDivElement> & { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }) { const [l,r]=splitProps(props,["open","defaultOpen","onOpenChange","children"]); const [open,setOpenSignal]=createSignal(!!l.defaultOpen); const ctx={ open:()=>l.open ?? open(), setOpen:(v:boolean)=>{setOpenSignal(v); l.onOpenChange?.(v)} }; return <DialogContext.Provider value={ctx}><div data-slot="dialog" {...r}>{l.children}</div></DialogContext.Provider> }
function DialogTrigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) { const ctx=useContext(DialogContext); return <button type="button" data-slot="dialog-trigger" onClick={() => ctx?.setOpen(true)} {...props}/> }
function DialogPortal(props: JSX.HTMLAttributes<HTMLDivElement>) { return <>{props.children}</> }
function DialogOverlay(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="dialog-overlay" class={cn("fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out",l.class)} {...r}/> }
function DialogContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class","children"]); const ctx=useContext(DialogContext); return <Show when={ctx?.open()}><DialogOverlay/><div role="dialog" data-slot="dialog-content" class={cn("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg",l.class)} {...r}>{l.children}<DialogClose class="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:outline-hidden disabled:pointer-events-none"><XIcon class="size-4"/><span class="sr-only">Close</span></DialogClose></div></Show> }
function DialogHeader(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="dialog-header" class={cn("flex flex-col gap-2 text-center sm:text-left",l.class)} {...r}/> }
function DialogFooter(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="dialog-footer" class={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",l.class)} {...r}/> }
function DialogTitle(props: JSX.HTMLAttributes<HTMLHeadingElement>) { const [l,r]=splitProps(props,["class"]); return <h2 data-slot="dialog-title" class={cn("text-lg leading-none font-semibold",l.class)} {...r}/> }
function DialogDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) { const [l,r]=splitProps(props,["class"]); return <p data-slot="dialog-description" class={cn("text-sm text-muted-foreground",l.class)} {...r}/> }
function DialogClose(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) { const ctx=useContext(DialogContext); return <button type="button" data-slot="dialog-close" onClick={() => ctx?.setOpen(false)} {...props}/> }
function DialogAction(props: Parameters<typeof Button>[0]) { return <Button data-slot="dialog-action" {...props}/> }
function DialogCancel(props: Parameters<typeof Button>[0]) { return <Button data-slot="dialog-cancel" variant="outline" {...props}/> }
export { Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogAction, DialogCancel }
