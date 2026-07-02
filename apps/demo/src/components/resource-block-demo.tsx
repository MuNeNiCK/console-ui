import type { ColumnDef } from "@tanstack/solid-table"
import PlusIcon from "lucide-solid/icons/plus"
import RefreshCwIcon from "lucide-solid/icons/refresh-cw"

import { Button } from "@/registry/solid/ui/button"
import { DataTable } from "@/registry/solid/blocks/resource/data-table"
import { DetailField, DetailFieldGrid, DetailSection } from "@/registry/solid/blocks/resource/detail-content"
import { ResourceListActions, ResourceListLayout } from "@/registry/solid/blocks/resource/layouts/ResourceListLayout"
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
    id: "api-primary",
    name: "api-primary",
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

export default function ResourceBlockDemo() {
  return (
    <ResourceListLayout
      eyebrow="Resources"
      title="Resources"
      description={`${rows.length} resources in the current scope`}
      actions={
        <ResourceListActions
          selectedCount={0}
          onRefresh={() => undefined}
          createAction={
            <Button type="button" size="sm">
              <PlusIcon />
              Create
            </Button>
          }
        />
      }
    >
      <div class="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden border-y">
        <DataTable
          data={rows}
          columns={columns}
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
        <div class="grid gap-4 border-t bg-card p-4 md:grid-cols-2">
          <DetailSection title="Selected Resource" class="min-[980px]:col-span-1">
            <DetailFieldGrid class="min-[980px]:grid-cols-2">
              <DetailField label="Name">api-primary</DetailField>
              <DetailField label="Status">
                <StatusBadge status="Ready" />
              </DetailField>
              <DetailField label="Scope">Production</DetailField>
              <DetailField label="Address">10.42.0.18</DetailField>
            </DetailFieldGrid>
          </DetailSection>
          <DetailSection title="Metadata" class="min-[980px]:col-span-1">
            <DetailFieldGrid class="min-[980px]:grid-cols-2">
              <DetailField label="Owner">platform</DetailField>
              <DetailField label="Policy">standard</DetailField>
              <DetailField label="Region">primary</DetailField>
              <DetailField label="Updated">2 min ago</DetailField>
            </DetailFieldGrid>
          </DetailSection>
        </div>
      </div>
    </ResourceListLayout>
  )
}
