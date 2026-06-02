import {
  addDays,
  addMinutes,
  format,
  isBefore,
  parse,
  startOfDay,
} from "date-fns";
import type { ServiceMethodId } from "@/lib/booking";
import {
  getAppointmentDuration,
  getAppointmentDurationMinutes,
} from "@/lib/appointments/duration";
import type { Appointment, AvailabilityConfig, DayHours } from "@/lib/appointments/types";

const DATE_KEY = "yyyy-MM-dd";
const TIME_KEY = "HH:mm";
const SLOT_KEY = "yyyy-MM-dd'T'HH:mm:ss";

export type SlotQueryOptions = {
  serviceId?: ServiceMethodId;
  oneWayKm?: number | null;
  now?: Date;
};

function parseTimeOnDate(dateKey: string, time: string): Date {
  return parse(`${dateKey} ${time}`, "yyyy-MM-dd HH:mm", new Date());
}

function getDayHours(
  config: AvailabilityConfig,
  dateKey: string,
): DayHours | { closed: true } | null {
  if (config.blockedDates.includes(dateKey)) {
    return { closed: true };
  }

  const override = config.dateOverrides[dateKey];
  if (override) {
    return override;
  }

  const dayIndex = parse(dateKey, DATE_KEY, new Date()).getDay();
  return config.weeklyHours[String(dayIndex)] ?? null;
}

function generateDaySlots(
  config: AvailabilityConfig,
  dateKey: string,
): string[] {
  const hours = getDayHours(config, dateKey);
  if (!hours || "closed" in hours) return [];

  const slots: string[] = [];
  let cursor = parseTimeOnDate(dateKey, hours.start);
  const end = parseTimeOnDate(dateKey, hours.end);

  while (isBefore(cursor, end)) {
    slots.push(format(cursor, SLOT_KEY));
    cursor = addMinutes(cursor, config.slotDurationMinutes);
  }

  return slots;
}

function getAppointmentBlock(entry: Appointment): { start: Date; end: Date } | null {
  if (!entry.scheduledAt) return null;
  const start = parse(entry.scheduledAt.slice(0, 19), SLOT_KEY, new Date());
  const duration = getAppointmentDuration(entry);
  return { start, end: addMinutes(start, duration) };
}

function blocksOverlap(
  blockStart: Date,
  blockEnd: Date,
  appointments: Appointment[],
): boolean {
  return appointments.some((entry) => {
    if (entry.status === "cancelled") return false;
    const block = getAppointmentBlock(entry);
    if (!block) return false;
    const { start, end } = block;
    return blockStart < end && blockEnd > start;
  });
}

export function getOpenSlotsForDate(
  config: AvailabilityConfig,
  appointments: Appointment[],
  dateKey: string,
  options: SlotQueryOptions = {},
): string[] {
  const { serviceId = "visit", oneWayKm, now = new Date() } = options;
  const hours = getDayHours(config, dateKey);
  if (!hours || "closed" in hours) return [];

  const dayEnd = parseTimeOnDate(dateKey, hours.end);
  const duration = getAppointmentDurationMinutes(serviceId, oneWayKm);
  const today = format(now, DATE_KEY);

  return generateDaySlots(config, dateKey).filter((slot) => {
    const start = parse(slot, SLOT_KEY, new Date());
    const end = addMinutes(start, duration);

    if (!isBefore(start, dayEnd)) return false;
    if (isBefore(dayEnd, end)) return false;
    if (blocksOverlap(start, end, appointments)) return false;
    if (dateKey === today && isBefore(start, now)) return false;

    return true;
  });
}

export function getDatesWithAvailability(
  config: AvailabilityConfig,
  appointments: Appointment[],
  from: Date,
  to: Date,
  options: SlotQueryOptions = {},
): string[] {
  const dates: string[] = [];
  let cursor = startOfDay(from);
  const end = startOfDay(to);

  while (!isBefore(end, cursor)) {
    const dateKey = format(cursor, DATE_KEY);
    if (getOpenSlotsForDate(config, appointments, dateKey, options).length > 0) {
      dates.push(dateKey);
    }
    cursor = addDays(cursor, 1);
  }

  return dates;
}

export function formatSlotLabel(slot: string | undefined): string {
  if (!slot) return "-";
  const date = parse(slot, SLOT_KEY, new Date());
  return `${format(date, "EEE d MMM yyyy")} · ${format(date, TIME_KEY)}`;
}

export function formatSlotTime(slot: string): string {
  return format(parse(slot, SLOT_KEY, new Date()), TIME_KEY);
}

export function isSlotAvailable(
  config: AvailabilityConfig,
  appointments: Appointment[],
  slot: string,
  options: SlotQueryOptions = {},
): boolean {
  const dateKey = slot.slice(0, 10);
  return getOpenSlotsForDate(config, appointments, dateKey, options).includes(
    slot.slice(0, 19),
  );
}
