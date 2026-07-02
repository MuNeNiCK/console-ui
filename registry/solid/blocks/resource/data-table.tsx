import { createEffect, createMemo, createSignal, For, Show, type JSX } from "solid-js"
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/solid-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  Table as TableInstance,
  Updater,
  VisibilityState,
} from "@tanstack/solid-table"
import ArrowDownIcon from "lucide-solid/icons/arrow-down"
import ArrowUpIcon from "lucide-solid/icons/arrow-up"
import ChevronDownIcon from "lucide-solid/icons/chevron-down"
import ChevronLeftIcon from "lucide-solid/icons/chevron-left"
import ChevronRightIcon from "lucide-solid/icons/chevron-right"
import ChevronsUpDownIcon from "lucide-solid/icons/chevrons-up-down"
import Columns3CogIcon from "lucide-solid/icons/columns-3-cog"
import SearchIcon from "lucide-solid/icons/search"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { cn } from "@/lib/utils"

export type DataTableProps<TData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  class?: string
  searchKey?: string
  searchPlaceholder?: string
  toolbar?: (table: TableInstance<TData>) => JSX.Element
  emptyMessage?: JSX.Element
  initialPageSize?: number
  pageSizeOptions?: number[]
  footer?: JSX.Element
  viewOptions?: boolean
  getRowId?: (row: TData, index: number) => string
  rowSelection?: RowSelectionState
  onRowSelectionChange?: (selection: RowSelectionState) => void
  onRowAction?: (row: TData) => void
}

type DataTableColumnMeta = {
  headerLabel?: string
}

const defaultPageSizeOptions = [10, 20, 30, 50]

function resolveUpdater<TValue>(
  updaterOrValue: Updater<TValue>,
  current: TValue,
): TValue {
  return typeof updaterOrValue === "function"
    ? (updaterOrValue as (old: TValue) => TValue)(current)
    : updaterOrValue
}

function isInteractiveRowTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false

  return Boolean(
    target.closest(
      "a,button,input,select,textarea,[role='button'],[role='checkbox'],[data-row-action]",
    ),
  )
}

