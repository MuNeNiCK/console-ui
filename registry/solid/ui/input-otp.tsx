import type { VoidProps } from "solid-js"
import {
  Show,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import OTPFieldPrimitive from "@corvu/otp-field"
import MinusIcon from "lucide-solid/icons/minus"

import { cx } from "@/registry/solid/lib/cva"

export type OTPFieldProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof OTPFieldPrimitive<T>
>

export const OTPField = <T extends ValidComponent = "div">(
  props: OTPFieldProps<T>,
) => {
  const [, rest] = splitProps(props as OTPFieldProps, ["class"])

  return (
    <OTPFieldPrimitive
      data-slot="input-otp"
      class={cx("flex items-center gap-2 has-disabled:opacity-50", props.class)}
      {...rest}
    />
  )
}

export type OTPFieldGroupProps = ComponentProps<"div">

export const OTPFieldGroup = (props: OTPFieldGroupProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="input-otp-group"
      class={cx("flex items-center gap-1.5", props.class)}
      {...rest}
    />
  )
}

export type OTPFieldSlotProps = VoidProps<
  ComponentProps<"div"> & { index: number }
>

export const OTPFieldSlot = (props: OTPFieldSlotProps) => {
  const [, rest] = splitProps(props, ["class", "index"])

  const context = OTPFieldPrimitive.useContext()

  const char = () => context.value()[props.index]
  const hasFakeCaret = () =>
    context.value().length === props.index && context.isInserting()
  const isActive = () => context.activeSlots().includes(props.index)

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive()}
      class={cx(
        "relative flex h-10 w-10 items-center justify-center rounded-md border border-input bg-card text-sm font-medium shadow-[0_1px_1px_rgb(0_0_0/0.04)] transition-all outline-none aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:bg-background data-[active=true]:ring-[3px] data-[active=true]:ring-ring/30 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        props.class,
      )}
      {...rest}
    >
      {char()}
      <Show when={hasFakeCaret()}>
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      </Show>
    </div>
  )
}

export type OTPFieldSeparatorProps = VoidProps<ComponentProps<"div">>

export const OTPFieldSeparator = (props: OTPFieldSeparatorProps) => {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon class="size-4" />
    </div>
  )
}

export type OTPFieldInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof OTPFieldPrimitive.Input<T>>

export const OTPFieldInput = <T extends ValidComponent = "input">(
  props: OTPFieldInputProps<T>,
) => {
  return <OTPFieldPrimitive.Input data-slot="input-otp-input" {...props} />
}


export const InputOTP = OTPField
export const InputOTPGroup = OTPFieldGroup
export const InputOTPSlot = OTPFieldSlot
export const InputOTPSeparator = OTPFieldSeparator
