"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  disabled,
  ...props
}: React.ComponentProps<"div"> & {
  defaultValue?: number[]
  value?: number[]
  min?: number
  max?: number
  disabled?: boolean
}) {
  const current = Array.isArray(value)
    ? value[0]
    : Array.isArray(defaultValue)
      ? defaultValue[0]
      : min
  const percent = Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100))

  return (
    <div
      data-slot="slider"
      data-disabled={disabled}
      className={cn(
        "relative flex h-4 w-full touch-none items-center select-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div
        data-slot="slider-track"
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-border/70"
      >
        <div
          data-slot="slider-range"
          className="h-full bg-primary"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span
        data-slot="slider-thumb"
        className="absolute top-1/2 block size-4 -translate-y-1/2 rounded-full border-2 border-primary bg-card ring-ring/35 transition-[border-color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden active:ring-4"
        style={{ left: `calc(${percent}% - 0.5rem)` }}
      />
    </div>
  )
}

export { Slider }
