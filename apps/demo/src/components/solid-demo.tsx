import { Button } from "@/registry/solid/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card"

export default function SolidDemo(props: { name: string }) {
  if (props.name === "card") {
    return (
      <Card class="w-[320px]">
        <CardHeader>
          <CardTitle>ilo-rack-14</CardTitle>
          <CardDescription>Out-of-band management</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-2 text-sm">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Health</span>
            <span>Nominal</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Firmware</span>
            <span>Current</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div class="flex flex-wrap items-center justify-center gap-3">
      <Button>Launch console</Button>
      <Button variant="secondary">Sync inventory</Button>
      <Button variant="outline">Power cycle</Button>
      <Button variant="destructive">Force reset</Button>
    </div>
  )
}
