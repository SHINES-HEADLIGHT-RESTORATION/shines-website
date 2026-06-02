"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  AppleFloatingField,
  AppleFloatingSelect,
  AppleFloatingTextarea,
  BookingCheckbox,
  BookingFieldError,
  BookingFieldStack,
  BookingFormSection,
  BookingNameRow,
  BookingPageTitle,
  BookingPostcodeRow,
} from "@/components/BookingCheckoutFields";
import { BookingAppointmentPicker } from "@/components/BookingAppointmentPicker";
import { MailInBookingConfirmation } from "@/components/MailInBookingConfirmation";
import {
  BookingServiceNotes,
  BookingVisitAddress,
} from "@/components/BookingServiceNotes";
import { SectionHeading, SectionShell } from "@/components/SectionShell";
import { useMobileTravelQuote } from "@/hooks/useMobileTravelQuote";
import { useBookingFieldValidation } from "@/hooks/useBookingFieldValidation";
import {
  calculateBookingBreakdown,
  getConditionSeverity,
  getHeadlightSize,
  getServiceMethod,
  serviceMethodPriceLabel,
  type ConditionSeverityId,
  type HeadlightQuantity,
  type HeadlightSizeId,
  type ServiceMethodId,
} from "@/lib/booking";
import { useI18n } from "@/components/I18nProvider";
import {
  mobileBlockHours,
  MOBILE_DEFAULT_ONE_WAY_KM,
} from "@/lib/appointments/mobile-duration";
import { formatMessage } from "@/lib/i18n/format-message";
import {
  getConditionSeverities,
  getHeadlightQuantities,
  getHeadlightSizes,
  getServiceMethods,
} from "@/lib/i18n/catalog";
import {
  bookingCountries,
  getBookingCountryLabel,
  isMobileServiceCountry,
  mobileServiceAreaLabel,
  type BookingCountryCode,
} from "@/lib/booking-countries";
import { defaultMobileTravelFee } from "@/lib/mobile-pricing";
import { formatPrice, formatPriceModifier, site } from "@/lib/site";

function modifierLabel(modifier: number, includedLabel: string) {
  return modifier > 0 ? formatPriceModifier(modifier) : includedLabel;
}

function SelectCard({
  selected,
  onSelect,
  title,
  description,
  priceLabel,
  popular,
  popularLabel,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
  priceLabel: string;
  popular?: boolean;
  popularLabel: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`relative flex min-h-[165px] w-full flex-col rounded-2xl border p-4 text-left transition-colors ${
        selected
          ? "border-2 border-action-primary bg-surface"
          : "border border-text-primary/10 bg-surface hover:border-text-primary/25"
      }`}
    >
      {popular && (
        <span className="pointer-events-none absolute -top-2.5 left-4 rounded-full bg-action-primary px-2.5 py-0.5 text-[11px] font-semibold text-text-on-dark">
          {popularLabel}
        </span>
      )}
      <span className="block text-base font-semibold text-text-primary">{title}</span>
      <span className="mt-1 block text-sm leading-relaxed text-[#1d1d1f]">
        {description}
      </span>
      <span className="mt-auto block whitespace-pre-line pt-3 text-sm leading-relaxed text-[#1d1d1f]">
        {priceLabel}
      </span>
    </button>
  );
}

