# Befit — owner demonstration

Open **index.html** in Chrome, Edge, Firefox or Safari. No installation, server, internet connection or build step is required. Keep the `assets` folder beside the HTML file. External telephone, email, map and existing-website links use your normal apps and may require connectivity.

## Suggested two-minute presentation

1. Show the venue-focused first screen and “Find your next session” action.
2. Choose a venue and sport, then a future date. Point out available, selected and unavailable sample times.
3. Submit an empty form to demonstrate inline guidance. Enter **Demo Player** and a sample-format number such as **0771234567**. These details are not transmitted.
4. Confirm the demonstration, show the explicit “No real reservation was submitted” message, then select “Try another booking”.
5. Open the gallery, use arrow keys and Escape, and try the FAQs and mobile menu.

## What works

Responsive navigation; sport-specific booking links; venue/facility selection; a native date picker and seven quick-select days; sample hourly slots; live summary; inline name/phone/date validation; loading feedback; simulated confirmation; reset; six-photo gallery with keyboard navigation and focus restoration; native FAQ accordions; verified call/email links and an official-source Hemmathagama map query.

Dates and times use **Asia/Colombo (UTC+05:30)** even when the device is in another timezone. Past dates and elapsed same-day start times cannot be selected. If today has no remaining demo slots, the form initially selects tomorrow. Venue/sport/date changes clear the previous time selection.

## Demonstration limits

- All availability, the one-hour duration and bookable branch/sport combinations are illustrative. No prices or operating hours are asserted.
- All entered data stays in page memory. There are no HTTP requests, cookies, local/session storage, analytics, payments, messages or booking submissions. Reset/reload clears the information.
- Paragahadeniya has conflicting official phone listings, so this proposal clearly routes enquiries through Befit's general hotline. Exact Mawanella/Paragahadeniya court addresses require confirmation; showroom addresses are not substituted.
- WhatsApp is omitted because no official WhatsApp endpoint was verified. Warakapola's contact and booking details remain unconfirmed and are not offered in the demo.
- Original imagery is from Befit's website and includes archive material. This is an independent private proposal, not an official published replacement.

## Files and editing

- `index.html` — entire prototype. CSS sections are numbered; JavaScript is grouped into navigation, Colombo date handling, booking state and gallery behaviour.
- `assets/` — local logo, original venue photos, Manrope and Barlow Condensed fonts, font licenses and exact source URLs in `sources.json`.
- `research-notes.md` — verified information, source links, findings and unresolved facts.
- `research/` — screenshots of the existing site and structured inspection evidence.
- `verification/` — prototype screenshots and machine-readable test results.
- `implementation-plan.md` — task checklist.
- `inspect.cjs`, `verify.cjs`, `download-assets.py` — optional development/research helpers, **not required to open the demo**. The browser scripts reference an already-installed local Playwright/Chromium path specific to the development computer. Nothing is installed by these scripts.

To adjust styling, edit the CSS variables near the top of `index.html`. To change verified contacts or demonstration facilities, update the `venues` object and the matching static contact section. Change `SAMPLE_HOURS` only as sample data until owners confirm an operating schedule. Use `textContent` for user-entered values to preserve safe rendering.

## Production requirements

Confirm addresses/map pins, branch numbers, current facilities, hours, rates, slot lengths, equipment, coaching, rules and cancellation terms with the owners. Obtain permission for public photo/logo use and replace old imagery where necessary.

A real booking system still needs a backend and database, authenticated staff calendar, resource inventory, server-side validation, concurrent slot locking, timezone-safe availability, booking status and cancellation workflows. Agree privacy/retention policies, secure personal data, add abuse protection, backups and monitoring, and test accessibility across browsers and real mobile devices. Add notifications and payments only if explicitly agreed; they are absent here.

## Verification

Tested by opening the actual `file://` page in installed Chromium, including 375px, 768px and 1440px layouts, extra 320px/1920px overflow checks, navigation, validation, booking/reset, gallery, FAQ keyboard interaction, reduced motion and offline local assets. The browser timezone was deliberately set to America/Los_Angeles to verify Colombo date handling. See `verification/results.json` for the exact outcomes.

Real calls, messages, live reservations and payments were not made. Safari/Firefox, physical-device touch behaviour and screen-reader announcements have not been independently verified.
