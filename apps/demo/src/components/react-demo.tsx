import * as React from "react"
import { Button } from "@/registry/react/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/registry/react/ui/button-group"
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
import { AspectRatio } from "@/registry/react/ui/aspect-ratio"
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/react/ui/command"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/react/ui/combobox"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/react/ui/context-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/react/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/react/ui/dialog"
import { DirectionProvider } from "@/registry/react/ui/direction"
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/react/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/react/ui/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/react/ui/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/react/ui/hover-card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/react/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/react/ui/input-otp"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/react/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/react/ui/item"
import { Kbd, KbdGroup } from "@/registry/react/ui/kbd"
import { Label } from "@/registry/react/ui/label"
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
  NativeSelect,
  NativeSelectOption,
} from "@/registry/react/ui/native-select"
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
import { Spinner } from "@/registry/react/ui/spinner"
import { ThemeProvider } from "@/registry/react/components/theme-provider"
import { Toaster } from "@/registry/react/ui/sonner"
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
import { InboxIcon, SearchIcon, ServerIcon } from "lucide-react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "6d2f4c8a",
    amount: 90,
    status: "success",
    email: "dev@console.local",
  },
  {
    id: "c8f91a20",
    amount: 450,
    status: "failed",
    email: "ops@example.com",
  },
  {
    id: "b7f8a2d1",
    amount: 210,
    status: "success",
    email: "billing@example.com",
  },
]

const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="-ml-3"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="-ml-3"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(row.getValue("amount"))}
      </div>
    ),
  },
]

