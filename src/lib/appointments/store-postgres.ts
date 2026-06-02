import type {
  Appointment,
  AvailabilityConfig,
  CreateAppointmentInput,
  UpdateAppointmentPatch,
} from "@/lib/appointments/types";
import { getAppointmentDurationMinutes } from "@/lib/appointments/duration";
import { nextBookingReference } from "@/lib/appointments/reference";
import { getSql } from "@/lib/db/client";

const AVAILABILITY_ID = "default";

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

type AppointmentRow = {
  data: Appointment;
};

function rowToAppointment(row: AppointmentRow): Appointment {
  return row.data;
}

function indexFields(appointment: Appointment) {
  return {
    reference: appointment.reference ?? null,
    email: appointment.email.trim().toLowerCase(),
    scheduledAt: appointment.scheduledAt ?? null,
    status: appointment.status,
  };
}

export async function getAvailability(): Promise<AvailabilityConfig> {
  const sql = getSql();
  const rows = await sql`
    SELECT config FROM availability_config WHERE id = ${AVAILABILITY_ID} LIMIT 1
  `;
  const row = rows[0] as { config: AvailabilityConfig } | undefined;
  return row?.config ?? defaultAvailability;
}

export async function saveAvailability(
  config: AvailabilityConfig,
): Promise<AvailabilityConfig> {
  const sql = getSql();
  await sql`
    INSERT INTO availability_config (id, config)
    VALUES (${AVAILABILITY_ID}, ${config})
    ON CONFLICT (id) DO UPDATE SET config = EXCLUDED.config
  `;
  return config;
}

export async function getAppointments(): Promise<Appointment[]> {
  const sql = getSql();
  const rows = await sql`SELECT data FROM appointments`;
  return (rows as AppointmentRow[]).map(rowToAppointment);
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const sql = getSql();
  const rows = await sql`SELECT data FROM appointments WHERE id = ${id} LIMIT 1`;
  const row = rows[0] as AppointmentRow | undefined;
  return row ? rowToAppointment(row) : null;
}

export async function findAppointmentByReferenceAndEmail(
  reference: string,
  email: string,
): Promise<Appointment | null> {
  const sql = getSql();
  const normalizedRef = reference.trim().toUpperCase();
  const normalizedEmail = email.trim().toLowerCase();
  const rows = await sql`
    SELECT data FROM appointments
    WHERE upper(reference) = ${normalizedRef}
      AND lower(email) = ${normalizedEmail}
    LIMIT 1
  `;
  const row = rows[0] as AppointmentRow | undefined;
  return row ? rowToAppointment(row) : null;
}

export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  const existing = await getAppointments();
  const appointment: Appointment = {
    id: crypto.randomUUID(),
    reference:
      input.reference ??
      (input.source === "online" ? nextBookingReference(existing) : undefined),
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

  const idx = indexFields(appointment);
  const sql = getSql();
  await sql`
    INSERT INTO appointments (id, reference, email, scheduled_at, status, data)
    VALUES (
      ${appointment.id},
      ${idx.reference},
      ${idx.email},
      ${idx.scheduledAt},
      ${idx.status},
      ${appointment}
    )
  `;
  return appointment;
}

export async function updateAppointment(
  id: string,
  patch: UpdateAppointmentPatch,
): Promise<Appointment | null> {
  const existing = await getAppointmentById(id);
  if (!existing) return null;

  const cleanPatch = Object.fromEntries(
    Object.entries(patch).filter(([, value]) => value !== undefined),
  ) as UpdateAppointmentPatch;

  const updated: Appointment = { ...existing, ...cleanPatch };
  const idx = indexFields(updated);
  const sql = getSql();

  await sql`
    UPDATE appointments
    SET
      reference = ${idx.reference},
      email = ${idx.email},
      scheduled_at = ${idx.scheduledAt},
      status = ${idx.status},
      data = ${updated}
    WHERE id = ${id}
  `;

  return updated;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    DELETE FROM appointments WHERE id = ${id} RETURNING id
  `;
  return rows.length > 0;
}

export function sortAppointmentsByDate(appointments: Appointment[]): Appointment[] {
  return [...appointments].sort((a, b) => {
    const aKey = a.scheduledAt ?? a.createdAt;
    const bKey = b.scheduledAt ?? b.createdAt;
    return bKey.localeCompare(aKey);
  });
}