export function BookingSection() {
  const { messages } = useI18n();
  const b = messages.booking;
  const headlightQuantities = getHeadlightQuantities(messages);
  const headlightSizes = getHeadlightSizes(messages);
  const conditionSeverities = getConditionSeverities(messages);
  const serviceMethods = getServiceMethods(messages);

  const [quantity, setQuantity] = useState<HeadlightQuantity>("pair");
  const [sizeId, setSizeId] = useState<HeadlightSizeId>("standard");
  const [severityId, setSeverityId] = useState<ConditionSeverityId>("stage-1");
  const [serviceId, setServiceId] = useState<ServiceMethodId>("visit");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [preferredSlot, setPreferredSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [street, setStreet] = useState("");
  const [nameSuffix, setNameSuffix] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState<BookingCountryCode>("BE");
  const [needsVatInvoice, setNeedsVatInvoice] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedMailIn, setConfirmedMailIn] = useState<{
    id: string;
    reference: string;
  } | null>(null);
  const [mobileQuantityAdjusted, setMobileQuantityAdjusted] = useState(false);

  const validationInput = useMemo(
    () => ({
      serviceId,
      quantity,
      firstName,
      lastName,
      street,
      postalCode,
      city,
      needsVatInvoice,
      companyName,
      vatNumber,
      email,
      phone,
      vehicle,
      preferredSlot: preferredSlot ?? "",
    }),
    [
      serviceId,
      quantity,
      firstName,
      lastName,
      street,
      postalCode,
      city,
      needsVatInvoice,
      companyName,
      vatNumber,
      email,
      phone,
      vehicle,
      preferredSlot,
    ],
  );

  const { blur, revalidate, validateAll, showError, showFieldError } =
    useBookingFieldValidation(validationInput);

  const isMobile = serviceId === "mobile";
  const isShip = serviceId === "ship";
  const needsAddress = isMobile || isShip;
  const {
    loading: distanceLoading,
    error: distanceError,
    manualNotice,
    quote: mobileQuote,
    oneWayKm: mobileOneWayKm,
  } = useMobileTravelQuote(isMobile, countryCode, street, postalCode, city);

  const mobileAddressReady =
    street.trim().length >= 3 &&
    postalCode.trim().length >= 4 &&
    city.trim().length >= 2;
  const mobileSlotsReady =
    !isMobile ||
    (isMobileServiceCountry(countryCode) &&
      mobileOneWayKm != null &&
      !distanceLoading);

  const mobileTravelForBreakdown = useMemo(() => {
    if (serviceId !== "mobile" || !isMobileServiceCountry(countryCode)) {
      return null;
    }
    if (manualNotice || distanceError) return null;
    if (mobileQuote) return mobileQuote.travelFee;
    return defaultMobileTravelFee();
  }, [serviceId, countryCode, manualNotice, distanceError, mobileQuote]);

  const breakdown = useMemo(
    () =>
      calculateBookingBreakdown(
        quantity,
        sizeId,
        severityId,
        serviceId,
        mobileTravelForBreakdown,
      ),
    [quantity, sizeId, severityId, serviceId, mobileTravelForBreakdown],
  );

  const selectedSize = getHeadlightSize(sizeId);
  const selectedSeverity = getConditionSeverity(severityId);
  const selectedService = getServiceMethod(serviceId);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const errors = validateAll();

    if (Object.keys(errors).length > 0) {
      return;
    }

    const bookingQuantity =
      serviceId === "mobile" && quantity === "single" ? "pair" : quantity;

    const bookingResponse = await fetch("/api/appointments/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId,
        quantity: bookingQuantity,
        sizeId,
        severityId,
        scheduledAt: isShip ? undefined : preferredSlot,
        mobileOneWayKm: isMobile ? mobileOneWayKm : undefined,
        street: needsAddress ? street : undefined,
        addressLine2: needsAddress && addressLine2.trim() ? addressLine2 : undefined,
        postalCode: needsAddress ? postalCode : undefined,
        city: needsAddress ? city : undefined,
        countryCode: needsAddress ? countryCode : undefined,
        customerName: [firstName, lastName, nameSuffix].filter(Boolean).join(" ").trim(),
        email,
        phone,
        vehicle,
        notes: notes.trim() || undefined,
        companyName: needsVatInvoice ? companyName.trim() || undefined : undefined,
        vatNumber: needsVatInvoice ? vatNumber.trim() || undefined : undefined,
        billingAddress:
          needsVatInvoice && serviceId === "visit"
            ? billingAddress.trim() || undefined
            : undefined,
        bookingTotal: breakdown.total,
      }),
    });

    if (!bookingResponse.ok) {
      const data = (await bookingResponse.json()) as { error?: string };
      const message = data.error ?? b.slotError;
      if (isShip) {
        setSubmitError(message);
      } else {
        showFieldError("preferredSlot", message);
      }
      return;
    }

    const { appointment } = (await bookingResponse.json()) as {
      appointment: { id: string; reference?: string };
    };

    setSubmitted(true);

    if (isShip && appointment.reference) {
      setConfirmedMailIn({
        id: appointment.id,
        reference: appointment.reference,
      });
      return;
    }

    window.location.href = `/booking/${appointment.id}`;
  }

  return (
    <SectionShell evenPadding>
      <SectionHeading>Book your restoration</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        Pick your headlight size, how bad the damage looks, and how you want
        service. Your price updates instantly. All prices incl. BTW unless a
        VAT invoice is requested for your company.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        {confirmedMailIn ? (
          <MailInBookingConfirmation
            reference={confirmedMailIn.reference}
            bookingId={confirmedMailIn.id}
            total={breakdown.total}
          />
        ) : (
        <form className="space-y-10" noValidate onSubmit={handleSubmit}>
          <fieldset className="min-w-0 border-0 p-0">
            <legend className="text-lg font-semibold text-text-primary">
              {b.stepLegends.quantity}
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {headlightQuantities.map((option) => (
                <SelectCard
                  key={option.id}
                  selected={quantity === option.id}
                  onSelect={() => {
                    const nextQuantity = option.id;
                    setQuantity(nextQuantity);
                    setMobileQuantityAdjusted(false);
                    if (nextQuantity === "single" && serviceId === "mobile") {
                      setServiceId("visit");
                      setPreferredSlot(null);
                    }
                  }}
                  title={option.label}
                  description={option.description}
                  priceLabel={formatMessage(b.priceFrom, {
                    price: formatPrice(option.basePrice),
                  })}
                  popular={"popular" in option && option.popular}
                  popularLabel={b.popularLabel}
                />
              ))}
            </div>
            {quantity === "single" && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-body">
                {b.stepLegends.quantitySingleMobile}
              </p>
            )}
          </fieldset>

          <fieldset className="min-w-0 border-0 p-0">
            <legend className="text-lg font-semibold text-text-primary">
              {b.stepLegends.size}
            </legend>
            <p className="mt-2 text-sm text-text-body">{b.stepLegends.sizeHint}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {headlightSizes.map((size) => (
                <SelectCard
                  key={size.id}
                  selected={sizeId === size.id}
                  onSelect={() => setSizeId(size.id)}
                  title={size.label}
                  description={size.description}
                  priceLabel={modifierLabel(size.modifier, messages.common.included)}
                  popularLabel={b.popularLabel}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0 border-0 p-0">
            <legend className="text-lg font-semibold text-text-primary">
              {b.stepLegends.condition}
            </legend>
            <p className="mt-2 text-sm text-text-body">{b.stepLegends.conditionHint}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {conditionSeverities.map((stage) => (
                <SelectCard
                  key={stage.id}
                  selected={severityId === stage.id}
                  onSelect={() => setSeverityId(stage.id)}
                  title={stage.label}
                  description={stage.description}
                  priceLabel={modifierLabel(stage.modifier, messages.common.included)}
                  popularLabel={b.popularLabel}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0 border-0 p-0">
            <legend className="text-lg font-semibold text-text-primary">
              {b.stepLegends.service}
            </legend>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {serviceMethods.map((method) => (
                <SelectCard
                  key={method.id}
                  selected={serviceId === method.id}
                  onSelect={() => {
                    const next = method.id as ServiceMethodId;
                    if (next === "mobile" && quantity === "single") {
                      setQuantity("pair");
                      setMobileQuantityAdjusted(true);
                    } else if (next !== "mobile") {
                      setMobileQuantityAdjusted(false);
                    }
                    if (next === "ship") {
                      setPreferredSlot(null);
                    }
                    setServiceId(next);
                  }}
                  title={method.label}
                  description={method.description}
                  priceLabel={serviceMethodPriceLabel(method.id)}
                  popularLabel={b.popularLabel}
                />
              ))}
            </div>

            <div className="mt-4 max-w-2xl space-y-3">
              {mobileQuantityAdjusted && (
                <BookingFieldError
                  id="mobile-quantity-notice"
                  message="We updated your booking to both headlights. Mobile visits aren't available for one light."
                />
              )}
              {(serviceId === "visit" || serviceId === "ship") && (
                <BookingServiceNotes serviceId={serviceId} />
              )}
              {serviceId === "visit" && (
                <div className="mt-3">
                  <BookingVisitAddress />
                </div>
              )}
            </div>
          </fieldset>

          <fieldset className="min-w-0 max-w-2xl border-0 p-0">
            <legend className="sr-only">{b.steps.details}</legend>

            <BookingPageTitle
              title={
                isMobile
                  ? b.whereTitle.mobile
                  : isShip
                    ? b.whereTitle.ship
                    : b.whereTitle.default
              }
              subtitle={needsAddress ? b.whereSubtitle : undefined}
            />

            <BookingFieldStack>
              <AppleFloatingField
                label={b.fields.firstName}
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  revalidate("firstName", { firstName: event.target.value });
                }}
                onBlur={() => blur("firstName")}
                error={showError("firstName")}
                autoComplete="given-name"
              />

              {needsAddress ? (
                <BookingNameRow>
                  <AppleFloatingField
                    label={b.fields.lastName}
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                      revalidate("lastName", { lastName: event.target.value });
                    }}
                    onBlur={() => blur("lastName")}
                    error={showError("lastName")}
                    autoComplete="family-name"
                  />
                  <AppleFloatingField
                    label={b.fields.suffix}
                    value={nameSuffix}
                    onChange={(event) => setNameSuffix(event.target.value)}
                    optional
                    autoComplete="off"
                  />
                </BookingNameRow>
              ) : (
                <AppleFloatingField
                  label={b.fields.lastName}
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                    revalidate("lastName", { lastName: event.target.value });
                  }}
                  onBlur={() => blur("lastName")}
                  error={showError("lastName")}
                  autoComplete="family-name"
                />
              )}

              {needsAddress && (
                <>
                  <AppleFloatingField
                    label={b.fields.street}
                    value={street}
                    onChange={(event) => {
                      setStreet(event.target.value);
                      revalidate("street", { street: event.target.value });
                    }}
                    onBlur={() => blur("street")}
                    error={showError("street")}
                    autoComplete="street-address"
                  />
                  <AppleFloatingField
                    label={b.fields.apartment}
                    value={addressLine2}
                    onChange={(event) => setAddressLine2(event.target.value)}
                    optional
                    autoComplete="address-line2"
                  />
                  <BookingPostcodeRow>
                    <AppleFloatingField
                      label="Postal code"
                      value={postalCode}
                      onChange={(event) => {
                        setPostalCode(event.target.value);
                        revalidate("postalCode", { postalCode: event.target.value });
                      }}
                      onBlur={() => blur("postalCode")}
                      error={showError("postalCode")}
                      autoComplete="postal-code"
                    />
                    <AppleFloatingField
                      label={b.fields.city}
                      value={city}
                      onChange={(event) => {
                        setCity(event.target.value);
                        revalidate("city", { city: event.target.value });
                      }}
                      onBlur={() => blur("city")}
                      error={showError("city")}
                      autoComplete="address-level2"
                    />
                  </BookingPostcodeRow>
                  <AppleFloatingSelect
                    label={b.fields.country}
                    value={countryCode}
                    onChange={(event) =>
                      setCountryCode(event.target.value as BookingCountryCode)
                    }
                    options={bookingCountries.map((country) => ({
                      value: country.code,
                      label: country.label,
                    }))}
                  />

                  {isShip && (
                    <p className="text-sm leading-relaxed text-text-body">
                      {b.shipAddressNote}
                    </p>
                  )}

                  {isMobile && !isMobileServiceCountry(countryCode) && (
                    <p className="text-sm text-text-body">
                      {formatMessage(b.mobileOutOfAreaNote, {
                        area: mobileServiceAreaLabel(),
                        radius: site.mobileTravel.maxServiceRadiusKm,
                        country: getBookingCountryLabel(countryCode),
                        shipLabel:
                          serviceMethods.find((m) => m.id === "ship")?.label ?? "",
                      })}
                    </p>
                  )}

                  {isMobile && isMobileServiceCountry(countryCode) && distanceLoading && (
                    <p className="text-sm text-text-body">{b.distanceLoading}</p>
                  )}
                  {isMobile && isMobileServiceCountry(countryCode) && distanceError && (
                    <p className="text-sm text-action-danger">{distanceError}</p>
                  )}
                  {isMobile && isMobileServiceCountry(countryCode) && manualNotice && (
                    <p className="text-sm leading-relaxed text-[#1d1d1f]">
                      {manualNotice}
                    </p>
                  )}
                  {isMobile &&
                    isMobileServiceCountry(countryCode) &&
                    mobileQuote &&
                    !distanceLoading && (
                    <>
                      <p className="text-sm leading-relaxed text-[#1d1d1f]">
                        {formatMessage(b.mobileTravelQuote, {
                          km: mobileQuote.oneWayKm,
                          fee: formatPrice(mobileQuote.travelFee),
                          breakdown: mobileQuote.breakdownLabel,
                        })}
                      </p>
                    </>
                  )}
                </>
              )}

              <BookingCheckbox
                checked={needsVatInvoice}
                onChange={setNeedsVatInvoice}
                label={b.fields.businessAddress}
              />

              {needsVatInvoice && (
                <div className="space-y-3">
                  <AppleFloatingField
                    label="Company name"
                    value={companyName}
                    onChange={(event) => {
                      setCompanyName(event.target.value);
                      revalidate("companyName", { companyName: event.target.value });
                    }}
                    onBlur={() => blur("companyName")}
                    error={showError("companyName")}
                  />
                  <AppleFloatingField
                    label={b.fields.vatNumber}
                    value={vatNumber}
                    onChange={(event) => {
                      setVatNumber(event.target.value);
                      revalidate("vatNumber", { vatNumber: event.target.value });
                    }}
                    onBlur={() => blur("vatNumber")}
                    error={showError("vatNumber")}
                  />
                  {serviceId === "visit" && (
                    <AppleFloatingTextarea
                      label={b.fields.billingAddress}
                      value={billingAddress}
                      onChange={(event) => setBillingAddress(event.target.value)}
                      optional
                      rows={2}
                    />
                  )}
                </div>
              )}
            </BookingFieldStack>

            <BookingFormSection
              title="What are your contact details?"
              divider={false}
              aside="We'll send your booking confirmation by email. Your mobile number helps us reach you about your appointment time and travel details."
            >
              <AppleFloatingField
                label="Email address"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  revalidate("email", { email: event.target.value });
                }}
                onBlur={() => blur("email")}
                error={showError("email")}
                autoComplete="email"
              />
              <AppleFloatingField
                label={b.fields.phone}
                type="tel"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  revalidate("phone", { phone: event.target.value });
                }}
                onBlur={() => blur("phone")}
                error={showError("phone")}
                autoComplete="tel"
              />
            </BookingFormSection>

            <BookingFormSection
              title={
                isShip ? b.aboutSection.ship : b.aboutSection.default
              }
              divider={false}
            >
              {isShip && (
                <p className="text-sm leading-relaxed text-text-body">
                  {messages.mailInFlow.shipToNote}
                </p>
              )}
              <AppleFloatingField
                label="Car make & model"
                value={vehicle}
                onChange={(event) => {
                  setVehicle(event.target.value);
                  revalidate("vehicle", { vehicle: event.target.value });
                }}
                onBlur={() => blur("vehicle")}
                error={showError("vehicle")}
              />
              {isMobile && !mobileAddressReady && (
                <p className="text-sm text-text-body">
                  {b.mobileAddressRequired}
                </p>
              )}
              {isMobile && mobileAddressReady && distanceLoading && (
                <p className="text-sm text-text-body">
                  {b.distanceLoadingSlots}
                </p>
              )}
              {serviceId !== "ship" && mobileSlotsReady && (
                <BookingAppointmentPicker
                  value={preferredSlot}
                  onChange={(slot) => {
                    setPreferredSlot(slot);
                    revalidate("preferredSlot", { preferredSlot: slot ?? "" });
                  }}
                  onBlur={() => blur("preferredSlot")}
                  serviceId={serviceId}
                  oneWayKm={isMobile ? mobileOneWayKm : null}
                  error={showError("preferredSlot")}
                />
              )}
              {serviceId === "mobile" && mobileSlotsReady && (
                <p className="text-sm leading-relaxed text-text-body">
                  {formatMessage(messages.appointments.mobileNoticeTemplate, {
                    hours: mobileBlockHours(mobileOneWayKm),
                    km: mobileOneWayKm ?? MOBILE_DEFAULT_ONE_WAY_KM,
                  })}
                </p>
              )}
              <AppleFloatingTextarea
                label={b.fields.notes}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                optional
              />
            </BookingFormSection>

            <button
              type="submit"
              className="mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-action-primary text-base font-medium text-text-on-dark transition-opacity hover:opacity-90"
            >
              {b.confirmBooking}
            </button>

            {submitError && (
              <p className="mt-4 text-sm text-action-danger" role="alert">
                {submitError}
              </p>
            )}

            {submitted && !confirmedMailIn && (
              <p className="mt-4 text-sm text-text-body">
                {b.submitEmailHint}{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-action-primary underline underline-offset-4"
                >
                  {site.email}
                </a>
                .
              </p>
            )}
          </fieldset>
        </form>
        )}

        <aside className="rounded-2xl border border-text-primary/10 bg-surface p-6 lg:sticky lg:top-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-text-body">
            {b.summaryTitle}
          </p>
          <p className="mt-4 text-4xl font-semibold text-text-primary">
            {formatPrice(breakdown.total)}
          </p>
          <p className="mt-1 text-sm text-text-body">
            {formatMessage(b.summaryVat, {
              warranty: site.warranty.toLowerCase(),
            })}
          </p>

          <dl className="mt-6 space-y-3 border-t border-text-primary/10 pt-6 text-sm text-[#1d1d1f]">
            <div className="flex justify-between gap-4">
              <dt className="font-semibold">{b.priceLabels.base}</dt>
              <dd className="font-semibold text-[#6E6E73]">
                {formatPrice(breakdown.base)}
              </dd>
            </div>
            {breakdown.sizeModifier > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="font-semibold">{selectedSize.label}</dt>
                <dd className="font-semibold text-[#6E6E73]">
                  {formatPriceModifier(breakdown.sizeModifier)}
                </dd>
              </div>
            )}
            {breakdown.severityModifier > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="font-semibold">{selectedSeverity.shortLabel}</dt>
                <dd className="font-semibold text-[#6E6E73]">
                  {formatPriceModifier(breakdown.severityModifier)}
                </dd>
              </div>
            )}
            {breakdown.serviceFee > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="font-semibold">
                  {serviceId === "ship" ? "Mail-in handling" : "Mobile service"}
                </dt>
                <dd className="font-semibold text-[#6E6E73]">
                  {formatPriceModifier(breakdown.serviceFee)}
                </dd>
              </div>
            )}
            {breakdown.travelFee > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="font-semibold">{b.priceLabels.travel}</dt>
                <dd className="font-semibold text-[#6E6E73]">
                  {formatPriceModifier(breakdown.travelFee)}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4 border-t border-text-primary/10 pt-3">
              <dt className="font-semibold text-[#0B0B0E]">{b.priceLabels.total}</dt>
              <dd className="font-semibold text-[#0B0B0E]">
                {formatPrice(breakdown.total)}
              </dd>
            </div>
          </dl>

          {serviceId === "ship" && (
            <p className="mt-4 text-sm text-text-body">{b.returnShippingNote}</p>
          )}

          {serviceId === "mobile" && manualNotice && (
            <p className="mt-4 text-sm text-text-body">{b.travelFeeNote}</p>
          )}

          <ul className="mt-6 space-y-2 text-sm leading-relaxed text-[#1d1d1f]">
            <li>
              <span className="font-semibold text-[#0B0B0E]">
                {b.summaryLabels.size}:
              </span>{" "}
              {selectedSize.label}
            </li>
            <li>
              <span className="font-semibold text-[#0B0B0E]">
                {b.summaryLabels.condition}:
              </span>{" "}
              {selectedSeverity.shortLabel}
            </li>
            <li>
              <span className="font-semibold text-[#0B0B0E]">
                {b.summaryLabels.service}:
              </span>{" "}
              {selectedService.label}
            </li>
            <li>
              <span className="font-semibold text-[#0B0B0E]">
                {b.summaryLabels.quantity}:
              </span>{" "}
              {quantity === "pair"
                ? b.summaryLabels.pair
                : b.summaryLabels.single}
            </li>
          </ul>
        </aside>
      </div>
    </SectionShell>
  );
}
