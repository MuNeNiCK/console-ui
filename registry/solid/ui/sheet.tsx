import { createContext, createSignal, splitProps, useContext, Show, type JSX } from "solid-js"
import { XIcon } from "lucide-solid"
import { cn } from "@/registry/solid/lib/utils"
import { Button, buttonVariants } from "@/registry/solid/ui/button"
type Ctx = { open: () => boolean; setOpen: (open: boolean) => void }
const DialogContext = createContext<Ctx>()
function Sheet(props: JSX.HTMLAttributes<HTMLDivElement> & { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }) { const [l,r]=splitProps(props,["open","defaultOpen","onOpenChange","children"]); const [open,setOpenSignal]=createSignal(!!l.defaultOpen); const ctx={ open:()=>l.open ?? open(), setOpen:(v:boolean)=>{setOpenSignal(v); l.onOpenChange?.(v)} }; return <DialogContext.Provider value={ctx}><div data-slot="sheet" {...r}>{l.children}</div></DialogContext.Provider> }
function SheetTrigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) { const ctx=useContext(DialogContext); return <button type="button" data-slot="sheet-trigger" onClick={() => ctx?.setOpen(true)} {...props}/> }
function SheetPortal(props: JSX.HTMLAttributes<HTMLDivElement>) { return <>{props.children}</> }
function SheetOverlay(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="sheet-overlay" class={cn("fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out",l.class)} {...r}/> }
function SheetContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class","children"]); const ctx=useContext(DialogContext); return <Show when={ctx?.open()}><SheetOverlay/><div role="dialog" data-slot="sheet-content" class={cn("fixed inset-y-0 right-0 z-50 grid h-full w-3/4 gap-4 border-l bg-background p-6 shadow-lg sm:max-w-md",l.class)} {...r}>{l.children}<SheetClose class="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:outline-hidden disabled:pointer-events-none"><XIcon class="size-4"/><span class="sr-only">Close</span></SheetClose></div></Show> }
function SheetHeader(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="sheet-header" class={cn("flex flex-col gap-2 text-center sm:text-left",l.class)} {...r}/> }
function SheetFooter(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="sheet-footer" class={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",l.class)} {...r}/> }
function SheetTitle(props: JSX.HTMLAttributes<HTMLHeadingElement>) { const [l,r]=splitProps(props,["class"]); return <h2 data-slot="sheet-title" class={cn("text-lg leading-none font-semibold",l.class)} {...r}/> }
function SheetDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) { const [l,r]=splitProps(props,["class"]); return <p data-slot="sheet-description" class={cn("text-sm text-muted-foreground",l.class)} {...r}/> }
function SheetClose(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) { const ctx=useContext(DialogContext); return <button type="button" data-slot="sheet-close" onClick={() => ctx?.setOpen(false)} {...props}/> }
function SheetAction(props: Parameters<typeof Button>[0]) { return <Button data-slot="sheet-action" {...props}/> }
function SheetCancel(props: Parameters<typeof Button>[0]) { return <Button data-slot="sheet-cancel" variant="outline" {...props}/> }
export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetAction, SheetCancel }
