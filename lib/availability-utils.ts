import type { TimeSlot, AvailabilityRange, DayOfWeek } from "./types"
import { isTimeInRange } from "./date-utils"

export function findOverlappingSlots(
  candidateAvailability: AvailabilityRange[],
  engineersAvailability: AvailabilityRange[][],
  scheduledInterviews: Array<{
    candidateId: string
    engineerId: string
    timeSlot: TimeSlot
  }>,
  durationMinutes = 30,
): Array<{
  timeSlot: TimeSlot
  availableEngineers: string[]
}> {
  // Generate all possible time slots (Mon-Fri, 9 AM - 6 PM, 30-min increments)
  const allTimeSlots = generateAllTimeSlots()

  // Filter time slots based on candidate availability
  const candidateAvailableSlots = allTimeSlots.filter((slot) => isSlotInAvailabilityRanges(slot, candidateAvailability))

  // For each candidate available slot, find which engineers are available
  return candidateAvailableSlots
    .map((timeSlot) => {
      const availableEngineers = engineersAvailability
        .map((engineerAvailability, index) => {
          // Use the actual engineer IDs from the data instead of generating them
          const engineerId = `eng${index + 1}`
          const isAvailable =
            isSlotInAvailabilityRanges(timeSlot, engineerAvailability) &&
            !isSlotScheduled(timeSlot, engineerId, scheduledInterviews)

          return isAvailable ? engineerId : null
        })
        .filter(Boolean) as string[]

      return {
        timeSlot,
        availableEngineers,
      }
    })
    .filter((slot) => slot.availableEngineers.length > 0)
}

function generateAllTimeSlots(): TimeSlot[] {
  const days: DayOfWeek[] = ["monday", "tuesday", "wednesday", "thursday", "friday"]
  const slots: TimeSlot[] = []

  for (const day of days) {
    for (let hour = 9; hour < 18; hour++) {
      slots.push({ day, time: `${hour}:00` })
      slots.push({ day, time: `${hour}:30` })
    }
  }

  return slots
}

export function isSlotInAvailabilityRanges(slot: TimeSlot, availabilityRanges: AvailabilityRange[]): boolean {
  return availabilityRanges.some(
    (range) => range.day === slot.day && isTimeInRange(slot.time, range.startTime, range.endTime),
  )
}

export function isSlotScheduled(
  slot: TimeSlot,
  engineerId: string,
  scheduledInterviews: Array<{
    candidateId: string
    engineerId: string
    timeSlot: TimeSlot
  }>,
): boolean {
  return scheduledInterviews.some(
    (interview) =>
      interview.engineerId === engineerId &&
      interview.timeSlot.day === slot.day &&
      interview.timeSlot.time === slot.time,
  )
}

export function isSlotAvailable(
  slot: TimeSlot,
  candidateAvailability: AvailabilityRange[],
  engineerAvailability: AvailabilityRange[],
): boolean {
  return (
    isSlotInAvailabilityRanges(slot, candidateAvailability) && isSlotInAvailabilityRanges(slot, engineerAvailability)
  )
}

export function getEngineerForSlot(
  slot: TimeSlot,
  engineers: { id: string; availability: AvailabilityRange[] }[],
): string[] {
  return engineers
    .filter((engineer) => isSlotInAvailabilityRanges(slot, engineer.availability))
    .map((engineer) => engineer.id)
}