export default function ReactDemo({ name }: { name: string }) {
  if (name === "accordion") {
    return (
      <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
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

  if (name === "aspect-ratio") {
    return (
      <AspectRatio ratio={16 / 9} className="w-full max-w-sm overflow-hidden rounded-lg border bg-secondary">
        <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
          Console preview
        </div>
      </AspectRatio>
    )
  }

  if (name === "alert-dialog") {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          Open alert
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

  if (name === "button-group") {
    return (
      <ButtonGroup>
        <Button variant="outline">Power on</Button>
        <Button variant="outline">Restart</Button>
        <ButtonGroupSeparator />
        <ButtonGroupText>node-01</ButtonGroupText>
      </ButtonGroup>
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
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg border bg-secondary text-sm text-muted-foreground">
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
          today={new Date(2026, 5, 9)}
        />
      </div>
    )
  }

  if (name === "chart") {
    return (
      <div
        data-slot="chart"
        className="flex h-[220px] w-full max-w-md flex-col items-stretch gap-3 p-6 text-xs"
      >
        <div className="flex min-h-0 flex-1 items-end gap-3">
          <div className="h-[42%] flex-1 rounded-t bg-[var(--chart-1)]" />
          <div className="h-[28%] flex-1 rounded-t bg-[var(--chart-1)]" />
          <div className="h-[64%] flex-1 rounded-t bg-[var(--chart-1)]" />
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
          <span>node-01</span>
          <span>node-02</span>
          <span>node-03</span>
        </div>
      </div>
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

  if (name === "combobox") {
    const resources = ["node-01", "node-02", "cluster-a"]

    return (
      <Combobox items={resources}>
        <ComboboxInput
          className="w-[240px]"
          placeholder="Select a resource"
        />
        <ComboboxContent>
          <ComboboxEmpty>No resources found.</ComboboxEmpty>
          <ComboboxList>
            {(resource) => (
              <ComboboxItem key={resource} value={resource}>
                {resource}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }

  if (name === "collapsible") {
    return (
      <Collapsible defaultOpen className="w-full max-w-sm rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">node-01</p>
            <p className="text-sm text-muted-foreground">Running workload</p>
          </div>
          <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
            Toggle
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-4 border-t pt-4 text-sm text-muted-foreground">
          18% CPU, 42 GB memory used, 3 active tasks.
        </CollapsibleContent>
      </Collapsible>
    )
  }

  if (name === "context-menu") {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border bg-card text-sm">
          Right click resource
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open console</ContextMenuItem>
          <ContextMenuItem>Clone</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  }

  if (name === "dialog") {
    return (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open dialog
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

  if (name === "direction") {
    return (
      <DirectionProvider direction="rtl">
        <div dir="rtl">
          <ButtonGroup>
            <Button variant="outline">Primary</Button>
            <Button variant="outline">Secondary</Button>
          </ButtonGroup>
        </div>
      </DirectionProvider>
    )
  }

  if (name === "data-table") {
    return <DataTableDemo />
  }

  if (name === "form") {
    return <FormDemo />
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

  if (name === "empty") {
    return (
      <Empty className="min-h-48 w-full max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>No alerts</EmptyTitle>
          <EmptyDescription>
            This resource has no active operational alerts.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Refresh
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  if (name === "field") {
    return (
      <FieldSet className="w-full max-w-sm">
        <FieldLegend>Resource policy</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-name">Name</FieldLabel>
            <Input id="field-name" defaultValue="node-01" />
            <FieldDescription>
              Display name used by inventory views.
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Switch defaultChecked />
            <FieldContent>
              <FieldTitle>Auto remediation</FieldTitle>
              <FieldDescription>
                Run approved remediation tasks automatically.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    )
  }

  if (name === "dropdown-menu") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          Actions
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Resource</DropdownMenuLabel>
            <DropdownMenuItem>Open console</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (name === "hover-card") {
    return (
      <HoverCard>
        <HoverCardTrigger render={<Button variant="link" />}>
          node-01
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

  if (name === "native-select") {
    return (
      <NativeSelect defaultValue="production">
        <NativeSelectOption value="production">Production</NativeSelectOption>
        <NativeSelectOption value="staging">Staging</NativeSelectOption>
        <NativeSelectOption value="maintenance">Maintenance</NativeSelectOption>
      </NativeSelect>
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

  if (name === "input-group") {
    return (
      <InputGroup className="max-w-sm">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search inventory" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>
            <Kbd>/</Kbd>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    )
  }

  if (name === "label") {
    return (
      <div className="grid w-full max-w-sm gap-2">
        <Label htmlFor="label-demo">Resource name</Label>
        <Input id="label-demo" defaultValue="node-01" />
      </div>
    )
  }

  if (name === "item") {
    return (
      <ItemGroup className="w-full max-w-md gap-2">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <ServerIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>node-01</ItemTitle>
            <ItemDescription>
              Running, 18% CPU, 42 GB memory used.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Open
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    )
  }

  if (name === "kbd") {
    return (
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
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
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Details
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

  if (name === "spinner") {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Spinner />
        <span>Loading task state</span>
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
      <div className="h-40 w-full max-w-md">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full rounded-lg border bg-card"
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
      </div>
    )
  }

  if (name === "sheet") {
    return (
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open sheet
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

  if (name === "sonner") {
    return <SonnerDemo />
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
      <ToggleGroup defaultValue={["list"]} variant="outline">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
      </ToggleGroup>
    )
  }

  if (name === "tooltip") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover target
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
      <Button>Apply changes</Button>
      <Button variant="secondary">Add resource</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  )
}

function FormDemo() {
  const form = useForm({
    defaultValues: {
      name: "node-01",
    },
  })

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Display name used across inventory views.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button">Save resource</Button>
      </form>
    </Form>
  )
}

function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: payments,
    columns: paymentColumns,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full space-y-3">
      <Input
        placeholder="Filter emails..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.currentTarget.value)
        }
        className="max-w-sm"
      />
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id === "amount" ? "text-right" : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={paymentColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

function SonnerDemo() {
  return (
    <ThemeProvider>
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          onClick={() => toast.success("Maintenance task scheduled")}
        >
          Show notification
        </Button>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}
