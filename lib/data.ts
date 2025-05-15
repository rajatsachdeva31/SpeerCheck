import type { Candidate, Engineer } from "./types"

export const engineers: Engineer[] = [
  {
    id: "eng1",
    name: "Alex Johnson",
    availability: [
      { day: "monday", startTime: "9:00", endTime: "12:00" },
      { day: "monday", startTime: "14:00", endTime: "17:00" },
      { day: "tuesday", startTime: "9:00", endTime: "15:00" },
      { day: "wednesday", startTime: "13:00", endTime: "18:00" },
      { day: "thursday", startTime: "9:00", endTime: "12:00" },
      { day: "friday", startTime: "9:00", endTime: "18:00" },
    ],
  },
  {
    id: "eng2",
    name: "Sarah Chen",
    availability: [
      { day: "monday", startTime: "11:00", endTime: "18:00" },
      { day: "tuesday", startTime: "14:00", endTime: "18:00" },
      { day: "wednesday", startTime: "9:00", endTime: "12:00" },
      { day: "thursday", startTime: "13:00", endTime: "18:00" },
      { day: "friday", startTime: "9:00", endTime: "15:00" },
    ],
  },
  {
    id: "eng3",
    name: "Michael Rodriguez",
    availability: [
      { day: "monday", startTime: "9:00", endTime: "15:00" },
      { day: "tuesday", startTime: "9:00", endTime: "12:00" },
      { day: "tuesday", startTime: "14:00", endTime: "18:00" },
      { day: "wednesday", startTime: "9:00", endTime: "18:00" },
      { day: "thursday", startTime: "9:00", endTime: "15:00" },
      { day: "friday", startTime: "13:00", endTime: "18:00" },
    ],
  },
]

export const candidates: Candidate[] = [
  {
    id: "cand1",
    name: "Emma Wilson",
    preferredTimeDescription: "Tuesday 2-5 PM",
    availability: [{ day: "tuesday", startTime: "14:00", endTime: "17:00" }],
  },
  {
    id: "cand2",
    name: "David Kim",
    preferredTimeDescription: "Monday & Wednesday afternoons",
    availability: [
      { day: "monday", startTime: "13:00", endTime: "18:00" },
      { day: "wednesday", startTime: "13:00", endTime: "18:00" },
    ],
  },
  {
    id: "cand3",
    name: "Priya Patel",
    preferredTimeDescription: "Thursday & Friday mornings",
    availability: [
      { day: "thursday", startTime: "9:00", endTime: "12:00" },
      { day: "friday", startTime: "9:00", endTime: "12:00" },
    ],
  },
  {
    id: "cand4",
    name: "James Thompson",
    preferredTimeDescription: "Any day between 10 AM - 2 PM",
    availability: [
      { day: "monday", startTime: "10:00", endTime: "14:00" },
      { day: "tuesday", startTime: "10:00", endTime: "14:00" },
      { day: "wednesday", startTime: "10:00", endTime: "14:00" },
      { day: "thursday", startTime: "10:00", endTime: "14:00" },
      { day: "friday", startTime: "10:00", endTime: "14:00" },
    ],
  },
]
