"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/react/ui/button"
import { Input } from "@/registry/react/ui/input"
import { Textarea } from "@/registry/react/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-9 w-full min-w-0 items-center rounded-full border border-input bg-background transition-[border-color,box-shadow] outline-none has-[>textarea]:h-auto has-[>textarea]:rounded-md dark:bg-input/20",
        "hover:border-ring/45",
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[2px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/25",
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-full [&>svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3.5 pr-2 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pl-2 pr-3.5 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) {
          return
        }

        event.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva("flex items-center gap-2 text-sm", {
  variants: {
    size: {
      xs: "h-6 gap-1 border px-2 text-xs font-medium has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "h-8 gap-1.5 px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-6 min-w-0 border p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 min-w-0 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
})

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-9 flex-1 rounded-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
