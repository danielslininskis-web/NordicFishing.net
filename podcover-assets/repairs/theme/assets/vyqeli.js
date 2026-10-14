(() => {
  'use strict';
  if (window.PodCoverStorefrontInitialized) return;
  window.PodCoverStorefrontInitialized = true;

  function init() {
    const $ = (selector, context = document) => context.querySelector(selector);
    const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
    const configured = window.PodCoverRoutes || {};
    const root = configured.root || window.Shopify?.routes?.root || '/';
    const join = path => root.replace(/\/?$/, '/') + path;
    const routes = {
      cart: configured.cart || join('cart'),
      add: configured.cart_add || join('cart/add'),
      change: configured.cart_change || join('cart/change'),
      all: configured.all_products || join('collections/all')
    };
    const jsonUrl = value => value.replace(/\.js$/, '').replace(/\/$/, '') + '.js';
    const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
    let cart = null;
    const money = cents => {
      try {
        return new Intl.NumberFormat(document.documentElement.lang || 'en', {
          style: 'currency', currency: cart?.currency || window.Shopify?.currency?.active || 'DKK'
        }).format(Number(cents) / 100);
      } catch { return (Number(cents) / 100).toFixed(2); }
    };
    const cleanVariant = value => String(value || '').replace(/\s*\(only for(?: the)? 2 pro\)/gi, '').trim();
    const drawer = $('#cart-drawer');
    const backdrop = $('.drawer-backdrop');
    const content = $('[data-cart-content]', drawer || document);
    let queue = Promise.resolve();
    let opener = null;
    let lastPageFocus = null;
    let previousOverflow = '';
    let background = [];

    function enqueue(task) {
      const result = queue.then(task, task);
      queue = result.catch(() => {});
      return result;
    }

    let status = drawer && $('[data-cart-status]', drawer);
    if (drawer && !status) {
      status = document.createElement('p');
      status.className = 'drawer-status';
      status.dataset.cartStatus = '';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.style.cssText = 'font-size:13px;line-height:1.6;color:#52616d;';
      (content || drawer).before(status);
      if (!content) drawer.append(status);
    }
    const report = (message = '', isError = false) => {
      if (!status) return;
      status.textContent = message;
      status.style.color = isError ? '#9e3329' : '#52616d';
    };

    async function requestCart() {
      const response = await fetch(jsonUrl(routes.cart), { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Your bag could not be loaded. Please try again.');
      return response.json();
    }

    function drawCart(nextCart) {
      cart = nextCart;
      $$('[data-cart-count]').forEach(node => { node.textContent = cart.item_count; });
      if (!content) return;
      const focused = drawer?.contains(document.activeElement) ? document.activeElement : null;
      const focusKey = focused?.dataset.cartKey;
      const focusDelta = focused?.dataset.cartDelta;
      if (!cart.items?.length) {
        content.innerHTML = '<div class="empty-cart"><p>Your bag is waiting for something good.</p><a class="pill dark" href="' + escapeHtml(routes.all) + '">Explore the cases ↗</a></div>';
      } else {
        content.innerHTML = cart.items.map(item => {
          const key = escapeHtml(item.key || item.variant_id || item.id);
          const title = escapeHtml(item.product_title || item.title);
          const variant = item.variant_title && item.variant_title !== 'Default Title'
            ? '<p>' + escapeHtml(cleanVariant(item.variant_title)) + '</p>' : '';
          const properties = Object.entries(item.properties || {}).filter(([name, value]) => value && !name.startsWith('_')).map(([name, value]) => '<p>' + escapeHtml(name) + ': ' + escapeHtml(value) + '</p>').join('');
          const oldPrice = item.original_line_price > item.final_line_price ? '<s>' + money(item.original_line_price) + '</s> ' : '';
          const image = item.image ? '<img src="' + escapeHtml(item.image) + '" alt="' + title + '" width="90" height="90" loading="lazy" style="object-fit:contain">' : '<div style="width:90px;min-height:90px;display:grid;place-items:center;background:#f3f6f9;font-size:12px">PodCover</div>';
          return '<div class="drawer-item">' + image + '<div class="drawer-item-info"><a href="' + escapeHtml(item.url) + '">' + title + '</a>' + variant + properties + '<p>' + oldPrice + money(item.final_line_price) + '</p><div class="drawer-qty"><button type="button" data-cart-key="' + key + '" data-cart-delta="-1" aria-label="Remove one ' + title + '">−</button><span aria-label="Quantity">' + item.quantity + '</span><button type="button" data-cart-key="' + key + '" data-cart-delta="1" aria-label="Add one ' + title + '">+</button></div></div></div>';
        }).join('') + '<div class="drawer-total"><span>Estimated total</span><strong>' + money(cart.total_price) + '</strong></div><p style="font-size:13px;line-height:1.6">Free standard shipping. Delivery methods and taxes confirmed at checkout.</p><form action="' + escapeHtml(routes.cart) + '" method="post"><button type="submit" name="checkout" class="pill dark drawer-checkout">Checkout ↗</button></form><p><a href="' + escapeHtml(routes.cart) + '">View full bag</a></p>';
      }
      if (focusKey && isOpen()) {
        const replacement = $$('[data-cart-key]', content).find(button => button.dataset.cartKey === focusKey && button.dataset.cartDelta === focusDelta);
        (replacement || $('[data-close-cart]', drawer) || drawer).focus();
      } else if (focused && !focused.isConnected && isOpen()) {
        ($('[data-close-cart]', drawer) || drawer).focus();
      }
    }

    function refreshCart() {
      return enqueue(async () => {
        try {
          drawCart(await requestCart());
          report();
        } catch (error) {
          report(error.message, true);
          if (!cart && content) content.innerHTML = '<p class="drawer-error">Could not load your bag. <a href="' + escapeHtml(routes.cart) + '">Open the cart page</a>.</p>';
        }
      });
    }

    function changeQuantity(key, delta) {
      return enqueue(async () => {
        try {
          if (!cart) cart = await requestCart();
          const item = cart.items.find(candidate => String(candidate.key || candidate.variant_id || candidate.id) === key);
          if (!item) return;
          const quantity = Math.max(0, Number(item.quantity) + delta);
          report('Updating your bag…');
          const response = await fetch(jsonUrl(routes.change), {
            method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ id: key, quantity })
          });
          const updated = await response.json();
          if (!response.ok) throw new Error(updated.description || updated.message || 'Could not update your bag. Please try again.');
          drawCart(updated);
          report('Bag updated.');
        } catch (error) {
          try { drawCart(await requestCart()); } catch {}
          report(error.message, true);
        }
      });
    }

    function isOpen() { return !!drawer && !drawer.hidden && drawer.classList.contains('open'); }

    function makeBackgroundInert() {
      background = [];
      let child = drawer;
      while (child?.parentElement && child.parentElement !== document.documentElement) {
        [...child.parentElement.children].forEach(sibling => {
          if (sibling === child || sibling === backdrop || ['SCRIPT', 'STYLE', 'LINK'].includes(sibling.tagName)) return;
          background.push({ element: sibling, wasInert: sibling.inert });
          sibling.inert = true;
        });
        child = child.parentElement;
      }
    }

    function focusable() {
      if (!drawer) return [];
      return $$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', drawer)
        .filter(element => !element.closest('[hidden],[inert]') && element.getClientRects().length > 0);
    }

    function openCart(trigger) {
      if (!drawer) { window.location.assign(routes.cart); return; }
      if (!isOpen()) {
        opener = document.activeElement && document.activeElement !== document.body
          ? document.activeElement : (lastPageFocus?.isConnected ? lastPageFocus : trigger);
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        drawer.hidden = false;
        drawer.inert = false;
        drawer.setAttribute('aria-hidden', 'false');
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.setAttribute('tabindex', '-1');
        drawer.classList.add('open');
        if (backdrop) backdrop.hidden = false;
        makeBackgroundInert();
        $$('[data-open-cart]').forEach(button => button.setAttribute('aria-expanded', 'true'));
        ($('[data-close-cart]', drawer) || drawer).focus();
      }
      refreshCart();
    }

    function closeCart() {
      if (!drawer || !isOpen()) return;
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.inert = true;
      drawer.hidden = true;
      if (backdrop) backdrop.hidden = true;
      background.forEach(({ element, wasInert }) => { element.inert = wasInert; });
      background = [];
      document.body.style.overflow = previousOverflow;
      $$('[data-open-cart]').forEach(button => button.setAttribute('aria-expanded', 'false'));
      if (opener?.isConnected && !opener.closest('[hidden],[inert]')) opener.focus();
      opener = null;
    }

    if (drawer) {
      drawer.hidden = true;
      drawer.inert = true;
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('tabindex', '-1');
    }
    if (backdrop) backdrop.hidden = true;

    function togglePanel(button, selector, openLabel, closeLabel) {
      const panel = document.getElementById(button.getAttribute('aria-controls')) || $(selector);
      if (!panel) return;
      panel.hidden = !panel.hidden;
      button.setAttribute('aria-expanded', String(!panel.hidden));
      button.setAttribute('aria-label', panel.hidden ? openLabel : closeLabel);
      if (!panel.hidden && selector === '.search-bar') $('input[type="search"]', panel)?.focus();
    }

    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      const cartTrigger = target.closest('[data-open-cart]');
      if (cartTrigger) { event.preventDefault(); openCart(cartTrigger); return; }
      if (target.closest('[data-close-cart]')) { event.preventDefault(); closeCart(); return; }
      const quantityButton = target.closest('[data-cart-key][data-cart-delta]');
      if (quantityButton) {
        event.preventDefault();
        changeQuantity(quantityButton.dataset.cartKey, Number(quantityButton.dataset.cartDelta));
        return;
      }
      const searchToggle = target.closest('[data-search-toggle]');
      if (searchToggle) { togglePanel(searchToggle, '.search-bar', 'Open search', 'Close search'); return; }
      const menuToggle = target.closest('[data-menu-toggle]');
      if (menuToggle) { togglePanel(menuToggle, '.mobile-nav', 'Open navigation', 'Close navigation'); }
    });

    document.addEventListener('keydown', event => {
      if (isOpen()) {
        if (event.key === 'Escape') { event.preventDefault(); closeCart(); }
        if (event.key === 'Tab') {
          const targets = focusable();
          if (!targets.length) { event.preventDefault(); drawer.focus(); return; }
          const first = targets[0], last = targets[targets.length - 1];
          if (event.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
            event.preventDefault(); last.focus();
          } else if (!event.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
            event.preventDefault(); first.focus();
          }
        }
      } else if (event.key === 'Escape') {
        $$('[data-search-toggle],[data-menu-toggle]').forEach(button => {
          const panel = document.getElementById(button.getAttribute('aria-controls'));
          if (panel && !panel.hidden) {
            panel.hidden = true;
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', button.matches('[data-search-toggle]') ? 'Open search' : 'Open navigation');
            button.focus();
          }
        });
      }
    });

    document.addEventListener('focusin', event => {
      if (isOpen() && !drawer.contains(event.target)) (focusable()[0] || drawer).focus();
      else if (!isOpen() && event.target !== document.body) lastPageFocus = event.target;
    });

    // Legacy product markup remains supported; the current pc-product form has its own controller.
    const form = $('#product-form');
    const data = $('#product-variants');
    if (form && data && !form.classList.contains('pc-product-form')) {
      let variants = [];
      try { variants = JSON.parse(data.textContent); } catch {}
      const options = $$('.variant-option', form);
      const variantInput = $('#selected-variant', form);
      const button = $('.buy-button', form);
      const quantityInput = $('#product-quantity', form);
      function sync() {
        const selected = options.map(option => option.value);
        const variant = variants.find(item => item.options.every((option, index) => option === selected[index]));
        if (!button || !variantInput) return;
        if (!variant) { button.disabled = true; button.textContent = 'Unavailable combination'; return; }
        variantInput.value = variant.id;
        button.disabled = !variant.available;
        button.textContent = variant.available ? 'Add to bag — ' + money(variant.price) : 'Out of stock';
        const price = $('#product-price');
        if (price) price.textContent = money(variant.price);
      }
      options.forEach(option => option.addEventListener('change', sync));
      $('[data-qty-minus]', form)?.addEventListener('click', () => {
        if (quantityInput) quantityInput.value = Math.max(1, Number(quantityInput.value) - 1);
      });
      $('[data-qty-plus]', form)?.addEventListener('click', () => {
        if (quantityInput) quantityInput.value = Math.max(1, Number(quantityInput.value) + 1);
      });
      form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!button || button.disabled) return;
        const message = $('.form-message', form);
        button.disabled = true;
        if (message) message.textContent = 'Adding to bag…';
        try {
          const response = await fetch(jsonUrl(routes.add), { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          const result = await response.json();
          if (!response.ok) throw new Error(result.description || 'Could not add this item.');
          if (message) message.textContent = 'Added to bag.';
          openCart(button);
        } catch (error) { if (message) message.textContent = error.message; }
        finally { sync(); }
      });
      sync();
    }

    $$('.thumb[data-image-url]').forEach(button => button.addEventListener('click', () => {
      const image = $('#product-main-image img');
      if (image) { image.src = button.dataset.imageUrl; image.srcset = ''; image.alt = button.dataset.imageAlt || ''; }
      $$('.pdp-thumbnails .thumb').forEach(thumbnail => {
        const selected = thumbnail === button;
        thumbnail.classList.toggle('is-selected', selected);
        thumbnail.setAttribute('aria-pressed', String(selected));
      });
      const counter = $('#pdp-photo-count');
      if (counter) counter.textContent = String(button.dataset.photoIndex || 1).padStart(2, '0') + ' / ' + String($$('.pdp-thumbnails .thumb').length).padStart(2, '0');
    }));

    document.addEventListener('cart:refresh', refreshCart);
    if (content) refreshCart();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
