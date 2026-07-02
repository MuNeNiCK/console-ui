import { createSignal, For } from "solid-js"
import type { Component } from "solid-js"
import ArrowLeftIcon from "lucide-solid/icons/arrow-left"
import CalendarClockIcon from "lucide-solid/icons/calendar-clock"
import CircleCheckIcon from "lucide-solid/icons/circle-check"
import PencilIcon from "lucide-solid/icons/pencil"
import ShieldCheckIcon from "lucide-solid/icons/shield-check"
import Trash2Icon from "lucide-solid/icons/trash-2"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const summary = [
  { label: "Owner", value: "Platform", detail: "Primary team" },
  { label: "Environment", value: "Production", detail: "Customer facing" },
  { label: "Region", value: "US West", detail: "Primary location" },
  { label: "Last updated", value: "2 min ago", detail: "Synchronized" },
]

const details = [
  { label: "Identifier", value: "atlas" },
  { label: "Display name", value: "Atlas workspace" },
  { label: "Cost center", value: "CC-4821" },
  { label: "Support tier", value: "Business critical" },
  { label: "Data class", value: "Internal" },
  { label: "Review cadence", value: "Monthly" },
]

const activity = [
  { event: "Policy reviewed", actor: "Mira Patel", time: "2 min ago" },
  { event: "Budget threshold changed", actor: "Owen Lee", time: "28 min ago" },
  { event: "Access group synchronized", actor: "Automation", time: "1 hour ago" },
]

export default function DetailView() {
  const [archiveOpen, setArchiveOpen] = createSignal(false)

  return (
    <div class="min-h-[680px] bg-background px-4 pt-4 pb-5 text-foreground md:px-8 md:pt-6 md:pb-7">
      <header class="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div class="min-w-0">
          <div class="flex min-h-8 min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Back to workspaces"
            >
              <ArrowLeftIcon />
            </Button>
            <span class="min-w-0 truncate text-xs leading-[18px] text-muted-foreground">
              Workspaces
            </span>
          </div>
          <div class="mt-[3px] flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            <h1 class="min-w-0 truncate text-[28px] font-[750]">
              Atlas workspace
            </h1>
            <Badge variant="secondary" class="gap-1.5">
              <span class="size-1.5 rounded-full bg-success" />
              On track
            </Badge>
          </div>
          <p class="mt-2 text-sm leading-[21px] text-muted-foreground">
            Operational workspace for production platform services.
          </p>
        </div>
        <div class="flex shrink-0 items-center gap-2.5">
          <Button type="button" variant="outline" size="sm">
            <PencilIcon />
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setArchiveOpen(true)}
          >
            <Trash2Icon />
            Archive
          </Button>
        </div>
      </header>

      <main class="grid min-w-0 gap-5">
        <section class="grid grid-cols-1 border-y border-border min-[900px]:grid-cols-4">
          <For each={summary}>
            {(item) => (
              <div class="flex min-w-0 gap-2.5 border-border px-4 py-3.5 min-[900px]:border-r min-[900px]:last:border-r-0">
                <CircleCheckIcon class="mt-0.5 size-4 shrink-0 text-success" />
                <div class="min-w-0">
                  <span class="block min-w-0 truncate text-xs text-muted-foreground">
                    {item.label}
                  </span>
                  <strong class="block min-w-0 truncate text-sm font-bold">
                    {item.value}
                  </strong>
                  <small class="mt-0.5 block min-w-0 truncate text-xs text-muted-foreground">
                    {item.detail}
                  </small>
                </div>
              </div>
            )}
          </For>
        </section>

        <div class="grid grid-cols-1 gap-x-5 gap-y-5 min-[980px]:grid-cols-12">
          <section class="min-w-0 border-t border-border min-[980px]:col-span-7">
            <SectionHeading title="Details" meta="Workspace profile" />
            <dl class="m-0 grid grid-cols-1 border-t border-border min-[760px]:grid-cols-2">
              <For each={details}>
                {(item) => (
                  <div class="min-w-0 border-b border-border px-3.5 py-3 min-[760px]:border-r min-[760px]:even:border-r-0">
                    <dt class="text-xs text-muted-foreground">{item.label}</dt>
                    <dd class="mt-1.5 min-w-0 truncate text-[13px] font-semibold">
                      {item.value}
                    </dd>
                  </div>
                )}
              </For>
            </dl>
          </section>

          <section class="min-w-0 border-t border-border min-[980px]:col-span-5">
            <SectionHeading title="Governance" meta="2 active controls" />
            <div class="grid gap-3 border-t border-border py-3">
              <InfoRow
                icon={ShieldCheckIcon}
                title="Approval required"
                description="Configuration changes require an owner review."
              />
              <InfoRow
                icon={CalendarClockIcon}
                title="Review scheduled"
                description="Next access review is due in 12 days."
              />
            </div>
          </section>

          <section class="min-w-0 border-t border-border min-[980px]:col-span-12">
            <SectionHeading title="Recent activity" meta="Last 24 hours" />
            <div class="border-t border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <For each={activity}>
                    {(item) => (
                      <TableRow>
                        <TableCell class="font-semibold">{item.event}</TableCell>
                        <TableCell>{item.actor}</TableCell>
                        <TableCell class="text-muted-foreground">{item.time}</TableCell>
                      </TableRow>
                    )}
                  </For>
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </main>

      <AlertDialog open={archiveOpen()} onOpenChange={setArchiveOpen}>
        <AlertDialogPortal>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Archive Atlas workspace?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes Atlas from active views and stops scheduled
                operations for this workspace.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="button" variant="destructive">
                Archive
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  )
}

function SectionHeading(props: { title: string; meta: string }) {
  return (
    <div class="flex min-h-11 items-center justify-between gap-4">
      <h2 class="m-0 text-[15px] font-[750]">{props.title}</h2>
      <span class="text-xs font-semibold text-muted-foreground">
        {props.meta}
      </span>
    </div>
  )
}

function InfoRow(props: {
  icon: Component<{ class?: string }>
  title: string
  description: string
}) {
  const Icon = props.icon

  return (
    <div class="flex min-w-0 gap-3 rounded-md border border-border bg-card px-3.5 py-3">
      <Icon class="mt-0.5 size-4 shrink-0 text-primary" />
      <div class="min-w-0">
        <strong class="block text-sm">{props.title}</strong>
        <p class="mt-1 text-sm leading-5 text-muted-foreground">
          {props.description}
        </p>
      </div>
    </div>
  )
}
