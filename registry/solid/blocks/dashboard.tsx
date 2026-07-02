import { For } from "solid-js"

import { ConsoleShell } from "@/components/blocks/console-shell"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ResourceRow = {
  id: string
  name: string
  state: string
  health: "Normal" | "Warning" | "Maintenance"
  cluster: string
  host: string
  ip: string
  os: string
  cpu: string
  memory: string
  storage: string
  policy: string
}

const rows: ResourceRow[] = [
  {
    id: "web-app",
    name: "web-app",
    state: "Powered on",
    health: "Normal",
    cluster: "Compute A",
    host: "esx-app.lab.local",
    ip: "10.30.1.24",
    os: "Ubuntu Server 24.04",
    cpu: "4 vCPU",
    memory: "16 GB",
    storage: "128 GB",
    policy: "app-tier",
  },
  {
    id: "public-api",
    name: "public-api",
    state: "Powered on",
    health: "Warning",
    cluster: "Compute A",
    host: "esx-api.lab.local",
    ip: "10.30.1.42",
    os: "Ubuntu Server 24.04",
    cpu: "8 vCPU",
    memory: "32 GB",
    storage: "256 GB",
    policy: "app-tier",
  },
  {
    id: "orders-db",
    name: "orders-db",
    state: "Powered on",
    health: "Normal",
    cluster: "Database",
    host: "esx-db.lab.local",
    ip: "10.30.2.77",
    os: "Windows Server 2022",
    cpu: "16 vCPU",
    memory: "96 GB",
    storage: "1.8 TB",
    policy: "database-tier",
  },
  {
    id: "build-worker",
    name: "build-worker",
    state: "Suspended",
    health: "Maintenance",
    cluster: "Build",
    host: "esx-build.lab.local",
    ip: "10.30.8.32",
    os: "Debian 12",
    cpu: "6 vCPU",
    memory: "24 GB",
    storage: "300 GB",
    policy: "ci-tier",
  },
  {
    id: "vm-edge-cache",
    name: "vm-edge-cache",
    state: "Powered off",
    health: "Normal",
    cluster: "Remote B",
    host: "esx-edge.lab.local",
    ip: "10.40.8.31",
    os: "AlmaLinux 9",
    cpu: "2 vCPU",
    memory: "8 GB",
    storage: "80 GB",
    policy: "edge-tier",
  },
]

export default function Dashboard(props: { class?: string }) {
  return (
    <ConsoleShell class={props.class}>
      <div class="grid h-full min-h-0 w-full min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-background px-4 py-4 text-foreground md:px-8 md:py-6">
        <div class="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div class="min-w-0">
            <div class="text-xs text-muted-foreground">Virtual machines</div>
            <h1 class="mt-1 text-3xl font-semibold tracking-tight">VMs</h1>
            <p class="mt-2 text-sm text-muted-foreground">
              {rows.length} virtual machines in the current scope
            </p>
          </div>
        </div>
        <div class="min-h-0 min-w-0 overflow-auto border-y">
          <Table class="min-w-[960px] table-fixed">
            <TableHeader class="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead>VM</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Placement</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Resources</TableHead>
                <TableHead>Policy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <For each={rows}>
                {(row) => (
                  <TableRow class="h-16">
                    <TableCell class="font-semibold">{row.name}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>
                      <Status status={row.health} />
                    </TableCell>
                    <TableCell>
                      <div class="min-w-0">
                        <strong class="block truncate">{row.cluster}</strong>
                        <span class="block truncate text-xs text-muted-foreground">
                          {row.host}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{row.ip}</TableCell>
                    <TableCell>{row.os}</TableCell>
                    <TableCell class="text-muted-foreground">
                      {row.cpu} / {row.memory} / {row.storage}
                    </TableCell>
                    <TableCell>{row.policy}</TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </div>
      </div>
    </ConsoleShell>
  )
}

function Status(props: { status: ResourceRow["health"] }) {
  const className =
    props.status === "Normal"
      ? "text-success"
      : props.status === "Warning"
        ? "text-warning"
        : "text-info"

  return (
    <Badge variant="ghost" class={`gap-1.5 px-0 font-semibold ${className}`}>
      <span class="size-1.5 rounded-full bg-current" />
      {props.status}
    </Badge>
  )
}
