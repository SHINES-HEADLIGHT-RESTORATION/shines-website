"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCustomerAddressLines } from "@/lib/appointments/address";
import { mailInStatusLabel } from "@/lib/mail-in-status";
import { canRunMailInAction } from "@/lib/mail-in-actions-client";
import { formatReturnShippingLabel } from "@/lib/return-shipping";
import type { Appointment, MailInStatus } from "@/lib/appointments/types";

const mailInStatuses: MailInStatus[] = [
  "awaiting_parcel",
  "in_transit",
  "arrived",
  "in_workshop",
  "ready_to_ship",
  "return_shipped",
  "completed",
];

function saveMessage(data: {
  notified?: "arrived" | "ready_to_return";
  emailWarning?: string;
}): string {
  if (data.emailWarning) {
    return `Saved. Email issue: ${data.emailWarning}`;
  }
  if (data.notified === "arrived") {
    return "Saved. Customer emailed (parcel arrived).";
  }
  if (data.notified === "ready_to_return") {
    return "Saved, customer emailed (ready to return + pay link).";
  }
  return "Saved.";
}

export function MailInAdminDialog({
  appointment,
  onUpdated,
}: {
  appointment: Appointment;
  onUpdated: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [mailInStatus, setMailInStatus] = useState<MailInStatus>(
    appointment.mailInStatus ?? "awaiting_parcel",
  );
  const [arrivedAt, setArrivedAt] = useState(
    appointment.arrivedAt?.slice(0, 10) ?? "",
  );
  const [returnCarrier, setReturnCarrier] = useState(
    appointment.returnCarrier ?? "",
  );
  const [returnTracking, setReturnTracking] = useState(
    appointment.returnTracking ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [shippingReturn, setShippingReturn] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const senderLines = formatCustomerAddressLines(appointment);

  useEffect(() => {
    if (!open) return;
    setMailInStatus(appointment.mailInStatus ?? "awaiting_parcel");
    setArrivedAt(appointment.arrivedAt?.slice(0, 10) ?? "");
    setReturnCarrier(appointment.returnCarrier ?? "");
    setReturnTracking(appointment.returnTracking ?? "");
    setMessage(null);
    setError(null);
  }, [open, appointment]);

  async function patchMailIn(payload: {
    mailInStatus: MailInStatus;
    arrivedAt?: string;
  }) {
    const response = await fetch("/api/admin/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: appointment.id,
        mailInStatus: payload.mailInStatus,
        arrivedAt: payload.arrivedAt,
      }),
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      throw new Error(data.error ?? "Could not save.");
    }

    return (await response.json()) as {
      notified?: "arrived" | "ready_to_return";
      emailWarning?: string;
    };
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const data = await patchMailIn({
        mailInStatus,
        arrivedAt: arrivedAt ? `${arrivedAt}T12:00:00` : undefined,
      });
      setMessage(saveMessage(data));
      setOpen(false);
      await onUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function markArrivedToday() {
    const today = new Date().toISOString().slice(0, 10);
    setArrivedAt(today);
    setMailInStatus("arrived");
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const data = await patchMailIn({
        mailInStatus: "arrived",
        arrivedAt: `${today}T12:00:00`,
      });
      setMessage(saveMessage(data));
      setOpen(false);
      await onUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not mark arrived.");
    } finally {
      setSaving(false);
    }
  }

  async function markReadyToReturn() {
    setMailInStatus("ready_to_ship");
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const data = await patchMailIn({
        mailInStatus: "ready_to_ship",
        arrivedAt: arrivedAt ? `${arrivedAt}T12:00:00` : undefined,
      });
      setMessage(saveMessage(data));
      setOpen(false);
      await onUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not mark ready to return.");
    } finally {
      setSaving(false);
    }
  }

  async function shipReturn() {
    setShippingReturn(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/admin/mail-in/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: appointment.id,
        action: "mark_return_shipped",
        returnCarrier,
        returnTracking,
      }),
    });

    setShippingReturn(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not ship return.");
      return;
    }

    const data = (await response.json()) as { emailWarning?: string };
    setMessage(
      data.emailWarning
        ? `Return shipped. Email issue: ${data.emailWarning}`
        : "Return shipped. Customer emailed with tracking.",
    );
    setOpen(false);
    await onUpdated();
  }

  const busy = saving || shippingReturn;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="outline">
          Mail-in
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Mail-in {appointment.reference ? `· ${appointment.reference}` : ""}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {appointment.returnPaidAt && (
            <p className="text-sm text-text-body">
              <span className="rounded-md bg-action-primary/10 px-2 py-0.5 text-xs font-medium text-action-primary">
                Return paid
              </span>
            </p>
          )}

          {(appointment.inboundCarrier || appointment.inboundTracking) && (
            <p className="text-sm text-text-body">
              <span className="font-medium text-text-primary">Customer tracking:</span>{" "}
              {[appointment.inboundCarrier, appointment.inboundTracking]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}

          <div className="space-y-2">
            <Label>Parcel status</Label>
            <Select
              value={mailInStatus}
              onValueChange={(value) => setMailInStatus(value as MailInStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mailInStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {mailInStatusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-text-body">
              Saving as <strong>Arrived</strong> or <strong>Ready to return</strong>{" "}
              emails the customer automatically.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`arrived-${appointment.id}`}>Arrived date</Label>
            <Input
              id={`arrived-${appointment.id}`}
              type="date"
              value={arrivedAt}
              onChange={(event) => setArrivedAt(event.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleSave} disabled={busy}>
              {saving ? "Saving…" : "Save"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={markArrivedToday}
              disabled={busy}
            >
              Mark arrived today
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={markReadyToReturn}
              disabled={busy}
            >
              Ready to return
            </Button>
          </div>

          {senderLines.length > 0 && (
            <div className="rounded-lg border border-text-primary/10 bg-muted/40 p-3 text-sm">
              <p className="font-medium text-text-primary">Return address</p>
              <p className="mt-1 text-text-body">{appointment.customerName}</p>
              {senderLines.map((line) => (
                <p key={line} className="text-text-body">
                  {line}
                </p>
              ))}
              <p className="mt-2 text-xs text-text-body">
                Return shipping:{" "}
                {formatReturnShippingLabel(appointment.countryCode)}
              </p>
            </div>
          )}

          <div className="space-y-3 border-t border-text-primary/10 pt-4">
            <p className="text-sm font-medium text-text-primary">Ship return</p>
            <div className="space-y-2">
              <Label htmlFor={`return-carrier-${appointment.id}`}>
                Return carrier
              </Label>
              <Input
                id={`return-carrier-${appointment.id}`}
                value={returnCarrier}
                onChange={(event) => setReturnCarrier(event.target.value)}
                placeholder="Bpost, DPD, …"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`return-tracking-${appointment.id}`}>
                Return tracking
              </Label>
              <Input
                id={`return-tracking-${appointment.id}`}
                value={returnTracking}
                onChange={(event) => setReturnTracking(event.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={shipReturn}
              disabled={
                busy ||
                !canRunMailInAction(appointment, "mark_return_shipped") ||
                !returnCarrier.trim() ||
                !returnTracking.trim()
              }
            >
              {shippingReturn ? "Sending…" : "Return shipped + email tracking"}
            </Button>
            {!appointment.returnPaidAt &&
              (appointment.mailInStatus ?? "awaiting_parcel") ===
                "ready_to_ship" && (
                <p className="text-xs text-text-body">
                  Enabled after the customer pays return shipping on their booking
                  page.
                </p>
              )}
          </div>

          {error && <p className="text-sm text-action-danger">{error}</p>}
          {message && <p className="text-sm text-action-primary">{message}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
