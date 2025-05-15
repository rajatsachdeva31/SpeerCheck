"use client"

import type { Engineer } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface EngineerFilterProps {
  engineers: Engineer[]
  selectedEngineer: string | null
  onSelectEngineer: (engineerId: string | null) => void
  isLoading?: boolean
}

export default function EngineerFilter({
  engineers,
  selectedEngineer,
  onSelectEngineer,
  isLoading = false,
}: EngineerFilterProps) {
  if (isLoading) {
    return <Skeleton className="h-10 w-full sm:w-48" />
  }

  return (
    <div className="w-full sm:w-48">
      <Select
        value={selectedEngineer || "all"}
        onValueChange={(value) => {
          onSelectEngineer(value === "all" ? null : value)
        }}
      >
        <SelectTrigger id="engineer-filter" className="w-full">
          <SelectValue placeholder="All Engineers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Engineers</SelectItem>
          {engineers.map((engineer) => (
            <SelectItem key={engineer.id} value={engineer.id}>
              {engineer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
