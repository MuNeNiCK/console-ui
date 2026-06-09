import { createContext, createSignal, splitProps, useContext, type JSX } from "solid-js"
type Ctx = { open: () => boolean; setOpen: (open: boolean) => void }
const CollapsibleContext = createContext<Ctx>()
function Collapsible(props: JSX.HTMLAttributes<HTMLDivElement> & { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }) { const [l,r]=splitProps(props,["open","defaultOpen","onOpenChange","children"]); const [open,setOpenSignal]=createSignal(!!l.defaultOpen); const ctx={ open:()=>l.open ?? open(), setOpen:(v:boolean)=>{setOpenSignal(v); l.onOpenChange?.(v)} }; return <CollapsibleContext.Provider value={ctx}><div data-slot="collapsible" data-open={ctx.open()?"":undefined} {...r}>{l.children}</div></CollapsibleContext.Provider> }
function CollapsibleTrigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) { const ctx=useContext(CollapsibleContext); return <button type="button" data-slot="collapsible-trigger" aria-expanded={ctx?.open()} onClick={() => ctx?.setOpen(!ctx.open())} {...props}/> }
function CollapsibleContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const ctx=useContext(CollapsibleContext); return <div data-slot="collapsible-content" hidden={!ctx?.open()} {...props}/> }
export { Collapsible, CollapsibleTrigger, CollapsibleContent }
