"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpDown, Box, Home, MapPin, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceMethodId } from "@/lib/booking";
import { serviceMethods } from "@/lib/booking";
import type { Appointment, AvailabilityConfig, DayHours } from "@/lib/appointments/types";
import {
  appointmentAddressHeading,
  formatCustomerAddressLines,
} from "@/lib/appointments/address";
import { formatAppointmentBookingLines } from "@/lib/appointments/booking-details";
import { formatAppointmentCustomerFields } from "@/lib/appointments/customer-details";
import {
  formatAppointmentRange,
  getMobileDurationMinutes,
} from "@/lib/appointments/duration";
import { mailInStatusLabel } from "@/lib/mail-in-status";
import { MailInAdminDialog } from "@/components/admin/MailInAdminDialog";
import { estimateMobileHourlyRate } from "@/lib/mobile-pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type SortField = "scheduledAt" | "customerName" | "serviceId" | "status" | "email";
type SortDirection = "asc" | "desc";

const sortFieldLabels: Record<SortField, string> = {
  scheduledAt: "Date & time",
  customerName: "Customer name",
  serviceId: "Service",
  status: "Status",
  email: "Email",
};

function serviceLabel(id: ServiceMethodId) {
  return serviceMethods.find((method) => method.id === id)?.label ?? id;
}

