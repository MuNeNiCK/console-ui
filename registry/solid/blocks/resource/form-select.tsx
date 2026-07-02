import { createMemo } from "solid-js"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type FormSelectOption = {
  value: string
  label: string
  disabled?: boolean
  disabledReason?: string
}

export function FormSelect(props: {
  id?: string
  value: string
  options: FormSelectOption[]
  placeholder: string
  required?: boolean
  disabled?: boolean
  class?: string
  onChange: (value: string) => void
}) {
  const selected = createMemo(() =>
    props.options.find((option) => option.value === props.value),
  )

  return (
    <Select<FormSelectOption>
      options={props.options}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      value={selected() ?? null}
      placeholder={props.placeholder}
      disallowEmptySelection={props.required}
      disabled={props.disabled}
      onChange={(option) => props.onChange(option?.value ?? "")}
      itemComponent={(itemProps) => (
        <SelectItem
          item={itemProps.item}
          title={itemProps.item.rawValue.disabledReason}
        >
          <span>{itemProps.item.rawValue.label}</span>
          {itemProps.item.rawValue.disabledReason ? (
            <span class="text-xs text-muted-foreground">
              {itemProps.item.rawValue.disabledReason}
            </span>
          ) : null}
        </SelectItem>
      )}
    >
      <SelectTrigger id={props.id} class={props.class}>
        <SelectValue<FormSelectOption>>
          {(state) => state.selectedOption()?.label ?? props.placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}
