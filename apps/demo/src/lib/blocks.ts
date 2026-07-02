export type BlockMeta = {
  name: string
  title: string
  description: string
  react: boolean
  solid: boolean
}

export const blocks: BlockMeta[] = [
  {
    name: "dashboard",
    title: "Dashboard",
    description: "A console dashboard with sidebar, actions, filtering, and data table.",
    react: true,
    solid: true,
  },
  {
    name: "console-shell",
    title: "Console Shell",
    description: "A console sidebar shell with global search and account controls.",
    react: true,
    solid: true,
  },
  {
    name: "resource",
    title: "Resource",
    description: "Reusable resource list, detail, and form components for Solid applications.",
    react: false,
    solid: true,
  },
]
