import { splitProps, type JSX } from "solid-js"

import { cn } from "@/registry/solid/lib/utils"

function Slider(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: number[]
    value?: number[]
    min?: number
    max?: number
    disabled?: boolean
  }
) {
  const [local, rest] = splitProps(props, [
    "class",
    "defaultValue",
    "value",
    "min",
    "max",
    "disabled",
  ])
  const min = local.min ?? 0
  const max = local.max ?? 100
  const current = local.value?.[0] ?? local.defaultValue?.[0] ?? min
  const percent = Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100))

  return (
    <div
      data-slot="slider"
      data-disabled={local.disabled}
      class={cn(
        "relative flex h-4 w-full touch-none items-center select-none data-disabled:opacity-50",
        local.class
      )}
      {...rest}
    >
      <div
        data-slot="slider-track"
        class="relative h-1.5 w-full overflow-hidden rounded-full bg-border/70"
      >
        <div
          data-slot="slider-range"
          class="h-full bg-primary"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span
        data-slot="slider-thumb"
        class="absolute top-1/2 block size-4 -translate-y-1/2 rounded-full border-2 border-primary bg-card ring-ring/35 transition-[border-color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden active:ring-4"
        style={{ left: `calc(${percent}% - 0.5rem)` }}
      />
    </div>
  )
}

export { Slider }
