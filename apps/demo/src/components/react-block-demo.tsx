import * as React from "react"

import Dashboard from "@/registry/react/blocks/dashboard"
import { ConsoleShell } from "@/registry/react/blocks/console-shell"
import FormFlow from "@/registry/react/blocks/form-flow"
import DoubleConfirmation from "@/registry/react/blocks/double-confirmation"
import EmptyState from "@/registry/react/blocks/empty-state"
import DataTableView from "@/registry/react/blocks/data-table-view"
import DetailView from "@/registry/react/blocks/detail-view"

export default function ReactBlockDemo({ name }: { name: string }) {
  if (name === "dashboard") {
    return <Dashboard className="h-[640px]" />
  }

  if (name === "console-shell") {
    return <ConsoleShell className="h-[560px]" />
  }

  if (name === "form-flow") {
    return <FormFlow />
  }

  if (name === "double-confirmation") return <DoubleConfirmation />
  if (name === "empty-state") return <EmptyState />
  if (name === "data-table-view") return <DataTableView />
  if (name === "detail-view") return <DetailView />

  return null
}
