import { createMemo, createSignal, For, Show } from "solid-js"
import ChevronDownIcon from "lucide-solid/icons/chevron-down"
import Columns3CogIcon from "lucide-solid/icons/columns-3-cog"
import PencilIcon from "lucide-solid/icons/pencil"
import PlusIcon from "lucide-solid/icons/plus"
import RefreshCwIcon from "lucide-solid/icons/refresh-cw"
import SearchIcon from "lucide-solid/icons/search"
import Trash2Icon from "lucide-solid/icons/trash-2"

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

type WorkspaceRow = {
  id: string
  name: string
  status: "On track" | "Attention" | "Paused"
  owner: string
  environment: string
  region: string
  updated: string
}

type ColumnId = "owner" | "environment" | "region" | "updated"

const rows: WorkspaceRow[] = [
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

const optionalColumns: Array<{ id: ColumnId; label: string }> = [
  { id: "owner", label: "Owner" },
  { id: "environment", label: "Environment" },
  { id: "region", label: "Region" },
  { id: "updated", label: "Updated" },
]

export default function DataTableView() {
  const [query, setQuery] = createSignal("")
  const [selectedIds, setSelectedIds] = createSignal<string[]>(["atlas"])
  const [visibleColumns, setVisibleColumns] = createSignal<ColumnId[]>([
    "owner",
    "environment",
    "region",
    "updated",
  ])

  const visibleRows = createMemo(() => {
    const value = query().trim().toLowerCase()
    if (!value) return rows

    return rows.filter((row) =>
      [row.name, row.status, row.owner, row.environment, row.region].some(
        (field) => field.toLowerCase().includes(value),
      ),
    )
  })

  const allVisibleSelected = createMemo(
    () =>
      visibleRows().length > 0 &&
      visibleRows().every((row) => selectedIds().includes(row.id)),
  )

  function toggleAll(checked: boolean) {
    if (!checked) {
      const visibleIds = new Set(visibleRows().map((row) => row.id))
      setSelectedIds((current) => current.filter((id) => !visibleIds.has(id)))
      return
    }

    setSelectedIds((current) => [
      ...new Set([...current, ...visibleRows().map((row) => row.id)]),
    ])
  }

  function toggleRow(id: string, checked: boolean) {
    setSelectedIds((current) =>
      checked ? [...new Set([...current, id])] : current.filter((rowId) => rowId !== id),
    )
  }

  function toggleColumn(id: ColumnId, checked: boolean) {
    setVisibleColumns((current) =>
      checked ? [...current, id] : current.filter((columnId) => columnId !== id),
    )
  }

  function isColumnVisible(id: ColumnId) {
    return visibleColumns().includes(id)
  }

  function isSelected(id: string) {
    return selectedIds().includes(id)
  }

  return (
    <div class="grid min-h-[680px] grid-rows-[auto_minmax(0,1fr)_auto] bg-background px-4 pt-4 pb-5 text-foreground md:px-8 md:pt-6 md:pb-7">
      <header class="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div class="min-w-0">
          <p class="text-xs leading-[18px] text-muted-foreground">
            Workspaces
          </p>
          <h1 class="mt-[3px] text-[28px] font-[750]">Workspace inventory</h1>
          <p class="mt-2 text-sm leading-[21px] text-muted-foreground">
            {visibleRows().length} workspaces match the current view.
          </p>
        </div>
        <Button type="button" size="sm">
          <PlusIcon />
          New workspace
        </Button>
      </header>

      <section class="grid min-h-0 min-w-0 grid-rows-[48px_minmax(0,1fr)] overflow-hidden border-y">
        <div class="flex min-w-0 items-center justify-end gap-2 border-b">
          <div class="mr-auto hidden min-w-0 items-center gap-2 text-xs font-semibold text-muted-foreground sm:flex">
            <RefreshCwIcon class="size-3.5" />
            Updated just now
          </div>

          <InputGroup class="min-w-0 max-w-[280px] flex-1 sm:flex-none">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              value={query()}
              onInput={(event) => setQuery(event.currentTarget.value)}
              placeholder="Filter workspaces..."
            />
          </InputGroup>

          <DropdownMenu>
            <DropdownMenuTrigger
              class={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Columns3CogIcon />
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent class="min-w-[176px]">
              <For each={optionalColumns}>
                {(column) => (
                  <DropdownMenuCheckboxItem
                    checked={isColumnVisible(column.id)}
                    onChange={(checked) => toggleColumn(column.id, checked)}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                )}
              </For>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              class={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              Actions
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent class="min-w-[168px]">
              <DropdownMenuItem>
                <RefreshCwIcon />
                Refresh
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={selectedIds().length !== 1}>
                <PencilIcon />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                disabled={selectedIds().length === 0}
              >
                <Trash2Icon />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div class="min-h-0 min-w-0 overflow-auto">
          <Table class="min-w-[980px] table-fixed">
            <TableHeader class="sticky top-0 z-10 bg-background shadow-[inset_0_-1px_var(--border)]">
              <TableRow>
                <TableHead class="w-11 text-center">
                  <Checkbox
                    checked={allVisibleSelected()}
                    onChange={toggleAll}
                    aria-label="Select all visible rows"
                  />
                </TableHead>
                <TableHead>Workspace</TableHead>
                <TableHead>Status</TableHead>
                <Show when={isColumnVisible("owner")}>
                  <TableHead>Owner</TableHead>
                </Show>
                <Show when={isColumnVisible("environment")}>
                  <TableHead>Environment</TableHead>
                </Show>
                <Show when={isColumnVisible("region")}>
                  <TableHead>Region</TableHead>
                </Show>
                <Show when={isColumnVisible("updated")}>
                  <TableHead>Updated</TableHead>
                </Show>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Show
                when={visibleRows().length > 0}
                fallback={
                  <TableRow>
                    <TableCell colSpan={7} class="h-40 text-center text-muted-foreground">
                      No workspaces match this filter.
                    </TableCell>
                  </TableRow>
                }
              >
                <For each={visibleRows()}>
                  {(row) => (
                    <TableRow data-state={isSelected(row.id) ? "selected" : undefined}>
                      <TableCell class="text-center">
                        <Checkbox
                          checked={isSelected(row.id)}
                          onChange={(checked) => toggleRow(row.id, checked)}
                          aria-label={`Select ${row.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <span class="font-semibold text-foreground">
                          {row.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StateIndicator status={row.status} />
                      </TableCell>
                      <Show when={isColumnVisible("owner")}>
                        <TableCell>{row.owner}</TableCell>
                      </Show>
                      <Show when={isColumnVisible("environment")}>
                        <TableCell>{row.environment}</TableCell>
                      </Show>
                      <Show when={isColumnVisible("region")}>
                        <TableCell>{row.region}</TableCell>
                      </Show>
                      <Show when={isColumnVisible("updated")}>
                        <TableCell class="text-muted-foreground">
                          {row.updated}
                        </TableCell>
                      </Show>
                    </TableRow>
                  )}
                </For>
              </Show>
            </TableBody>
          </Table>
        </div>
      </section>

      <footer class="flex min-w-0 items-center justify-between gap-4 pt-3 text-xs text-muted-foreground">
        <span>{selectedIds().length} selected</span>
        <span>Showing {visibleRows().length} of {rows.length}</span>
      </footer>
    </div>
  )
}

function StateIndicator(props: { status: WorkspaceRow["status"] }) {
  const className =
    props.status === "On track"
      ? "text-success"
      : props.status === "Attention"
        ? "text-warning"
        : "text-info"

  return (
    <Badge variant="ghost" class={`gap-1.5 px-0 font-semibold ${className}`}>
      <span class="size-1.5 rounded-full bg-current" />
      {props.status}
    </Badge>
  )
}
