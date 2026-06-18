export type BlockMeta = {
  name: string
  title: string
  description: string
  solid: boolean
}

export const blocks: BlockMeta[] = [
  {
    name: "dashboard-01",
    title: "Dashboard 01",
    description: "A console dashboard with sidebar, actions, filtering, and data table.",
    solid: true,
  },
  {
    name: "sidebar-01",
    title: "Sidebar 01",
    description: "A console sidebar shell with global search and account controls.",
    solid: true,
  },
]
