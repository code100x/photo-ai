"use client"

import { useState, useEffect } from "react"
import type { Pack } from "@/types"
import axios from "axios"


export function usePacks() {
  const [packs, setPacks] = useState<Pack[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchPacks = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await axios.get("/pack/bulk")
      setPacks(response.data.packs)
    } catch (error) {
      setIsError(true)
      console.error("Failed to fetch packs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPacks()
  }, [])

  return {
    packs,
    isLoading,
    isError,
    refetch: fetchPacks,
    setPacks,
  }
}

