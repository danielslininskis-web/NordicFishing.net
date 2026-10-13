# PodCover collection pages

Two Shopify sections are included because the store uses separate templates for the collection directory and an individual collection.

## Install

1. In Shopify, open **Online Store → Themes → … → Edit code**.
2. Replace everything in `sections/main-list-collections.liquid` with `main-list-collections-complete.liquid`. This redesigns `/collections`.
3. Replace everything in `sections/main-collection.liquid` with `main-collection-complete.liquid`. This redesigns `/collections/all` and every other individual collection.
4. Save both files and preview **Collections** and **Shop** from the header.

No new templates, images or snippets are required. Collection names, descriptions, product photos, links, prices, compare-at prices, option counts, sorting and pagination come from Shopify.

Products with no available variants display **Out of stock** and **Restocking soon**. When all products in the displayed collection are unavailable, the page also shows a restock notice. Once inventory is added in Shopify and **Continue selling when out of stock** remains disabled, the normal price presentation returns automatically.

The individual collection section can be customized in the theme editor. Its settings include the eyebrow, optional heading override, fallback introduction, products per page and desktop column count.

## Validation

Both sections passed Shopify Liquid/HTML parsing, JSON schema parsing and JavaScript syntax checks. Browser tests covered sold-out, available and empty collections; sorting; alternate hover images; reduced motion; and 320, 390, 430, 620, 768, 900, 1024 and 1440 px layouts without horizontal overflow.
