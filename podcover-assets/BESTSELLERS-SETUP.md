# PodCover Best Sellers

This section works on a regular Shopify page and on a collection page. You choose the included products, and Shopify can order them by sales. Prices, photos, model and colour counts, product links and stock labels use the store's product data.

## Fix an existing Best Sellers page

If the page shows `Array 'collection.products' is not paginateable`, it is being rendered on a regular page without a native collection.

1. Open `sections/podcover-bestsellers.liquid` in **Online Store → Themes → … → Edit code**.
2. Replace the entire file with the updated `podcover-bestsellers.liquid` from this folder and save.
3. In **Customize**, go to the existing Best Sellers page and select **PodCover best sellers**.
4. Use the new **Product collection** picker to choose your Best Sellers collection and save.

Keep the existing page and its template. No template changes are required for this repair.

If no collection exists yet, go to **Products → Collections → Create collection**, name it **Best Sellers**, choose **Manual**, and add the cases you want to display. Include sold-out cases. Make the collection available to **Online Store** and set its Products sorting to **Best selling**.

On a regular page, the section uses the selected collection's configured product order. If no selection is made, it tries collections with the handle `best-sellers`, then `bestsellers`, then the all-products collection. If none exists, it displays an empty state and avoids pagination.

## New regular-page installation

Create `sections/podcover-bestsellers.liquid` using the section file in this folder. Create `templates/page.podcover-bestsellers.liquid` using the matching template file; its entire contents are `{% section 'podcover-bestsellers' %}`.

Under **Online Store → Pages**, create or open **Best Sellers**, choose **podcover-bestsellers** as its theme template, and save. Then choose the product collection in the section's settings in **Customize**.

With the page handle `best-sellers`, the header link should be:

```liquid
<a href="{{ pages['best-sellers'].url }}">Bestsellers</a>
```

If your page handle differs, use its actual handle. Replace only the Bestsellers link in `sections/header.liquid`. The template usually needs to exist in the published theme before it appears for assignment. In a theme copy's preview, you can preview the page template first using `?view=podcover-bestsellers` on the page URL.

## Optional collection-page installation: add the section and template

Open **Online Store → Themes → … → Edit code** in the theme you are using.

Create these two files and paste the complete matching code from this folder:

| New Shopify file | Code to copy |
| --- | --- |
| `sections/podcover-bestsellers.liquid` | `podcover-bestsellers.liquid` |
| `templates/collection.podcover-bestsellers.liquid` | `collection.podcover-bestsellers.liquid` |

Save both. The second file is a Liquid **collection** template; include `collection.` at the beginning of the filename. Its entire contents are `{% section 'podcover-bestsellers' %}`. No new images or snippets are needed.

## Create the collection

1. Go to **Products → Collections → Create collection**.
2. Name it **Best Sellers** and choose **Manual** as the collection type.
3. Save and add the PodCover products you want in the edit, including sold-out cases.
4. In the collection's Products area, set **Sort → Best selling**. Shopify supplies this order; the theme does not invent sales totals or calculate a ranking.
5. Make the collection available to **Online Store**.
6. Under **Theme template**, choose **podcover-bestsellers** and save.
7. In the collection's search-engine listing settings, check that its URL handle is **best-sellers**. The storefront URL will be `/collections/best-sellers`.

The template normally needs to exist in the published theme before it appears in the collection's Theme template dropdown. If you are editing a theme copy, you can preview the collection with `?view=podcover-bestsellers` in that theme's preview first. Assign the template after that theme becomes active.

Products must be Active and available to Online Store to appear on the storefront. Keeping a product Active with zero stock lets customers view it. The page labels unavailable products **Out of stock** and links to their details using **Explore the case**. Checkout protection comes from Shopify inventory: leave **Continue selling when out of stock** disabled. The page does not alter inventory or enable purchases.

## Connect a collection-page menu link

Your header currently links Bestsellers to the all-products collection. In `sections/header.liquid`, find:

```liquid
<a href="{{ routes.all_products_collection_url }}">Bestsellers</a>
```

Replace that link with:

```liquid
<a href="{{ routes.collections_url }}/best-sellers">Bestsellers</a>
```

If your current link is formatted differently, replace only its `href` value with `{{ routes.collections_url }}/best-sellers`. Keep the rest of your header. You can also add the same link inside the mobile-navigation block if Bestsellers is missing from the mobile menu.

Visit Bestsellers from the header and confirm its sorting is **Best selling**. The heading, introduction and number of products per page can be edited in **Customize → Best Sellers collection → PodCover best sellers**.

On collection pages, the section uses the native collection and its sorting form. The Product collection picker applies only when there is no native collection. On regular pages, set the chosen collection's default sort to Best selling in Shopify Admin; no sorting form is shown there.

## Reminder for the next task

Ask for the PodCover contact page with fields for **email, order number and message**, with submissions reaching **podcoverhelp@gmail.com**.

## Validation

The section and templates passed Liquid/HTML parsing; the section settings passed JSON schema parsing, and its inline script passed JavaScript syntax checks. Local browser fixtures covered 320, 375, 390, 430, 699, 700, 768, 999, 1000, 1024, 1280 and 1440 px without horizontal overflow. Functional checks covered available, sold-out, mixed, empty and missing-image cases; variable prices; product links; sorting; pagination links; and reduced motion. Additional checks covered regular pages with selected collections, all three fallback collections, missing collections, guarded pagination, and native collection precedence. The local pagination fixture now rejects a missing product array instead of stripping the pagination block. Shopify's pagination runtime still needs storefront verification after installation.
