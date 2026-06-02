"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  addMonths,
  endOfMonth,
  format,
  isBefore,
  parse,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { ServiceMethodId } from "@/lib/booking";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formatAppointmentRange,
  mobileBlockHours,
  MOBILE_DEFAULT_ONE_WAY_KM,
} from "@/lib/appointments/duration";
import { formatSlotLabel } from "@/lib/appointments/slots";
import { useI18n } from "@/components/I18nProvider";
import { BookingFieldError } from "@/components/BookingCheckoutFields";
import { cn } from "@/lib/utils";

function kmQuery(oneWayKm: number | null | undefined): string {
  const km = oneWayKm ?? MOBILE_DEFAULT_ONE_WAY_KM;
  return `&oneWayKm=${km}`;
}

export function BookingAppointmentPicker({
  value,
  onChange,
  onBlur,
  serviceId,
  oneWayKm,
  error,
  label,
}: {
  value: string | null;
  onChange: (slot: string | null) => void;
  onBlur?: () => void;
  serviceId: ServiceMethodId;
  oneWayKm?: number | null;
  error?: string;
  label?: string;
}) {
  const { messages } = useI18n();
  const picker = messages.booking.picker;
  const fieldLabel = label ?? messages.booking.fields.preferredSlot;
  const id = useId();
  const errorId = `${id}-error`;
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pendingDate, setPendingDate] = useState<Date | undefined>();
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const selectedDate = useMemo(() => {
    if (value) {
      return parse(value.slice(0, 10), "yyyy-MM-dd", new Date());
    }
    return pendingDate;
  }, [value, pendingDate]);

  const selectedTime = value?.slice(11, 16) ?? null;
  const blockHours =
    serviceId === "mobile" ? mobileBlockHours(oneWayKm) : null;

  const prevServiceId = useRef(serviceId);
  const prevOneWayKm = useRef(oneWayKm);

  useEffect(() => {
    const serviceChanged = prevServiceId.current !== serviceId;
    const kmChanged =
      serviceId === "mobile" &&
      prevOneWayKm.current !== oneWayKm &&
      oneWayKm != null;

    if (serviceChanged || kmChanged) {
      onChange(null);
      setPendingDate(undefined);
    }

    prevServiceId.current = serviceId;
    prevOneWayKm.current = oneWayKm;
  }, [serviceId, oneWayKm, onChange]);

  useEffect(() => {
    const controller = new AbortController();
    const from = format(startOfMonth(month), "yyyy-MM-dd");
    const to = format(endOfMonth(addMonths(month, 1)), "yyyy-MM-dd");
    const km = serviceId === "mobile" ? kmQuery(oneWayKm) : "";

    setLoadingDates(true);
    fetch(
      `/api/appointments/dates?from=${from}&to=${to}&serviceId=${serviceId}${km}`,
      { signal: controller.signal },
    )
      .then((response) => response.json())
      .then((data: { dates?: string[] }) => {
        setAvailableDates(data.dates ?? []);
      })
      .catch(() => {
        if (!controller.signal.aborted) setAvailableDates([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingDates(false);
      });

    return () => controller.abort();
  }, [month, serviceId, oneWayKm]);

  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }

    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const controller = new AbortController();
    const km = serviceId === "mobile" ? kmQuery(oneWayKm) : "";

    setLoadingSlots(true);
    fetch(
      `/api/appointments/slots?date=${dateKey}&serviceId=${serviceId}${km}`,
      { signal: controller.signal },
    )
      .then((response) => response.json())
      .then((data: { slots?: string[] }) => {
        setTimeSlots(data.slots ?? []);
      })
      .catch(() => {
        if (!controller.signal.aborted) setTimeSlots([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingSlots(false);
      });

    return () => controller.abort();
  }, [selectedDate, serviceId, oneWayKm]);

  const disabledDays = (date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    if (isBefore(startOfDay(date), startOfDay(new Date()))) return true;
    return !availableDates.includes(key);
  };

  function selectTime(time: string) {
    if (!selectedDate) return;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    onChange(`${dateKey}T${time}:00`);
    setPendingDate(undefined);
    setOpen(false);
  }

  function displayLabel(): string {
    if (!value) return picker.chooseDate;
    if (serviceId === "mobile") {
      return formatAppointmentRange(value, serviceId, { oneWayKm });
    }
    return formatSlotLabel(value);
  }

  const shellClass = error
    ? "border border-action-danger bg-[#fcf4f5]"
    : focused || open
      ? "border-2 border-action-primary bg-surface"
      : "border-2 border-[#d2d2d7] bg-surface";

  return (
    <div>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) onBlur?.();
        }}
      >
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              if (!open) onBlur?.();
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "relative flex h-[52px] w-full flex-col justify-center gap-1 rounded-xl px-4 text-left transition-colors",
              shellClass,
            )}
          >
            <span
              className={cn(
                "pointer-events-none text-xs leading-none",
                error ? "text-action-danger" : "text-text-body",
              )}
            >
              {fieldLabel}
            </span>
            <span
              className={cn(
                "truncate pr-8 text-base leading-tight",
                value ? "text-text-primary" : "text-[#86868b]",
              )}
            >
              {displayLabel()}
            </span>
            <CalendarIcon className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <div className="p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (!date) return;
                setPendingDate(date);
                onChange(null);
              }}
              disabled={disabledDays}
            />
            {loadingDates && (
              <p className="px-2 pb-2 text-xs text-text-body">Loading dates…</p>
            )}
          </div>
          {selectedDate && (
            <div className="border-t p-3">
              <p className="mb-2 text-sm font-medium text-text-primary">
                {picker.chooseTime}
              </p>
              {loadingSlots ? (
                <p className="text-sm text-text-body">{picker.loading}</p>
              ) : timeSlots.length === 0 ? (
                <p className="text-sm text-text-body">{picker.noSlots}</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      size="sm"
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => selectTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </PopoverContent>
      </Popover>
      {error && <BookingFieldError id={errorId} message={error} />}
    </div>
  );
}
