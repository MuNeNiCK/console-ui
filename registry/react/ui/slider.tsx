"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min]

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex h-4 w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-44 data-vertical:w-auto",
        className
      )}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-44 data-vertical:w-auto data-vertical:flex-col">
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-border/70 data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
      >
        <SliderPrimitive.Indicator
          data-slot="slider-range"
          className="bg-primary data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 rounded-full border-2 border-primary bg-card ring-ring/35 transition-[border-color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden active:ring-4 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
