# PodCover repair files

These are complete replacements for the existing theme, plus the written policies to paste into Shopify. The files are prepared and locally tested. They do **not** update the live store until you install them in Shopify.

Your product prices, inventory, homepage image selections and checkout configuration are not changed by these files. Keep unavailable variants at zero stock with **Continue selling when out of stock** switched off.

## 1. Update the saved policies first

The personal address is still public until these saved Shopify policies are replaced. Theme code cannot remove it from Shopify's policy database.

Open **Settings → Policies**. For each row below, open the policy in its normal text editor, select all of the old text, paste the matching replacement, and save. Click a filename here, then **Raw** on GitHub to copy the text. These files are plain text: there are no HTML tags, Markdown headings, Liquid tags, or other code.

| Shopify policy | Complete replacement |
| --- | --- |
| Privacy policy | [privacy-policy.txt](policies/privacy-policy.txt) |
| Legal notice | [legal-notice.txt](policies/legal-notice.txt) |
| Return and refund policy | [refund-policy.txt](policies/refund-policy.txt) |
| Shipping policy | [shipping-policy.txt](policies/shipping-policy.txt) |
| Terms of service | [terms-of-service.txt](policies/terms-of-service.txt) |
| Contact information | [contact-information.txt](policies/contact-information.txt) |

The privacy replacement keeps the existing policy's main content and replaces its contact information. Check the automated-policy setting so a future regeneration does not restore unwanted details. The replacements use **podcoverhelp@gmail.com** and contain no personal street address. They make returns consistent: 14 days to notify cancellation for Denmark/EU online purchases, then 14 days to send the goods back, with customer-paid change-of-mind return postage. Ordinary opened packaging does not automatically remove statutory cancellation rights.

Use verified public business details where legally required; the drafts do not invent a company registration number or claim full legal compliance. See [policy settings notes](policies/MERCHANT-ACTIONS.md).

After saving, visit `/policies/privacy-policy` and `/policies/legal-notice` in a private browser window and check the final contact text.

## 2. Install the theme code in this order

In **Online Store → Themes**, duplicate your current theme as a backup, then use **Edit code** on the theme copy. Keep your existing theme and its templates. A ZIP of this folder is a patch bundle, not a complete theme for Shopify's Upload theme button.

For each existing file, select all of its contents and replace them with the matching complete file. For a new file, create it inside the named folder with the exact filename. Save every file. Add the new dependencies first and replace `layout/theme.liquid` last.

### Add these new files first

| Shopify file | File to open and copy/upload |
| --- | --- |
| `snippets/podcover-seo.liquid` | [podcover-seo.liquid](theme/snippets/podcover-seo.liquid) |
| `assets/podcover-repairs.css` | [podcover-repairs.css](theme/assets/podcover-repairs.css) |
| `assets/podcover-favicon-96.png` | [96px favicon](theme/assets/podcover-favicon-96.png) — upload image |
| `assets/podcover-touch-icon-180.png` | [180px touch icon](theme/assets/podcover-touch-icon-180.png) — upload image |

The icons are smaller exports of your existing logo. Leave your existing `blue-cloud-studio.jpg`, `blue-cloud.jpg` and uploaded homepage photos in place.

### Replace the shared shopping files

| Shopify file | Complete replacement |
| --- | --- |
| `assets/vyqeli.js` | [vyqeli.js](theme/assets/vyqeli.js) |
| `assets/vyqeli.css` | [vyqeli.css](theme/assets/vyqeli.css) |
| `sections/header.liquid` | [header.liquid](theme/sections/header.liquid) |
| `sections/footer.liquid` | [footer.liquid](theme/sections/footer.liquid) |
| `sections/main-cart.liquid` | [main-cart.liquid](theme/sections/main-cart.liquid) |
| `sections/main-search.liquid` | [main-search.liquid](theme/sections/main-search.liquid) |
| `snippets/product-card.liquid` | [product-card.liquid](theme/snippets/product-card.liquid) |

The drawer uses stable item keys and queues cart changes. Its keyboard focus stays inside while open and returns to the opener when closed. Search shows actual stock status and matches sale prices to one variant.

### Replace the homepage, products and collections

| Shopify file | Complete replacement |
| --- | --- |
| `sections/home-editorial.liquid` | [home-editorial.liquid](theme/sections/home-editorial.liquid) |
| `sections/main-product.liquid` | [main-product.liquid](theme/sections/main-product.liquid) |
| `sections/main-collection.liquid` | [main-collection.liquid](theme/sections/main-collection.liquid) |
| `sections/main-list-collections.liquid` | [main-list-collections.liquid](theme/sections/main-list-collections.liquid) |
| `sections/podcover-bestsellers.liquid` | [podcover-bestsellers.liquid](theme/sections/podcover-bestsellers.liquid) |

The homepage finds the existing Colour Edit product even if its picker is blank. Product and shade links use actual variant data. The dispatch countdown stays hidden on sold-out variants. Single-photo cards remain visible on hover. Collections has a useful product fallback until you publish real collections; Best Sellers uses a neutral edit heading until a dedicated collection is selected.

### Replace the information-page sections

