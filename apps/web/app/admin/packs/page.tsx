import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { PackGrid } from "@/components/packs/pack-grid";
import { PackGridSkeleton } from "@/components/packs/pack-grid-skeleton";
import { AddPackButton } from "@/components/packs/add-pack-button";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky bg-background top-0 z-10 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Packs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <AddPackButton />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Packs</h1>
      </div>

      <Suspense fallback={<PackGridSkeleton />}>
        <PackGrid />
      </Suspense>
    </div>
  );
}
