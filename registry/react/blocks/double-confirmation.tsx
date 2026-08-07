"use client"

import * as React from "react"
import { ArchiveIcon, ShieldAlertIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DoubleConfirmation() {
  const [open, setOpen] = React.useState(false)
  const [confirmation, setConfirmation] = React.useState("")
  const [archived, setArchived] = React.useState(false)
  const canConfirm = confirmation.trim() === "archive"
  function confirmArchive() {
    if (!canConfirm) return
    setArchived(true)
    setOpen(false)
    setConfirmation("")
  }
  return (
    <div className="grid min-h-[680px] place-items-center bg-background px-4 py-8 text-foreground">
      <section className="grid w-full max-w-xl gap-5 rounded-md border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-md border border-warning/30 bg-warning/10 text-warning">
            <ShieldAlertIcon className="size-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-[750]">Archive workspace</h1>
              <Badge variant={archived ? "secondary" : "outline"}>
                {archived ? "Archived" : "Pending"}
              </Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use a second confirmation for actions that are difficult to
              reverse or affect scheduled operations.
            </p>
          </div>
        </div>
        <div className="rounded-md border border-border bg-background px-4 py-3 text-sm">
          <strong className="block">Atlas workspace</strong>
          <span className="mt-1 block text-muted-foreground">
            Production environment, Platform owner, 12 scheduled operations.
          </span>
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            variant="destructive"
            disabled={archived}
            onClick={() => setOpen(true)}
          >
            <ArchiveIcon aria-hidden="true" />
            Archive workspace
          </Button>
        </div>
      </section>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogPortal>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <ShieldAlertIcon aria-hidden="true" />
              </AlertDialogMedia>
              <AlertDialogTitle>Archive Atlas workspace?</AlertDialogTitle>
              <AlertDialogDescription>
                This action removes the workspace from active operations. Type
                archive to confirm the action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <label
              className="grid gap-2 text-sm font-semibold"
              htmlFor="archive-confirmation"
            >
              Confirmation
            </label>
            <Input
              id="archive-confirmation"
              name="archive-confirmation"
              autoComplete="off"
              value={confirmation}
              onChange={(event) => setConfirmation(event.currentTarget.value)}
              placeholder="Type archive…"
              spellCheck={false}
            />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmation("")}>
                Cancel
              </AlertDialogCancel>
              <Button
                type="button"
                variant="destructive"
                disabled={!canConfirm}
                onClick={confirmArchive}
              >
                Archive
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  )
}
