import Dashboard from "@/registry/solid/blocks/dashboard"
import { ConsoleShell } from "@/registry/solid/blocks/console-shell"
import ResourceBlockDemo from "./resource-block-demo"

export default function SolidBlockDemo(props: { name: string }) {
  if (props.name === "dashboard") {
    return <Dashboard class="h-[640px]" />
  }

  if (props.name === "console-shell") {
    return <ConsoleShell class="h-[560px]" />
  }

  if (props.name === "resource") {
    return <ResourceBlockDemo />
  }

  return null
}
