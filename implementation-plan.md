# Befit prototype implementation plan

**Current goal:** Present Befit's product retail/wholesale and indoor sports together; replace online booking with product discovery and direct enquiries.

## Product catalogue revision

- [x] Inspect the official shop and medicine ball page in Chromium, plus five representative product pages; capture desktop/mobile evidence and local product assets.
- [x] Replace the booking section and booking JavaScript with a six-product catalogue, search, category filters, empty state and accessible product detail dialog.
- [x] Update hero/navigation/CTAs/FAQs for products and venue enquiries; add verified Colombo and Mawanella showroom contacts and addresses.
- [x] Keep all resources local; do not invent price, stock, checkout, delivery or WhatsApp behaviour.
- [x] Test updated flows and offline layouts at 375, 768 and 1440px; update README, source manifest and research notes.

The completed checklist below records the original iteration, superseded by the user's request to remove online booking.

**Architecture:** One semantic `index.html` with embedded CSS and vanilla JS, local first-party imagery and locally hosted open-license fonts. Booking state exists only in DOM/JavaScript memory; no backend, storage, form transmission or payment. Research evidence is separate from customer-facing content.

**Tech stack:** HTML, CSS, JavaScript; existing Chromium/Playwright for development checks only. No installation or build step.

- [x] Inspect empty target folder and ancestor instructions; research official business and capture existing desktop/mobile pages. No AGENTS.md or hosting.json found; no existing project files were replaced.
- [x] Record sources, conflicts, design direction and demo assumptions in research-notes.md; download original assets and font licenses.
- [x] Build dark photo hero, responsive navigation, facilities, booking section, asymmetric gallery, location/contact panel, FAQs and wider-business footer links.
- [x] Implement in-memory location/facility/date/slot/name/phone state. Validate date against Colombo day and start time; unavailable slots disabled. Show live summary and explicit non-reservation confirmation; reset clears state and any pending simulated operation.
- [x] Add native modal gallery with previous/next, Escape, arrow keys, focus restoration and background scroll lock; native FAQ accordions; mobile menu with Escape and focus feedback.
- [x] Test file:// at 375, 768 and 1440px, full booking plus invalid/past/unavailable/reset cases, gallery and keyboard controls, FAQ, mobile nav, offline assets and console/overflow checks. Save screenshots and test results.
- [x] Write README with opening instructions, demonstration limits, source/asset locations and production requirements. Review final local files.

Execution follows the user's explicit instruction to proceed through routine design choices without approval. Work is performed inline; the prototype is not published.
