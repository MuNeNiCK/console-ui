import { createEffect, createSignal, type JSX } from "solid-js"
import { MoonIcon, SearchIcon, SunIcon } from "lucide-solid"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

type NavSection = {
  title: string
  items: {
    label: string
    active?: boolean
  }[]
}

const navSections: NavSection[] = [
  {
    title: "Infrastructure",
    items: [
      { label: "Virtual machines", active: true },
      { label: "Hosts" },
      { label: "Clusters" },
      { label: "Storage" },
      { label: "Networks" },
    ],
  },
  {
    title: "Saved views",
    items: [
      { label: "Powered on" },
      { label: "Needs attention" },
      { label: "Unassigned policy" },
    ],
  },
]

export function Sidebar01(props: { children?: JSX.Element; class?: string }) {
  const [isDark, setIsDark] = createSignal(false)

  createEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  })

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    setIsDark(next)
  }

  return (
    <div
      class={cn(
        "grid h-svh min-h-0 grid-rows-[56px_minmax(0,1fr)] overflow-hidden bg-background text-foreground md:grid-cols-[236px_minmax(0,1fr)]",
        props.class,
      )}
    >
      <header class="col-span-full flex min-w-0 items-center gap-4 border-b border-console-header-foreground/15 bg-console-header px-5 text-console-header-foreground">
        <div class="flex min-w-0 items-center gap-2.5 font-semibold">
          <span class="grid size-7 shrink-0 place-items-center rounded border border-current text-[11px] font-extrabold">
            CU
          </span>
          <span class="truncate">Console UI</span>
        </div>
        <InputGroup class="ml-auto hidden w-[min(300px,28vw)] md:flex">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search infrastructure" />
        </InputGroup>
        <Button
          variant="outline"
          size="icon-sm"
          class="border-console-header-foreground/25 bg-transparent text-console-header-foreground hover:bg-console-header-foreground/10"
          aria-label={isDark() ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
        >
          {isDark() ? <SunIcon /> : <MoonIcon />}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          class="text-console-header-foreground hover:bg-console-header-foreground/10"
          aria-label="Admin account"
        >
          <Avatar size="sm">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </Button>
      </header>

      <aside class="hidden min-h-0 overflow-y-auto border-r bg-sidebar px-3 py-4 text-sidebar-foreground md:block">
        {navSections.map((section) => (
          <div class="mt-5 first:mt-0">
            <div class="px-2 pb-2 text-[11px] font-bold tracking-[0.04em] text-muted-foreground uppercase">
              {section.title}
            </div>
            <nav class="flex flex-col gap-1">
              {section.items.map((item) => (
                <Button
                  variant="ghost"
                  size="sm"
                  class={cn(
                    "h-8 w-full justify-start rounded border-0 border-l-[3px] border-l-transparent px-2 pl-[7px] text-left text-[13px] font-normal",
                    item.active &&
                      "border-l-primary bg-sidebar-accent font-semibold text-sidebar-accent-foreground",
                  )}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        ))}
      </aside>

      <main class="min-h-0 overflow-hidden">
        {props.children ?? (
          <div class="grid h-full place-items-center p-8 text-sm text-muted-foreground">
            Select an item from the sidebar.
          </div>
        )}
      </main>
    </div>
  )
}

