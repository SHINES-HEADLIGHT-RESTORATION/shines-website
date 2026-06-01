import { promises as fs } from "fs";
import path from "path";
import type {
  Appointment,
  AvailabilityConfig,
  CreateAppointmentInput,
  UpdateAppointmentPatch,
} from "@/lib/appointments/types";
import { getAppointmentDurationMinutes } from "@/lib/appointments/duration";
import { nextBookingReference } from "@/lib/appointments/reference";

const DATA_DIR = path.join(process.cwd(), "data");
const AVAILABILITY_PATH = path.join(DATA_DIR, "availability.json");
const BOOKINGS_PATH = path.join(DATA_DIR, "bookings.json");

const defaultAvailability: AvailabilityConfig = {
  slotDurationMinutes: 60,
  timezone: "Europe/Brussels",
  weeklyHours: {
    "0": null,
    "1": { start: "09:00", end: "18:00" },
    "2": { start: "09:00", end: "18:00" },
    "3": { start: "09:00", end: "18:00" },
    "4": { start: "09:00", end: "18:00" },
    "5": { start: "09:00", end: "18:00" },
    "6": { start: "10:00", end: "14:00" },
  },
  blockedDates: [],
  dateOverrides: {},
};

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, value: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function getAvailability(): Promise<AvailabilityConfig> {
  return readJson(AVAILABILITY_PATH, defaultAvailability);
}

export async function saveAvailability(
  config: AvailabilityConfig,
): Promise<AvailabilityConfig> {
  await writeJson(AVAILABILITY_PATH, config);
  return config;
}

export async function getAppointments(): Promise<Appointment[]> {
  return readJson<Appointment[]>(BOOKINGS_PATH, []);
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const appointments = await getAppointments();
  return appointments.find((entry) => entry.id === id) ?? null;
}

export async function findAppointmentByReferenceAndEmail(
  reference: string,
  email: string,
): Promise<Appointment | null> {
  const normalizedRef = reference.trim().toUpperCase();
  const normalizedEmail = email.trim().toLowerCase();
  const appointments = await getAppointments();
  return (
    appointments.find(
      (entry) =>
        entry.reference?.toUpperCase() === normalizedRef &&
        entry.email.trim().toLowerCase() === normalizedEmail,
    ) ?? null
  );
}

export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  const appointments = await getAppointments();
  const appointment: Appointment = {
    id: crypto.randomUUID(),
    reference:
      input.reference ??
      (input.source === "online" ? nextBookingReference(appointments) : undefined),
    createdAt: new Date().toISOString(),
    status: input.status ?? "pending",
    serviceId: input.serviceId,
    scheduledAt: input.scheduledAt,
    customerName: input.customerName,
    email: input.email,
    phone: input.phone,
    vehicle: input.vehicle,
    notes: input.notes,
    bookingTotal: input.bookingTotal,
    quantity: input.quantity,
    sizeId: input.sizeId,
    severityId: input.severityId,
    durationMinutes: getAppointmentDurationMinutes(
      input.serviceId,
      input.mobileOneWayKm,
    ),
    mobileOneWayKm: input.mobileOneWayKm,
    mailInStatus:
      input.mailInStatus ??
      (input.serviceId === "ship" ? "awaiting_parcel" : undefined),
    street: input.street,
    addressLine2: input.addressLine2,
    postalCode: input.postalCode,
    city: input.city,
    countryCode: input.countryCode,
    companyName: input.companyName,
    vatNumber: input.vatNumber,
    billingAddress: input.billingAddress,
    source: input.source,
  };
  appointments.push(appointment);
  await writeJson(BOOKINGS_PATH, appointments);
  return appointment;
}

export async function updateAppointment(
  id: string,
  patch: UpdateAppointmentPatch,
): Promise<Appointment | null> {
  const appointments = await getAppointments();
  const index = appointments.findIndex((entry) => entry.id === id);
  if (index === -1) return null;

  const cleanPatch = Object.fromEntries(
    Object.entries(patch).filter(([, value]) => value !== undefined),
  ) as UpdateAppointmentPatch;

  appointments[index] = { ...appointments[index], ...cleanPatch };
  await writeJson(BOOKINGS_PATH, appointments);
  return appointments[index];
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const appointments = await getAppointments();
  const next = appointments.filter((entry) => entry.id !== id);
  if (next.length === appointments.length) return false;
  await writeJson(BOOKINGS_PATH, next);
  return true;
}

export function sortAppointmentsByDate(appointments: Appointment[]): Appointment[] {
  return [...appointments].sort((a, b) => {
    const aKey = a.scheduledAt ?? a.createdAt;
    const bKey = b.scheduledAt ?? b.createdAt;
    return bKey.localeCompare(aKey);
  });
}
