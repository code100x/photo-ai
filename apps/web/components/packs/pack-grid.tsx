"use client"

import { useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { PackCard } from "@/components/packs/pack-card"
import { DeletePackDialog } from "@/components/packs/delete-pack-dialog"
import { usePacks } from "@/hooks/use-packs"
import type { Pack } from "@/types"


export function PackGrid() {
  const { packs, isLoading, isError, refetch } = usePacks()
  const [packToDelete, setPackToDelete] = useState<Pack | null>(null)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return (
      <Alert  className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <span>Failed to load content packs.</span>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="sm:ml-auto">
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  if(packs.length == 0) {
    return (
      <Alert variant='default' className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Content Packs</AlertTitle>
        <AlertDescription>
          <span>There are no content packs available. Click the button below to create one.</span>
          <Button variant='default' size="sm" className="sm:ml-auto">
            Create Content Pack
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            onDelete={() => setPackToDelete(pack)}
          />
        ))}
      </div>
      {packToDelete && (
        <DeletePackDialog
          pack={packToDelete}
          open={!!packToDelete}
          onOpenChange={(open) => !open && setPackToDelete(null)}
          refetch={refetch}
        />
      )}
    </>
  )
}

