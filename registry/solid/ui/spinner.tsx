import { type ComponentProps, splitProps } from "solid-js"
import Loader2Icon from "lucide-solid/icons/loader-circle"
import { cn } from "@/registry/solid/lib/utils"
function Spinner(props: ComponentProps<typeof Loader2Icon>) { const [l,r]=splitProps(props,["class"]); return <Loader2Icon role="status" aria-label="Loading" class={cn("size-4 animate-spin text-primary", l.class)} {...r}/> }
export { Spinner }
