import type { JSX } from "solid-js"
import ChevronDownIcon from "lucide-solid/icons/chevron-down"
import PencilIcon from "lucide-solid/icons/pencil"
import RefreshCwIcon from "lucide-solid/icons/refresh-cw"
import Trash2Icon from "lucide-solid/icons/trash-2"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type ResourceListLayoutProps = {
  eyebrow: string
  title: string
  description?: JSX.Element
  actions?: JSX.Element
  children: JSX.Element
}

export function ResourceListLayout(props: ResourceListLayoutProps) {
  return (
    <div
      data-slot="resource-list-layout"
      class="grid h-full min-h-0 w-full min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden px-4 pt-4 pb-5 md:px-8 md:pt-6 md:pb-7"
    >
      <section class="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div class="min-w-0">
          <div class="text-xs leading-[18px] text-muted-foreground">
            {props.eyebrow}
          </div>
          <h1 class="mt-[3px] text-[28px] font-[750]">{props.title}</h1>
          {props.description ? (
            <p class="mt-2 text-sm leading-[21px] text-muted-foreground">
              {props.description}
            </p>
          ) : null}
        </div>
        {props.actions ? (
          <div class="flex shrink-0 items-center gap-2.5">{props.actions}</div>
        ) : null}
      </section>
      {props.children}
    </div>
  )
}

export interface ResourceListActionsProps {
  selectedCount: number
  isRefreshing?: boolean
  onRefresh?: () => void
  onEdit?: () => void
  onDelete?: () => void
  createAction: JSX.Element
}

export function ResourceListActions(props: ResourceListActionsProps) {
  const isRefreshing = () => props.isRefreshing ?? false

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          class={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Actions
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-[168px]">
          {props.onRefresh ? (
            <DropdownMenuItem onSelect={props.onRefresh} disabled={isRefreshing()}>
              <RefreshCwIcon class={cn(isRefreshing() && "animate-spin")} />
              Refresh
            </DropdownMenuItem>
          ) : null}
          {(props.onEdit || props.onDelete) && props.onRefresh ? (
            <DropdownMenuSeparator />
          ) : null}
          {props.onEdit ? (
            <DropdownMenuItem
              onSelect={props.onEdit}
              disabled={props.selectedCount !== 1}
            >
              <PencilIcon />
              Edit
            </DropdownMenuItem>
          ) : null}
          {props.onDelete ? (
            <DropdownMenuItem
              variant="destructive"
              onSelect={props.onDelete}
              disabled={props.selectedCount === 0}
            >
              <Trash2Icon />
              Delete
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      {props.createAction}
    </>
  )
}
