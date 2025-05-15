"use client"

import { useState, useMemo, useEffect } from "react"
import type { Candidate, Engineer, TimeSlot } from "@/lib/types"
import CandidateSelector from "./candidate-selector"
import WeeklyCalendar from "./weekly-calendar"
import ScheduleConfirmation from "./schedule-confirmation"
import EngineerFilter from "./engineer-filter"
import { findOverlappingSlots } from "@/lib/availability-utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface InterviewSchedulerProps {
  engineers: Engineer[]
  candidates: Candidate[]
}

export default function InterviewScheduler({ engineers, candidates }: InterviewSchedulerProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [selectedEngineerFilter, setSelectedEngineerFilter] = useState<string | null>(null)
  const [schedulingEngineer, setSchedulingEngineer] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [scheduledInterviews, setScheduledInterviews] = useState<
    Array<{
      candidateId: string
      engineerId: string
      timeSlot: TimeSlot
    }>
  >([])
  const [interviewDuration, setInterviewDuration] = useState<15 | 30 | 60>(30)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Filter engineers based on selection
  const filteredEngineers = useMemo(() => {
    if (!selectedEngineerFilter) return engineers
    return engineers.filter((engineer) => engineer.id === selectedEngineerFilter)
  }, [engineers, selectedEngineerFilter])

  // Calculate available slots based on candidate and engineers
  const availableSlots = useMemo(() => {
    if (!selectedCandidate) return []

    return findOverlappingSlots(
      selectedCandidate.availability,
      filteredEngineers.map((eng) => eng.availability),
      scheduledInterviews,
      interviewDuration,
    )
  }, [selectedCandidate, filteredEngineers, scheduledInterviews, interviewDuration])

  const handleScheduleInterview = (timeSlot: TimeSlot, engineerId: string) => {
    if (!selectedCandidate) return

    // Find the engineer to make sure it exists
    const engineer = engineers.find((eng) => eng.id === engineerId)
    if (!engineer) return

    setSelectedTimeSlot(timeSlot)
    setSchedulingEngineer(engineerId)
    setShowConfirmation(true)
  }

  const confirmInterview = () => {
    if (!selectedCandidate || !selectedTimeSlot || !schedulingEngineer) return

    setScheduledInterviews([
      ...scheduledInterviews,
      {
        candidateId: selectedCandidate.id,
        engineerId: schedulingEngineer,
        timeSlot: selectedTimeSlot,
      },
    ])

    setShowConfirmation(false)
  }

  const cancelConfirmation = () => {
    setShowConfirmation(false)
    setSelectedTimeSlot(null)
  }

  const scheduledInterviewsCount = scheduledInterviews.length

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium mb-2">Select Candidate</h2>
                <CandidateSelector
                  candidates={candidates}
                  selectedCandidate={selectedCandidate}
                  onSelectCandidate={setSelectedCandidate}
                  isLoading={isLoading}
                />
              </div>

              {selectedCandidate && (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Preferred: {selectedCandidate.preferredTimeDescription}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <h2 className="text-sm font-medium mb-2">Filter Engineers</h2>
                <EngineerFilter
                  engineers={engineers}
                  selectedEngineer={selectedEngineerFilter}
                  onSelectEngineer={setSelectedEngineerFilter}
                  isLoading={isLoading}
                />
              </div>

              <div>
                <h2 className="text-sm font-medium mb-2">Interview Duration</h2>
                <Tabs
                  defaultValue="30"
                  value={interviewDuration.toString()}
                  onValueChange={(value) => setInterviewDuration(Number(value) as 15 | 30 | 60)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-[200px]">
                    <TabsTrigger value="15">15 min</TabsTrigger>
                    <TabsTrigger value="30">30 min</TabsTrigger>
                    <TabsTrigger value="60">60 min</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          {scheduledInterviewsCount > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled Interviews</h3>
                <Badge variant="secondary">{scheduledInterviewsCount}</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full col-span-5" />
              </div>
              <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full col-span-5" />
              </div>
              <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full col-span-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : selectedCandidate ? (
        <WeeklyCalendar
          candidate={selectedCandidate}
          engineers={filteredEngineers}
          availableSlots={availableSlots}
          scheduledInterviews={scheduledInterviews}
          onScheduleInterview={handleScheduleInterview}
        />
      ) : (
        <Card className="border border-dashed">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-gray-400"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No candidate selected</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Please select a candidate from the dropdown above to view their availability and schedule an interview.
            </p>
          </CardContent>
        </Card>
      )}

      {showConfirmation && selectedCandidate && selectedTimeSlot && schedulingEngineer && (
        <ScheduleConfirmation
          candidate={selectedCandidate}
          engineer={engineers.find((eng) => eng.id === schedulingEngineer)!}
          timeSlot={selectedTimeSlot}
          onConfirm={confirmInterview}
          onCancel={cancelConfirmation}
        />
      )}
    </div>
  )
}
