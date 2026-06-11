import * as React from "react"

import Dashboard01 from "@/registry/react/blocks/dashboard-01"
import { DataTable01 } from "@/registry/react/blocks/data-table-01"
import { Sidebar01 } from "@/registry/react/blocks/sidebar-01"

export default function ReactBlockDemo({ name }: { name: string }) {
  if (name === "dashboard-01") {
    return <Dashboard01 className="h-[640px]" />
  }

  if (name === "sidebar-01") {
    return <Sidebar01 className="h-[560px]" />
  }

  if (name === "data-table-01") {
    return (
      <div className="grid h-[560px] bg-background px-8 py-6 text-foreground">
        <DataTable01 />
      </div>
    )
  }

  return null
}
