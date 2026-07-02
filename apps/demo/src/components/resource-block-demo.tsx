import type { ColumnDef, RowSelectionState } from "@tanstack/solid-table"
import { createMemo, createSignal } from "solid-js"
import PlusIcon from "lucide-solid/icons/plus"
import RefreshCwIcon from "lucide-solid/icons/refresh-cw"

import { Button } from "@/registry/solid/ui/button"
import { Checkbox } from "@/registry/solid/ui/checkbox"
import { Input } from "@/registry/solid/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/solid/ui/tabs"
import { DataTable } from "@/registry/solid/blocks/resource/data-table"
import { DeleteResourceDialog } from "@/registry/solid/blocks/resource/delete-resource-dialog"
import { DetailField, DetailFieldGrid, DetailSection } from "@/registry/solid/blocks/resource/detail-content"
import { EmptyState } from "@/registry/solid/blocks/resource/empty-state"
import { FormField, FormSection } from "@/registry/solid/blocks/resource/form-fields"
import { FormSelect } from "@/registry/solid/blocks/resource/form-select"
import { ConfigureTabs, FormStepIndicator } from "@/registry/solid/blocks/resource/form-workflow"
import { ResourceDetailLayout } from "@/registry/solid/blocks/resource/layouts/ResourceDetailLayout"
import { ResourceListActions, ResourceListLayout } from "@/registry/solid/blocks/resource/layouts/ResourceListLayout"
import { ResourcePageLayout } from "@/registry/solid/blocks/resource/layouts/ResourcePageLayout"
import { ListSkeleton } from "@/registry/solid/blocks/resource/list-skeleton"
import { MetadataLabelFields, type MetadataLabel } from "@/registry/solid/blocks/resource/metadata-label-fields"
import { ReviewDetails, ReviewLabels, ReviewSummary } from "@/registry/solid/blocks/resource/review-summary"
import { StatusBadge } from "@/registry/solid/blocks/resource/status-badge"

type ResourceRow = {
  id: string
  name: string
  status: string
  scope: string
  address: string
  updated: string
}

const rows: ResourceRow[] = [
  {
    id: "resource-alpha",
    name: "resource-alpha",
    status: "Ready",
    scope: "Production",
    address: "10.42.0.18",
    updated: "2 min ago",
  },
  {
    id: "worker-pool",
    name: "worker-pool",
    status: "Updating",
    scope: "Production",
    address: "10.42.1.22",
    updated: "9 min ago",
  },
  {
    id: "cache-edge",
    name: "cache-edge",
    status: "Available",
    scope: "Edge",
    address: "10.48.8.14",
    updated: "18 min ago",
  },
  {
    id: "batch-runner",
    name: "batch-runner",
    status: "Suspended",
    scope: "Maintenance",
    address: "10.49.3.77",
    updated: "1 hour ago",
  },
]

const columns: ColumnDef<ResourceRow>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: (info) => (
      <Checkbox
        checked={info.table.getIsAllPageRowsSelected()}
        onChange={(checked) => info.table.toggleAllPageRowsSelected(checked)}
        aria-label="Select all rows"
      />
    ),
    cell: (info) => (
      <Checkbox
        checked={info.row.getIsSelected()}
        onChange={(checked) => info.row.toggleSelected(checked)}
        aria-label={`Select ${info.row.original.name}`}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    meta: { headerLabel: "Name" },
    cell: (info) => (
      <span class="font-semibold text-foreground">
        {String(info.getValue())}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { headerLabel: "Status" },
    cell: (info) => <StatusBadge status={String(info.getValue())} />,
  },
  {
    accessorKey: "scope",
    header: "Scope",
    meta: { headerLabel: "Scope" },
  },
  {
    accessorKey: "address",
    header: "Address",
    meta: { headerLabel: "Address" },
  },
  {
    accessorKey: "updated",
    header: "Updated",
    meta: { headerLabel: "Updated" },
  },
]

const manifest = `apiVersion: platform.example.io/v1
kind: ManagedResource
metadata:
  name: resource-alpha
  displayName: Resource Alpha
  labels:
    env: production
    owner: platform
spec:
  scope: production
  plan: standard
  replicas: 3
`

