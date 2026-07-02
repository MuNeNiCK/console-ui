import Trash2Icon from "lucide-solid/icons/trash-2"
import { createMemo, createSignal, For, Show, type JSX } from "solid-js"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export interface DeleteResourceDialogProps {
  open?: boolean
  resourceLabel: string
  resources: { name: string; displayName?: string }[]
  trigger?: JSX.Element
  onOpenChange?: (open: boolean) => void
  onDelete: () => Promise<void>
  onDeleted: () => void
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Failed to delete resource."
}

export function DeleteResourceDialog(props: DeleteResourceDialogProps) {
  const [internalOpen, setInternalOpen] = createSignal(false)
  const [isDeleting, setIsDeleting] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)
  const open = createMemo(() => props.open ?? internalOpen())
  const resourceCount = createMemo(() => props.resources.length)
  const resourceListLabel = createMemo(
    () => `${props.resourceLabel}${resourceCount() === 1 ? "" : "s"}`,
  )
  const firstResourceName = createMemo(() => {
    const resource = props.resources[0]
    return resource?.displayName || resource?.name || props.resourceLabel
  })

  function setDialogOpen(nextOpen: boolean, force = false) {
    if (isDeleting() && !force) return
    props.onOpenChange?.(nextOpen)
    if (props.open === undefined) setInternalOpen(nextOpen)
    if (nextOpen) setError(null)
  }

  async function confirmDelete() {
    setIsDeleting(true)
    setError(null)

    try {
      await props.onDelete()
      setDialogOpen(false, true)
      props.onDeleted()
    } catch (caught) {
      setError(getErrorMessage(caught))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Show when={props.open === undefined} fallback={null}>
        {props.trigger ?? (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setDialogOpen(true)}
          >
            <Trash2Icon />
            Delete
          </Button>
        )}
      </Show>
      <AlertDialog open={open()} onOpenChange={setDialogOpen}>
        <AlertDialogPortal>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {resourceListLabel()}</AlertDialogTitle>
              <AlertDialogDescription>
                <Show
                  when={resourceCount() === 1}
                  fallback={
                    <>
                      This will permanently delete {resourceCount()}{" "}
                      {resourceListLabel()}. This action cannot be undone.
                    </>
                  }
                >
                  This will permanently delete {firstResourceName()}. This
                  action cannot be undone.
                </Show>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Show when={resourceCount() > 1}>
              <ul class="max-h-36 overflow-auto rounded-md border border-border bg-background px-3 py-2 text-sm">
                <For each={props.resources}>
                  {(resource) => (
                    <li class="truncate py-1 font-semibold">
                      {resource.displayName || resource.name}
                    </li>
                  )}
                </For>
              </ul>
            </Show>
            <Show when={error()}>
              {(message) => (
                <p class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {message()}
                </p>
              )}
            </Show>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting()}>
                Cancel
              </AlertDialogCancel>
              <Button
                type="button"
                variant="destructive"
                disabled={isDeleting() || resourceCount() === 0}
                onClick={confirmDelete}
              >
                {isDeleting() ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </>
  )
}
