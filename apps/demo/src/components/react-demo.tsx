import { Button } from "@/registry/react/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/react/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/registry/react/ui/alert"
import { Badge } from "@/registry/react/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card"
import { Checkbox } from "@/registry/react/ui/checkbox"
import { Input } from "@/registry/react/ui/input"
import { Progress } from "@/registry/react/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/registry/react/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/registry/react/ui/select"
import { Slider } from "@/registry/react/ui/slider"
import { Switch } from "@/registry/react/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/react/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/react/ui/tabs"
import { Textarea } from "@/registry/react/ui/textarea"
import { Toggle } from "@/registry/react/ui/toggle"

export default function ReactDemo({ name }: { name: string }) {
  if (name === "accordion") {
    return (
      <Accordion type="single" collapsible className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Resource summary</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            CPU, memory, and storage details for the selected resource.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Recent activity</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Events and tasks related to this resource.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  if (name === "alert") {
    return (
      <Alert className="max-w-md">
        <AlertTitle>Maintenance window scheduled</AlertTitle>
        <AlertDescription>
          Host updates are planned for tonight at 23:00.
        </AlertDescription>
      </Alert>
    )
  }

  if (name === "badge") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Running</Badge>
        <Badge variant="secondary">Pending</Badge>
        <Badge variant="outline">Managed</Badge>
        <Badge variant="destructive">Failed</Badge>
      </div>
    )
  }

  if (name === "card") {
    return (
      <Card className="w-[320px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Card content goes here.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (name === "checkbox") {
    return (
      <div className="flex items-center gap-3">
        <Checkbox id="demo-checkbox" defaultChecked />
        <label htmlFor="demo-checkbox" className="text-sm">
          Enable monitoring
        </label>
      </div>
    )
  }

  if (name === "input") {
    return (
      <div className="w-full max-w-sm space-y-3">
        <Input placeholder="Name" />
        <Input placeholder="Disabled" disabled />
      </div>
    )
  }

  if (name === "progress") {
    return (
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>Provisioning</span>
          <span className="text-muted-foreground">64%</span>
        </div>
        <Progress value={64} />
      </div>
    )
  }

  if (name === "radio-group") {
    return (
      <RadioGroup defaultValue="balanced" className="gap-3">
        <label className="flex items-center gap-3 text-sm">
          <RadioGroupItem value="balanced" />
          Balanced
        </label>
        <label className="flex items-center gap-3 text-sm">
          <RadioGroupItem value="performance" />
          Performance
        </label>
      </RadioGroup>
    )
  }

  if (name === "select") {
    return (
      <Select defaultValue="production">
        <SelectTrigger className="w-[240px]">
          <span>Production</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="production">Production</SelectItem>
          <SelectItem value="staging">Staging</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
        </SelectContent>
      </Select>
    )
  }

  if (name === "slider") {
    return (
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>CPU limit</span>
          <span className="text-muted-foreground">40%</span>
        </div>
        <Slider defaultValue={[40]} max={100} />
      </div>
    )
  }

  if (name === "switch") {
    return (
      <div className="flex items-center gap-3">
        <Switch defaultChecked />
        <span className="text-sm">Auto remediation</span>
      </div>
    )
  }

  if (name === "table") {
    return (
      <div className="w-full overflow-hidden rounded-lg border bg-card shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">CPU</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>node-01</TableCell>
              <TableCell>Running</TableCell>
              <TableCell className="text-right">18%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>node-02</TableCell>
              <TableCell>Maintenance</TableCell>
              <TableCell className="text-right">4%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  if (name === "textarea") {
    return (
      <Textarea
        className="max-w-sm"
        placeholder="Add an operational note..."
      />
    )
  }

  if (name === "toggle") {
    return (
      <div className="flex items-center gap-2">
        <Toggle defaultPressed>List</Toggle>
        <Toggle>Graph</Toggle>
      </div>
    )
  }

  if (name === "tabs") {
    return (
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="text-sm text-muted-foreground">
          Overview content for the selected resource.
        </TabsContent>
        <TabsContent value="events" className="text-sm text-muted-foreground">
          Recent events and changes.
        </TabsContent>
        <TabsContent value="settings" className="text-sm text-muted-foreground">
          Resource configuration.
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}
