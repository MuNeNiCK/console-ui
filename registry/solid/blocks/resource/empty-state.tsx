import type { Component, JSX } from "solid-js"
import InboxIcon from "lucide-solid/icons/inbox"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface EmptyStateAction {
  label: string
  href?: string
  onClick?: (event: MouseEvent) => void
}

export interface EmptyStateProps {
  icon?: Component<{ class?: string }>
  title: string
  description?: string
  action?: EmptyStateAction | JSX.Element
  class?: string
}

function renderAction(action: EmptyStateProps["action"]) {
  if (!action) return null

  if (typeof action === "object" && "label" in action) {
    if (action.href) {
      return (
        <Button
          variant="default"
          size="sm"
          class="mt-2 h-9 px-4 text-xs"
          as="a"
          href={action.href}
          onClick={(event) => action.onClick?.(event)}
        >
          {action.label}
        </Button>
      )
    }

    return (
      <Button
        type="button"
        variant="default"
        size="sm"
        class="mt-2 h-9 px-4 text-xs"
        onClick={(event) => action.onClick?.(event)}
      >
        {action.label}
      </Button>
    )
  }

  return action
}

export function EmptyState(props: EmptyStateProps) {
  const Icon = props.icon ?? InboxIcon

  return (
    <div
      class={cn(
        "self-start rounded border border-dashed border-border/60 bg-muted/10 px-6 py-14",
        props.class,
      )}
    >
      <div class="flex flex-col items-center justify-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted/40">
          <Icon class="h-6 w-6 text-muted-foreground" />
        </div>
        <div class="flex flex-col items-center gap-1 text-center">
          <h3 class="text-sm font-semibold">{props.title}</h3>
          {props.description ? (
            <p class="text-sm text-muted-foreground">{props.description}</p>
          ) : null}
        </div>
        {renderAction(props.action)}
      </div>
    </div>
  )
}
