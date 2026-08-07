import { FolderPlusIcon, SearchIcon } from "lucide-react"

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
    <div className="grid min-h-[680px] grid-rows-[auto_minmax(0,1fr)] bg-background px-4 pt-4 pb-5 text-foreground md:px-8 md:pt-6 md:pb-7">
      <header className="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs leading-[18px] text-muted-foreground">
            Workspaces
          </p>
          <h1 className="mt-[3px] text-[28px] font-[750]">
            Workspace inventory
          </h1>
          <p className="mt-2 text-sm leading-[21px] text-muted-foreground">
            Create the first workspace to start organizing work.
          </p>
        </div>
        <Button type="button" size="sm">
          <FolderPlusIcon aria-hidden="true" />
          New workspace
        </Button>
      </header>
      <section className="grid min-h-0 min-w-0 grid-rows-[48px_minmax(0,1fr)] overflow-hidden border-y">
        <div className="flex min-w-0 items-center justify-end gap-2 border-b">
          <div className="mr-auto hidden min-w-0 items-center gap-2 text-xs font-semibold text-muted-foreground sm:flex">
            <SearchIcon className="size-3.5" aria-hidden="true" />
            No filters applied
          </div>
          <Button type="button" variant="outline" size="sm">
            Refresh
          </Button>
        </div>
        <div className="min-h-0 min-w-0 overflow-auto">
          <Table className="min-w-[760px] table-fixed">
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
                <TableCell
                  colSpan={4}
                  className="h-[420px] whitespace-normal p-0"
                >
                  <div className="grid h-full place-items-center px-6 py-10">
                    <div className="grid max-w-sm place-items-center text-center">
                      <div className="grid size-14 place-items-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                        <FolderPlusIcon className="size-7" aria-hidden="true" />
                      </div>
                      <h2 className="mt-5 text-xl font-[750]">
                        No workspaces yet
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Workspaces will appear here after they are created.
                        Start with one workspace, then add owners and controls.
                      </p>
                      <div className="mt-5 flex flex-wrap justify-center gap-2">
                        <Button type="button" size="sm">
                          <FolderPlusIcon aria-hidden="true" />
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
