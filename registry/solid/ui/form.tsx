import { splitProps, type JSX } from "solid-js"
import { Label } from "@/registry/solid/ui/label"
import { cn } from "@/registry/solid/lib/utils"
function Form(props: JSX.HTMLAttributes<HTMLFormElement>) { return <form {...props}/> }
function FormField(props: JSX.HTMLAttributes<HTMLDivElement>) { return <div data-slot="form-field" {...props}/> }
function FormItem(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="form-item" class={cn("grid gap-2",l.class)} {...r}/> }
function FormLabel(props: Parameters<typeof Label>[0]) { return <Label data-slot="form-label" {...props}/> }
function FormControl(props: JSX.HTMLAttributes<HTMLDivElement>) { return <div data-slot="form-control" {...props}/> }
function FormDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) { const [l,r]=splitProps(props,["class"]); return <p data-slot="form-description" class={cn("text-sm text-muted-foreground",l.class)} {...r}/> }
function FormMessage(props: JSX.HTMLAttributes<HTMLParagraphElement>) { const [l,r]=splitProps(props,["class"]); return <p data-slot="form-message" class={cn("text-sm text-destructive",l.class)} {...r}/> }
function useFormField() { return {} }
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField }
