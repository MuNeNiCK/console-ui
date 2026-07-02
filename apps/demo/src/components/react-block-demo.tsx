import * as React from "react"

import Dashboard from "@/registry/react/blocks/dashboard"
import { ConsoleShell } from "@/registry/react/blocks/console-shell"

export default function ReactBlockDemo({ name }: { name: string }) {
  if (name === "dashboard") {
    return <Dashboard className="h-[640px]" />
  }

  if (name === "console-shell") {
    return <ConsoleShell className="h-[560px]" />
  }

  return null
}
