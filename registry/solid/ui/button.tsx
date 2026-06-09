import { splitProps, type JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/solid/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground shadow-[0_1px_2px_rgb(0_0_0/0.12)] hover:border-primary/90 hover:bg-primary/90 active:bg-primary/80",
        destructive:
          "border-destructive bg-destructive text-white hover:border-destructive/90 hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border-border bg-card hover:border-primary hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border-primary bg-card text-primary hover:bg-primary/10",
        ghost:
          "border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 min-w-20 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 min-w-16 px-3.5 text-xs has-[>svg]:px-3",
        lg: "h-11 min-w-24 px-6 text-base has-[>svg]:px-5",
        icon: "size-10 min-w-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "variant",
    "size",
    "asChild",
    "children",
  ])

  return (
    <Dynamic
      component={local.asChild ? "span" : "button"}
      data-slot="button"
      class={cn(
        buttonVariants({ variant: local.variant, size: local.size }),
        local.class
      )}
      {...rest}
    >
      {local.children}
    </Dynamic>
  )
}

export { Button, buttonVariants }
