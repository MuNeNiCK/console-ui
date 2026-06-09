"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:items-stretch",
  {
    variants: {
      variant: {
        default:
          "gap-5 group-data-[orientation=horizontal]/tabs:h-10 group-data-[orientation=horizontal]/tabs:w-full group-data-[orientation=horizontal]/tabs:justify-start group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=vertical]/tabs:border-r",
        line:
          "gap-5 group-data-[orientation=horizontal]/tabs:h-10 group-data-[orientation=horizontal]/tabs:w-full group-data-[orientation=horizontal]/tabs:justify-start group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=vertical]/tabs:border-r",
        segmented:
          "w-fit gap-0 rounded-full border border-border bg-card p-0.5 group-data-[orientation=horizontal]/tabs:h-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap border-transparent px-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[orientation=horizontal]/tabs:-mb-px group-data-[orientation=horizontal]/tabs:h-10 group-data-[orientation=horizontal]/tabs:border-b-2 group-data-[orientation=horizontal]/tabs:data-[state=active]:border-primary",
        "group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start group-data-[orientation=vertical]/tabs:border-r-2 group-data-[orientation=vertical]/tabs:border-b-0 group-data-[orientation=vertical]/tabs:px-3 group-data-[orientation=vertical]/tabs:py-2 group-data-[orientation=vertical]/tabs:data-[state=active]:border-primary",
        "group-data-[variant=segmented]/tabs-list:-mb-0 group-data-[variant=segmented]/tabs-list:h-8 group-data-[variant=segmented]/tabs-list:rounded-full group-data-[variant=segmented]/tabs-list:border group-data-[variant=segmented]/tabs-list:border-transparent group-data-[variant=segmented]/tabs-list:px-3 group-data-[variant=segmented]/tabs-list:data-[state=active]:border-primary group-data-[variant=segmented]/tabs-list:data-[state=active]:bg-primary/10 group-data-[variant=segmented]/tabs-list:data-[state=active]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 pt-4 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
