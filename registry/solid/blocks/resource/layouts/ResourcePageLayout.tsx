import type { JSX } from "solid-js"
import ArrowLeftIcon from "lucide-solid/icons/arrow-left"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ResourcePageLayoutProps {
  eyebrow?: JSX.Element
  title: JSX.Element
  description?: JSX.Element
  titleMeta?: JSX.Element
  actions?: JSX.Element
  actionsClass?: string
  backHref?: string
  backLabel?: string
  onBackClick?: (event: MouseEvent) => void
  children: JSX.Element
  fill?: boolean
  class?: string
  bodyClass?: string
}

export function ResourcePageLayout(props: ResourcePageLayoutProps) {
  const fill = () => props.fill ?? false

  return (
    <div
      data-slot="resource-page-layout"
      class={cn(
        fill()
          ? "grid h-full min-h-0 w-full min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden px-4 pt-4 pb-5 md:px-8 md:pt-6 md:pb-7"
          : "w-full min-w-0 px-4 pt-4 pb-5 md:px-8 md:pt-6 md:pb-7",
        props.class,
      )}
    >
      <section class="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div class="min-w-0">
          <div
            class={cn(
              "flex min-w-0 items-center gap-3",
              props.backHref ? "min-h-8" : "min-h-[18px]",
            )}
          >
            {props.backHref ? (
              <Button
                variant="outline"
                size="icon-sm"
                as="a"
                href={props.backHref}
                aria-label={props.backLabel ?? "Back"}
                onClick={(event) => props.onBackClick?.(event)}
              >
                <ArrowLeftIcon />
              </Button>
            ) : null}
            {props.eyebrow ? (
              <div class="min-w-0 truncate text-xs leading-[18px] text-muted-foreground">
                {props.eyebrow}
              </div>
            ) : null}
          </div>
          <div class="mt-[3px] flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            <h1 class="min-w-0 truncate text-[28px] font-[750]">
              {props.title}
            </h1>
            {props.titleMeta}
          </div>
          {props.description ? (
            <p class="mt-2 text-sm leading-[21px] text-muted-foreground">
              {props.description}
            </p>
          ) : null}
        </div>
        {props.actions ? (
          <div
            class={cn("flex shrink-0 items-center gap-2.5", props.actionsClass)}
          >
            {props.actions}
          </div>
        ) : null}
      </section>
      <div class={cn(fill() ? "min-h-0 min-w-0" : "min-w-0", props.bodyClass)}>
        {props.children}
      </div>
    </div>
  )
}
