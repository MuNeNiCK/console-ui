import CircleCheckIcon from "lucide-solid/icons/circle-check"
import InfoIcon from "lucide-solid/icons/info"
import Loader2Icon from "lucide-solid/icons/loader-circle"
import OctagonXIcon from "lucide-solid/icons/octagon-x"
import TriangleAlertIcon from "lucide-solid/icons/triangle-alert"
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
