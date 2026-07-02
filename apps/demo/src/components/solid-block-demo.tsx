import Dashboard from "@/registry/solid/blocks/dashboard"
import { ConsoleShell } from "@/registry/solid/blocks/console-shell"
import DataTableView from "@/registry/solid/blocks/data-table-view/page"
import DetailView from "@/registry/solid/blocks/detail-view/page"
import DoubleConfirmation from "@/registry/solid/blocks/double-confirmation/page"
import EmptyState from "@/registry/solid/blocks/empty-state/page"
import FormFlow from "@/registry/solid/blocks/form-flow/page"

export default function SolidBlockDemo(props: { name: string }) {
  if (props.name === "dashboard") {
    return <Dashboard class="h-[640px]" />
  }

  if (props.name === "console-shell") {
    return <ConsoleShell class="h-[560px]" />
  }

  if (props.name === "data-table-view") {
    return <DataTableView />
  }

  if (props.name === "detail-view") {
    return <DetailView />
  }

  if (props.name === "form-flow") {
    return <FormFlow />
  }

  if (props.name === "double-confirmation") {
    return <DoubleConfirmation />
  }

  if (props.name === "empty-state") {
    return <EmptyState />
  }

  return null
}
