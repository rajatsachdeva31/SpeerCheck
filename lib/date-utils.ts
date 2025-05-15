import type { TimeSlot, DayOfWeek } from "./types"

export function formatTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number)
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`
}

export function formatTimeSlot(timeSlot: TimeSlot): string {
  const day = getDayName(timeSlot.day)
  const time = formatTime(timeSlot.time)
  return `${day}, ${time}`
}

export function getDayName(day: DayOfWeek): string {
  const days: Record<DayOfWeek, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
  }
  return days[day]
}

export function isTimeInRange(time: string, startTime: string, endTime: string): boolean {
  // Convert times to minutes since midnight for easier comparison
  const timeMinutes = convertTimeToMinutes(time)
  const startMinutes = convertTimeToMinutes(startTime)
  const endMinutes = convertTimeToMinutes(endTime)

  return timeMinutes >= startMinutes && timeMinutes < endMinutes
}

export function convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}
