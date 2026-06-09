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
]
