import {
  Show,
  createContext,
  splitProps,
  useContext,
  type ComponentProps,
  type JSX,
  type ParentProps,
  type ValidComponent,
} from "solid-js"
import * as NavigationMenuPrimitive from "@kobalte/core/navigation-menu"
import ChevronDownIcon from "lucide-solid/icons/chevron-down"

import { cva, cx } from "@/registry/solid/lib/cva"

export const NavigationMenuPortal = NavigationMenuPrimitive.Portal

type NavigationMenuContextValue = {
  viewport: () => boolean
}

const NavigationMenuContext = createContext<NavigationMenuContextValue>({
  viewport: () => true,
})

function useNavigationMenuContext() {
  return useContext(NavigationMenuContext)
}

export type NavigationMenuProps = ComponentProps<
  typeof NavigationMenuPrimitive.Root
> & {
  class?: string
  viewport?: boolean
}

export const NavigationMenu = (props: NavigationMenuProps) => {
  const [local, rest] = splitProps(props, ["class", "children", "viewport"])
  const viewport = () => local.viewport ?? true

  return (
    <NavigationMenuContext.Provider value={{ viewport }}>
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        data-viewport={viewport()}
        class={cx(
          "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center data-[orientation=vertical]:flex-col",
          local.class,
        )}
        gutter={6}
        {...rest}
      >
        {local.children}
        <Show when={viewport()}>
          <NavigationMenuViewport />
        </Show>
      </NavigationMenuPrimitive.Root>
    </NavigationMenuContext.Provider>
  )
}

export type NavigationMenuListProps = ParentProps<
  { class?: string } & JSX.HTMLAttributes<HTMLUListElement>
>

export const NavigationMenuList = (props: NavigationMenuListProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <ul
      data-slot="navigation-menu-list"
      class={cx(
        "group flex flex-1 list-none items-center justify-center gap-1",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </ul>
  )
}

export type NavigationMenuItemProps = ParentProps<
  { class?: string } & ComponentProps<typeof NavigationMenuPrimitive.Menu>
>

export const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <li data-slot="navigation-menu-item" class={cx("relative", local.class)}>
      <NavigationMenuPrimitive.Menu {...rest}>
        {local.children}
      </NavigationMenuPrimitive.Menu>
    </li>
  )
}

export const navigationButtonVariant = cva({
  base: [
    "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-full border border-transparent bg-card px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,box-shadow] outline-none hover:border-border hover:bg-primary/10 hover:text-foreground focus:bg-primary/10 focus:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/35 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[expanded]:border-primary data-[expanded]:bg-primary/10 data-[expanded]:text-primary data-[highlighted]:bg-primary/10 data-[highlighted]:text-foreground",
  ],
})

export type NavigationMenuTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof NavigationMenuPrimitive.Trigger<T>>

export const NavigationMenuTrigger = <T extends ValidComponent = "button">(
  props: NavigationMenuTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationMenuTriggerProps, [
    "class",
    "children",
  ])

  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      class={navigationButtonVariant({
        class: props.class,
      })}
      {...rest}
    >
      {props.children}
      <NavigationMenuPrimitive.Icon class="relative top-[1px] ml-1 size-3 transition-transform duration-300 data-[expanded]:rotate-180">
        <ChevronDownIcon class="size-3" aria-hidden="true" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  )
}

export type NavigationMenuContentProps<T extends ValidComponent = "ul"> =
  ComponentProps<typeof NavigationMenuPrimitive.Content<T>>

export const NavigationMenuContent = <T extends ValidComponent = "ul">(
  props: NavigationMenuContentProps<T>,
) => {
  const [local, rest] = splitProps(props as NavigationMenuContentProps, [
    "class",
  ])
  const context = useNavigationMenuContext()
  const content = (
    <NavigationMenuPrimitive.Content
      as="div"
      data-slot="navigation-menu-content"
      class={cx(
        "top-0 left-0 p-2 pr-2.5 outline-none md:absolute md:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out duration-300",
        "data-[orientation=horizontal]:data-[motion=from-end]:slide-in-from-right-52 data-[orientation=horizontal]:data-[motion=from-start]:slide-in-from-left-52 data-[orientation=horizontal]:data-[motion=to-end]:slide-out-to-right-52 data-[orientation=horizontal]:data-[motion=to-start]:slide-out-to-left-52",
        "data-[orientation=vertical]:data-[motion=from-end]:slide-in-from-bottom-52 data-[orientation=vertical]:data-[motion=from-start]:slide-in-from-top-52 data-[orientation=vertical]:data-[motion=to-end]:slide-out-to-bottom-52 data-[orientation=vertical]:data-[motion=to-start]:slide-out-to-top-52",
        "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow-md",
        "**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        local.class,
      )}
      {...rest}
    />
  )

  return (
    <Show when={context.viewport()} fallback={content}>
      <NavigationMenuPrimitive.Portal>{content}</NavigationMenuPrimitive.Portal>
    </Show>
  )
}

export type NavigationMenuViewportProps = ParentProps<
  { class?: string } & JSX.HTMLAttributes<HTMLDivElement>
>

export const NavigationMenuViewport = (props?: NavigationMenuViewportProps) => {
  const [local, rest] = splitProps(props ?? {}, ["class"])

  return (
    <div class="absolute top-full left-0 isolate z-50 flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        class={cx(
          "relative mt-1.5 h-(--kb-navigation-menu-viewport-height) w-(--kb-navigation-menu-viewport-width) origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md transition-[width,height] duration-300 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-90",
          local.class,
        )}
        {...rest}
      />
    </div>
  )
}

export type NavigationItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof NavigationMenuPrimitive.ItemLabel<T>>

export const NavigationItemLabel = <T extends ValidComponent = "div">(
  props: NavigationItemLabelProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationItemLabelProps, ["class"])

  return (
    <NavigationMenuPrimitive.ItemLabel
      data-slot="navigation-menu-label"
      class={cx("text-sm leading-none font-medium", props.class)}
      {...rest}
    />
  )
}

export type NavigationItemDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof NavigationMenuPrimitive.ItemDescription<T>>

export const NavigationItemDescription = <T extends ValidComponent = "div">(
  props: NavigationItemDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationItemDescriptionProps, [
    "class",
  ])

  return (
    <NavigationMenuPrimitive.ItemDescription
      data-slot="navigation-menu-description"
      class={cx(
        "text-muted-foreground line-clamp-2 text-sm leading-snug",
        props.class,
      )}
      {...rest}
    />
  )
}


export type NavigationMenuLinkProps<T extends ValidComponent = "a"> =
  ComponentProps<typeof NavigationMenuPrimitive.Item<T>>

export const NavigationMenuLink = <T extends ValidComponent = "a">(
  props: NavigationMenuLinkProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationMenuLinkProps, ["class"])

  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-link"
      class={cx(
        "flex flex-col gap-1 rounded-md p-2.5 text-sm transition-[background-color,color,box-shadow] outline-none hover:bg-primary/10 hover:text-foreground focus:bg-primary/10 focus:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/35 focus-visible:outline-none data-[expanded]:bg-primary/10 data-[expanded]:text-primary [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        props.class,
      )}
      {...rest}
    />
  )
}
export const navigationMenuTriggerStyle = navigationButtonVariant
