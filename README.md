# ZS Automotive Website

Static front-end website for ZS Automotive.

## Files

- `index.html` - website structure
- `styles.css` - website styling
- `script.js` - pricing menu, estimate builder, and quote request behaviour
- `assets/zs-automotive-logo-clean.png` - clean ZS Automotive logo
- `assets/zs-automotive-sign.png` - real sign photo used in the hero section

## How to run locally

Open this folder in VS Code, then use the Live Server extension on `index.html`.

Or run:

```bash
python3 -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Important before publishing

1. Confirm the final email address. The current form uses `quotes@zsauto.ca`.
2. Confirm business hours before publishing. Current hours are based on public listing data and should be verified by the shop.
3. Confirm the review rating/review count before publishing. Current review section should be updated with live Google Business Profile information if available.
4. Replace or add more real shop photos when available.
5. For a true online form, connect the quote form to Google Sheets, Zapier, Shopmonkey, Formspree, Netlify Forms, or a custom backend. The current static version opens a prepared email request.

## Latest update

Added a Google Maps embed to the contact section and a few lightweight UI widgets to make the page feel less like one long block:

- Dark quick-action rail after the hero
- Three-step quote process widget
- Real embedded Google Map in Contact
- Mobile sticky action bar for Call / Quote / Directions
- Clearer section breaks and spacing polish
