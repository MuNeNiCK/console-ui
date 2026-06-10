import { Alert, AlertDescription, AlertTitle } from "@/registry/solid/ui/alert"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/solid/ui/accordion"
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
} from "@/registry/solid/ui/alert-dialog"
import { AspectRatio } from "@/registry/solid/ui/aspect-ratio"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/registry/solid/ui/avatar"
import { Badge } from "@/registry/solid/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/solid/ui/breadcrumb"
import { Button, buttonVariants } from "@/registry/solid/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/registry/solid/ui/button-group"
import { Calendar } from "@/registry/solid/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/solid/ui/carousel"
import { Checkbox } from "@/registry/solid/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/solid/ui/collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/solid/ui/command"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from "@/registry/solid/ui/combobox"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/solid/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/solid/ui/dialog"
import { DirectionProvider } from "@/registry/solid/ui/direction"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/solid/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/solid/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/solid/ui/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/solid/ui/field"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/solid/ui/form"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/solid/ui/hover-card"
import { Input } from "@/registry/solid/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/solid/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/solid/ui/input-otp"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/solid/ui/item"
import { Kbd, KbdGroup } from "@/registry/solid/ui/kbd"
import { Label } from "@/registry/solid/ui/label"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/registry/solid/ui/menubar"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/solid/ui/native-select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/solid/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/solid/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/solid/ui/popover"
import { Progress } from "@/registry/solid/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/registry/solid/ui/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/solid/ui/resizable"
import { ScrollArea } from "@/registry/solid/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/registry/solid/ui/select"
import { Separator } from "@/registry/solid/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/solid/ui/sheet"
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
} from "@/registry/solid/ui/sidebar"
import { Skeleton } from "@/registry/solid/ui/skeleton"
import { Slider } from "@/registry/solid/ui/slider"
import { Toaster } from "@/registry/solid/ui/sonner"
import { Spinner } from "@/registry/solid/ui/spinner"
import { Switch } from "@/registry/solid/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/solid/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/solid/ui/tabs"
import { Textarea } from "@/registry/solid/ui/textarea"
import { Toggle } from "@/registry/solid/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/registry/solid/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/solid/ui/tooltip"
import {
  InboxIcon,
  SearchIcon,
  ServerIcon,
} from "lucide-solid"
import { toast } from "solid-sonner"

