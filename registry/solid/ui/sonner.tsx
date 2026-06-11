import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-solid"
import { Toaster as Sonner, type ToasterProps } from "solid-sonner"

export const Toaster = (props: ToasterProps) => {
  const theme =
    props.theme ??
    (typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light")

  return (
    <Sonner
      theme={theme}
      icons={{
        success: <CircleCheckIcon class="size-4" />,
        info: <InfoIcon class="size-4" />,
        warning: <TriangleAlertIcon class="size-4" />,
        error: <OctagonXIcon class="size-4" />,
        loading: <Loader2Icon class="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
        "--box-shadow": "0 12px 28px rgb(15 23 42 / 0.12)",
      }}
      {...props}
    />
  )
}
