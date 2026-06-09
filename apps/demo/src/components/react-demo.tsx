import { Button } from "@/registry/react/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card"

export default function ReactDemo({ name }: { name: string }) {
  if (name === "card") {
    return (
      <Card className="w-[320px]">
        <CardHeader>
          <CardTitle>esxi-prod-07</CardTitle>
          <CardDescription>Cluster node summary</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Power</span>
            <span>Online</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">CPU Ready</span>
            <span>2.4%</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Launch console</Button>
      <Button variant="secondary">Sync inventory</Button>
      <Button variant="outline">Power cycle</Button>
      <Button variant="destructive">Force reset</Button>
    </div>
  )
}
