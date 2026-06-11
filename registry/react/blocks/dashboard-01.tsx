import { DataTable01 } from "@/components/blocks/data-table-01"
import { Sidebar01 } from "@/components/blocks/sidebar-01"

export default function Dashboard01({ className }: { className?: string }) {
  return (
    <Sidebar01 className={className}>
      <div className="grid h-full min-h-0 px-8 py-6">
        <DataTable01 />
      </div>
    </Sidebar01>
  )
}