| Shopify file | Complete replacement |
| --- | --- |
| `sections/podcover-about.liquid` | [podcover-about.liquid](theme/sections/podcover-about.liquid) |
| `sections/podcover-contact.liquid` | [podcover-contact.liquid](theme/sections/podcover-contact.liquid) |
| `sections/podcover-faq.liquid` | [podcover-faq.liquid](theme/sections/podcover-faq.liquid) |
| `sections/podcover-shipping.liquid` | [podcover-shipping.liquid](theme/sections/podcover-shipping.liquid) |
| `sections/podcover-returns.liquid` | [podcover-returns.liquid](theme/sections/podcover-returns.liquid) |
| `sections/podcover-terms.liquid` | [podcover-terms.liquid](theme/sections/podcover-terms.liquid) |
| `sections/refund-policy.liquid` | [refund-policy.liquid](theme/sections/refund-policy.liquid) |
| `sections/podcover-refund-policy.liquid` | [podcover-refund-policy.liquid](theme/sections/podcover-refund-policy.liquid) |
| `sections/main-page.liquid` | [main-page.liquid](theme/sections/main-page.liquid) |

Install both refund section filenames: your live refund template uses `refund-policy`, while an earlier alternate template uses `podcover-refund-policy`. They contain identical corrected content. About, FAQ and Shipping now cover both case ranges. Contact keeps Shopify's native email form with an optional order number and visible validation/success states.

**Keep existing page templates.** If an information page already works, replace its section file only. The [optional templates folder](optional-templates) is for a missing template: create exactly `templates/page.podcover-NAME.liquid`, never `templates/podcover-NAME.json`. Do not create a Liquid template if a JSON template of the same name already exists. Assign a missing template under **Online Store → Pages → Theme template** after it exists in the active theme.

### Finish with the layout

Replace [layout/theme.liquid](theme/layout/theme.liquid) last. This connects the repaired drawer, styles, optimized favicon, metadata and localized cart routes.

[config/settings_schema.json](theme/config/settings_schema.json) is optional: it adds favicon and social-image pickers. Replace it only if your current schema still has the original single **Brand** group; otherwise keep your existing groups and add the two image-picker settings from this file to that group. The repaired layout works without those optional pickers. **Do not replace `config/settings_data.json`.** It stores your selections and image settings.

Preview the copy before publishing it. Then publish that copy through **Online Store → Themes** when the checks below pass.

## 3. Finish the settings that code cannot change

1. **Correct the Blue Cloud vendor.** In **Products → Blue Cloud AirPods Case**, set Vendor to **PodCover** and save. Shopify's existing Product structured data takes its brand from this record.
2. **Create the collections.** Under **Products → Collections**, create manual **Blue Cloud**, **Colour Edit**, and **Best Sellers** collections. Add the matching products, including sold-out ones, and publish each to **Online Store**. Set Best Sellers sorting to **Best selling**. In the theme editor, open your Best Sellers page and select this collection in its **Product collection** setting. No theme file can create those Admin records.
3. **Remove the duplicate Contact page.** Keep `/pages/podcover-contact`. Unpublish the empty `/pages/contact` page, then add a URL redirect from `/pages/contact` to `/pages/podcover-contact`. Shopify redirects work when the old page is no longer active. The [redirect CSV](url-redirects.csv) also includes old short Shipping, Returns and FAQ paths; import those only when the source page is inactive. URL redirects are under **Content → Menus → View URL redirects** in current Admin, or **Online Store → Navigation → URL redirects** in older Admin.
4. **Set contact delivery.** In **Settings → Notifications → Sender email**, use **podcoverhelp@gmail.com** and complete any verification Shopify requests. Submit one manual test on the public Contact page and check inbox/spam. A form success message alone does not prove delivery.
5. **Match shipping and dispatch.** Verify an actual free standard rate in **Settings → Shipping and delivery** for every destination you offer. The normal cutoff is **15:00 Copenhagen time on weekdays**. In the product section's **Same-day dispatch** settings, enter dates when you will not dispatch under **Dates with no dispatch**, one `YYYY-MM-DD` date per line. Change the shipping wording too if you change the cutoff. Keep the countdown off if you cannot meet that promise.
6. **Rename the technical page titles.** Under **Online Store → Pages**, use the titles below. Keep the URL handles so current links continue to work. Theme SEO already supplies readable titles/descriptions for these routes.

| Existing URL | Page title |
| --- | --- |
| `/pages/about` | About PodCover |
| `/pages/podcover-contact` | Contact PodCover |
| `/pages/podcover-faq` | Frequently Asked Questions |
| `/pages/podcover-shipping` | Shipping Information |
| `/pages/podcover-returns` | Returns |
| `/pages/refund-policy` | Return and Refund Policy |
| `/pages/terms` | Terms of Service |
| `/pages/best-sellers` | Best Sellers |

Check Best Sellers is visible to Online Store. Shopify generates the sitemap; do not edit it by hand. After publishing, recheck `https://podcover.store/sitemap.xml` and request indexing in Search Console for important pages. Google decides when indexing/search snippets update.

## 4. Check the installed store

- Open the homepage, both products, Shop, Collections, Best Sellers, Search and each information page on mobile and desktop.
- Confirm both products still cost **99 kr**, their unavailable variants show **Sold out**, and those variants have no dispatch timer.
- Open and close the bag with keyboard and touch; confirm Escape closes it and focus returns to the bag button.
- Check colour links open the intended model/colour and the Colour Edit homepage section displays its actual price/stock.
- Confirm policies use the support email, omit the personal street address, and give consistent return instructions.
- Check Contact's required email/message fields and send your own test to verify delivery.
- Keep inventory at zero and **Continue selling when out of stock** off until the cases arrive. Test purchasing only with stock and a deliberate Shopify test-order setup.

Local tests simulate Shopify product/cart data. They do not establish live email delivery, shipping-rate configuration, Google's indexing, or a real checkout. See [the fix checklist](FIXES.md) for the audit-to-repair mapping.
