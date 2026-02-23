# Persian RTL Meeting Room Booking UI

## Structure
- `app/` routes: dashboard, rooms, scheduler, calendar, bookings
- `components/ui/` shadcn-style UI primitives
- `components/features/` feature components (dialogs + timeline)
- `lib/store/` Zustand in-memory data store
- `lib/jalali.ts` Jalali formatting + month generation utilities

## Notes
- UI displays Persian Jalali dates, while booking storage uses ISO UTC strings.
- Overlap detection logic: `(start < existingEnd) && (end > existingStart)` for the same room.
