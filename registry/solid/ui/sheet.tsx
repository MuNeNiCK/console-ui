import {
  Show,
  createContext,
  createSignal,
  splitProps,
  useContext,
  type JSX,
} from "solid-js"
import XIcon from "lucide-solid/icons/x"

import { cn } from "@/registry/solid/lib/utils"
import { Button, buttonVariants } from "@/registry/solid/ui/button"

type Ctx = { open: () => boolean; setOpen: (open: boolean) => void }

type SheetSide = "top" | "right" | "bottom" | "left"

const SheetContext = createContext<Ctx>()

function Sheet(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
  },
) {
  const [local, rest] = splitProps(props, [
    "open",
    "defaultOpen",
    "onOpenChange",
    "children",
  ])
  const [open, setOpenSignal] = createSignal(!!local.defaultOpen)
  const ctx = {
    open: () => local.open ?? open(),
    setOpen: (value: boolean) => {
      setOpenSignal(value)
      local.onOpenChange?.(value)
    },
  }

  return (
    <SheetContext.Provider value={ctx}>
      <div data-slot="sheet" {...rest}>
        {local.children}
      </div>
    </SheetContext.Provider>
  )
}

function SheetTrigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = useContext(SheetContext)

  return (
    <button
      type="button"
      data-slot="sheet-trigger"
      onClick={() => ctx?.setOpen(true)}
      {...props}
    />
  )
}

function SheetPortal(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return <>{props.children}</>
}

function SheetOverlay(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="sheet-overlay"
      class={cn(
        "fixed inset-0 z-50 bg-black/35 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        local.class,
      )}
      {...rest}
    />
  )
}

function SheetContent(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    side?: SheetSide
    showCloseButton?: boolean
  },
) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "side",
    "showCloseButton",
  ])
  const ctx = useContext(SheetContext)
  const side = () => local.side ?? "right"
  const showCloseButton = () => local.showCloseButton ?? true

  return (
    <Show when={ctx?.open()}>
      <SheetOverlay data-state="open" />
      <div
        role="dialog"
        data-slot="sheet-content"
        data-state="open"
        data-side={side()}
        class={cn(
          "fixed z-50 flex flex-col gap-4 bg-card text-card-foreground shadow-md transition ease-in-out outline-none data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500 data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-[state=closed]:slide-out-to-right data-[side=right]:data-[state=open]:slide-in-from-right data-[side=right]:sm:max-w-sm data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-[state=closed]:slide-out-to-left data-[side=left]:data-[state=open]:slide-in-from-left data-[side=left]:sm:max-w-sm data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-[state=closed]:slide-out-to-top data-[side=top]:data-[state=open]:slide-in-from-top data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-[state=closed]:slide-out-to-bottom data-[side=bottom]:data-[state=open]:slide-in-from-bottom",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <Show when={showCloseButton()}>
          <SheetClose
            class={buttonVariants({
              variant: "ghost",
              size: "icon-sm",
              class:
                "absolute top-4 right-4 border-transparent text-muted-foreground hover:border-border hover:bg-primary/10 hover:text-foreground data-[state=open]:bg-primary/10 data-[state=open]:text-foreground",
            })}
          >
            <XIcon class="size-4" />
            <span class="sr-only">Close</span>
          </SheetClose>
        </Show>
      </div>
    </Show>
  )
}

function SheetHeader(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="sheet-header"
      class={cn("flex flex-col gap-1.5 p-6", local.class)}
      {...rest}
    />
  )
}

function SheetFooter(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="sheet-footer"
      class={cn("mt-auto flex flex-col gap-2 p-6", local.class)}
      {...rest}
    />
  )
}

function SheetTitle(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <h2
      data-slot="sheet-title"
      class={cn("font-semibold text-foreground", local.class)}
      {...rest}
    />
  )
}

function SheetDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <p
      data-slot="sheet-description"
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

function SheetClose(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = useContext(SheetContext)

  return (
    <button
      type="button"
      data-slot="sheet-close"
      onClick={() => ctx?.setOpen(false)}
      {...props}
    />
  )
}

function SheetAction(props: Parameters<typeof Button>[0]) {
  return <Button data-slot="sheet-action" {...props} />
}

function SheetCancel(props: Parameters<typeof Button>[0]) {
  return <Button data-slot="sheet-cancel" variant="outline" {...props} />
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetAction,
  SheetCancel,
}
