import { DataTable01 } from "@/components/blocks/data-table-01"
import { Sidebar01 } from "@/components/blocks/sidebar-01"

export default function Dashboard01(props: { class?: string }) {
  return (
    <Sidebar01 class={props.class}>
      <div class="grid h-full min-h-0 w-full min-w-0 overflow-hidden px-4 py-4 md:px-8 md:py-6">
        <DataTable01 />
      </div>
    </Sidebar01>
  )
}