const reviewItems = [
  {
    label: "Identity",
    value: "resource-alpha",
    detail: (
      <ReviewDetails
        items={[
          { label: "Display Name", value: "Resource Alpha" },
          { label: "Description", value: "Primary managed resource" },
        ]}
      />
    ),
  },
  {
    label: "Runtime",
    value: "standard",
    detail: "3 replicas",
  },
  {
    label: "Metadata",
    value: (
      <ReviewLabels
        labels={[
          { key: "env", value: "production" },
          { key: "owner", value: "platform" },
        ]}
      />
    ),
    detail: "Labels",
  },
]

export default function ResourceBlockDemo() {
  const [deleteOpen, setDeleteOpen] = createSignal(false)
  const [stateDeleteOpen, setStateDeleteOpen] = createSignal(false)
  const [manifestValue, setManifestValue] = createSignal(manifest)
  const [configureTab, setConfigureTab] = createSignal("general")
  const [plan, setPlan] = createSignal("standard")
  const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({
    "resource-alpha": true,
  })
  const [labels, setLabels] = createSignal<MetadataLabel[]>([
    { key: "env", value: "production" },
    { key: "owner", value: "platform" },
  ])
  const selectedResources = createMemo(() =>
    rows
      .filter((row) => rowSelection()[row.id])
      .map((row) => ({ name: row.name })),
  )

  function addLabel() {
    setLabels((current) => [...current, { key: "", value: "" }])
  }

  function updateLabel(index: number, key: keyof MetadataLabel, value: string) {
    setLabels((current) =>
      current.map((label, labelIndex) =>
        labelIndex === index ? { ...label, [key]: value } : label,
      ),
    )
  }

  function removeLabel(index: number) {
    setLabels((current) => current.filter((_, labelIndex) => labelIndex !== index))
  }

  return (
    <Tabs defaultValue="list" class="min-h-[760px] bg-background">
      <div class="border-b px-5 pt-4">
        <TabsList variant="segmented">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="detail">Detail</TabsTrigger>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="states">States</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="list" class="min-h-[700px] pt-0">
        <ResourceListLayout
          eyebrow="Resources"
          title="Resources"
          description={`${rows.length} resources in the current scope`}
          actions={
            <ResourceListActions
              selectedCount={selectedResources().length}
              onRefresh={() => undefined}
              onEdit={() => undefined}
              onDelete={() => setDeleteOpen(true)}
              createAction={
                <Button type="button" size="sm">
                  <PlusIcon />
                  Create
                </Button>
              }
            />
          }
        >
          <DataTable
            data={rows}
            columns={columns}
            getRowId={(row) => row.id}
            rowSelection={rowSelection()}
            onRowSelectionChange={setRowSelection}
            searchKey="name"
            searchPlaceholder="Filter resources..."
            initialPageSize={10}
            toolbar={() => (
              <span class="inline-flex items-center gap-1.5">
                <RefreshCwIcon class="size-3.5" />
                Live view
              </span>
            )}
          />
        </ResourceListLayout>
      </TabsContent>

      <TabsContent value="detail" class="pt-0">
        <ResourcePageLayout
          eyebrow="Resources"
          title="resource-alpha"
          titleMeta={<StatusBadge status="Ready" />}
          description="Primary managed resource in the production scope."
          actions={
            <>
              <Button type="button" size="sm" variant="outline">
                Edit
              </Button>
              <Button type="button" size="sm" variant="destructive">
                Delete
              </Button>
            </>
          }
        >
          <ResourceDetailLayout>
            <DetailSection title="Summary" meta="Current state">
              <DetailFieldGrid>
                <DetailField label="Name">resource-alpha</DetailField>
                <DetailField label="Status">
                  <StatusBadge status="Ready" />
                </DetailField>
                <DetailField label="Scope">Production</DetailField>
                <DetailField label="Address">10.42.0.18</DetailField>
                <DetailField label="Updated">2 min ago</DetailField>
                <DetailField label="Owner">platform</DetailField>
              </DetailFieldGrid>
            </DetailSection>
            <DetailSection title="Metadata" meta="Labels">
              <DetailFieldGrid>
                <DetailField label="env">production</DetailField>
                <DetailField label="owner">platform</DetailField>
                <DetailField label="policy">standard</DetailField>
              </DetailFieldGrid>
            </DetailSection>
          </ResourceDetailLayout>
        </ResourcePageLayout>
      </TabsContent>

      <TabsContent value="form" class="pt-0">
        <ResourcePageLayout
          eyebrow="Resources"
          title="Create Resource"
          description="Define identity, runtime settings, and metadata."
          actions={<FormStepIndicator current="configure" />}
          actionsClass="sm:pt-[21px]"
        >
          <form class="grid min-w-0 gap-4">
            <ConfigureTabs
              value={configureTab()}
              onValueChange={setConfigureTab}
              manifest={manifestValue()}
              onManifestChange={setManifestValue}
              manifestTitle="Manifest"
              manifestMeta="Editable YAML"
            >
              <FormSection title="Identity" meta="Required" columns={2}>
                <FormField label="Name" htmlFor="resource-name" required>
                  <Input id="resource-name" value="resource-alpha" />
                </FormField>
                <FormField label="Display Name" htmlFor="resource-display-name">
                  <Input id="resource-display-name" value="Resource Alpha" />
                </FormField>
              </FormSection>
              <FormSection title="Runtime" meta="Configuration" columns={3}>
                <FormField label="Plan" htmlFor="resource-plan" required>
                  <FormSelect
                    id="resource-plan"
                    value={plan()}
                    placeholder="Select plan"
                    options={[
                      { value: "standard", label: "Standard" },
                      { value: "performance", label: "Performance" },
                      {
                        value: "legacy",
                        label: "Legacy",
                        disabled: true,
                        disabledReason: "Unavailable",
                      },
                    ]}
                    onChange={setPlan}
                  />
                </FormField>
                <FormField label="Replicas" htmlFor="resource-replicas">
                  <Input id="resource-replicas" value="3" />
                </FormField>
                <FormField label="Scope" htmlFor="resource-scope">
                  <Input id="resource-scope" value="production" />
                </FormField>
              </FormSection>
              <MetadataLabelFields
                labels={labels()}
                onAdd={addLabel}
                onUpdate={updateLabel}
                onRemove={removeLabel}
              />
            </ConfigureTabs>
            <div class="flex min-h-13 min-w-0 items-center justify-end gap-2 border-t pt-4">
              <Button type="button" variant="outline" size="sm">
                Cancel
              </Button>
              <Button type="button" size="sm">
                Continue to review
              </Button>
            </div>
          </form>
        </ResourcePageLayout>
      </TabsContent>

      <TabsContent value="review" class="pt-0">
        <ResourcePageLayout
          eyebrow="Resources"
          title="Review Resource"
          actions={<FormStepIndicator current="review" />}
          actionsClass="sm:pt-[21px]"
        >
          <div class="grid gap-4">
            <ReviewSummary
              title="Review Resource"
              items={reviewItems}
              manifest={manifestValue()}
            />
            <div class="flex min-h-13 min-w-0 items-center justify-end gap-2 border-t pt-4">
              <Button type="button" variant="outline" size="sm">
                Back
              </Button>
              <Button type="button" size="sm">
                Create Resource
              </Button>
            </div>
          </div>
        </ResourcePageLayout>
      </TabsContent>

      <TabsContent value="states" class="pt-0">
        <ResourcePageLayout
          eyebrow="Resources"
          title="Resource States"
          description="Loading, empty, and destructive confirmation states."
        >
          <div class="grid gap-4 lg:grid-cols-2">
            <DetailSection title="Loading">
              <div class="border-t p-4">
                <ListSkeleton rows={4} />
              </div>
            </DetailSection>
            <DetailSection title="Empty">
              <div class="border-t p-4">
                <EmptyState
                  title="No resources found"
                  description="Create a resource to populate this view."
                  action={{
                    label: "Create resource",
                    onClick: () => undefined,
                  }}
                />
              </div>
            </DetailSection>
            <DetailSection title="Delete Dialog" class="lg:col-span-2">
              <div class="flex min-h-24 items-center justify-center border-t p-4">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setStateDeleteOpen(true)}
                >
                  Open confirmation
                </Button>
                <DeleteResourceDialog
                  open={stateDeleteOpen()}
                  resourceLabel="Resource"
                  resources={[
                    { name: "resource-alpha", displayName: "Resource Alpha" },
                    { name: "worker-pool", displayName: "Worker Pool" },
                  ]}
                  onOpenChange={setStateDeleteOpen}
                  onDelete={() => Promise.resolve()}
                  onDeleted={() => undefined}
                />
              </div>
            </DetailSection>
          </div>
        </ResourcePageLayout>
      </TabsContent>

      <DeleteResourceDialog
        open={deleteOpen()}
        resourceLabel="Resource"
        resources={selectedResources()}
        onOpenChange={setDeleteOpen}
        onDelete={() => Promise.resolve()}
        onDeleted={() => undefined}
      />
    </Tabs>
  )
}