function ServiceTypeCell({ serviceId }: { serviceId: ServiceMethodId }) {
  const label = serviceLabel(serviceId);
  const Icon =
    serviceId === "mobile" ? MapPin : serviceId === "visit" ? Home : Box;

  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function AddressCell({ appointment }: { appointment: Appointment }) {
  const heading = appointmentAddressHeading(appointment.serviceId);
  const lines = formatCustomerAddressLines(appointment);

  if (!heading || lines.length === 0) {
    return <span className="text-xs text-text-body">—</span>;
  }

  return (
    <div className="max-w-[220px] space-y-0.5 text-xs">
      <div className="font-medium text-text-primary">{heading}</div>
      {lines.map((line) => (
        <div key={line} className="break-words text-text-body">
          {line}
        </div>
      ))}
    </div>
  );
}

function CustomerDetailsCell({ appointment }: { appointment: Appointment }) {
  const fields = formatAppointmentCustomerFields(appointment);
  return (
    <div className="max-w-xs space-y-1 text-xs">
      {fields.map((field) => (
        <div key={field.label} className="text-text-body">
          <span className="font-medium text-text-primary">{field.label}:</span>{" "}
          <span className="break-words">{field.value}</span>
        </div>
      ))}
    </div>
  );
}

function BookingDetailsCell({ appointment }: { appointment: Appointment }) {
  const lines = formatAppointmentBookingLines(appointment);
  if (lines.length === 0) {
    return <span className="text-xs text-text-body">—</span>;
  }
  return (
    <div className="space-y-0.5 text-xs text-text-body">
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}

function statusBadgeClass(status: Appointment["status"]) {
  switch (status) {
    case "confirmed":
      return "border-transparent bg-emerald-100 text-emerald-800";
    case "cancelled":
      return "border-transparent bg-red-100 text-red-700";
    default:
      return "border-transparent bg-amber-100 text-amber-800";
  }
}

function statusLabel(status: Appointment["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function AppointmentsAdmin() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availability, setAvailability] = useState<AvailabilityConfig | null>(null);
  const [blockedDatesText, setBlockedDatesText] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("scheduledAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filteredAppointments = useMemo(() => {
    let list = [...appointments];
    const query = search.trim().toLowerCase();

    if (query) {
      list = list.filter(
        (appointment) =>
          appointment.customerName.toLowerCase().includes(query) ||
          appointment.email.toLowerCase().includes(query) ||
          appointment.phone.toLowerCase().includes(query) ||
          appointment.vehicle.toLowerCase().includes(query) ||
          (appointment.reference?.toLowerCase().includes(query) ?? false) ||
          (appointment.inboundTracking?.toLowerCase().includes(query) ?? false) ||
          (appointment.street?.toLowerCase().includes(query) ?? false) ||
          (appointment.city?.toLowerCase().includes(query) ?? false) ||
          (appointment.postalCode?.toLowerCase().includes(query) ?? false),
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((appointment) => appointment.status === statusFilter);
    }

    if (serviceFilter !== "all") {
      list = list.filter((appointment) => appointment.serviceId === serviceFilter);
    }

    list.sort((a, b) => {
      let compare = 0;
      switch (sortField) {
        case "scheduledAt":
          compare = (a.scheduledAt ?? a.createdAt).localeCompare(
            b.scheduledAt ?? b.createdAt,
          );
          break;
        case "customerName":
          compare = a.customerName.localeCompare(b.customerName);
          break;
        case "serviceId":
          compare = a.serviceId.localeCompare(b.serviceId);
          break;
        case "status":
          compare = a.status.localeCompare(b.status);
          break;
        case "email":
          compare = a.email.localeCompare(b.email);
          break;
      }
      return sortDirection === "asc" ? compare : -compare;
    });

    return list;
  }, [appointments, search, statusFilter, serviceFilter, sortField, sortDirection]);

  const loadAdminData = useCallback(async () => {
    try {
      const [appointmentsRes, availabilityRes] = await Promise.all([
        fetch("/api/admin/appointments"),
        fetch("/api/admin/availability"),
      ]);

      if (appointmentsRes.status === 401 || availabilityRes.status === 401) {
        setAuthenticated(false);
        return;
      }

      if (!appointmentsRes.ok || !availabilityRes.ok) {
        setAuthenticated(false);
        setMessage(
          "Could not load admin data. Refresh the page or restart the dev server.",
        );
        return;
      }

      const appointmentsData = (await appointmentsRes.json()) as {
        appointments: Appointment[];
      };
      const availabilityData = (await availabilityRes.json()) as {
        availability: AvailabilityConfig;
      };

      setAuthenticated(true);
      setMessage("");
      setAppointments(appointmentsData.appointments);
      setAvailability(availabilityData.availability);
      setBlockedDatesText(availabilityData.availability.blockedDates.join("\n"));
    } catch {
      setAuthenticated(false);
      setMessage("Could not reach the server. Check that the dev server is running.");
    }
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setLoginError("Invalid password.");
      return;
    }
    await loadAdminData();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }

  async function updateStatus(id: string, status: Appointment["status"]) {
    setMessage("");
    const response = await fetch("/api/admin/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setMessage(data?.error ?? "Could not update appointment. Try refreshing the page.");
      return;
    }
    setMessage(`Appointment ${status}.`);
    await loadAdminData();
  }

  async function removeAppointment(id: string) {
    if (!window.confirm("Delete this appointment permanently?")) return;

    setMessage("");
    const response = await fetch(`/api/admin/appointments?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setMessage(data?.error ?? "Could not delete appointment. Try refreshing the page.");
      return;
    }
    setMessage("Appointment deleted.");
    await loadAdminData();
  }

  async function saveAvailabilityConfig() {
    if (!availability) return;
    const next = {
      ...availability,
      blockedDates: blockedDatesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };
    const response = await fetch("/api/admin/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availability: next }),
    });
    if (response.ok) {
      setMessage("Schedule saved.");
      await loadAdminData();
    }
  }

  function updateDayHours(dayIndex: number, hours: DayHours) {
    if (!availability) return;
    setAvailability({
      ...availability,
      weeklyHours: {
        ...availability.weeklyHours,
        [String(dayIndex)]: hours,
      },
    });
  }

  if (authenticated === null) {
    return <p className="p-8 text-sm text-text-body">Loading admin…</p>;
  }

  if (!authenticated) {
    return (
      <Card className="mx-auto mt-16 max-w-md">
        <CardHeader>
          <CardTitle>Appointments admin</CardTitle>
          <CardDescription>
            Sign in to manage bookings, availability, and blocked dates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && <p className="mb-4 text-sm text-action-danger">{message}</p>}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {loginError && <p className="text-sm text-action-danger">{loginError}</p>}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <p className="text-xs text-text-body">
              Set <code className="text-text-primary">ADMIN_PASSWORD</code> in your
              environment file.
            </p>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[90rem] space-y-4 px-3 py-5 sm:px-4 md:py-6 lg:px-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Appointments</h1>
          <p className="mt-1 text-sm text-text-body">
            All bookings in one place — visit, ship, and mobile.
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Sign out
        </Button>
      </div>

      {message && <p className="text-sm text-action-primary">{message}</p>}

      <Tabs defaultValue="appointments">
        <TabsList>
          <TabsTrigger value="appointments">Bookings</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <ManualAppointmentForm onCreated={loadAdminData} />

          <Card>
            <CardHeader>
              <CardTitle>All appointments</CardTitle>
              <CardDescription>
                {filteredAppointments.length} shown · {appointments.length} total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Search name, email, reference, address…"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="w-[170px]">
                      <SelectValue placeholder="Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All services</SelectItem>
                      {serviceMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        Sort
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[320px] p-3">
                      <div className="flex items-center gap-2">
                        <Select
                          value={sortField}
                          onValueChange={(value) => setSortField(value as SortField)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(Object.keys(sortFieldLabels) as SortField[]).map((field) => (
                              <SelectItem key={field} value={field}>
                                {sortFieldLabels[field]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={sortDirection}
                          onValueChange={(value) =>
                            setSortDirection(value as SortDirection)
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asc">Ascending</SelectItem>
                            <SelectItem value="desc">Descending</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Reset sort"
                          onClick={() => {
                            setSortField("scheduledAt");
                            setSortDirection("desc");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="mt-2 w-full justify-start"
                        onClick={() => {
                          setSortField("scheduledAt");
                          setSortDirection("desc");
                        }}
                      >
                        Delete sort
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Booking</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-8 text-center text-text-body">
                        No appointments match your search or filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="space-y-0.5">
                          <div>
                            {formatAppointmentRange(
                              appointment.scheduledAt,
                              appointment.serviceId,
                              {
                                oneWayKm: appointment.mobileOneWayKm,
                                durationMinutes: appointment.durationMinutes,
                              },
                            )}
                          </div>
                          {appointment.serviceId === "ship" && (
                            <div className="text-xs text-text-body">
                              {appointment.reference && (
                                <span className="block">{appointment.reference}</span>
                              )}
                              <span className="block">
                                {mailInStatusLabel(
                                  appointment.mailInStatus ?? "awaiting_parcel",
                                )}
                              </span>
                              {appointment.inboundTracking && (
                                <span className="block">
                                  {appointment.inboundCarrier}: {appointment.inboundTracking}
                                </span>
                              )}
                              {appointment.arrivedAt && (
                                <span className="block">
                                  Arrived{" "}
                                  {formatAppointmentRange(
                                    appointment.arrivedAt,
                                    "visit",
                                  )}
                                </span>
                              )}
                              {appointment.returnPaidAt && (
                                <span className="block font-medium text-action-primary">
                                  Return paid
                                </span>
                              )}
                              {appointment.returnTracking && (
                                <span className="block">
                                  Return: {appointment.returnCarrier}{" "}
                                  {appointment.returnTracking}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <ServiceTypeCell serviceId={appointment.serviceId} />
                      </TableCell>
                      <TableCell>
                        <BookingDetailsCell appointment={appointment} />
                      </TableCell>
                      <TableCell>
                        <AddressCell appointment={appointment} />
                      </TableCell>
                      <TableCell>
                        <CustomerDetailsCell appointment={appointment} />
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(statusBadgeClass(appointment.status))}>
                          {statusLabel(appointment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        {appointment.serviceId === "ship" && (
                          <MailInAdminDialog
                            appointment={appointment}
                            onUpdated={loadAdminData}
                          />
                        )}
                        {appointment.status !== "confirmed" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(appointment.id, "confirmed")}
                          >
                            Confirm
                          </Button>
                        )}
                        {appointment.status !== "cancelled" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(appointment.id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => removeAppointment(appointment.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          {availability && (
            <Card>
              <CardHeader>
                <CardTitle>Weekly schedule</CardTitle>
                <CardDescription>
                  Control open days, hours, slot length, and blocked dates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="slot-duration">Slot length (minutes)</Label>
                    <Input
                      id="slot-duration"
                      type="number"
                      min={15}
                      step={15}
                      value={availability.slotDurationMinutes}
                      onChange={(event) =>
                        setAvailability({
                          ...availability,
                          slotDurationMinutes: Number(event.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={availability.timezone}
                      onChange={(event) =>
                        setAvailability({
                          ...availability,
                          timezone: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {dayLabels.map((label, index) => {
                    const hours = availability.weeklyHours[String(index)] ?? null;
                    const closed = !hours;
                    return (
                      <div
                        key={label}
                        className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[80px_100px_1fr_1fr]"
                      >
                        <div className="font-medium">{label}</div>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={!closed}
                            onChange={(event) =>
                              updateDayHours(
                                index,
                                event.target.checked
                                  ? { start: "09:00", end: "18:00" }
                                  : null,
                              )
                            }
                          />
                          Open
                        </label>
                        <Input
                          type="time"
                          disabled={closed}
                          value={hours?.start ?? "09:00"}
                          onChange={(event) =>
                            updateDayHours(index, {
                              start: event.target.value,
                              end: hours?.end ?? "18:00",
                            })
                          }
                        />
                        <Input
                          type="time"
                          disabled={closed}
                          value={hours?.end ?? "18:00"}
                          onChange={(event) =>
                            updateDayHours(index, {
                              start: hours?.start ?? "09:00",
                              end: event.target.value,
                            })
                          }
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blocked-dates">Blocked dates (one yyyy-mm-dd per line)</Label>
                  <Textarea
                    id="blocked-dates"
                    rows={5}
                    value={blockedDatesText}
                    onChange={(event) => setBlockedDatesText(event.target.value)}
                  />
                </div>

                <Button onClick={saveAvailabilityConfig}>Save schedule</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ManualAppointmentForm({ onCreated }: { onCreated: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [serviceId, setServiceId] = useState<ServiceMethodId>("visit");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [notes, setNotes] = useState("");
  const [street, setStreet] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("BE");
  const [mobileOneWayKm, setMobileOneWayKm] = useState("");
  const [bookingTotal, setBookingTotal] = useState("");

  const parsedKm = mobileOneWayKm.trim() ? Number(mobileOneWayKm) : null;
  const parsedTotal = bookingTotal.trim() ? Number(bookingTotal) : null;
  const hourlyPreview =
    serviceId === "mobile" &&
    parsedKm != null &&
    parsedKm > 0 &&
    parsedTotal != null &&
    parsedTotal > 0
      ? estimateMobileHourlyRate(parsedTotal, parsedKm)
      : null;

  const needsAddress = serviceId === "mobile" || serviceId === "ship";

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    await fetch("/api/admin/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId,
        scheduledAt:
          serviceId === "ship" || !date
            ? undefined
            : `${date}T${time}:00`,
        customerName,
        email,
        phone,
        vehicle,
        notes,
        status: "confirmed",
        street: needsAddress ? street : undefined,
        addressLine2: needsAddress && addressLine2.trim() ? addressLine2 : undefined,
        postalCode: needsAddress ? postalCode : undefined,
        city: needsAddress ? city : undefined,
        countryCode: needsAddress ? countryCode : undefined,
        mobileOneWayKm:
          serviceId === "mobile" && parsedKm != null && parsedKm > 0
            ? parsedKm
            : undefined,
        bookingTotal:
          parsedTotal != null && parsedTotal > 0 ? parsedTotal : undefined,
      }),
    });
    setOpen(false);
    await onCreated();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add manual appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add manual appointment</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleCreate}>
          <div className="space-y-2">
            <Label>Service</Label>
            <Select
              value={serviceId}
              onValueChange={(value) => setServiceId(value as ServiceMethodId)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {serviceMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="manual-date">
                {serviceId === "ship" ? "Date (optional)" : "Date"}
              </Label>
              <Input
                id="manual-date"
                type="date"
                required={serviceId !== "ship"}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-time">
                {serviceId === "ship" ? "Time (optional)" : "Time"}
              </Label>
              <Input
                id="manual-time"
                type="time"
                required={serviceId !== "ship"}
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="manual-name">Customer name</Label>
            <Input
              id="manual-name"
              required
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manual-email">Email</Label>
            <Input
              id="manual-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manual-phone">Phone</Label>
            <Input
              id="manual-phone"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manual-vehicle">Vehicle</Label>
            <Input
              id="manual-vehicle"
              required
              value={vehicle}
              onChange={(event) => setVehicle(event.target.value)}
            />
          </div>
          {needsAddress && (
            <>
              <div className="space-y-2">
                <Label htmlFor="manual-street">
                  {serviceId === "mobile" ? "Service address" : "Return address"}
                </Label>
                <Input
                  id="manual-street"
                  value={street}
                  onChange={(event) => setStreet(event.target.value)}
                  placeholder="Street and number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manual-line2">Address line 2 (optional)</Label>
                <Input
                  id="manual-line2"
                  value={addressLine2}
                  onChange={(event) => setAddressLine2(event.target.value)}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="manual-postal">Postal code</Label>
                  <Input
                    id="manual-postal"
                    value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manual-city">City</Label>
                  <Input
                    id="manual-city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="manual-country">Country code</Label>
                <Input
                  id="manual-country"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value.toUpperCase())}
                  placeholder="BE"
                />
              </div>
            </>
          )}
          {serviceId === "mobile" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="manual-km">One-way distance (km)</Label>
                <Input
                  id="manual-km"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="e.g. 40"
                  value={mobileOneWayKm}
                  onChange={(event) => setMobileOneWayKm(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manual-total">Job total € (incl. BTW)</Label>
                <Input
                  id="manual-total"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="e.g. 262"
                  value={bookingTotal}
                  onChange={(event) => setBookingTotal(event.target.value)}
                />
              </div>
              {parsedKm != null && parsedKm > 0 && (
                <p className="text-sm text-text-body">
                  Calendar block: {getMobileDurationMinutes(parsedKm) / 60} hours
                </p>
              )}
              {hourlyPreview != null && (
                <p className="text-sm font-medium text-text-primary">
                  Est. €{hourlyPreview}/h for this job
                </p>
              )}
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="manual-notes">Notes</Label>
            <Textarea
              id="manual-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Save appointment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
