"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AddPackDialog } from "@/components/packs/add-pack-dialog"

export function AddPackButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" className="h-9">
        <Plus className="h-4 w-4 mr-2" />
        Add New Pack
      </Button>
      <AddPackDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

