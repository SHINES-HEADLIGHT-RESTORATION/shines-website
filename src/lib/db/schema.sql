-- SHINES bookings + availability (run once via npm run db:migrate)

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  reference TEXT,
  email TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ,
  status TEXT NOT NULL,
  data JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_appointments_reference_email
  ON appointments (upper(reference), lower(email));

CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_at
  ON appointments (scheduled_at);

CREATE TABLE IF NOT EXISTS availability_config (
  id TEXT PRIMARY KEY,
  config JSONB NOT NULL
);

INSERT INTO availability_config (id, config)
VALUES (
  'default',
  '{
    "slotDurationMinutes": 60,
    "timezone": "Europe/Brussels",
    "weeklyHours": {
      "0": null,
      "1": { "start": "09:00", "end": "18:00" },
      "2": { "start": "09:00", "end": "18:00" },
      "3": { "start": "09:00", "end": "18:00" },
      "4": { "start": "09:00", "end": "18:00" },
      "5": { "start": "09:00", "end": "18:00" },
      "6": { "start": "10:00", "end": "14:00" }
    },
    "blockedDates": [],
    "dateOverrides": {}
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;
