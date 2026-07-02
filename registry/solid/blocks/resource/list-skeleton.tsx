import { For } from "solid-js"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export interface ListSkeletonProps {
  rows?: number
  class?: string
}

export function ListSkeleton(props: ListSkeletonProps) {
  const rows = () => Array.from({ length: props.rows ?? 6 }, (_, index) => index)

  return (
    <div class={cn("space-y-3", props.class)} aria-label="Loading resources">
      <For each={rows()}>
        {(row) => (
          <div class="grid grid-cols-[minmax(10rem,1.4fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_6rem] items-center gap-4 border-b border-border/80 py-3">
            <Skeleton class="h-5 w-4/5" />
            <Skeleton class="h-5 w-2/3" />
            <Skeleton class="h-5 w-3/4" />
            <Skeleton class={cn("h-5", row % 2 === 0 ? "w-14" : "w-10")} />
          </div>
        )}
      </For>
    </div>
  )
}
