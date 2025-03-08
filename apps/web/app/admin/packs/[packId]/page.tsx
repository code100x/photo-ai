"use client";
import { useState, useEffect,use } from "react";
import axios from "axios";

import { PackForm } from "@/components/packs/pack-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Pack } from "@/types";

export default function Page({ params }:{params:{packId:string}}) {
  const { packId } = use(params);
  const [pack, setPack] = useState<Pack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPack = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(`/pack/${packId}`);
        console.log(response.data.pack);
        setPack(response.data.pack);
      } catch (error) {
        console.error("Failed to fetch pack:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPack();
  }, [packId]);

  if (isLoading) {
    return <div>Loading pack...</div>;
  }
  if (isError) {
    return <div>Failed to load the pack. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky bg-background top-0 z-10 py-4">
        <div className="space-y-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/packs">Packs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pack?.name || "Pack"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {pack && <PackForm pack={pack} />}
    </div>
  );
}