export function DataTable<TData, TValue = unknown>(
  props: DataTableProps<TData, TValue>,
) {
  const [sorting, setSorting] = createSignal<SortingState>([])
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    createSignal<VisibilityState>({})
  const [internalRowSelection, setInternalRowSelection] =
    createSignal<RowSelectionState>({})
  const [searchValue, setSearchValue] = createSignal("")

  const pageSizeOptions = createMemo(
    () => props.pageSizeOptions ?? defaultPageSizeOptions,
  )
  const rowSelection = createMemo(
    () => props.rowSelection ?? internalRowSelection(),
  )

  const table = createSolidTable<TData>({
    get data() {
      return props.data
    },
    get columns() {
      return props.columns
    },
    state: {
      get sorting() {
        return sorting()
      },
      get columnFilters() {
        return columnFilters()
      },
      get columnVisibility() {
        return columnVisibility()
      },
      get rowSelection() {
        return rowSelection()
      },
    },
    initialState: {
      pagination: {
        pageSize: props.initialPageSize ?? 10,
      },
    },
    onSortingChange: (updater) =>
      setSorting((current) => resolveUpdater(updater, current)),
    onColumnFiltersChange: (updater) =>
      setColumnFilters((current) => resolveUpdater(updater, current)),
    onColumnVisibilityChange: (updater) =>
      setColumnVisibility((current) => resolveUpdater(updater, current)),
    onRowSelectionChange: (updater) => {
      const next = resolveUpdater(updater, rowSelection())
      if (props.onRowSelectionChange) {
        props.onRowSelectionChange(next)
      } else {
        setInternalRowSelection(next)
      }
    },
    getRowId: props.getRowId,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  createEffect(() => {
    const searchKey = props.searchKey
    if (!searchKey) return

    table.getColumn(searchKey)?.setFilterValue(searchValue())
  })

  const isFiltered = createMemo(
    () => Boolean(searchValue()) || columnFilters().length > 0,
  )

  return (
    <div
      data-slot="data-table"
      class={cn(
        "grid h-full min-h-0 w-full min-w-0 grid-rows-[48px_minmax(0,1fr)] overflow-hidden bg-background text-foreground",
        props.class,
      )}
    >
      <div
        data-slot="data-table-toolbar"
        class="flex min-w-0 items-center justify-end gap-2 border-b"
      >
        <Show when={props.toolbar}>
          {(toolbar) => (
            <div class="mr-auto hidden min-w-0 items-center gap-3 text-xs font-semibold text-muted-foreground sm:flex">
              {toolbar()(table)}
              <Show when={isFiltered()}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchValue("")
                    table.resetColumnFilters()
                  }}
                >
                  Reset
                </Button>
              </Show>
            </div>
          )}
        </Show>
        <Show when={props.searchKey}>
          <InputGroup class="min-w-0 max-w-[280px] flex-1 sm:flex-none">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              value={searchValue()}
              onInput={(event) => setSearchValue(event.currentTarget.value)}
              placeholder={props.searchPlaceholder ?? "Filter results..."}
            />
          </InputGroup>
        </Show>
        <Show when={props.viewOptions ?? true}>
          <DataTableViewOptions table={table} />
        </Show>
      </div>

      <div data-slot="data-table-shell" class="min-h-0 min-w-0 overflow-auto">
        <Table class="min-w-[1040px] table-fixed text-left">
          <TableHeader class="sticky top-0 z-10 bg-background shadow-[inset_0_-1px_var(--border)]">
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow>
                  <For each={headerGroup.headers}>
                    {(header) => {
                      const canSort = header.column.getCanSort()
                      const sortDirection = header.column.getIsSorted()

                      return (
                        <TableHead
                          class={cn(
                            "h-11 px-3 text-xs font-semibold text-foreground/80",
                            "[&[data-sort=desc]]:text-foreground [&[data-sort=asc]]:text-foreground",
                            header.column.id === "select" &&
                              "w-11 text-center [&>[role=checkbox]]:mx-auto",
                          )}
                          data-sort={
                            sortDirection ? String(sortDirection) : undefined
                          }
                        >
                          <Show when={!header.isPlaceholder} fallback={null}>
                            <Show
                              when={canSort}
                              fallback={flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            >
                              <button
                                type="button"
                                onClick={header.column.getToggleSortingHandler()}
                                class="group flex w-full items-center gap-2 text-left transition-colors hover:text-foreground"
                              >
                                <span class="truncate">
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                                </span>
                                <span class="flex items-center">
                                  <Show
                                    when={sortDirection === "asc"}
                                    fallback={
                                      <Show
                                        when={sortDirection === "desc"}
                                        fallback={
                                          <ChevronsUpDownIcon class="size-3.5 opacity-40 group-hover:opacity-70" />
                                        }
                                      >
                                        <ArrowDownIcon class="size-3.5" />
                                      </Show>
                                    }
                                  >
                                    <ArrowUpIcon class="size-3.5" />
                                  </Show>
                                </span>
                              </button>
                            </Show>
                          </Show>
                        </TableHead>
                      )
                    }}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody>
            <Show
              when={table.getRowModel().rows.length > 0}
              fallback={
                <TableRow class="border-border/40">
                  <TableCell
                    colSpan={table.getVisibleLeafColumns().length}
                    class="h-24 px-4 text-center text-sm text-muted-foreground"
                  >
                    {props.emptyMessage ?? "No records found."}
                  </TableCell>
                </TableRow>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    tabIndex={props.onRowAction ? 0 : undefined}
                    class={cn(
                      "h-16 text-sm text-foreground transition-colors hover:bg-accent/50 data-[state=selected]:bg-secondary data-[state=selected]:shadow-[inset_3px_0_var(--primary)]",
                      props.onRowAction
                        ? "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                        : "cursor-default",
                    )}
                    onClick={(event) => {
                      if (
                        !props.onRowAction ||
                        isInteractiveRowTarget(event.target)
                      ) {
                        return
                      }
                      props.onRowAction(row.original)
                    }}
                    onKeyDown={(event) => {
                      if (
                        !props.onRowAction ||
                        isInteractiveRowTarget(event.target)
                      ) {
                        return
                      }
                      if (event.key !== "Enter") return
                      props.onRowAction(row.original)
                    }}
                  >
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell
                          class={cn(
                            cell.column.id === "select" &&
                              "w-11 text-center [&>[role=checkbox]]:mx-auto",
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </Show>
          </TableBody>
        </Table>
        {props.footer}
        <DataTablePagination table={table} pageSizeOptions={pageSizeOptions()} />
      </div>
    </div>
  )
}

export function DataTableViewOptions<TData>(props: {
  table: TableInstance<TData>
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        class={buttonVariants({ variant: "outline", size: "icon-sm" })}
        aria-label="Configure columns"
        title="Columns"
      >
        <Columns3CogIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-[12rem] text-foreground">
        <DropdownMenuCheckboxItem checked class="pointer-events-none opacity-70">
          Columns
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked class="pointer-events-none opacity-40">
          --
        </DropdownMenuCheckboxItem>
        <For
          each={props.table
            .getAllLeafColumns()
            .filter((column) => column.getCanHide())}
        >
          {(column) => (
            <DropdownMenuCheckboxItem
              checked={column.getIsVisible()}
              onChange={(value) => column.toggleVisibility(Boolean(value))}
              class="text-sm text-muted-foreground data-[checked]:text-foreground"
            >
              {(column.columnDef.meta as DataTableColumnMeta | undefined)
                ?.headerLabel || column.id}
            </DropdownMenuCheckboxItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DataTablePagination<TData>(props: {
  table: TableInstance<TData>
  pageSizeOptions?: number[]
}) {
  const pageSize = createMemo(() => props.table.getState().pagination.pageSize)
  const pageCount = createMemo(() => props.table.getPageCount())
  const pageIndex = createMemo(() => props.table.getState().pagination.pageIndex)
  const filteredRowCount = createMemo(
    () => props.table.getFilteredRowModel().rows.length,
  )
  const pageStart = createMemo(() =>
    filteredRowCount() ? pageIndex() * pageSize() + 1 : 0,
  )
  const pageEnd = createMemo(() =>
    Math.min(pageStart() + pageSize() - 1, filteredRowCount()),
  )

  return (
    <footer class="flex min-h-12 items-center justify-between gap-4 border-t">
      <div class="flex min-w-0 flex-1 items-center gap-3 text-xs font-semibold text-muted-foreground">
        <span class="min-w-0 truncate">
          {props.table.getVisibleLeafColumns().length} columns visible
        </span>
        <span>
          Showing {filteredRowCount() ? `${pageStart()}-${pageEnd()}` : 0} of{" "}
          {filteredRowCount()}
        </span>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            class={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {pageSize()} rows
            <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="min-w-[8rem]">
            <For each={props.pageSizeOptions ?? defaultPageSizeOptions}>
              {(option) => (
                <DropdownMenuItem
                  onSelect={() => props.table.setPageSize(option)}
                >
                  {option} rows
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
        <div class="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => props.table.previousPage()}
            disabled={!props.table.getCanPreviousPage()}
          >
            <ChevronLeftIcon class="size-3.5" />
            <span class="sr-only">Previous</span>
          </Button>
          <For
            each={Array.from(
              { length: Math.min(pageCount() || 1, 5) },
              (_, index) => index,
            )}
          >
            {(index) => (
              <Button
                type="button"
                variant={index === pageIndex() ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => props.table.setPageIndex(index)}
              >
                {index + 1}
              </Button>
            )}
          </For>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => props.table.nextPage()}
            disabled={!props.table.getCanNextPage()}
          >
            <ChevronRightIcon class="size-3.5" />
            <span class="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}
