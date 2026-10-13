# PodCover Best Sellers

This design uses a real Shopify collection. You choose the included products, and Shopify can order them by sales. Prices, photos, model and colour counts, product links, sorting and stock labels use the store's product data.

## 1. Add the section and template

Open **Online Store → Themes → … → Edit code** in the theme you are using.

Create these two files and paste the complete matching code from this folder:

| New Shopify file | Code to copy |
| --- | --- |
| `sections/podcover-bestsellers.liquid` | `podcover-bestsellers.liquid` |
| `templates/collection.podcover-bestsellers.liquid` | `collection.podcover-bestsellers.liquid` |

Save both. The second file is a Liquid **collection** template; include `collection.` at the beginning of the filename. Its entire contents are `{% section 'podcover-bestsellers' %}`. No new images or snippets are needed.

## 2. Create the collection

1. Go to **Products → Collections → Create collection**.
2. Name it **Best Sellers** and choose **Manual** as the collection type.
3. Save and add the PodCover products you want in the edit, including sold-out cases.
4. In the collection's Products area, set **Sort → Best selling**. Shopify supplies this order; the theme does not invent sales totals or calculate a ranking.
5. Make the collection available to **Online Store**.
6. Under **Theme template**, choose **podcover-bestsellers** and save.
7. In the collection's search-engine listing settings, check that its URL handle is **best-sellers**. The storefront URL will be `/collections/best-sellers`.

The template normally needs to exist in the published theme before it appears in the collection's Theme template dropdown. If you are editing a theme copy, you can preview the collection with `?view=podcover-bestsellers` in that theme's preview first. Assign the template after that theme becomes active.

Products must be Active and available to Online Store to appear on the storefront. Keeping a product Active with zero stock lets customers view it. The page labels unavailable products **Out of stock** and links to their details using **Explore the case**. Checkout protection comes from Shopify inventory: leave **Continue selling when out of stock** disabled. The page does not alter inventory or enable purchases.

## 3. Connect the Bestsellers menu link

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

## Reminder for the next task

Ask for the PodCover contact page with fields for **email, order number and message**, with submissions reaching **podcoverhelp@gmail.com**.

## Validation

The section and template passed Liquid/HTML parsing; the section settings passed JSON schema parsing, and its inline script passed JavaScript syntax checks. Local browser fixtures covered 320, 375, 390, 430, 699, 700, 768, 999, 1000, 1024, 1280 and 1440 px without horizontal overflow. Functional checks covered available, sold-out, mixed, empty and missing-image cases; variable prices; product links; automatic and native sorting; pagination links; and reduced motion. These checks use local Shopify fixtures; the theme still needs installation in Shopify.
