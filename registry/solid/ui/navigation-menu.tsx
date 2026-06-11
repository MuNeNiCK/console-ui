import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import { NavigationMenu as NavigationMenuPrimitive } from "@kobalte/core/navigation-menu"
import { ChevronDownIcon } from "lucide-solid"

import { cva, cx } from "@/registry/solid/lib/cva"

export const NavigationMenuPortal = NavigationMenuPrimitive.Portal

export type NavigationMenuProps<T extends ValidComponent = "ul"> =
  ComponentProps<typeof NavigationMenuPrimitive<T>>

export const NavigationMenu = <T extends ValidComponent = "ul">(
  props: NavigationMenuProps<T>,
) => {
  const merge = mergeProps({ gutter: 6 } as NavigationMenuProps, props)
  const [, rest] = splitProps(merge, ["class", "children"])

  return (
    <NavigationMenuPrimitive
      data-slot="navigation-menu"
      class={cx(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center data-[orientation=vertical]:flex-col",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      <NavigationMenuPrimitive.Viewport class="absolute top-full left-0 z-50 h-(--kb-navigation-menu-viewport-height) w-(--kb-navigation-menu-viewport-width) origin-(--kb-menu-content-transform-origin) overflow-x-clip overflow-y-visible rounded-lg border bg-popover text-popover-foreground shadow-md transition-[width,height] duration-300 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-90 data-[orientation=vertical]:overflow-x-visible data-[orientation=vertical]:overflow-y-clip" />
    </NavigationMenuPrimitive>
  )
}

export type NavigationMenuListProps = ComponentProps<
  typeof NavigationMenuPrimitive.Menu
>

export const NavigationMenuList = (props: NavigationMenuListProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <NavigationMenuPrimitive.Menu
      data-slot="navigation-menu-list"
      class={cx(
        "group flex flex-1 list-none items-center justify-center gap-1",
        props.class,
      )}
      {...rest}
    />
  )
}

export type NavigationMenuItemProps<T extends ValidComponent = "a"> =
  ComponentProps<typeof NavigationMenuPrimitive.Item<T>>

export const NavigationMenuItem = <T extends ValidComponent = "a">(
  props: NavigationMenuItemProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationMenuItemProps, ["class"])

  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      class={cx("relative", props.class)}
      {...rest}
    />
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
  const [, rest] = splitProps(props as NavigationMenuContentProps, ["class"])

  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      class={cx(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out duration-300",
        "data-[orientation=horizontal]:data-[motion=from-end]:slide-in-from-right-52 data-[orientation=horizontal]:data-[motion=from-start]:slide-in-from-left-52 data-[orientation=horizontal]:data-[motion=to-end]:slide-out-to-right-52 data-[orientation=horizontal]:data-[motion=to-start]:slide-out-to-left-52",
        "data-[orientation=vertical]:data-[motion=from-end]:slide-in-from-bottom-52 data-[orientation=vertical]:data-[motion=from-start]:slide-in-from-top-52 data-[orientation=vertical]:data-[motion=to-end]:slide-out-to-bottom-52 data-[orientation=vertical]:data-[motion=to-start]:slide-out-to-top-52",
        "absolute top-0 left-0 p-2 pr-2.5 outline-none",
        "**:data-[slot=navigation-menu-item]:focus:ring-0 **:data-[slot=navigation-menu-item]:focus:outline-none",
        props.class,
      )}
      {...rest}
    />
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


export const NavigationMenuLink = <T extends ValidComponent = "a">(
  props: NavigationMenuItemProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationMenuItemProps, ["class"])

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
