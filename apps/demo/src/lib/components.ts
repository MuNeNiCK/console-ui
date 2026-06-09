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
    description: "Dense command button for infrastructure console actions.",
    solid: true,
  },
  {
    name: "card",
    title: "Card",
    description: "Low-radius panel surface for resource summaries and status groups.",
    solid: true,
  },
]
