import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusTone = "success" | "warning" | "destructive" | "info" | "muted"

export interface ResourceStatusLike {
  label: string
  tone?: StatusTone
  detail?: string
}

export interface StatusBadgeProps {
  status: string | ResourceStatusLike
  tone?: StatusTone
  class?: string
}

const toneClass: Record<StatusTone, string> = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  info: "text-info",
  muted: "text-muted-foreground",
}

const successLabels = [
  "active",
  "available",
  "bound",
  "completed",
  "enabled",
  "healthy",
  "online",
  "ready",
  "running",
  "success",
  "succeeded",
]

const warningLabels = [
  "degraded",
  "maintenance",
  "pending",
  "provisioning",
  "reconciling",
  "suspended",
  "unknown",
  "updating",
  "warning",
]

const destructiveLabels = [
  "disabled",
  "error",
  "failed",
  "offline",
  "terminated",
  "terminating",
  "unavailable",
  "unhealthy",
]

function getStatusLabel(status: string | ResourceStatusLike): string {
  return typeof status === "string" ? status : status.label
}

function toneForStatusLabel(label: string): StatusTone {
  const normalized = label.trim().toLowerCase()
  if (!normalized) return "muted"
  if (successLabels.some((value) => normalized.includes(value))) return "success"
  if (warningLabels.some((value) => normalized.includes(value))) return "warning"
  if (destructiveLabels.some((value) => normalized.includes(value))) {
    return "destructive"
  }
  return "info"
}

function getStatusTone(
  status: string | ResourceStatusLike,
  tone?: StatusTone,
): StatusTone {
  if (tone) return tone
  if (typeof status !== "string" && status.tone) return status.tone
  return toneForStatusLabel(getStatusLabel(status))
}

export function StatusBadge(props: StatusBadgeProps) {
  const label = () => getStatusLabel(props.status)
  const tone = () => getStatusTone(props.status, props.tone)

  return (
    <Badge
      variant="ghost"
      class={cn("gap-1.5 px-0 font-semibold", toneClass[tone()], props.class)}
    >
      <span class="size-1.5 rounded-full bg-current" />
      {label()}
    </Badge>
  )
}

export function ShadowBadge(props: { class?: string }) {
  return (
    <Badge
      variant="secondary"
      class={cn(
        "h-5 shrink-0 rounded-sm px-1.5 text-[10px] font-semibold",
        props.class,
      )}
    >
      Shadow
    </Badge>
  )
}
