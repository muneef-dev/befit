# Befit website research

## Current revision — product retail and venue enquiries

The user requested product browsing and removal of online booking. The current `index.html` contains no booking form, date/slot selection or simulated booking confirmation. The earlier design notes below are historical.

Inspected https://befit.lk/shop/ and https://befit.lk/product/1-5kg-medicine-ball/ in installed Chromium at desktop/mobile widths. Also visited the individual AB Coaster, AB Wheel, Adidas Jogging Shoe, AMGROW Basketball #7 & #5 and ANKLE SUPPORTER – B511 product pages. Exact URLs and extracted evidence are in `research/products-inspection.json`.

- The shop displayed 16 products per page, “Read more” links and a sorting selector. The medicine-ball detail page provides a description, category links and a reviews tab; no price or buy/add-to-cart action was visible. No prices were extracted from any of the six inspected product summaries.
- The medicine ball is listed as 1.5kg, with a textured surface. The prototype paraphrases a short description rather than reproducing marketing text. No customer reviews or medical/performance claims are copied.
- Several products are categorised as Uncategorized on the original site. Fitness, Team sports, Footwear and Accessories are proposed browsing groups, based on product type, rather than claims about official taxonomy.
- Current prototype includes six verified products as a curated selection, live local search/filter counts, accessible product detail dialogs and direct showroom enquiries. It makes no stock, price, delivery, warranty or online payment assumptions.
- Product photos were downloaded from the official shop/product pages. Exact asset URLs are added to `assets/sources.json`. Some originals, including the medicine ball, are low resolution; display sizes are restrained. Public launch should obtain owner-approved higher resolution originals.
- Showroom details come from the previously inspected official showroom/contact pages: Mawanella at No.130/2, Hassan Mawatha, A1, Mawanella 71500, +94 77 169 9991; Colombo at 343 Main Street, Pettah, +94 77 070 7010. These are explicitly separated from sports venue contacts.
- Primary usability improvements: visible product navigation, useful category groups, searchable featured products, short product summaries and clear price/stock enquiry actions; the venue story and gallery remain available.

Current verification evidence is in `verification/catalogue/`. The previous screenshots/results in the root `verification/` folder describe the retired booking iteration.

## Original research and first iteration (historical)

Researched 13 September 2026. Searched “Befit lk”; confirmed the Sri Lankan BeFit Marketing / indoor sports business at https://befit.lk/, distinct from overseas businesses with similar names.

## Sources and verified information

- https://befit.lk/ — homepage groups the business into showrooms, indoor sports and construction. Existing branding is green, white and near-black; inspected green computed as `rgb(82,184,72)` (#52b848). Main navigation: Home, Products (large sport-category submenu), About, Contact; generic “Take Action” button goes to Contact.
- https://befit.lk/4249-2/ — official indoor sports page. Mawanella academy lists futsal, cricket, badminton and gym, plus youth training. Branches named Hemmathagama, Paragahadeniya and Warakapola. Booking is mentioned, but no date/slot booking interface was found on inspected pages. Avoided repeating the uncorroborated size/ranking claim.
- Same sports page: Mawanella futsal +94 77 313 9991; Hemmathagama futsal +94 77 769 2625. Paragahadeniya body lists +94 77 313 9991 while its footer lists +94 77 200 2006. Prototype routes that branch's enquiries to the general hotline, with an explanation, rather than choosing between contradictory numbers.
- https://befit.lk/contact/ — general hotline +94 77 136 0369; email team@befit.lk. A general name/email/subject/message form is present. No form was submitted.
- https://befit.lk/4279-2/ — showrooms in Mawanella and Colombo; retail/wholesale sports and gym equipment. No.130/2, Hassan Mawatha, A1, Mawanella 71500 and 343 Main Street, Colombo are **showroom** addresses, not verified playing-court addresses. They are not used as venue directions.
- https://befit.lk/about/ — sports equipment retail/wholesale context. https://befit.lk/4237-2/ — indoor arena construction service (reviewed through search extraction). https://befit.lk/shop/ — product catalogue (reviewed through search extraction).
- Official sports page embeds these Google Maps queries: `Befit Indoor Sports Court, Hemmathagama, Sri Lanka` and `Be Fit Futsal Court, 7F3G+7VM`. Prototype's Hemmathagama map link uses the first exact venue query in a normal directions URL. Mawanella and Paragahadeniya precise arrival addresses are left for phone confirmation. The plus code alone lacks locality context, so it is not promoted as precise directions.
- Official website links https://www.instagram.com/befit.lk/ and https://www.facebook.com/share/189gkXu9DD/?mibextid=wwXIfr. Instagram could not be fetched; no profile-only claims were made. No verified WhatsApp endpoint was found, so WhatsApp is omitted rather than inferred from a mobile number.

## Inspection and usability findings

The integrated browser reported no browser available. Successfully used existing Playwright Core and installed Chromium headlessly, without installing packages. Visited home, sports, contact, about and showroom pages. Desktop screenshots: 1440px; home and sports mobile screenshots: 375px. Evidence is in `research/` and `research/inspection.json`.

1. Venue discovery competes with a retail-led homepage and product-heavy navigation. A direct “Book a court” action and sports navigation would shorten the path for players.
2. The sports page has the browser title “. – Befit.lk”, a visible dot heading, inconsistent location spelling, mixed branch headings and inconsistent telephone information. Give venues clear names and pair each contact with its venue.
3. The captured layouts show large empty areas between sections and small body text. Mobile sports content requires considerable scrolling to reach branch phone actions. No horizontal overflow was measured on the two existing mobile pages. Some empty areas may be third-party embed/loading space; do not assume all are permanent.
4. Green/white logo visibility drops against the white mobile header. The proposal keeps the original logo on a dark background.
5. Existing booking information offers phone contacts without a visible availability calendar, selection summary or structured session enquiry. Prototype demonstrates those interactions, explicitly with sample availability.
6. Venue photos have empty alt attributes in the inspected DOM. Proposal adds descriptive alternatives, captioned lightbox controls and keyboard support.

## Design and assumptions

Chosen approach: a venue-first landing page with links back to the wider business. A full retail redesign would distract from this manager's booking demonstration; a booking-only application would lose the brand and venue story. Preserve the original logo and green identity, extend it with a brighter lime action colour, warm off-white surfaces and bold condensed sports headings.

- All dates/slots are generated demo data; one-hour sessions and the branch/sport booking combinations are demonstration assumptions, not confirmed inventory or opening hours. Mawanella offers futsal/cricket/badminton in the demo; other selectable branches offer futsal only. Gym and academy information routes to enquiries. Warakapola is mentioned by the source but omitted from booking pending operational/contact confirmation.
- No prices, operating hours, capacity, parking, changing rooms, equipment-hire claims, reviews, achievements or cancellation policies are invented. FAQs direct users to the team where information is unknown.
- Date/time handling uses Asia/Colombo; past dates and elapsed same-day start times cannot be booked in the demonstration.
- Photographs come from the business's own website. Historical photos do not establish current venue condition. The 2019 Mawanella image is identified as an archive photo. Some images are grouped under “Mawanella and Hemmatagama” by the source; their exact branch is deliberately not asserted.
- Photo/logo use is for this private owner proposal; public launch should obtain owner/rightsholder clearance and current photography. Exact asset URLs and font licenses are in `assets/sources.json` and `assets/*license.txt`. No stock or generated venue images are used.

## Owner confirmation needed before launch

Resolve Paragahadeniya contact number and spelling; confirm all branch addresses/map pins, current sports and bookable resources, operating hours, session lengths, rates, policies, WhatsApp availability, photography rights and current branch status.
