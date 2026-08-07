"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  Columns3CogIcon,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Row = {
  id: string
  name: string
  status: "On track" | "Attention" | "Paused"
  owner: string
  environment: string
  region: string
  updated: string
}
type ColumnId = "owner" | "environment" | "region" | "updated"
const rows: Row[] = [
  {
    id: "atlas",
    name: "Atlas",
    status: "On track",
    owner: "Platform",
    environment: "Production",
    region: "US West",
    updated: "2 min ago",
  },
  {
    id: "beacon",
    name: "Beacon",
    status: "Attention",
    owner: "Operations",
    environment: "Production",
    region: "EU Central",
    updated: "9 min ago",
  },
  {
    id: "cinder",
    name: "Cinder",
    status: "On track",
    owner: "Data",
    environment: "Staging",
    region: "US East",
    updated: "18 min ago",
  },
  {
    id: "delta",
    name: "Delta",
    status: "Paused",
    owner: "Support",
    environment: "Development",
    region: "AP Southeast",
    updated: "1 hour ago",
  },
]
const optionalColumns: { id: ColumnId; label: string }[] = [
  { id: "owner", label: "Owner" },
  { id: "environment", label: "Environment" },
  { id: "region", label: "Region" },
  { id: "updated", label: "Updated" },
]

export default function DataTableView() {
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<string[]>(["atlas"])
  const [columns, setColumns] = React.useState<ColumnId[]>(
    optionalColumns.map(({ id }) => id),
  )
  const visibleRows = React.useMemo(() => {
    const value = query.trim().toLowerCase()
    return value
      ? rows.filter((row) =>
          [row.name, row.status, row.owner, row.environment, row.region].some(
            (field) => field.toLowerCase().includes(value),
          ),
        )
      : rows
  }, [query])
  const visible = (id: ColumnId) => columns.includes(id)
  const allSelected =
    visibleRows.length > 0 &&
    visibleRows.every((row) => selected.includes(row.id))
  const toggleAll = (checked: boolean) =>
    setSelected((current) =>
      checked
        ? [...new Set([...current, ...visibleRows.map(({ id }) => id)])]
        : current.filter((id) => !visibleRows.some((row) => row.id === id)),
    )
  const toggleRow = (id: string, checked: boolean) =>
    setSelected((current) =>
      checked
        ? [...new Set([...current, id])]
        : current.filter((value) => value !== id),
    )
  const toggleColumn = (id: ColumnId, checked: boolean) =>
    setColumns((current) =>
      checked
        ? [...new Set([...current, id])]
        : current.filter((value) => value !== id),
    )
  return (
    <div className="grid min-h-[680px] grid-rows-[auto_minmax(0,1fr)_auto] bg-background px-4 pt-4 pb-5 text-foreground md:px-8 md:pt-6 md:pb-7">
      <header className="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs leading-[18px] text-muted-foreground">
            Workspaces
          </p>
          <h1 className="mt-[3px] text-[28px] font-[750]">
            Workspace inventory
          </h1>
          <p className="mt-2 text-sm leading-[21px] text-muted-foreground">
            {visibleRows.length} workspaces match the current view.
          </p>
        </div>
        <Button type="button" size="sm">
          <PlusIcon aria-hidden="true" />
          New workspace
        </Button>
      </header>
      <section className="grid min-h-0 min-w-0 grid-rows-[48px_minmax(0,1fr)] overflow-hidden border-y">
        <div className="flex min-w-0 items-center justify-end gap-2 border-b">
          <div className="mr-auto hidden min-w-0 items-center gap-2 text-xs font-semibold text-muted-foreground sm:flex">
            <RefreshCwIcon className="size-3.5" aria-hidden="true" />
            Updated just now
          </div>
          <InputGroup className="min-w-0 max-w-[280px] flex-1 sm:flex-none">
            <InputGroupAddon>
              <SearchIcon aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              name="workspace-filter"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Filter workspaces…"
              aria-label="Filter workspaces"
            />
          </InputGroup>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Columns3CogIcon aria-hidden="true" />
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[176px]">
              {optionalColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={visible(column.id)}
                  onCheckedChange={(checked) =>
                    toggleColumn(column.id, checked)
                  }
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              Actions
              <ChevronDownIcon aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[168px]">
              <DropdownMenuItem>
                <RefreshCwIcon aria-hidden="true" />
                Refresh
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={selected.length !== 1}>
                <PencilIcon aria-hidden="true" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                disabled={selected.length === 0}
              >
                <Trash2Icon aria-hidden="true" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="min-h-0 min-w-0 overflow-auto">
          <Table className="min-w-[980px] table-fixed">
            <TableHeader className="sticky top-0 z-10 bg-background shadow-[inset_0_-1px_var(--border)]">
              <TableRow>
                <TableHead className="w-11 text-center">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all visible rows"
                  />
                </TableHead>
                <TableHead>Workspace</TableHead>
                <TableHead>Status</TableHead>
                {visible("owner") && <TableHead>Owner</TableHead>}
                {visible("environment") && <TableHead>Environment</TableHead>}
                {visible("region") && <TableHead>Region</TableHead>}
                {visible("updated") && <TableHead>Updated</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.length ? (
                visibleRows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={
                      selected.includes(row.id) ? "selected" : undefined
                    }
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onCheckedChange={(checked) =>
                          toggleRow(row.id, checked)
                        }
                        aria-label={`Select ${row.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <State status={row.status} />
                    </TableCell>
                    {visible("owner") && <TableCell>{row.owner}</TableCell>}
                    {visible("environment") && (
                      <TableCell>{row.environment}</TableCell>
                    )}
                    {visible("region") && <TableCell>{row.region}</TableCell>}
                    {visible("updated") && (
                      <TableCell className="text-muted-foreground">
                        {row.updated}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-40 text-center text-muted-foreground"
                  >
                    No workspaces match this filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
      <footer className="flex min-w-0 items-center justify-between gap-4 pt-3 text-xs text-muted-foreground">
        <span>{selected.length} selected</span>
        <span>
          Showing {visibleRows.length} of {rows.length}
        </span>
      </footer>
    </div>
  )
}
function State({ status }: { status: Row["status"] }) {
  const color =
    status === "On track"
      ? "text-success"
      : status === "Attention"
        ? "text-warning"
        : "text-info"
  return (
    <Badge variant="ghost" className={`gap-1.5 px-0 font-semibold ${color}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </Badge>
  )
}
