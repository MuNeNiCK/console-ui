type IconProps = { class?: string; className?: string; [key: string]: unknown }
function Icon(props: IconProps & { children?: unknown }) {
  const className = props.class || props.className
  const rest = { ...props }
  delete rest.class
  delete rest.className
  delete rest.children
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} {...rest}>{props.children}</svg>
}
export function CheckIcon(props: IconProps) { return <Icon {...props}><path d="M20 6 9 17l-5-5" /></Icon> }
export function ChevronDownIcon(props: IconProps) { return <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon> }
export function ChevronLeftIcon(props: IconProps) { return <Icon {...props}><path d="m15 18-6-6 6-6" /></Icon> }
export function ChevronRightIcon(props: IconProps) { return <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon> }
export function ChevronUpIcon(props: IconProps) { return <Icon {...props}><path d="m18 15-6-6-6 6" /></Icon> }
export function CircleIcon(props: IconProps) { return <Icon {...props}><circle cx="12" cy="12" r="5" fill="currentColor" /></Icon> }
export function GripVerticalIcon(props: IconProps) { return <Icon {...props}><circle cx="9" cy="7" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="17" r="1"/><circle cx="15" cy="7" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="17" r="1"/></Icon> }
export function InboxIcon(props: IconProps) { return <Icon {...props}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></Icon> }
export function Loader2Icon(props: IconProps) { return <Icon {...props}><path d="M21 12a9 9 0 1 1-6.2-8.6" /></Icon> }
export function MoreHorizontalIcon(props: IconProps) { return <Icon {...props}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></Icon> }
export function PanelLeftIcon(props: IconProps) { return <Icon {...props}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></Icon> }
export function SearchIcon(props: IconProps) { return <Icon {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Icon> }
export function ServerIcon(props: IconProps) { return <Icon {...props}><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/></Icon> }
export function XIcon(props: IconProps) { return <Icon {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Icon> }
