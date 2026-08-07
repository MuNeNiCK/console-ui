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
    description:
      "A console dashboard with sidebar, actions, filtering, and data table.",
    react: true,
    solid: true,
  },
  {
    name: "console-shell",
    title: "Console Shell",
    description:
      "A console sidebar shell with global search and account controls.",
    react: true,
    solid: true,
  },
  {
    name: "data-table-view",
    title: "Data Table View",
    description:
      "A complete table view with search, column controls, selection, and actions.",
    react: true,
    solid: true,
  },
  {
    name: "detail-view",
    title: "Detail View",
    description:
      "A complete detail view with summary, sections, activity, and confirmation.",
    react: true,
    solid: true,
  },
  {
    name: "form-flow",
    title: "Form Flow",
    description:
      "A complete configure and review flow for creating or editing an item.",
    react: true,
    solid: true,
  },
  {
    name: "double-confirmation",
    title: "Double Confirmation",
    description: "A high-impact action pattern with explicit confirmation.",
    react: true,
    solid: true,
  },
  {
    name: "empty-state",
    title: "Empty State",
    description:
      "A complete empty table view with guidance and primary action.",
    react: true,
    solid: true,
  },
]
