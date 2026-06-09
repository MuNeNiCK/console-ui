import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
function Slider(props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> & { defaultValue?: number[]; value?: number[]; min?: number; max?: number }) { const [l,r]=splitProps(props,["class","defaultValue","value","min","max"]); const min=l.min ?? 0; const max=l.max ?? 100; const value=(l.value?.[0] ?? l.defaultValue?.[0] ?? min); return <div data-slot="slider" class={cn("relative flex w-full touch-none items-center select-none",l.class)}><input type="range" min={min} max={max} value={value} class="w-full accent-primary" {...r}/></div> }
export { Slider }
