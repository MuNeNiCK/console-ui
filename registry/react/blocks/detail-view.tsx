"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  CircleCheckIcon,
  PencilIcon,
  ShieldCheckIcon,
  Trash2Icon,
  type LucideIcon,
} from "lucide-react"
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
  {
    event: "Access group synchronized",
    actor: "Automation",
    time: "1 hour ago",
  },
]

export default function DetailView() {
  const [archiveOpen, setArchiveOpen] = React.useState(false)
  return (
    <div className="min-h-[680px] bg-background px-4 pt-4 pb-5 text-foreground md:px-8 md:pt-6 md:pb-7">
      <header className="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="flex min-h-8 min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Back to workspaces"
            >
              <ArrowLeftIcon aria-hidden="true" />
            </Button>
            <span className="min-w-0 truncate text-xs leading-[18px] text-muted-foreground">
              Workspaces
            </span>
          </div>
          <div className="mt-[3px] flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="min-w-0 truncate text-[28px] font-[750]">
              Atlas workspace
            </h1>
            <Badge variant="secondary" className="gap-1.5">
              <span
                className="size-1.5 rounded-full bg-success"
                aria-hidden="true"
              />
              On track
            </Badge>
          </div>
          <p className="mt-2 text-sm leading-[21px] text-muted-foreground">
            Operational workspace for production platform services.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <Button type="button" variant="outline" size="sm">
            <PencilIcon aria-hidden="true" />
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setArchiveOpen(true)}
          >
            <Trash2Icon aria-hidden="true" />
            Archive
          </Button>
        </div>
      </header>
      <main className="grid min-w-0 gap-5">
        <section className="grid grid-cols-1 border-y border-border min-[900px]:grid-cols-4">
          {summary.map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 gap-2.5 border-border px-4 py-3.5 min-[900px]:border-r min-[900px]:last:border-r-0"
            >
              <CircleCheckIcon
                className="mt-0.5 size-4 shrink-0 text-success"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <span className="block min-w-0 truncate text-xs text-muted-foreground">
                  {item.label}
                </span>
                <strong className="block min-w-0 truncate text-sm font-bold">
                  {item.value}
                </strong>
                <small className="mt-0.5 block min-w-0 truncate text-xs text-muted-foreground">
                  {item.detail}
                </small>
              </div>
            </div>
          ))}
        </section>
        <div className="grid grid-cols-1 gap-5 min-[980px]:grid-cols-12">
          <section className="min-w-0 border-t border-border min-[980px]:col-span-7">
            <SectionHeading title="Details" meta="Workspace profile" />
            <dl className="m-0 grid grid-cols-1 border-t border-border min-[760px]:grid-cols-2">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="min-w-0 border-b border-border px-3.5 py-3 min-[760px]:border-r min-[760px]:even:border-r-0"
                >
                  <dt className="text-xs text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 min-w-0 truncate text-[13px] font-semibold">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="min-w-0 border-t border-border min-[980px]:col-span-5">
            <SectionHeading title="Governance" meta="2 active controls" />
            <div className="grid gap-3 border-t border-border py-3">
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
          <section className="min-w-0 border-t border-border min-[980px]:col-span-12">
            <SectionHeading title="Recent activity" meta="Last 24 hours" />
            <div className="border-t border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activity.map((item) => (
                    <TableRow key={item.event}>
                      <TableCell className="font-semibold">
                        {item.event}
                      </TableCell>
                      <TableCell>{item.actor}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </main>
      <AlertDialog open={archiveOpen} onOpenChange={setArchiveOpen}>
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
function SectionHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-4">
      <h2 className="m-0 text-[15px] font-[750]">{title}</h2>
      <span className="text-xs font-semibold text-muted-foreground">
        {meta}
      </span>
    </div>
  )
}
function InfoRow({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex min-w-0 gap-3 rounded-md border border-border bg-card px-3.5 py-3">
      <Icon
        className="mt-0.5 size-4 shrink-0 text-primary"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <strong className="block text-sm">{title}</strong>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}
