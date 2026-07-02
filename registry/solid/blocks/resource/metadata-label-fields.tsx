import { For, Show } from "solid-js"
import PlusIcon from "lucide-solid/icons/plus"
import Trash2Icon from "lucide-solid/icons/trash-2"

import { FormField, FormSection } from "@/components/form-fields"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type MetadataLabel = {
  key: string
  value: string
}

export function MetadataLabelFields(props: {
  labels: MetadataLabel[]
  disabled?: boolean
  onAdd: () => void
  onUpdate: (index: number, key: keyof MetadataLabel, value: string) => void
  onRemove: (index: number) => void
}) {
  return (
    <FormSection
      title="Labels"
      meta={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={props.onAdd}
          disabled={props.disabled}
        >
          <PlusIcon />
          Add
        </Button>
      }
    >
      <Show
        when={props.labels.length > 0}
        fallback={
          <p class="text-sm text-muted-foreground min-[980px]:col-span-3">
            No labels defined.
          </p>
        }
      >
        <div class="grid gap-3 min-[980px]:col-span-3">
          <For each={props.labels}>
            {(label, index) => (
              <div class="grid items-end gap-3 border-t border-border pt-3 min-[720px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                <FormField label="Key">
                  <Input
                    value={label.key}
                    placeholder="env"
                    onInput={(event) =>
                      props.onUpdate(index(), "key", event.currentTarget.value)
                    }
                  />
                </FormField>
                <FormField label="Value">
                  <Input
                    value={label.value}
                    placeholder="production"
                    onInput={(event) =>
                      props.onUpdate(index(), "value", event.currentTarget.value)
                    }
                  />
                </FormField>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove label"
                  onClick={() => props.onRemove(index())}
                  disabled={props.disabled}
                >
                  <Trash2Icon />
                </Button>
              </div>
            )}
          </For>
        </div>
      </Show>
    </FormSection>
  )
}
