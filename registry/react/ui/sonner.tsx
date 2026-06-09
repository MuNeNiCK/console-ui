"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import type { CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import { useTheme } from "@/registry/react/components/theme-provider"

const Toaster = ({ theme: themeProp, ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={(themeProp ?? theme ?? "system") as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--box-shadow": "0 12px 28px rgb(15 23 42 / 0.12)",
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
