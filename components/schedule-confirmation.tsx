"use client"

import type { Candidate, Engineer, TimeSlot } from "@/lib/types"
import { formatTimeSlot } from "@/lib/date-utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface ScheduleConfirmationProps {
  candidate: Candidate
  engineer: Engineer
  timeSlot: TimeSlot
  onConfirm: () => void
  onCancel: () => void
}

export default function ScheduleConfirmation({
  candidate,
  engineer,
  timeSlot,
  onConfirm,
  onCancel,
}: ScheduleConfirmationProps) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Interview</DialogTitle>
          <DialogDescription>Please review the interview details before confirming.</DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Candidate</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{candidate.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Engineer</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{engineer.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{formatTimeSlot(timeSlot)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Interview</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
