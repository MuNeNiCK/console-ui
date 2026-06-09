import { Button } from "@/registry/react/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/react/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/react/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/registry/react/ui/alert"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/registry/react/ui/avatar"
import { Badge } from "@/registry/react/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/react/ui/breadcrumb"
import { Calendar } from "@/registry/react/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/react/ui/carousel"
import { Checkbox } from "@/registry/react/ui/checkbox"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/react/ui/chart"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/react/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/react/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/react/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/react/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/react/ui/hover-card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/react/ui/input-otp"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/registry/react/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/react/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/react/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/react/ui/popover"
import { Input } from "@/registry/react/ui/input"
import { Progress } from "@/registry/react/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/registry/react/ui/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/react/ui/resizable"
import { ScrollArea } from "@/registry/react/ui/scroll-area"
import { Separator } from "@/registry/react/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/react/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/registry/react/ui/sidebar"
import { Skeleton } from "@/registry/react/ui/skeleton"
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
import { ToggleGroup, ToggleGroupItem } from "@/registry/react/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/react/ui/tooltip"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

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

  if (name === "alert-dialog") {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm maintenance mode</AlertDialogTitle>
            <AlertDialogDescription>
              This will pause workloads on the selected host.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  if (name === "avatar") {
    return (
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>IL</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+4</AvatarGroupCount>
      </AvatarGroup>
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

  if (name === "breadcrumb") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Datacenter</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Cluster</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>node-01</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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

  if (name === "carousel") {
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={item}>
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground">
                Panel {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  if (name === "calendar") {
    return (
      <div className="rounded-lg border bg-card shadow-xs">
        <Calendar
          mode="single"
          defaultMonth={new Date(2026, 5, 9)}
          selected={new Date(2026, 5, 9)}
        />
      </div>
    )
  }

  if (name === "chart") {
    const data = [
      { host: "node-01", cpu: 42 },
      { host: "node-02", cpu: 28 },
      { host: "node-03", cpu: 64 },
    ]

    return (
      <ChartContainer
        config={{ cpu: { label: "CPU", color: "var(--chart-1)" } }}
        className="h-[220px] w-full max-w-md"
      >
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="host" tickLine={false} axisLine={false} />
          <YAxis hide />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="cpu"
            fill="var(--chart-1)"
            radius={4}
            isAnimationActive={false}
          />
        </BarChart>
      </ChartContainer>
    )
  }

  if (name === "command") {
    return (
      <Command className="max-w-md rounded-lg border shadow-xs">
        <CommandInput placeholder="Search resources..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Resources">
            <CommandItem>node-01</CommandItem>
            <CommandItem>production-cluster</CommandItem>
            <CommandItem>datastore-primary</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
  }

  if (name === "dialog") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit resource</DialogTitle>
            <DialogDescription>
              Update the display name for this managed resource.
            </DialogDescription>
          </DialogHeader>
          <Input defaultValue="node-01" />
          <DialogFooter>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (name === "drawer") {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Task details</DrawerTitle>
            <DrawerDescription>
              Review recent task activity for this resource.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  if (name === "dropdown-menu") {
    return (
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Resource</DropdownMenuLabel>
          <DropdownMenuItem>Open console</DropdownMenuItem>
          <DropdownMenuItem>Restart</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (name === "hover-card") {
    return (
      <HoverCard defaultOpen>
        <HoverCardTrigger asChild>
          <Button variant="link">node-01</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-1">
            <p className="text-sm font-medium">node-01</p>
            <p className="text-sm text-muted-foreground">
              Running, 18% CPU, 42 GB memory used.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }

  if (name === "input-otp") {
    return (
      <InputOTP maxLength={6} value="123456" readOnly>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    )
  }

  if (name === "menubar") {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Resource</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Open console</MenubarItem>
            <MenubarItem>Clone</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Remove</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Events</MenubarItem>
            <MenubarItem>Performance</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }

  if (name === "navigation-menu") {
    return (
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Inventory</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[260px] gap-1 p-2">
                <NavigationMenuLink href="#">Hosts</NavigationMenuLink>
                <NavigationMenuLink href="#">Virtual machines</NavigationMenuLink>
                <NavigationMenuLink href="#">Storage</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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

  if (name === "pagination") {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  if (name === "popover") {
    return (
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">Details</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Resource policy</PopoverTitle>
            <PopoverDescription>
              Automation is enabled for remediation tasks.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
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

  if (name === "skeleton") {
    return (
      <div className="w-full max-w-sm space-y-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    )
  }

  if (name === "separator") {
    return (
      <div className="w-full max-w-sm">
        <div className="space-y-1">
          <p className="text-sm font-medium">Production</p>
          <p className="text-sm text-muted-foreground">3 hosts, 18 VMs</p>
        </div>
        <Separator className="my-4" />
        <div className="space-y-1">
          <p className="text-sm font-medium">Maintenance</p>
          <p className="text-sm text-muted-foreground">1 host scheduled</p>
        </div>
      </div>
    )
  }

  if (name === "scroll-area") {
    return (
      <ScrollArea className="h-40 w-full max-w-sm rounded-lg border bg-card">
        <div className="space-y-3 p-4">
          {["Host connected", "VM migrated", "Snapshot created", "Policy synced", "Backup completed"].map((event) => (
            <div key={event} className="text-sm">
              {event}
            </div>
          ))}
        </div>
      </ScrollArea>
    )
  }

  if (name === "resizable") {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="h-40 w-full max-w-md rounded-lg border bg-card"
      >
        <ResizablePanel defaultSize={45}>
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Inventory
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={55}>
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Details
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }

  if (name === "sheet") {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Resource settings</SheetTitle>
            <SheetDescription>
              Configure resource-level automation settings.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
  }

  if (name === "sidebar") {
    return (
      <div className="h-56 w-full overflow-hidden rounded-lg border bg-background">
        <SidebarProvider>
          <Sidebar collapsible="none">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Console</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>Inventory</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Events</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Tasks</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
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

  if (name === "toggle-group") {
    return (
      <ToggleGroup type="single" defaultValue="list" variant="outline">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
      </ToggleGroup>
    )
  }

  if (name === "tooltip") {
    return (
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover target</Button>
          </TooltipTrigger>
          <TooltipContent>Open remote console</TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
