import { usePostgresStore } from "@/lib/db/url";
import * as fileStore from "@/lib/appointments/store-file";
import * as postgresStore from "@/lib/appointments/store-postgres";

function store() {
  return usePostgresStore() ? postgresStore : fileStore;
}

export const getAvailability = () => store().getAvailability();
export const saveAvailability = (config: Parameters<typeof fileStore.saveAvailability>[0]) =>
  store().saveAvailability(config);
export const getAppointments = () => store().getAppointments();
export const getAppointmentById = (id: string) => store().getAppointmentById(id);
export const findAppointmentByReferenceAndEmail = (reference: string, email: string) =>
  store().findAppointmentByReferenceAndEmail(reference, email);
export const createAppointment = (input: Parameters<typeof fileStore.createAppointment>[0]) =>
  store().createAppointment(input);
export const updateAppointment = (
  id: string,
  patch: Parameters<typeof fileStore.updateAppointment>[1],
) => store().updateAppointment(id, patch);
export const deleteAppointment = (id: string) => store().deleteAppointment(id);
export const sortAppointmentsByDate = (
  appointments: Parameters<typeof fileStore.sortAppointmentsByDate>[0],
) => store().sortAppointmentsByDate(appointments);
