import { splitProps, type JSX } from "solid-js"
import { ChevronDownIcon } from "lucide-solid"
import { cn } from "@/registry/solid/lib/utils"
function Accordion(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="accordion" class={cn("w-full",l.class)} {...r}/> }
function AccordionItem(props: JSX.HTMLAttributes<HTMLDetailsElement>) { const [l,r]=splitProps(props,["class"]); return <details data-slot="accordion-item" class={cn("group border-b last:border-b-0",l.class)} {...r}/> }
function AccordionTrigger(props: JSX.HTMLAttributes<HTMLElement>) { const [l,r]=splitProps(props,["class","children"]); return <summary data-slot="accordion-trigger" class={cn("group/accordion-trigger flex flex-1 cursor-pointer list-none items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35",l.class)} {...r}>{l.children}<ChevronDownIcon class="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200 group-open:rotate-180" /></summary> }
function AccordionContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="accordion-content" class={cn("overflow-hidden pb-4 text-sm",l.class)} {...r}/> }
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
