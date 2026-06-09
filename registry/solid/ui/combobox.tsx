export { Command as Combobox, CommandInput as ComboboxInput, CommandList as ComboboxContent, CommandItem as ComboboxItem, CommandEmpty as ComboboxEmpty, CommandGroup as ComboboxGroup } from "@/registry/solid/ui/command"
function ComboboxTrigger(props: any) { return <button type="button" data-slot="combobox-trigger" {...props}/> }
function ComboboxClear(props: any) { return <button type="button" data-slot="combobox-clear" {...props}/> }
export { ComboboxTrigger, ComboboxClear }
