import { createMemo, createSignal } from "solid-js"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Columns3CogIcon,
  SearchIcon,
  ServerIcon,
} from "lucide-solid"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
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
  const [query, setQuery] = createSignal("")
  const [selectedId, setSelectedId] = createSignal(rows[0].id)
  const filtered = createMemo(() => {
    const q = query().trim().toLowerCase()
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
      ].some((value) => value.toLowerCase().includes(q)),
    )
  })

  return (
    <section class="grid min-h-0 grid-rows-[auto_48px_minmax(0,1fr)] bg-background text-foreground">
      <div class="flex items-start justify-between gap-6 pb-5">
        <div>
          <div class="text-xs text-muted-foreground">Virtual machines</div>
          <h1 class="mt-1 text-3xl font-semibold tracking-tight">VMs</h1>
          <p class="mt-2 text-sm text-muted-foreground">
            {filtered().length} virtual machines in the current scope
          </p>
        </div>
        <div class="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger class={buttonVariants({ variant: "secondary", size: "sm" })}>
              Actions
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent class="min-w-42">
              <DropdownMenuItem>Import VM</DropdownMenuItem>
              <DropdownMenuItem>Export list</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Assign policy</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm">Create VM</Button>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 border-b">
        <InputGroup class="w-[280px]">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            value={query()}
            onInput={(event) => setQuery(event.currentTarget.value)}
            placeholder="Filter VMs"
          />
        </InputGroup>
        <Button variant="outline" size="icon-sm" aria-label="Configure columns">
          <Columns3CogIcon />
        </Button>
      </div>

      <div class="min-h-0 overflow-auto">
        <Table class="min-w-[1040px] table-fixed">
          <TableHeader class="sticky top-0 z-10 bg-background shadow-[inset_0_-1px_var(--border)]">
            <TableRow>
              <TableHead class="w-[170px]">VM</TableHead>
              <TableHead class="w-[104px]">State</TableHead>
              <TableHead class="w-[104px]">Health</TableHead>
              <TableHead class="w-[190px]">Placement</TableHead>
              <TableHead class="w-[104px]">Address</TableHead>
              <TableHead class="w-[164px]">OS</TableHead>
              <TableHead class="w-[152px]">Resources</TableHead>
              <TableHead class="w-[112px]">Policy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered().map((row) => (
              <TableRow
                class={cn(
                  "cursor-default",
                  selectedId() === row.id &&
                    "bg-secondary shadow-[inset_3px_0_var(--primary)]",
                )}
                onClick={() => setSelectedId(row.id)}
              >
                <TableCell>
                  <div class="flex min-w-0 items-center gap-2">
                    <ServerIcon class="size-4 shrink-0 text-muted-foreground" />
                    <strong class="truncate">{row.name}</strong>
                  </div>
                </TableCell>
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
                <TableCell>
                  <span class="block truncate text-muted-foreground">
                    {row.cpu} / {row.memory} / {row.storage}
                  </span>
                </TableCell>
                <TableCell>{row.policy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <footer class="flex min-h-12 items-center justify-between gap-4 border-t">
          <div class="text-xs font-semibold text-muted-foreground">
            8 columns visible
          </div>
          <Pagination class="m-0 w-auto">
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

function Status(props: { status: ResourceRow["health"] }) {
  const className =
    props.status === "Normal"
      ? "text-success"
      : props.status === "Warning"
        ? "text-warning"
        : "text-info"

  return (
    <Badge variant="ghost" class={cn("gap-1.5 px-0 font-semibold", className)}>
      <span class="size-1.5 rounded-full bg-current" />
      {props.status}
    </Badge>
  )
}

