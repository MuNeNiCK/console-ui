import { createMemo, createSignal, For, Show } from "solid-js"
import type { JSX } from "solid-js"
import CheckIcon from "lucide-solid/icons/check"
import ChevronLeftIcon from "lucide-solid/icons/chevron-left"
import SaveIcon from "lucide-solid/icons/save"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormStep = "configure" | "review"
type ReviewSection = {
  title: string
  items: Array<{ label: string; value: string }>
}

type FormValues = {
  name: string
  displayName: string
  owner: string
  description: string
  environment: "Production" | "Staging" | "Development"
  approvalRequired: boolean
  notifications: boolean
}

const initialValues: FormValues = {
  name: "atlas",
  displayName: "Atlas workspace",
  owner: "platform@example.com",
  description: "Operational workspace for production platform services.",
  environment: "Production",
  approvalRequired: true,
  notifications: true,
}

const environments: FormValues["environment"][] = [
  "Production",
  "Staging",
  "Development",
]

export default function FormFlow() {
  const [step, setStep] = createSignal<FormStep>("configure")
  const [values, setValues] = createSignal<FormValues>(initialValues)
  const [submitted, setSubmitted] = createSignal(false)

  const canReview = createMemo(
    () => values().name.trim().length > 0 && values().owner.trim().length > 0,
  )

  const reviewSections = createMemo<ReviewSection[]>(() => [
    {
      title: "Workspace details",
      items: [
        { label: "Name", value: values().name },
        { label: "Display name", value: values().displayName || "Not set" },
        { label: "Description", value: values().description || "Not set" },
      ],
    },
    {
      title: "Ownership & environment",
      items: [
        { label: "Owner", value: values().owner },
        { label: "Environment", value: values().environment },
      ],
    },
    {
      title: "Controls",
      items: [
        {
          label: "Approval",
          value: values().approvalRequired ? "Required" : "Not required",
        },
        {
          label: "Notifications",
          value: values().notifications ? "Enabled" : "Disabled",
        },
      ],
    },
  ])

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setSubmitted(false)
  }

  function submit(event: SubmitEvent) {
    event.preventDefault()

    if (step() === "configure") {
      if (canReview()) setStep("review")
      return
    }

    setSubmitted(true)
  }

  return (
    <div class="min-h-[680px] bg-background px-4 pt-4 pb-5 text-foreground md:px-8 md:pt-6 md:pb-7">
      <header class="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div class="min-w-0">
          <p class="text-xs leading-[18px] text-muted-foreground">Workspaces</p>
          <h1 class="mt-[3px] text-[28px] font-[750]">Create workspace</h1>
          <p class="mt-2 text-sm leading-[21px] text-muted-foreground">
            Define ownership, environment, and review settings.
          </p>
        </div>
        <StepIndicator current={step()} />
      </header>

      <form class="grid min-w-0 gap-5" onSubmit={submit}>
        <Show when={submitted()}>
          <div
            role="status"
            aria-live="polite"
            class="rounded-md border border-success/30 bg-success/10 px-3.5 py-3 text-sm text-success"
          >
            Workspace configuration saved.
          </div>
        </Show>

        <Show
          when={step() === "configure"}
          fallback={<ReviewStep sections={reviewSections()} />}
        >
          <section class="grid gap-5">
            <FlowSection title="Workspace details" meta="Required" columns={2}>
              <Field label="Name" htmlFor="workspace-name" required>
                <Input
                  id="workspace-name"
                  name="workspace-name"
                  autocomplete="off"
                  value={values().name}
                  onInput={(event) => update("name", event.currentTarget.value)}
                  aria-invalid={!values().name.trim()}
                />
              </Field>
              <Field label="Display name" htmlFor="workspace-display-name">
                <Input
                  id="workspace-display-name"
                  name="workspace-display-name"
                  autocomplete="off"
                  value={values().displayName}
                  onInput={(event) =>
                    update("displayName", event.currentTarget.value)
                  }
                />
              </Field>
              <Field
                label="Description"
                htmlFor="workspace-description"
                class="min-[840px]:col-span-2"
              >
                <Textarea
                  id="workspace-description"
                  name="workspace-description"
                  autocomplete="off"
                  value={values().description}
                  onInput={(event) =>
                    update("description", event.currentTarget.value)
                  }
                  rows={4}
                />
              </Field>
            </FlowSection>

            <FlowSection
              title="Ownership & environment"
              meta="Required"
              columns={2}
            >
              <Field label="Owner email" htmlFor="workspace-owner" required>
                <Input
                  id="workspace-owner"
                  name="workspace-owner"
                  type="email"
                  autocomplete="email"
                  spellcheck={false}
                  value={values().owner}
                  onInput={(event) =>
                    update("owner", event.currentTarget.value)
                  }
                  aria-invalid={!values().owner.trim()}
                />
              </Field>
              <fieldset class="grid min-w-0 gap-2">
                <legend class="text-sm font-semibold">Environment</legend>
                <div class="flex flex-wrap gap-2">
                  <For each={environments}>
                    {(environment) => (
                      <Button
                        type="button"
                        variant={
                          values().environment === environment
                            ? "secondary"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => update("environment", environment)}
                      >
                        {environment}
                      </Button>
                    )}
                  </For>
                </div>
              </fieldset>
            </FlowSection>
            <FlowSection title="Controls" meta="Recommended" columns={2}>
              <label class="flex min-w-0 items-start gap-3 rounded-md border border-border bg-card px-3.5 py-3">
                <Checkbox
                  checked={values().approvalRequired}
                  onChange={(checked) => update("approvalRequired", checked)}
                />
                <span class="min-w-0">
                  <strong class="block text-sm">Require approval</strong>
                  <span class="mt-1 block text-sm leading-5 text-muted-foreground">
                    Changes must be reviewed by the workspace owner.
                  </span>
                </span>
              </label>
              <label class="flex min-w-0 items-start gap-3 rounded-md border border-border bg-card px-3.5 py-3">
                <Checkbox
                  checked={values().notifications}
                  onChange={(checked) => update("notifications", checked)}
                />
                <span class="min-w-0">
                  <strong class="block text-sm">
                    Send activity notifications
                  </strong>
                  <span class="mt-1 block text-sm leading-5 text-muted-foreground">
                    Notify owners when scheduled operations complete.
                  </span>
                </span>
              </label>
            </FlowSection>
          </section>
        </Show>

        <div class="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <Show when={step() === "review"}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("configure")}
            >
              <ChevronLeftIcon aria-hidden="true" />
              Back
            </Button>
          </Show>
          <Button
            type="submit"
            disabled={step() === "configure" && !canReview()}
          >
            <Show when={step() === "review"} fallback="Review">
              <SaveIcon aria-hidden="true" />
              Save workspace
            </Show>
          </Button>
        </div>
      </form>
    </div>
  )
}

