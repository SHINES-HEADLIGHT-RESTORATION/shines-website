"use client";

import {
  type ChangeEventHandler,
  type ReactNode,
  useId,
  useState,
} from "react";

export function BookingFieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-action-danger"
      role="alert"
    >
      <svg
        className="mt-px h-[15px] w-[15px] shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M8 4.75v3.75"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11.25" r="0.75" fill="currentColor" />
      </svg>
      {message}
    </p>
  );
}

function fieldShellClass(error?: string, focused?: boolean) {
  if (error) {
    return "border border-action-danger bg-[#fcf4f5]";
  }
  if (focused) {
    return "border-2 border-action-primary bg-surface";
  }
  return "border-2 border-[#d2d2d7] bg-surface";
}

function labelClass(floated: boolean, error?: string) {
  if (floated) {
    return `top-2 text-xs ${error ? "text-action-danger" : "text-text-body"}`;
  }
  return `top-1/2 -translate-y-1/2 text-base ${
    error ? "text-action-danger" : "text-[#86868b]"
  }`;
}

function textareaLabelClass(floated: boolean, error?: string) {
  if (floated) {
    return `top-2 text-xs ${error ? "text-action-danger" : "text-text-body"}`;
  }
  return `top-4 text-base ${
    error ? "text-action-danger" : "text-[#86868b]"
  }`;
}

export function AppleFloatingField({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  autoComplete,
  optional,
}: {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const [focused, setFocused] = useState(false);
  const floated =
    focused ||
    value.trim().length > 0 ||
    type === "date" ||
    type === "datetime-local";
  const displayLabel = optional ? `${label} (optional)` : label;

  return (
    <div>
      <div
        className={`relative rounded-xl transition-colors ${fieldShellClass(error, focused)}`}
      >
        <label htmlFor={id} className={`pointer-events-none absolute left-4 transition-all duration-150 ${labelClass(floated, error)}`}>
          {displayLabel}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`h-[52px] w-full bg-transparent px-4 text-base text-text-primary outline-none ${
            floated ? "pb-2 pt-6" : ""
          }`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {error && <BookingFieldError id={errorId} message={error} />}
    </div>
  );
}

export function AppleFloatingTextarea({
  label,
  value,
  onChange,
  onBlur,
  error,
  optional,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: () => void;
  error?: string;
  optional?: boolean;
  rows?: number;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const [focused, setFocused] = useState(false);
  const floated = focused || value.trim().length > 0;
  const displayLabel = optional ? `${label} (optional)` : label;

  return (
    <div>
      <div
        className={`relative rounded-xl transition-colors ${fieldShellClass(error, focused)}`}
      >
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 transition-all duration-150 ${textareaLabelClass(floated, error)}`}
        >
          {displayLabel}
        </label>
        <textarea
          id={id}
          value={value}
          rows={rows}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          className={`block min-h-[104px] w-full resize-y bg-transparent px-4 pb-5 pr-5 text-base text-text-primary outline-none ${
            floated ? "pt-7" : "pt-11"
          }`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {error && <BookingFieldError id={errorId} message={error} />}
    </div>
  );
}

export function AppleFloatingSelect({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <div
        className={`relative rounded-xl transition-colors ${fieldShellClass(error, focused)}`}
      >
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 top-2 text-xs transition-all duration-150 ${
            error ? "text-action-danger" : "text-text-body"
          }`}
        >
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="country"
          className="h-[52px] w-full appearance-none bg-transparent py-2 pl-4 pr-10 pt-6 text-base text-text-primary outline-none"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {error && <BookingFieldError id={errorId} message={error} />}
    </div>
  );
}

export function BookingPageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-6">
      <h2 className="text-[32px] font-semibold leading-tight tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-xl font-semibold text-text-primary">{subtitle}</p>
      )}
    </header>
  );
}

export function BookingFormSection({
  title,
  aside,
  children,
  className = "",
  divider = true,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      className={`pt-8 ${divider ? "border-t border-[#d2d2d7]" : ""} ${className}`}
    >
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      {aside && (
        <aside className="mt-3 max-w-xl text-sm leading-relaxed text-text-body">
          {aside}
        </aside>
      )}
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

export function BookingCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  const id = useId();

  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 py-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-[#86868b] bg-surface transition-[background-color,border-color] peer-checked:border-action-primary peer-checked:bg-action-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-action-primary"
      >
        <svg
          viewBox="0 0 12 10"
          className={`h-2.5 w-2.5 ${checked ? "opacity-100" : "opacity-0"}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 5.5 4.2 8.7 11 1.5"
            stroke="#ffffff"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm leading-snug text-[#1d1d1f]">{label}</span>
    </label>
  );
}

export function BookingNameRow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,140px)]">
      {children}
    </div>
  );
}

export function BookingPostcodeRow({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function BookingFieldStack({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="space-y-3">{children}</div>;
}
