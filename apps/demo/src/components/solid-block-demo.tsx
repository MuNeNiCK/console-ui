import Dashboard01 from "@/registry/solid/blocks/dashboard-01"
import { Sidebar01 } from "@/registry/solid/blocks/sidebar-01"

export default function SolidBlockDemo(props: { name: string }) {
  if (props.name === "dashboard-01") {
    return <Dashboard01 class="h-[640px]" />
  }

  if (props.name === "sidebar-01") {
    return <Sidebar01 class="h-[560px]" />
  }

  return null
}
