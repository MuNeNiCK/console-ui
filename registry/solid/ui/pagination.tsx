import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-solid"

import { cx } from "@/registry/solid/lib/cva"
import { buttonVariants, type ButtonProps } from "@/registry/solid/ui/button"

export type PaginationProps = ComponentProps<"nav">

export const Pagination = (props: PaginationProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      class={cx("mx-auto flex w-full justify-center", props.class)}
      {...rest}
    />
  )
}

export type PaginationContentProps = ComponentProps<"ul">

export const PaginationContent = (props: PaginationContentProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <ul
      data-slot="pagination-content"
      class={cx("flex flex-row items-center gap-1", props.class)}
      {...rest}
    />
  )
}

export type PaginationItemProps = ComponentProps<"li">

export const PaginationItem = (props: PaginationItemProps) => {
  return <li data-slot="pagination-item" {...props} />
}

export type PaginationLinkProps = ComponentProps<"a"> &
  Pick<ButtonProps, "size"> & {
    isActive?: boolean
  }

export const PaginationLink = (props: PaginationLinkProps) => {
  const [, rest] = splitProps(props, ["class", "isActive", "size"])

  return (
    <a
      aria-current={props.isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={props.isActive}
      class={cx(
        buttonVariants({
          variant: props.isActive ? "secondary" : "ghost",
          size: props.size ?? "icon",
        }),
        props.class,
      )}
      {...rest}
    />
  )
}

export type PaginationPreviousProps = PaginationLinkProps

export const PaginationPrevious = (props: PaginationPreviousProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      class={cx("gap-1 px-2.5 sm:pl-2.5", props.class)}
      {...rest}
    >
      <ChevronLeftIcon />
      <span class="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

export type PaginationNextProps = PaginationLinkProps

export const PaginationNext = (props: PaginationNextProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      class={cx("gap-1 px-2.5 sm:pr-2.5", props.class)}
      {...rest}
    >
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

export type PaginationEllipsisProps = ComponentProps<"span">

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      class={cx(
        "flex size-9 items-center justify-center rounded-full text-muted-foreground",
        props.class,
      )}
      {...rest}
    >
      <MoreHorizontalIcon class="size-4" />
      <span class="sr-only">More pages</span>
    </span>
  )
}
