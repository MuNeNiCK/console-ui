import { createMemo, createSignal } from "solid-js"
import ArchiveIcon from "lucide-solid/icons/archive"
import ShieldAlertIcon from "lucide-solid/icons/shield-alert"

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
  const [open, setOpen] = createSignal(false)
  const [confirmation, setConfirmation] = createSignal("")
  const [archived, setArchived] = createSignal(false)
  const canConfirm = createMemo(() => confirmation().trim() === "archive")

  function confirmArchive() {
    if (!canConfirm()) return
    setArchived(true)
    setOpen(false)
    setConfirmation("")
  }

  return (
    <div class="grid min-h-[680px] place-items-center bg-background px-4 py-8 text-foreground">
      <section class="grid w-full max-w-xl gap-5 rounded-md border border-border bg-card p-6">
        <div class="flex items-start gap-4">
          <div class="grid size-12 shrink-0 place-items-center rounded-md border border-warning/30 bg-warning/10 text-warning">
            <ShieldAlertIcon class="size-6" />
          </div>
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h1 class="text-xl font-[750]">Archive workspace</h1>
              <Badge variant={archived() ? "secondary" : "outline"}>
                {archived() ? "Archived" : "Pending"}
              </Badge>
            </div>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              Use a second confirmation for actions that are difficult to
              reverse or affect scheduled operations.
            </p>
          </div>
        </div>

        <div class="rounded-md border border-border bg-background px-4 py-3 text-sm">
          <strong class="block">Atlas workspace</strong>
          <span class="mt-1 block text-muted-foreground">
            Production environment, Platform owner, 12 scheduled operations.
          </span>
        </div>

        <div class="flex justify-end">
          <Button
            type="button"
            variant="destructive"
            disabled={archived()}
            onClick={() => setOpen(true)}
          >
            <ArchiveIcon />
            Archive workspace
          </Button>
        </div>
      </section>

      <AlertDialog open={open()} onOpenChange={setOpen}>
        <AlertDialogPortal>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <ShieldAlertIcon />
              </AlertDialogMedia>
              <AlertDialogTitle>Archive Atlas workspace?</AlertDialogTitle>
              <AlertDialogDescription>
                This action removes the workspace from active operations.
                Type archive to confirm the action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <label class="grid gap-2 text-sm font-semibold">
              Confirmation
              <Input
                value={confirmation()}
                onInput={(event) => setConfirmation(event.currentTarget.value)}
                placeholder="archive"
              />
            </label>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmation("")}>
                Cancel
              </AlertDialogCancel>
              <Button
                type="button"
                variant="destructive"
                disabled={!canConfirm()}
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
