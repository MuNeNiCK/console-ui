import { Button } from "@/registry/react/ui/button"
import { cn } from "@/lib/utils"

const baseUrl = import.meta.env.PUBLIC_BASE_URL ?? "http://localhost:4321"

export function OpenInV0Button({
  name,
  className,
}: { name: string } & React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Open in v0"
      size="sm"
      variant="outline"
      className={cn("w-fit", className)}
      asChild
    >
      <a
        href={`https://v0.dev/chat/api/open?url=${baseUrl}/r/${name}.json`}
        target="_blank"
        rel="noreferrer"
      >
        Open in v0
      </a>
    </Button>
  )
}
