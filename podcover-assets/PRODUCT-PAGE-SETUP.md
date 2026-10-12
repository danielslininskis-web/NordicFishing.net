# PodCover product page

This replaces the existing product section with a rounded product stage, three benefit cards, real model/colour options, colour swatches and a prominent Add to cart button. Product images, descriptions, prices and stock come from Shopify. The existing header, footer and cart drawer remain in place.

## Install in the current Shopify theme

1. Open Online Store → Themes → the theme you are editing → … → Edit code.
2. Open `sections/main-product.liquid` and keep a copy of its current contents.
3. Copy the entire contents of `main-product-complete.liquid` from this folder and replace the contents of `sections/main-product.liquid`.
4. Save. The existing `templates/product.json` already uses the `main-product` section, so a new template is unnecessary.
5. Preview both the Colour Edit and Blue Cloud products. Select each available model and colour, then add one item to the bag to verify the installed theme's cart integration.

Existing product photos appear automatically. To show a photo for a particular colour, assign that photo to the corresponding variant in Shopify Admin → Products.

Optional settings appear under the product section in the theme editor: photo background colour, subtitle override, free-shipping labels and genuine review ratings. Free-shipping labels assume a free standard shipping rate is configured in Shopify.

Ratings use Shopify's `reviews.rating` and `reviews.rating_count` metafields and remain hidden without real review data. Discounts appear only when a variant has a higher compare-at price. The reference brand's reviews, bestseller claims and guarantee are not included.

## Validation

The Liquid/HTML parser, JSON section schema and JavaScript syntax passed. Browser checks used local Shopify fixtures at 320, 375, 390, 430, 760, 768, 999, 1000, 1024, 1280 and 1440 px with no horizontal overflow. Checks covered available/sold-out/nonexistent variant combinations, server-formatted prices, compare-at discounts, gallery thumbnails, variant images and fallback images, quantity limits, native forms without JavaScript, AJAX success/422 errors, existing cart drawer integration, localized endpoints, theme-editor section reload, genuine ratings and reduced motion. These are local checks, not a live Shopify checkout or order test.
