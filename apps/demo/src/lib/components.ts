export type ComponentMeta = {
  name: string
  title: string
  description: string
  solid: boolean
}

export const components: ComponentMeta[] = [
  {
    name: "button",
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    solid: true,
  },
  {
    name: "card",
    title: "Card",
    description: "Displays a card with header, content, and footer.",
    solid: true,
  },
  {
    name: "input",
    title: "Input",
    description: "Displays a form input field.",
    solid: false,
  },
  {
    name: "table",
    title: "Table",
    description: "Displays tabular data.",
    solid: false,
  },
  {
    name: "tabs",
    title: "Tabs",
    description: "Displays a set of layered sections.",
    solid: false,
  },
  {
    name: "badge",
    title: "Badge",
    description: "Displays a badge or status label.",
    solid: false,
  },
  {
    name: "alert",
    title: "Alert",
    description: "Displays contextual status information.",
    solid: false,
  },
  {
    name: "accordion",
    title: "Accordion",
    description: "Displays collapsible content sections.",
    solid: false,
  },
  {
    name: "checkbox",
    title: "Checkbox",
    description: "Displays a checkbox control.",
    solid: false,
  },
  {
    name: "radio-group",
    title: "Radio Group",
    description: "Displays a set of radio controls.",
    solid: false,
  },
  {
    name: "select",
    title: "Select",
    description: "Displays a select control.",
    solid: false,
  },
  {
    name: "switch",
    title: "Switch",
    description: "Displays an on/off control.",
    solid: false,
  },
  {
    name: "textarea",
    title: "Textarea",
    description: "Displays a multiline text field.",
    solid: false,
  },
  {
    name: "progress",
    title: "Progress",
    description: "Displays task progress.",
    solid: false,
  },
  {
    name: "slider",
    title: "Slider",
    description: "Displays a range control.",
    solid: false,
  },
  {
    name: "toggle",
    title: "Toggle",
    description: "Displays a toggle control.",
    solid: false,
  },
]
