"use client"

import * as React from "react"
import { CheckIcon, ChevronLeftIcon, SaveIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormStep = "configure" | "review"
type ReviewSection = {
  title: string
  items: { label: string; value: string }[]
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
  const [step, setStep] = React.useState<FormStep>("configure")
  const [values, setValues] = React.useState(initialValues)
  const [submitted, setSubmitted] = React.useState(false)
  const canReview =
    values.name.trim().length > 0 && values.owner.trim().length > 0
  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
    setSubmitted(false)
  }
  const reviewSections: ReviewSection[] = [
    {
      title: "Workspace details",
      items: [
        { label: "Name", value: values.name },
        { label: "Display name", value: values.displayName || "Not set" },
        { label: "Description", value: values.description || "Not set" },
      ],
    },
    {
      title: "Ownership & environment",
      items: [
        { label: "Owner", value: values.owner },
        { label: "Environment", value: values.environment },
      ],
    },
    {
      title: "Controls",
      items: [
        {
          label: "Approval",
          value: values.approvalRequired ? "Required" : "Not required",
        },
        {
          label: "Notifications",
          value: values.notifications ? "Enabled" : "Disabled",
        },
      ],
    },
  ]

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step === "configure") {
      if (canReview) setStep("review")
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="min-h-[680px] bg-background px-4 pt-4 pb-5 text-foreground md:px-8 md:pt-6 md:pb-7">
      <header className="flex min-w-0 flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs leading-[18px] text-muted-foreground">
            Workspaces
          </p>
          <h1 className="mt-[3px] text-[28px] font-[750]">Create workspace</h1>
          <p className="mt-2 text-sm leading-[21px] text-muted-foreground">
            Define ownership, environment, and review settings.
          </p>
        </div>
        <StepIndicator current={step} />
      </header>

      <form className="grid min-w-0 gap-5" onSubmit={submit}>
        {submitted && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-md border border-success/30 bg-success/10 px-3.5 py-3 text-sm text-success"
          >
            Workspace configuration saved.
          </div>
        )}
        {step === "configure" ? (
          <section className="grid gap-5">
            <FlowSection title="Workspace details" meta="Required" columns={2}>
              <Field label="Name" htmlFor="workspace-name" required>
                <Input
                  id="workspace-name"
                  name="workspace-name"
                  autoComplete="off"
                  value={values.name}
                  onChange={(event) =>
                    update("name", event.currentTarget.value)
                  }
                  aria-invalid={!values.name.trim()}
                />
              </Field>
              <Field label="Display name" htmlFor="workspace-display-name">
                <Input
                  id="workspace-display-name"
                  name="workspace-display-name"
                  autoComplete="off"
                  value={values.displayName}
                  onChange={(event) =>
                    update("displayName", event.currentTarget.value)
                  }
                />
              </Field>
              <Field
                label="Description"
                htmlFor="workspace-description"
                className="min-[840px]:col-span-2"
              >
                <Textarea
                  id="workspace-description"
                  name="workspace-description"
                  autoComplete="off"
                  value={values.description}
                  onChange={(event) =>
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
                  autoComplete="email"
                  spellCheck={false}
                  value={values.owner}
                  onChange={(event) =>
                    update("owner", event.currentTarget.value)
                  }
                  aria-invalid={!values.owner.trim()}
                />
              </Field>
              <fieldset className="grid min-w-0 gap-2">
                <legend className="text-sm font-semibold">Environment</legend>
                <div className="flex flex-wrap gap-2">
                  {environments.map((environment) => (
                    <Button
                      key={environment}
                      type="button"
                      variant={
                        values.environment === environment
                          ? "secondary"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => update("environment", environment)}
                    >
                      {environment}
                    </Button>
                  ))}
                </div>
              </fieldset>
            </FlowSection>
            <FlowSection title="Controls" meta="Recommended" columns={2}>
              <Control
                checked={values.approvalRequired}
                onCheckedChange={(checked) =>
                  update("approvalRequired", checked)
                }
                title="Require approval"
                description="Changes must be reviewed by the workspace owner."
              />
              <Control
                checked={values.notifications}
                onCheckedChange={(checked) => update("notifications", checked)}
                title="Send activity notifications"
                description="Notify owners when scheduled operations complete."
              />
            </FlowSection>
          </section>
        ) : (
          <ReviewStep sections={reviewSections} />
        )}
        <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
          {step === "review" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("configure")}
            >
              <ChevronLeftIcon aria-hidden="true" />
              Back
            </Button>
          )}
          <Button type="submit" disabled={step === "configure" && !canReview}>
            {step === "review" ? (
              <>
                <SaveIcon aria-hidden="true" />
                Save workspace
              </>
            ) : (
              "Review"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

function StepIndicator({ current }: { current: FormStep }) {
  const steps: { id: FormStep; label: string; detail: string }[] = [
    { id: "configure", label: "Configure", detail: "Step 1 of 2" },
    { id: "review", label: "Review", detail: "Step 2 of 2" },
  ]
  const currentIndex = steps.findIndex((step) => step.id === current)
  return (
    <ol className="flex shrink-0 flex-wrap items-center justify-end gap-x-4 gap-y-2">
      {steps.map((step, index) => {
        const complete = index < currentIndex
        const active = index === currentIndex
        return (
          <li key={step.id} className="flex min-w-0 items-center gap-2.5">
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full border text-xs font-bold ${active || complete ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
            >
              {complete ? (
                <CheckIcon className="size-3.5" aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            <span className="min-w-0">
              <strong
                className={`block truncate text-sm ${active || complete ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.label}
              </strong>
              <span className="block text-xs text-muted-foreground">
                {step.detail}
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function FlowSection({
  title,
  meta,
  columns,
  children,
}: {
  title: string
  meta: string
  columns?: 1 | 2
  children: React.ReactNode
}) {
  return (
    <section className="min-w-0 border-t border-border">
      <div className="flex min-h-11 items-center justify-between gap-4">
        <h2 className="m-0 text-[15px] font-[750]">{title}</h2>
        <span className="text-xs font-semibold text-muted-foreground">
          {meta}
        </span>
      </div>
      <div
        className={`grid gap-4 ${columns === 2 ? "min-[840px]:grid-cols-2" : ""}`}
      >
        {children}
      </div>
    </section>
  )
}
function Field({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <label
      className={`grid min-w-0 gap-2 ${className ?? ""}`}
      htmlFor={htmlFor}
    >
      <span className="text-sm font-semibold">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      {children}
    </label>
  )
}
function Control({
  checked,
  onCheckedChange,
  title,
  description,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  title: string
  description: string
}) {
  return (
    <label className="flex min-w-0 items-start gap-3 rounded-md border border-border bg-card px-3.5 py-3">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span className="min-w-0">
        <strong className="block text-sm">{title}</strong>
        <span className="mt-1 block text-sm leading-5 text-muted-foreground">
          {description}
        </span>
      </span>
    </label>
  )
}
function ReviewStep({ sections }: { sections: ReviewSection[] }) {
  return (
    <section className="min-w-0 border-t border-border">
      <div className="py-4">
        <h2 className="m-0 text-sm font-semibold">Review configuration</h2>
        <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
          Confirm these details before saving the workspace.
        </p>
      </div>
      <div className="grid gap-4">
        {sections.map((section) => (
          <section
            key={section.title}
            className="overflow-hidden rounded-md border border-border bg-card"
          >
            <h3 className="m-0 border-b border-border bg-muted/35 px-4 py-2.5 text-[13px] font-semibold">
              {section.title}
            </h3>
            <dl className="divide-y divide-border">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="grid min-w-0 gap-1 px-4 py-2.5 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="min-w-0 break-words text-[13px] leading-5 font-normal text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="min-w-0 break-words text-sm leading-5 font-medium text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </section>
  )
}
