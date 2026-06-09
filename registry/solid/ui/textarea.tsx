import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function Textarea(props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>) { const [l,r]=splitProps(props,["class"]); return <textarea data-slot="textarea" class={cn("flex field-sizing-content min-h-20 w-full rounded-md border border-border bg-card px-3 py-2 text-base transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground hover:border-input focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40", l.class)} {...r}/> }
export { Textarea }