function StepIndicator(props: { current: FormStep }) {
  const steps: Array<{ id: FormStep; label: string; detail: string }> = [
    { id: "configure", label: "Configure", detail: "Step 1 of 2" },
    { id: "review", label: "Review", detail: "Step 2 of 2" },
  ]
  const currentIndex = () =>
    steps.findIndex((step) => step.id === props.current)

  return (
    <ol class="flex shrink-0 flex-wrap items-center justify-end gap-x-4 gap-y-2">
      <For each={steps}>
        {(step, index) => {
          const complete = () => index() < currentIndex()
          const active = () => index() === currentIndex()

          return (
            <li class="flex min-w-0 items-center gap-2.5">
              <span
                class={`grid size-6 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                  active() || complete()
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Show when={complete()} fallback={index() + 1}>
                  <CheckIcon class="size-3.5" aria-hidden="true" />
                </Show>
              </span>
              <span class="min-w-0">
                <strong
                  class={`block truncate text-sm ${
                    active() || complete()
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </strong>
                <span class="block text-xs text-muted-foreground">
                  {step.detail}
                </span>
              </span>
            </li>
          )
        }}
      </For>
    </ol>
  )
}

function FlowSection(props: {
  title: string
  meta: string
  columns?: 1 | 2
  children: JSX.Element
}) {
  return (
    <section class="min-w-0 border-t border-border">
      <div class="flex min-h-11 items-center justify-between gap-4">
        <h2 class="m-0 text-[15px] font-[750]">{props.title}</h2>
        <span class="text-xs font-semibold text-muted-foreground">
          {props.meta}
        </span>
      </div>
      <div
        class={`grid gap-4 ${
          props.columns === 2 ? "min-[840px]:grid-cols-2" : ""
        }`}
      >
        {props.children}
      </div>
    </section>
  )
}

function Field(props: {
  label: string
  htmlFor: string
  required?: boolean
  class?: string
  children: JSX.Element
}) {
  return (
    <label
      class={`grid min-w-0 gap-2 ${props.class ?? ""}`}
      for={props.htmlFor}
    >
      <span class="text-sm font-semibold">
        {props.label}
        <Show when={props.required}>
          <span class="text-destructive"> *</span>
        </Show>
      </span>
      {props.children}
    </label>
  )
}

function ReviewStep(props: { sections: ReviewSection[] }) {
  return (
    <section class="min-w-0 border-t border-border">
      <div class="py-4">
        <h2 class="m-0 text-sm font-semibold">Review configuration</h2>
        <p class="mt-1 text-[13px] leading-5 text-muted-foreground">
          Confirm these details before saving the workspace.
        </p>
      </div>
      <div class="grid gap-4">
        <For each={props.sections}>
          {(section) => (
            <section class="overflow-hidden rounded-md border border-border bg-card">
              <h3 class="m-0 border-b border-border bg-muted/35 px-4 py-2.5 text-[13px] font-semibold">
                {section.title}
              </h3>
              <dl class="divide-y divide-border">
                <For each={section.items}>
                  {(item) => (
                    <div class="grid min-w-0 gap-1 px-4 py-2.5 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-6">
                      <dt class="min-w-0 break-words text-[13px] leading-5 font-normal text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd class="min-w-0 break-words text-sm leading-5 font-medium text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  )}
                </For>
              </dl>
            </section>
          )}
        </For>
      </div>
    </section>
  )
}
