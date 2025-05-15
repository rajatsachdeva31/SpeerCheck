"use client"

import { useMemo } from "react"
import type { Candidate, Engineer, TimeSlot, DayOfWeek } from "@/lib/types"
import { formatTime, getDayName } from "@/lib/date-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WeeklyCalendarProps {
  candidate: Candidate
  engineers: Engineer[]
  availableSlots: Array<{
    timeSlot: TimeSlot
    availableEngineers: string[]
  }>
  scheduledInterviews: Array<{
    candidateId: string
    engineerId: string
    timeSlot: TimeSlot
  }>
  onScheduleInterview: (timeSlot: TimeSlot, engineerId: string) => void
}

export default function WeeklyCalendar({
  candidate,
  engineers,
  availableSlots,
  scheduledInterviews,
  onScheduleInterview,
}: WeeklyCalendarProps) {
  // Generate time slots from 9 AM to 6 PM in 30-minute increments
  const timeSlots = useMemo(() => {
    const slots: string[] = []
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour}:00`)
      slots.push(`${hour}:30`)
    }
    return slots
  }, [])

  // Days of the week (Monday to Friday)
  const days: DayOfWeek[] = ["monday", "tuesday", "wednesday", "thursday", "friday"]

  // Get the current day to highlight it
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase() as DayOfWeek

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Weekly Availability</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white dark:bg-gray-950 z-10 p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200 dark:border-gray-800">
                  Time
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className={`p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 min-w-[140px] ${
                      day === today ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                    }`}
                  >
                    {getDayName(day)}
                    {day === today && (
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                      >
                        Today
                      </Badge>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr
                  key={time}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-900/50 ${
                    timeIndex % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-900/20" : ""
                  }`}
                >
                  <td className="sticky left-0 bg-inherit z-10 p-3 text-sm font-medium text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-800">
                    {formatTime(time)}
                  </td>
                  {days.map((day) => {
                    const timeSlot: TimeSlot = { day, time }
                    const slotInfo = availableSlots.find(
                      (slot) => slot.timeSlot.day === day && slot.timeSlot.time === time,
                    )

                    const isAvailable = !!slotInfo && slotInfo.availableEngineers.length > 0
                    const isScheduled = scheduledInterviews.some(
                      (interview) =>
                        interview.candidateId === candidate.id &&
                        interview.timeSlot.day === day &&
                        interview.timeSlot.time === time,
                    )

                    // Determine which engineers are available for this slot
                    const availableEngineersForSlot = slotInfo?.availableEngineers || []
                    const availableEngineersData = availableEngineersForSlot
                      .map((engId) => engineers.find((e) => e.id === engId))
                      .filter((engineer): engineer is Engineer => engineer !== undefined)

                    return (
                      <td
                        key={`${day}-${time}`}
                        className={`p-3 text-sm border-b border-gray-200 dark:border-gray-800 transition-colors ${
                          day === today ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                        } ${
                          isScheduled
                            ? "bg-green-50 dark:bg-green-900/20"
                            : isAvailable
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : ""
                        }`}
                      >
                        {isScheduled ? (
                          <div className="flex items-center">
                            <Badge className="bg-green-100 hover:bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900/50">
                              Scheduled
                            </Badge>
                          </div>
                        ) : isAvailable ? (
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {availableEngineersData.map((engineer) => (
                                <TooltipProvider key={engineer.id}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        variant="outline"
                                        className="bg-blue-100/50 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 cursor-help"
                                      >
                                        {engineer.name.split(" ")[0]}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{engineer.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => onScheduleInterview(timeSlot, availableEngineersForSlot[0])}
                              className="w-full"
                            >
                              Schedule
                            </Button>
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-600">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">Scheduled</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">Today</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
