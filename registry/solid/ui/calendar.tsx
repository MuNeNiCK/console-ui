import type { ComponentProps, ValidComponent } from "solid-js"
import { For, Match, Show, Switch, splitProps } from "solid-js"
import CalendarPrimitive from "@corvu/calendar"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-solid"

import { cx } from "@/registry/solid/lib/cva"

import { buttonVariants } from "./button"

export type CalendarProps = ComponentProps<typeof CalendarPrimitive> & {
  defaultMonth?: Date
  selected?: Date
  today?: Date
  showOutsideDays?: boolean
}

export const Calendar = (props: CalendarProps) => {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "defaultMonth",
    "selected",
    "today",
    "showOutsideDays",
  ])

  if (local.children) {
    return <CalendarPrimitive data-slot="calendar" {...props} />
  }

  const month = () => local.defaultMonth ?? local.selected ?? new Date()
  const today = () => local.today ?? new Date()
  const showOutsideDays = () => local.showOutsideDays ?? true
  const monthStart = () => new Date(month().getFullYear(), month().getMonth(), 1)
  const label = () =>
    monthStart().toLocaleString("default", {
      month: "long",
      year: "numeric",
    })
  const sameDay = (a?: Date, b?: Date) =>
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  const days = () => {
    const start = monthStart()
    const first = new Date(start)
    first.setDate(1 - start.getDay())
    const daysInMonth = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      0,
    ).getDate()
    const weekCount = Math.ceil((start.getDay() + daysInMonth) / 7)

    return Array.from({ length: weekCount * 7 }, (_, index) => {
      const date = new Date(first)
      date.setDate(first.getDate() + index)
      return {
        date,
        outside: date.getMonth() !== start.getMonth(),
        selected: sameDay(date, local.selected),
        today: sameDay(date, today()),
      }
    })
  }

  return (
    <div
      data-slot="calendar"
      class={cx(
        "group/calendar w-fit bg-transparent p-3 [--cell-size:--spacing(8)]",
        local.class,
      )}
      {...rest}
    >
      <div class="relative flex flex-col gap-4">
        <div class="absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1">
          <button
            type="button"
            aria-label="Previous month"
            class={buttonVariants({
              variant: "ghost",
              size: "icon",
              class: "size-(--cell-size) p-0 select-none",
            })}
          >
            <ChevronLeftIcon class="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            class={buttonVariants({
              variant: "ghost",
              size: "icon",
              class: "size-(--cell-size) p-0 select-none",
            })}
          >
            <ChevronRightIcon class="size-4" />
          </button>
        </div>
        <div class="flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)">
          <span class="text-sm font-medium select-none">{label()}</span>
        </div>
        <table class="w-full border-collapse">
          <thead>
            <tr class="flex">
              <For each={["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}>
                {(day) => (
                  <th class="flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none">
                    {day}
                  </th>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={Array.from({ length: days().length / 7 }, (_, index) => index)}>
              {(week) => (
                <tr class="mt-2 flex w-full">
                  <For each={days().slice(week * 7, week * 7 + 7)}>
                    {(day) => (
                      <td class="group/day relative aspect-square h-full w-full p-0 text-center select-none">
                        <Show when={showOutsideDays() || !day.outside}>
                          <button
                            type="button"
                            data-selected-single={day.selected}
                            data-today={day.today}
                            class={buttonVariants({
                              variant: "ghost",
                              size: "icon",
                              class:
                                "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal data-[today=true]:bg-accent data-[today=true]:text-accent-foreground data-[selected-single=true]:bg-primary! data-[selected-single=true]:text-primary-foreground! dark:hover:text-accent-foreground",
                            })}
                          >
                            {day.date.getDate()}
                          </button>
                        </Show>
                      </td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export type CalendarNavProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof CalendarPrimitive.Nav<T>>

export const CalendarNav = <T extends ValidComponent = "button">(
  props: CalendarNavProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarNavProps, ["action", "class"])

  return (
    <CalendarPrimitive.Nav
      data-slot="calendar-nav"
      action={props.action}
      class={buttonVariants({
        variant: "outline",
        class: [
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          props.class,
        ],
      })}
      {...rest}
    >
      <Switch>
        <Match
          when={props.action === "prev-year" || props.action === "prev-month"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 18l-6-6l6-6"
            />
          </svg>
        </Match>
        <Match
          when={props.action === "next-year" || props.action === "next-month"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 18l6-6l-6-6"
            />
          </svg>
        </Match>
      </Switch>
    </CalendarPrimitive.Nav>
  )
}

export type CalendarLabelProps<T extends ValidComponent = "h2"> =
  ComponentProps<typeof CalendarPrimitive.Label<T>>

export const CalendarLabel = <T extends ValidComponent = "h2">(
  props: CalendarLabelProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarLabelProps, ["class"])

  return (
    <CalendarPrimitive.Label
      data-slot="calendar-label"
      class={cx("text-sm font-medium", props.class)}
      {...rest}
    />
  )
}

export type CalendarTableProps<T extends ValidComponent = "table"> =
  ComponentProps<typeof CalendarPrimitive.Table<T>>

export const CalendarTable = <T extends ValidComponent = "table">(
  props: CalendarTableProps<T>,
) => {
  return <CalendarPrimitive.Table data-slot="calendar-table" {...props} />
}

export type CalendarHeadCellProps<T extends ValidComponent = "th"> =
  ComponentProps<typeof CalendarPrimitive.HeadCell<T>>

export const CalendarHeadCell = <T extends ValidComponent = "th">(
  props: CalendarHeadCellProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarHeadCellProps, ["class"])

  return (
    <CalendarPrimitive.HeadCell
      data-slot="calendar-head-cell"
      class={cx(
        "text-muted-foreground w-8 rounded-md text-[0.8rem] font-normal",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CalendarCellProps<T extends ValidComponent = "td"> = ComponentProps<
  typeof CalendarPrimitive.Cell<T>
>

export const CalendarCell = <T extends ValidComponent = "td">(
  props: CalendarCellProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarCellProps, ["class"])

  return (
    <CalendarPrimitive.Cell
      data-slot="calendar-cell"
      class={cx(
        "has-[[data-in-range]]:bg-accent relative p-0 text-center text-sm focus-within:relative focus-within:z-20 has-[[data-disabled][data-selected]]:opacity-50 has-[[data-in-range]]:first:rounded-l-md has-[[data-in-range]]:last:rounded-r-md has-[[data-range-end]]:rounded-r-md has-[[data-range-start]]:rounded-l-md",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CalendarCellTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof CalendarPrimitive.CellTrigger<T>>

export const CalendarCellTrigger = <T extends ValidComponent = "button">(
  props: CalendarCellTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarCellTriggerProps, ["class"])

  return (
    <CalendarPrimitive.CellTrigger
      data-slot="calendar-cell-trigger"
      class={buttonVariants({
        variant: "ghost",
        class: [
          "size-8 p-0 font-normal aria-selected:opacity-100",
          "data-[today]:bg-accent data-[today]:text-accent-foreground dark:data-[today]:focus-visible:ring-secondary",
          "aria-selected:not-[[data-in-range]]:bg-primary! aria-selected:not-[[data-in-range]]:text-primary-foreground! aria-selected:not-[[data-in-range]]:hover:bg-primary aria-selected:not-[[data-in-range]]:hover:text-primary-foreground",
          "data-[range-start]:aria-selected:bg-primary data-[range-start]:aria-selected:text-primary-foreground data-[range-start]:aria-selected:hover:bg-primary! data-[range-start]:aria-selected:hover:text-primary-foreground!",
          "data-[range-end]:aria-selected:bg-primary data-[range-end]:aria-selected:text-primary-foreground data-[range-end]:aria-selected:hover:bg-primary! data-[range-end]:aria-selected:hover:text-primary-foreground!",
          props.class,
        ],
      })}
      {...rest}
    />
  )
}
