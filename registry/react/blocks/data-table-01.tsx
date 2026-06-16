"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Columns3CogIcon,
  SearchIcon,
  ServerIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

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
    id: "vm-app-01",
    name: "vm-app-01",
    state: "Powered on",
    health: "Normal",
    cluster: "Compute A",
    host: "esx-a01.lab.local",
    ip: "10.30.1.24",
    os: "Ubuntu Server 24.04",
    cpu: "4 vCPU",
    memory: "16 GB",
    storage: "128 GB",
    policy: "app-tier",
  },
  {
    id: "vm-api-03",
    name: "vm-api-03",
    state: "Powered on",
    health: "Warning",
    cluster: "Compute A",
    host: "esx-a02.lab.local",
    ip: "10.30.1.42",
    os: "Ubuntu Server 24.04",
    cpu: "8 vCPU",
    memory: "32 GB",
    storage: "256 GB",
    policy: "app-tier",
  },
  {
    id: "vm-sql-07",
    name: "vm-sql-07",
    state: "Powered on",
    health: "Normal",
    cluster: "Database",
    host: "esx-db-02.lab.local",
    ip: "10.30.2.77",
    os: "Windows Server 2022",
    cpu: "16 vCPU",
    memory: "96 GB",
    storage: "1.8 TB",
    policy: "database-tier",
  },
  {
    id: "vm-build-02",
    name: "vm-build-02",
    state: "Suspended",
    health: "Maintenance",
    cluster: "Build",
    host: "esx-build-01.lab.local",
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
    host: "esx-b01.edge.local",
    ip: "10.40.8.31",
    os: "AlmaLinux 9",
    cpu: "2 vCPU",
    memory: "8 GB",
    storage: "80 GB",
    policy: "edge-tier",
  },
]

export function DataTable01() {
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState(rows[0].id)
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows

    return rows.filter((row) =>
      [
        row.name,
        row.state,
        row.health,
        row.cluster,
        row.host,
        row.ip,
        row.os,
        row.policy,
      ].some((value) => value.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <section className="grid h-full min-h-0 w-full min-w-0 grid-rows-[auto_48px_minmax(0,1fr)] overflow-hidden bg-background text-foreground">
      <div className="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="text-xs text-muted-foreground">Virtual machines</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">VMs</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {filtered.length} virtual machines in the current scope
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="secondary" size="sm" />}>
              Actions
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-42">
              <DropdownMenuItem>Import VM</DropdownMenuItem>
              <DropdownMenuItem>Export list</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Assign policy</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm">Create VM</Button>
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-2 border-b">
        <InputGroup className="min-w-0 max-w-[280px] flex-1">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Filter VMs"
          />
        </InputGroup>
        <Button variant="outline" size="icon-sm" aria-label="Configure columns">
          <Columns3CogIcon />
        </Button>
      </div>

      <div className="min-h-0 min-w-0 overflow-auto">
        <Table className="min-w-[1040px] table-fixed">
          <TableHeader className="sticky top-0 z-10 bg-background shadow-[inset_0_-1px_var(--border)]">
            <TableRow>
              <TableHead className="w-[170px]">VM</TableHead>
              <TableHead className="w-[104px]">State</TableHead>
              <TableHead className="w-[104px]">Health</TableHead>
              <TableHead className="w-[190px]">Placement</TableHead>
              <TableHead className="w-[104px]">Address</TableHead>
              <TableHead className="w-[164px]">OS</TableHead>
              <TableHead className="w-[152px]">Resources</TableHead>
              <TableHead className="w-[112px]">Policy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "cursor-default",
                  selectedId === row.id &&
                    "bg-secondary shadow-[inset_3px_0_var(--primary)]"
                )}
                onClick={() => setSelectedId(row.id)}
              >
                <TableCell>
                  <div className="flex min-w-0 items-center gap-2">
                    <ServerIcon className="size-4 shrink-0 text-muted-foreground" />
                    <strong className="truncate">{row.name}</strong>
                  </div>
                </TableCell>
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
                <TableCell>
                  <span className="block truncate text-muted-foreground">
                    {row.cpu} / {row.memory} / {row.storage}
                  </span>
                </TableCell>
                <TableCell>{row.policy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <footer className="flex min-h-12 items-center justify-between gap-4 border-t">
          <div className="text-xs font-semibold text-muted-foreground">
            8 columns visible
          </div>
          <Pagination className="m-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" size="icon-sm" aria-label="Previous page">
                  <ChevronLeftIcon />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="icon-sm" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="icon-sm">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="icon-sm" aria-label="Next page">
                  <ChevronRightIcon />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </footer>
      </div>
    </section>
  )
}

function Status({ status }: { status: ResourceRow["health"] }) {
  const className =
    status === "Normal"
      ? "text-success"
      : status === "Warning"
        ? "text-warning"
        : "text-info"

  return (
    <Badge variant="ghost" className={cn("gap-1.5 px-0 font-semibold", className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  )
}