export default function SolidDemo(props: { name: string }) {
  switch (props.name) {
    case "accordion":
      return (
        <Accordion class="w-full max-w-md">
          <AccordionItem>
            <AccordionTrigger>Resource summary</AccordionTrigger>
            <AccordionContent class="text-muted-foreground">
              CPU, memory, and storage details for the selected resource.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Recent activity</AccordionTrigger>
            <AccordionContent class="text-muted-foreground">
              Events and tasks related to this resource.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )

    case "alert":
      return (
        <Alert class="max-w-md">
          <AlertTitle>Maintenance window scheduled</AlertTitle>
          <AlertDescription>
            Host updates are planned for tonight at 23:00.
          </AlertDescription>
        </Alert>
      )

    case "alert-dialog":
      return (
        <AlertDialog>
          <AlertDialogTrigger class={buttonVariants({ variant: "outline" })}>
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

    case "aspect-ratio":
      return (
        <AspectRatio ratio={16 / 9} class="w-full max-w-sm overflow-hidden rounded-lg border bg-secondary">
          <div class="flex size-full items-center justify-center text-sm text-muted-foreground">
            Console preview
          </div>
        </AspectRatio>
      )

    case "avatar":
      return (
        <AvatarGroup>
          <Avatar size="lg"><AvatarFallback>VC</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>AW</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>IL</AvatarFallback></Avatar>
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
      )

    case "badge":
      return (
        <div class="flex flex-wrap items-center justify-center gap-2">
          <Badge>Running</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="outline">Managed</Badge>
          <Badge variant="destructive">Failed</Badge>
        </div>
      )

    case "breadcrumb":
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Datacenter</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Cluster</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>node-01</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

    case "button-group":
      return (
        <ButtonGroup>
          <Button variant="outline">Power on</Button>
          <Button variant="outline">Restart</Button>
          <ButtonGroupSeparator />
          <ButtonGroupText>node-01</ButtonGroupText>
        </ButtonGroup>
      )

    case "calendar":
      return (
        <div class="rounded-lg border bg-card shadow-xs">
          <Calendar />
        </div>
      )

    case "card":
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

    case "carousel":
      return (
        <Carousel class="w-full max-w-xs">
          <CarouselContent>
            <CarouselItem>
              <div class="flex aspect-[4/3] items-center justify-center rounded-lg border bg-secondary text-sm text-muted-foreground">
                Panel 1
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="flex aspect-[4/3] items-center justify-center rounded-lg border bg-secondary text-sm text-muted-foreground">
                Panel 2
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="flex aspect-[4/3] items-center justify-center rounded-lg border bg-secondary text-sm text-muted-foreground">
                Panel 3
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious disabled />
          <CarouselNext />
        </Carousel>
      )

    case "chart":
      return (
        <div
          data-slot="chart"
          class="flex h-[220px] w-full max-w-md flex-col items-stretch gap-3 p-6 text-xs"
        >
          <div class="flex min-h-0 flex-1 items-end gap-3">
            <div class="h-[42%] flex-1 rounded-t bg-[var(--chart-1)]" />
            <div class="h-[28%] flex-1 rounded-t bg-[var(--chart-1)]" />
            <div class="h-[64%] flex-1 rounded-t bg-[var(--chart-1)]" />
          </div>
          <div class="grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
            <span>node-01</span>
            <span>node-02</span>
            <span>node-03</span>
          </div>
        </div>
      )

    case "checkbox":
      return (
        <div class="flex items-center gap-3">
          <Checkbox id="demo-checkbox-solid" defaultChecked />
          <label for="demo-checkbox-solid" class="text-sm">
            Enable monitoring
          </label>
        </div>
      )

    case "collapsible":
      return (
        <Collapsible defaultOpen class="w-full max-w-sm rounded-lg border bg-card p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm font-medium">node-01</p>
              <p class="text-sm text-muted-foreground">Running workload</p>
            </div>
            <CollapsibleTrigger class={buttonVariants({ variant: "outline", size: "sm" })}>
              Toggle
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent class="mt-4 border-t pt-4 text-sm text-muted-foreground">
            18% CPU, 42 GB memory used, 3 active tasks.
          </CollapsibleContent>
        </Collapsible>
      )

    case "command":
      return (
        <Command class="max-w-md rounded-lg border shadow-xs">
          <CommandInput placeholder="Search resources..." />
          <CommandList>
            <CommandEmpty class="hidden">No results found.</CommandEmpty>
            <CommandGroup>
              <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">Resources</div>
              <CommandItem data-selected="true">node-01</CommandItem>
              <CommandItem>production-cluster</CommandItem>
              <CommandItem>datastore-primary</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )

    case "combobox":
      return (
        <Combobox>
          <ComboboxInput class="w-[240px]" placeholder="Select a resource" />
          <ComboboxContent class="hidden">
            <ComboboxEmpty>No resources found.</ComboboxEmpty>
            <ComboboxGroup>
              <ComboboxItem>node-01</ComboboxItem>
              <ComboboxItem>node-02</ComboboxItem>
              <ComboboxItem>cluster-a</ComboboxItem>
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
      )

    case "context-menu":
      return (
        <ContextMenu>
          <ContextMenuTrigger class="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border bg-card text-sm">
            Right click resource
          </ContextMenuTrigger>
          <ContextMenuContent class="hidden">
            <ContextMenuItem>Open console</ContextMenuItem>
            <ContextMenuItem>Clone</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )

    case "dialog":
      return (
        <Dialog>
          <DialogTrigger class={buttonVariants({ variant: "outline" })}>
            Open dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit resource</DialogTitle>
              <DialogDescription>
                Update the display name for this managed resource.
              </DialogDescription>
            </DialogHeader>
            <Input value="node-01" />
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )

    case "direction":
      return (
        <DirectionProvider dir="rtl">
          <ButtonGroup>
            <Button variant="outline">Primary</Button>
            <Button variant="outline">Secondary</Button>
          </ButtonGroup>
        </DirectionProvider>
      )

    case "drawer":
      return (
        <Drawer>
          <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
            Open drawer
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

    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger class={buttonVariants({ variant: "outline" })}>
            Actions
          </DropdownMenuTrigger>
          <DropdownMenuContent class="hidden">
            <DropdownMenuLabel>Resource</DropdownMenuLabel>
            <DropdownMenuItem>Open console</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )

    case "empty":
      return (
        <Empty class="min-h-48 w-full max-w-md">
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
            <Button variant="outline" size="sm">Refresh</Button>
          </EmptyContent>
        </Empty>
      )

    case "field":
      return (
        <FieldSet class="w-full max-w-sm">
          <FieldLegend>Resource policy</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel for="field-name-solid">Name</FieldLabel>
              <Input id="field-name-solid" value="node-01" />
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

    case "form":
      return <FormDemo />

    case "hover-card":
      return (
        <HoverCard>
          <HoverCardTrigger class={buttonVariants({ variant: "link" })}>
            node-01
          </HoverCardTrigger>
          <HoverCardContent>
            <div class="space-y-1">
              <p class="text-sm font-medium">node-01</p>
              <p class="text-sm text-muted-foreground">
                Running, 18% CPU, 42 GB memory used.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      )

    case "input":
      return (
        <div class="w-full max-w-sm space-y-3">
          <Input placeholder="Name" />
          <Input placeholder="Disabled" disabled />
        </div>
      )

    case "input-group":
      return (
        <InputGroup class="max-w-sm">
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

    case "input-otp":
      return (
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} char="1" />
            <InputOTPSlot index={1} char="2" />
            <InputOTPSlot index={2} char="3" />
            <InputOTPSlot index={3} char="4" />
            <InputOTPSlot index={4} char="5" />
            <InputOTPSlot index={5} char="6" />
          </InputOTPGroup>
        </InputOTP>
      )

    case "item":
      return (
        <ItemGroup class="w-full max-w-md gap-2">
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
              <Button variant="outline" size="sm">Open</Button>
            </ItemActions>
          </Item>
        </ItemGroup>
      )

    case "kbd":
      return (
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      )

    case "label":
      return (
        <div class="grid w-full max-w-sm gap-2">
          <Label for="label-demo-solid">Resource name</Label>
          <Input id="label-demo-solid" value="node-01" />
        </div>
      )

    case "menubar":
      return (
        <Menubar>
          <MenubarTrigger>Resource</MenubarTrigger>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent class="hidden">
            <MenubarItem>Open console</MenubarItem>
            <MenubarItem>Clone</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Remove</MenubarItem>
          </MenubarContent>
        </Menubar>
      )

    case "native-select":
      return (
        <NativeSelect value="production">
          <NativeSelectOption value="production">Production</NativeSelectOption>
          <NativeSelectOption value="staging">Staging</NativeSelectOption>
          <NativeSelectOption value="maintenance">Maintenance</NativeSelectOption>
        </NativeSelect>
      )

    case "navigation-menu":
      return (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Inventory</NavigationMenuTrigger>
              <NavigationMenuContent class="hidden">
                <div class="grid w-[260px] gap-1 p-2">
                  <NavigationMenuLink href="#">Hosts</NavigationMenuLink>
                  <NavigationMenuLink href="#">Virtual machines</NavigationMenuLink>
                  <NavigationMenuLink href="#">Storage</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )

    case "pagination":
      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      )

    case "popover":
      return (
        <Popover>
          <PopoverTrigger class={buttonVariants({ variant: "outline" })}>
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

    case "progress":
      return (
        <div class="w-full max-w-sm space-y-3">
          <div class="flex items-center justify-between text-sm">
            <span>Provisioning</span>
            <span class="text-muted-foreground">64%</span>
          </div>
          <Progress value={64} />
        </div>
      )

    case "radio-group":
      return (
        <RadioGroup defaultValue="balanced" class="gap-3">
          <label class="flex items-center gap-3 text-sm">
            <RadioGroupItem value="balanced" />
            Balanced
          </label>
          <label class="flex items-center gap-3 text-sm">
            <RadioGroupItem value="performance" />
            Performance
          </label>
        </RadioGroup>
      )

    case "resizable":
      return (
        <div class="h-40 w-full max-w-md">
          <ResizablePanelGroup direction="horizontal" class="h-full rounded-lg border bg-card">
            <ResizablePanel class="flex-[45_1_0]">
              <div class="flex h-full items-center justify-center text-sm text-muted-foreground">
              Inventory
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel class="flex-[55_1_0]">
              <div class="flex h-full items-center justify-center text-sm text-muted-foreground">
              Details
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )

    case "scroll-area":
      return (
        <ScrollArea class="h-40 w-full max-w-sm rounded-lg border bg-card">
          <div class="space-y-3 p-4">
            <div class="text-sm">Host connected</div>
            <div class="text-sm">VM migrated</div>
            <div class="text-sm">Snapshot created</div>
            <div class="text-sm">Policy synced</div>
            <div class="text-sm">Backup completed</div>
          </div>
        </ScrollArea>
      )

    case "select":
      return (
        <Select defaultValue="production">
          <SelectTrigger class="w-[240px]">
            <span>Production</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="production">Production</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      )

    case "separator":
      return (
        <div class="w-full max-w-sm">
          <div class="space-y-1">
            <p class="text-sm font-medium">Production</p>
            <p class="text-sm text-muted-foreground">3 hosts, 18 VMs</p>
          </div>
          <Separator class="my-4" />
          <div class="space-y-1">
            <p class="text-sm font-medium">Maintenance</p>
            <p class="text-sm text-muted-foreground">1 host scheduled</p>
          </div>
        </div>
      )

    case "sheet":
      return (
        <Sheet>
          <SheetTrigger class={buttonVariants({ variant: "outline" })}>
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

    case "sidebar":
      return (
        <div class="h-56 w-full overflow-hidden rounded-lg border bg-background">
          <SidebarProvider>
            <Sidebar collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Console</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem><SidebarMenuButton isActive>Inventory</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton>Events</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton>Tasks</SidebarMenuButton></SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        </div>
      )

    case "skeleton":
      return (
        <div class="w-full max-w-sm space-y-3">
          <Skeleton class="h-4 w-2/3" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-4/5" />
        </div>
      )

    case "slider":
      return (
        <div class="w-full max-w-sm space-y-3">
          <div class="flex items-center justify-between text-sm">
            <span>CPU limit</span>
            <span class="text-muted-foreground">40%</span>
          </div>
          <Slider defaultValue={[40]} max={100} />
        </div>
      )

    case "sonner":
      return <SonnerDemo />

    case "spinner":
      return (
        <div class="flex items-center gap-3 text-sm">
          <Spinner />
          <span>Loading task state</span>
        </div>
      )

    case "switch":
      return (
        <div class="flex items-center gap-3">
          <Switch defaultChecked />
          <span class="text-sm">Auto remediation</span>
        </div>
      )

    case "table":
      return (
        <div class="w-full overflow-hidden rounded-lg border bg-card shadow-xs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead class="text-right">CPU</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>node-01</TableCell>
                <TableCell>Running</TableCell>
                <TableCell class="text-right">18%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>node-02</TableCell>
                <TableCell>Maintenance</TableCell>
                <TableCell class="text-right">4%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )

    case "tabs":
      return (
        <Tabs defaultValue="overview" class="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" class="text-sm text-muted-foreground">
            Overview content for the selected resource.
          </TabsContent>
          <TabsContent value="events" class="text-sm text-muted-foreground">
            Recent events and changes.
          </TabsContent>
          <TabsContent value="settings" class="text-sm text-muted-foreground">
            Resource configuration.
          </TabsContent>
        </Tabs>
      )

    case "textarea":
      return (
        <Textarea
          class="max-w-sm"
          placeholder="Add an operational note..."
        />
      )

    case "toggle":
      return (
        <div class="flex items-center gap-2">
          <Toggle defaultPressed>List</Toggle>
          <Toggle>Graph</Toggle>
        </div>
      )

    case "toggle-group":
      return (
        <ToggleGroup defaultValue="list" variant="outline">
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="chart">Chart</ToggleGroupItem>
        </ToggleGroup>
      )

    case "tooltip":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger class={buttonVariants({ variant: "outline" })}>
              Hover target
            </TooltipTrigger>
            <TooltipContent>Open remote console</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

    default:
      return (
        <div class="flex flex-wrap items-center justify-center gap-3">
          <Button>Apply changes</Button>
          <Button variant="secondary">Add resource</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      )
  }
}

function FormDemo() {
  return (
    <Form class="w-full max-w-sm space-y-4">
      <FormItem>
        <FormLabel>Resource name</FormLabel>
        <FormControl>
          <Input value="node-01" />
        </FormControl>
        <FormDescription>
          Display name used across inventory views.
        </FormDescription>
        <FormMessage />
      </FormItem>
      <Button type="button">Save resource</Button>
    </Form>
  )
}

function SonnerDemo() {
  return (
    <div class="flex items-center justify-center">
      <Button
        variant="outline"
        onClick={() => toast.success("Maintenance task scheduled")}
      >
        Show notification
      </Button>
      <Toaster />
    </div>
  )
}
