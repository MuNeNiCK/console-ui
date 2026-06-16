"use client"

import * as React from "react"
import { MoonIcon, SearchIcon, SunIcon } from "lucide-react"

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
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
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

export function Sidebar01({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    setIsDark(next)
  }

  return (
    <SidebarProvider
      className={cn(
        "grid h-svh min-h-0 grid-rows-[56px_minmax(0,1fr)] overflow-hidden bg-background text-foreground md:grid-cols-[236px_minmax(0,1fr)]",
        className
      )}
      style={
        {
          "--sidebar-width": "236px",
        } as React.CSSProperties
      }
    >
      <header className="col-span-full flex min-w-0 items-center gap-4 border-b border-console-header-foreground/15 bg-console-header px-5 text-console-header-foreground">
        <div className="flex min-w-0 items-center gap-2.5 font-semibold">
          <span className="grid size-7 shrink-0 place-items-center rounded border border-current text-[11px] font-extrabold">
            CU
          </span>
          <span className="truncate">Console UI</span>
        </div>
        <InputGroup className="ml-auto hidden w-[min(300px,28vw)] md:flex">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search infrastructure" />
        </InputGroup>
        <Button
          variant="outline"
          size="icon-sm"
          className="border-console-header-foreground/25 bg-transparent text-console-header-foreground hover:bg-console-header-foreground/10"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-console-header-foreground hover:bg-console-header-foreground/10"
          aria-label="Admin account"
        >
          <Avatar size="sm">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </Button>
      </header>

      <Sidebar
        collapsible="none"
        className="max-md:hidden min-h-0 border-r md:flex"
      >
        <SidebarContent className="px-3 py-4">
          {navSections.map((section) => (
            <SidebarGroup key={section.title} className="mt-5 p-0 first:mt-0">
              <SidebarGroupLabel className="px-2 pb-2 text-[11px] font-bold tracking-[0.04em] text-muted-foreground uppercase">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        isActive={item.active}
                        className={cn(
                          "h-8 rounded border-0 border-l-[3px] border-l-transparent px-2 pl-[7px] text-[13px] font-normal",
                          item.active &&
                            "border-l-primary bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
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

      <SidebarInset className="min-h-0 min-w-0 overflow-hidden md:col-start-2 md:row-start-2">
        {children ?? (
          <div className="grid h-full place-items-center p-8 text-sm text-muted-foreground">
            Select an item from the sidebar.
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
