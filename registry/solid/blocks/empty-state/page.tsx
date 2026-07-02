import FolderPlusIcon from "lucide-solid/icons/folder-plus"
import SearchIcon from "lucide-solid/icons/search"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function EmptyState() {
  return (
    <div class="grid min-h-[680px] grid-rows-[auto_minmax(0,1fr)] bg-background px-4 pt-4 pb-5 text-foreground md:px-8 md:pt-6 md:pb-7">
      <header class="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div class="min-w-0">
          <p class="text-xs leading-[18px] text-muted-foreground">
            Workspaces
          </p>
          <h1 class="mt-[3px] text-[28px] font-[750]">Workspace inventory</h1>
          <p class="mt-2 text-sm leading-[21px] text-muted-foreground">
            Create the first workspace to start organizing work.
          </p>
        </div>
        <Button type="button" size="sm">
          <FolderPlusIcon />
          New workspace
        </Button>
      </header>

      <section class="grid min-h-0 min-w-0 grid-rows-[48px_minmax(0,1fr)] overflow-hidden border-y">
        <div class="flex min-w-0 items-center justify-end gap-2 border-b">
          <div class="mr-auto hidden min-w-0 items-center gap-2 text-xs font-semibold text-muted-foreground sm:flex">
            <SearchIcon class="size-3.5" />
            No filters applied
          </div>
          <Button type="button" variant="outline" size="sm">
            Refresh
          </Button>
        </div>

        <div class="min-h-0 min-w-0 overflow-auto">
          <Table class="min-w-[760px] table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} class="h-[420px] whitespace-normal p-0">
                  <div class="grid h-full place-items-center px-6 py-10">
                    <div class="grid max-w-sm place-items-center text-center">
                      <div class="grid size-14 place-items-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                        <FolderPlusIcon class="size-7" />
                      </div>
                      <h2 class="mt-5 text-xl font-[750]">
                        No workspaces yet
                      </h2>
                      <p class="mt-2 text-sm leading-6 text-muted-foreground">
                        Workspaces will appear here after they are created.
                        Start with one workspace, then add owners and controls.
                      </p>
                      <div class="mt-5 flex flex-wrap justify-center gap-2">
                        <Button type="button" size="sm">
                          <FolderPlusIcon />
                          New workspace
                        </Button>
                        <Button type="button" variant="outline" size="sm">
                          View documentation
                        </Button>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}
