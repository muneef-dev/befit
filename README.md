# Befit — products & indoor sports prototype

Open **index.html** directly in a modern browser. Keep `assets/` beside it. No installation, server or build step is needed; product browsing and all local interactions work offline.

## Current version

This version focuses on product browsing and direct enquiries. The site brings together Befit's product retail/wholesale, showrooms and indoor sports, with no online booking flow.

- Six real products from Befit's existing catalogue, including the **1.5kg Medicine Ball**.
- Category filters, text search, result count, clear search and an empty state with reset.
- Product detail dialogs with original photos, concise information and showroom enquiry links.
- Separate showroom addresses/contacts and sports venue contacts.
- Responsive navigation, six-photo venue gallery, keyboard controls and FAQ accordions.

## A quick presentation

1. Start with the hero, then choose **Explore products**.
2. Try Fitness or Footwear, search for “medicine”, and open the product details.
3. Show the two showroom enquiry options and the link to the original product page.
4. Show the sports facilities, venue gallery and separate showroom/venue information.
5. Resize the browser to demonstrate mobile navigation and the product dialog.

## What is and isn't live

The product names/images were verified on Befit's website. The collection is a curated snapshot, not the full catalogue or a live stock feed. The inspected pages did not show prices, so the prototype says **Enquire for price**. Filter categories are editorial groupings; some original products were listed as Uncategorized.

There is no checkout, cart, payment, online booking, enquiry submission, analytics or storage. No personal information is collected. Phone/email links open the user's normal apps; external catalogue, product and map links require connectivity. No messages or calls were made during testing.

Paragahadeniya's conflicting direct phone listings remain unresolved; its enquiries use the clearly labelled general hotline. Mawanella/Paragahadeniya court addresses and all hours/rates require owner confirmation. The two listed street addresses belong to **showrooms**, not sports venues. WhatsApp is omitted because no official endpoint was verified.

## Files

- `index.html`: embedded CSS and vanilla JavaScript. Edit the `products` array for featured product details and the static product cards for their initial markup. Change the CSS variables for colours and fonts.
- `assets/`: local business-owned imagery, fonts, licenses and `sources.json` with exact URLs.
- `research-notes.md`: current findings, verified sources and historical design notes.
- `research/products-inspection.json`: original product-page evidence; shop/product screenshots are in the same folder.
- `verification/catalogue/`: **current** browser screenshots and `results.json`.
- `verify-catalogue.cjs`: optional current browser tests using an existing, computer-specific Playwright/Chromium installation. It is not needed to open the site.
- `inspect-products.cjs`: research helper. Older research/testing files and `verification/` root screenshots document the previous booking iteration and are not the current experience.

## Before production

Have the owners approve product specifications, prices, stock, categories, showroom/venue details, photography rights and any commercial policies. Some original product photos are low resolution; obtain better originals before a public launch. Add a managed product catalogue or inventory integration if current information is needed. Checkout, delivery and payments would be separate agreed features. The current prototype does not assume those policies or workflows.

Browser verification covers Chromium at 375, 768 and 1440px, with extra 320/1920px overflow checks, filtering/search, every product dialog, navigation, gallery, FAQs, keyboard focus and offline assets. See the current results file for exact outcomes. Safari, Firefox, physical devices and screen-reader announcements have not been independently verified.
