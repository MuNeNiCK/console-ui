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
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">Card content goes here.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div class="flex flex-wrap items-center justify-center gap-3">
      <Button>Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}
