import type { JSX } from "solid-js"

import { cn } from "@/lib/utils"

export interface ResourceDetailLayoutProps {
  summary?: JSX.Element
  children?: JSX.Element
  class?: string
}

export function ResourceDetailLayout(props: ResourceDetailLayoutProps) {
  return (
    <div class={cn("min-w-0", props.class)}>
      {props.summary ? <div>{props.summary}</div> : null}
      <div class="grid grid-cols-1 gap-x-5 gap-y-4 pt-5 min-[980px]:grid-cols-12 min-[980px]:[&>*:only-child]:col-span-12">
        {props.children}
      </div>
    </div>
  )
}
