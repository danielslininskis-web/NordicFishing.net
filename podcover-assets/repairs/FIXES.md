# Audit findings and repairs

Status describes these prepared replacements, not the published Shopify store. Install them using [README.md](README.md).

| Audit items | Repair | Remaining Shopify action |
| --- | --- | --- |
| 1–2: personal address in Privacy and Legal | Sanitized written-policy replacements, support email corrected | Replace both saved policies in Settings → Policies |
| 3–5: conflicting return window, postage and process | Designed pages and written policies consistently describe Denmark/EU cancellation, customer-paid change-of-mind postage and email returns | Publish written refund policy |
| 6: timer on sold-out items | Dispatch visibility follows the selected variant's actual available stock | Keep stock accurate; set closure dates |
| 7: cart edits can affect the wrong line | Stable item keys and queued requests; inventory-error recovery | Install shared JS/layout |
| 8: empty Collections | Real product fallback and pagination, improved collection cards | Publish Blue Cloud and Colour Edit collections |
| 9: homepage Colour Edit not connected | Existing-product fallback, actual stock/price and direct colour links; available-first matching | Existing image selections preserved |
| 10: fallback Best Sellers unranked | Neutral edit heading until dedicated collection selected; direct links and stock labels | Create/select Best Sellers and sort Best selling |
| 11–12: no availability on Shop/Search | Stock-aware cards, prices retained, pagination | Install collection/search sections and shared snippet |
| 13–15: missing mobile link and redirecting links | Mobile Bestsellers; correct relative page links and direct product URLs | None after installation |
| 16: duplicate empty Contact | Main-page fallback links to real form | Unpublish duplicate and add redirect |
| 17–21: stale single-product copy and shipping conflicts | About/FAQ/Shipping cover both ranges; free standard shipping and cutoff explained | Verify actual free standard rate |
| 22: old colour tooltip | Cleaned labels and accessible tooltips | Variant records remain intact |
| 23–25, 27: duplicate/technical titles and missing metadata | Readable titles/descriptions, canonical, Open Graph/Twitter and product-specific images | Optional readable Admin page titles; Google propagation |
| 26: Blue Cloud brand is My Store 3 | Existing Shopify Product structured data retained | Change product Vendor to PodCover |
| 28–29: drawer focus errors | Closed drawer hidden/inert; open dialog traps focus, Escape closes, opener restored | Install layout and JS together |
| 30–38: weak contrast | Darker captions, footer, stock choices, steps, page copy and form labels | None after installation |
| Performance: large favicon and campaign PNG | Existing logo exported to 96/180px assets; responsive campaign JPEG requests | Upload the two icon assets; keep photos selected |
| Prepared-code: blank single-image hover | Alternate-image animation only when a second image exists | None |
| Prepared-code: inaccurate shared benefits | Generic shared cards; Blue Cloud/Colour Edit specific product benefits | None |
| Prepared-code: mixed-variant sale price | Compare-at comes from the variant matching displayed minimum price | None |
| Prepared-code: numbering/pagination | Correct two-digit numbering with page offset, paginated directory/search | None |
| Prepared-code: native sorting missing | Apply button works without JavaScript | None |
| Prepared-code: first matching colour unavailable | Prefer an available matching variant before sold-out fallback | None |
| Prepared-code: nonlocalized cart routes | Routes emitted from Shopify routes object | None |
| Prepared-code: native sold-out variant form | Required blank prompt for sold-out selection in partly available product, valid quantity constraints | None |
| Prepared-code: closure exceptions | Strict date setting, weekends/DST, timer cleanup and actual dispatch date | Enter closure dates or disable promise |

No product, inventory, checkout, collection record, written policy, or email recipient has been changed in Shopify by this code preparation. No live contact/newsletter message, order, or cart mutation was submitted during development.
