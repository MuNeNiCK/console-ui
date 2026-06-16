import { createEffect, createSignal, type JSX } from "solid-js"
import { MoonIcon, SearchIcon, SunIcon } from "lucide-solid"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
    <SidebarProvider
      class={cn(
        "relative h-svh min-h-0 overflow-hidden bg-background text-foreground",
        props.class,
      )}
      style={{ "--sidebar-width": "236px" } as JSX.CSSProperties}
    >
      <Sidebar class="border-r md:absolute md:inset-y-0 md:left-0 md:h-full">
        <SidebarHeader class="h-14 justify-center border-b border-sidebar-border px-4 py-0">
          <div class="flex min-w-0 items-center gap-2.5 font-semibold">
            <span class="grid size-7 shrink-0 place-items-center rounded border border-sidebar-border text-[11px] font-extrabold text-sidebar-primary">
              CU
            </span>
            <span class="truncate">Console UI</span>
          </div>
        </SidebarHeader>
        <SidebarContent class="px-3 py-4">
          {navSections.map((section) => (
            <SidebarGroup class="mt-5 p-0 first:mt-0">
              <SidebarGroupLabel class="px-2 pb-2 text-[11px] font-bold tracking-[0.04em] text-muted-foreground uppercase">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={item.active}
                        class={cn(
                          "h-8 rounded border-0 border-l-[3px] border-l-transparent px-2 pl-[7px] text-[13px] font-normal",
                          item.active &&
                            "border-l-primary bg-sidebar-accent font-semibold text-sidebar-accent-foreground",
                        )}
                      >
                        {item.label}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarInset class="min-h-0 min-w-0 overflow-hidden">
        <header class="flex h-14 min-w-0 items-center gap-4 border-b border-console-header-foreground/15 bg-console-header px-5 text-console-header-foreground">
          <SidebarTrigger class="-ml-2 text-console-header-foreground hover:bg-console-header-foreground/10 md:hidden" />
          <InputGroup class="ml-auto hidden w-[min(300px,28vw)] border-console-header-foreground/25 bg-transparent text-console-header-foreground hover:border-console-header-foreground/35 dark:bg-transparent md:flex">
            <InputGroupAddon class="text-console-header-foreground/75">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search infrastructure"
              class="text-console-header-foreground placeholder:text-console-header-foreground/65"
            />
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
        <main class="min-h-0 min-w-0 flex-1 overflow-hidden">
          {props.children ?? (
            <div class="grid h-full place-items-center p-8 text-sm text-muted-foreground">
              Select an item from the sidebar.
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
