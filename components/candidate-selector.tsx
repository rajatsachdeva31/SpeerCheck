"use client"

import type { Candidate } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface CandidateSelectorProps {
  candidates: Candidate[]
  selectedCandidate: Candidate | null
  onSelectCandidate: (candidate: Candidate | null) => void
  isLoading?: boolean
}

export default function CandidateSelector({
  candidates,
  selectedCandidate,
  onSelectCandidate,
  isLoading = false,
}: CandidateSelectorProps) {
  if (isLoading) {
    return <Skeleton className="h-10 w-full md:w-64" />
  }

  return (
    <div className="w-full md:w-64">
      <Select
        value={selectedCandidate?.id || ""}
        onValueChange={(value) => {
          const candidate = candidates.find((c) => c.id === value) || null
          onSelectCandidate(candidate)
        }}
      >
        <SelectTrigger id="candidate-select" className="w-full">
          <SelectValue placeholder="Select a candidate" />
        </SelectTrigger>
        <SelectContent>
          {candidates.map((candidate) => (
            <SelectItem key={candidate.id} value={candidate.id}>
              {candidate.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
