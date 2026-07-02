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

type MachineRow = {
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

const rows: MachineRow[] = [
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

export default function Dashboard({ className }: { className?: string }) {
  return (
    <ConsoleShell className={className}>
      <div className="grid h-full min-h-0 w-full min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-background px-4 py-4 text-foreground md:px-8 md:py-6">
        <div className="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">
              Virtual machines
            </div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">VMs</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {rows.length} virtual machines in the current scope
            </p>
          </div>
        </div>
        <div className="min-h-0 min-w-0 overflow-auto border-y">
          <Table className="min-w-[960px] table-fixed">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead>VM</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Placement</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Policy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} className="h-16">
                  <TableCell className="font-semibold">{row.name}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>
                    <Status status={row.health} />
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0">
                      <strong className="block truncate">{row.cluster}</strong>
                      <span className="block truncate text-xs text-muted-foreground">
                        {row.host}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{row.ip}</TableCell>
                  <TableCell>{row.os}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.cpu} / {row.memory} / {row.storage}
                  </TableCell>
                  <TableCell>{row.policy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ConsoleShell>
  )
}

function Status({ status }: { status: MachineRow["health"] }) {
  const className =
    status === "Normal"
      ? "text-success"
      : status === "Warning"
        ? "text-warning"
        : "text-info"

  return (
    <Badge variant="ghost" className={`gap-1.5 px-0 font-semibold ${className}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  )
}
