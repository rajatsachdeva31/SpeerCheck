import { describe, it, expect } from "vitest";
import {
  findOverlappingSlots,
  isSlotInAvailabilityRanges,
  isSlotScheduled,
} from "./../lib/availability-utils";
import type { AvailabilityRange, TimeSlot } from "@/lib/types";

describe("Availability Utilities", () => {
  describe("isSlotInAvailabilityRanges", () => {
    it("should return true when a time slot is within an availability range", () => {
      const slot: TimeSlot = { day: "monday", time: "10:30" };
      const ranges: AvailabilityRange[] = [
        { day: "monday", startTime: "9:00", endTime: "12:00" },
      ];

      expect(isSlotInAvailabilityRanges(slot, ranges)).toBe(true);
    });

    it("should return false when a time slot is outside all availability ranges", () => {
      const slot: TimeSlot = { day: "monday", time: "13:30" };
      const ranges: AvailabilityRange[] = [
        { day: "monday", startTime: "9:00", endTime: "12:00" },
        { day: "tuesday", startTime: "13:00", endTime: "17:00" },
      ];

      expect(isSlotInAvailabilityRanges(slot, ranges)).toBe(false);
    });

    it("should return false when a time slot is on a different day", () => {
      const slot: TimeSlot = { day: "wednesday", time: "10:30" };
      const ranges: AvailabilityRange[] = [
        { day: "monday", startTime: "9:00", endTime: "12:00" },
        { day: "tuesday", startTime: "13:00", endTime: "17:00" },
      ];

      expect(isSlotInAvailabilityRanges(slot, ranges)).toBe(false);
    });
  });

  describe("isSlotScheduled", () => {
    it("should return true when a slot is already scheduled for an engineer", () => {
      const slot: TimeSlot = { day: "monday", time: "10:30" };
      const engineerId = "eng1";
      const scheduledInterviews = [
        {
          candidateId: "cand1",
          engineerId: "eng1",
          timeSlot: { day: "monday" as const, time: "10:30" },
        },
      ];

      expect(isSlotScheduled(slot, engineerId, scheduledInterviews)).toBe(true);
    });

    it("should return false when a slot is not scheduled for an engineer", () => {
      const slot: TimeSlot = { day: "monday", time: "10:30" };
      const engineerId = "eng1";
      const scheduledInterviews = [
        {
          candidateId: "cand1",
          engineerId: "eng2",
          timeSlot: { day: "monday" as const, time: "10:30" },
        },
        {
          candidateId: "cand2",
          engineerId: "eng1",
          timeSlot: { day: "tuesday" as const, time: "10:30" },
        },
      ];

      expect(isSlotScheduled(slot, engineerId, scheduledInterviews)).toBe(
        false
      );
    });
  });

  describe("findOverlappingSlots", () => {
    it("should find slots where candidate and at least one engineer are available", () => {
      const candidateAvailability: AvailabilityRange[] = [
        { day: "monday", startTime: "10:00", endTime: "12:00" },
      ];

      const engineersAvailability: AvailabilityRange[][] = [
        [{ day: "monday", startTime: "9:00", endTime: "11:00" }], // eng1
        [{ day: "monday", startTime: "11:00", endTime: "13:00" }], // eng2
      ];

      const scheduledInterviews: Array<{
        candidateId: string;
        engineerId: string;
        timeSlot: TimeSlot;
      }> = [];

      const result = findOverlappingSlots(
        candidateAvailability,
        engineersAvailability,
        scheduledInterviews
      );

      // We expect 4 overlapping slots:
      // Monday 10:00 (eng1), Monday 10:30 (eng1), Monday 11:00 (eng2), Monday 11:30 (eng2)
      expect(result.length).toBe(4);

      // Check first slot (Monday 10:00)
      expect(result[0].timeSlot.day).toBe("monday");
      expect(result[0].timeSlot.time).toBe("10:00");
      expect(result[0].availableEngineers).toContain("eng1");
      expect(result[0].availableEngineers).not.toContain("eng2");

      // Check third slot (Monday 11:00)
      expect(result[2].timeSlot.day).toBe("monday");
      expect(result[2].timeSlot.time).toBe("11:00");
      expect(result[2].availableEngineers).toContain("eng2");
      expect(result[2].availableEngineers).not.toContain("eng1");
    });

    it("should exclude slots that are already scheduled", () => {
      const candidateAvailability: AvailabilityRange[] = [
        { day: "monday", startTime: "10:00", endTime: "12:00" },
      ];

      const engineersAvailability: AvailabilityRange[][] = [
        [{ day: "monday", startTime: "9:00", endTime: "11:00" }], // eng1
        [{ day: "monday", startTime: "11:00", endTime: "13:00" }], // eng2
      ];

      const scheduledInterviews = [
        {
          candidateId: "cand1",
          engineerId: "eng1",
          timeSlot: { day: "monday" as const, time: "10:00" },
        },
      ];

      const result = findOverlappingSlots(
        candidateAvailability,
        engineersAvailability,
        scheduledInterviews
      );

      // We expect 3 overlapping slots (one is excluded because it's scheduled):
      // Monday 10:30 (eng1), Monday 11:00 (eng2), Monday 11:30 (eng2)
      expect(result.length).toBe(3);

      // The first slot should now be Monday 10:30
      expect(result[0].timeSlot.day).toBe("monday");
      expect(result[0].timeSlot.time).toBe("10:30");
    });
  });
});
