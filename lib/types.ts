export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday"

export interface TimeSlot {
  day: DayOfWeek
  time: string // Format: "HH:MM" in 24-hour format
}

export interface AvailabilityRange {
  day: DayOfWeek
  startTime: string // Format: "HH:MM" in 24-hour format
  endTime: string // Format: "HH:MM" in 24-hour format
}

export interface Candidate {
  id: string
  name: string
  preferredTimeDescription: string
  availability: AvailabilityRange[]
}

export interface Engineer {
  id: string
  name: string
  availability: AvailabilityRange[]
}
