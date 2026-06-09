import { createContext, splitProps, useContext, type JSX } from "solid-js"
import { cn } from "@/registry/solid/lib/utils"
type ChartConfig = Record<string, { label?: string; color?: string }>
const ChartContext = createContext<{ config: ChartConfig }>({ config: {} })
function ChartContainer(props: JSX.HTMLAttributes<HTMLDivElement> & { config: ChartConfig }) { const [l,r]=splitProps(props,["class","config","children"]); return <ChartContext.Provider value={{config:l.config}}><div data-slot="chart" class={cn("flex aspect-video justify-center text-xs",l.class)} {...r}>{l.children}</div></ChartContext.Provider> }
function ChartTooltip(props: JSX.HTMLAttributes<HTMLDivElement>) { return <div data-slot="chart-tooltip" {...props}/> }
function ChartTooltipContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="chart-tooltip-content" class={cn("rounded-lg border bg-background p-2 text-xs shadow-xl",l.class)} {...r}/> }
function ChartLegend(props: JSX.HTMLAttributes<HTMLDivElement>) { return <div data-slot="chart-legend" {...props}/> }
function ChartLegendContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="chart-legend-content" class={cn("flex items-center justify-center gap-4",l.class)} {...r}/> }
function ChartStyle() { return null }
function useChart() { return useContext(ChartContext) }
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle, useChart, type ChartConfig }
