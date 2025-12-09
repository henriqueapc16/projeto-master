
(function () {
  // Aguarda a base carregar
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // --- Cart UI no header
    injectCartButton();
    // --- Painel do carrinho
    buildCartDrawer();
    // --- Monkey-patch addToCart (preserva notificação)
    patchAddToCart();
    // --- Liga a barra de busca da Home
    wireSearchBar();
    // --- Carrega carrinho persistido
    Cart.load();
    Cart.updateBadge();
  }

  /* ====================== CARRINHO ====================== */
  const Cart = (function () {
    const STORE_KEY = () => `barberconnect_cart_${window.currentUser ? window.currentUser.id : 'anon'}`;
    let items = []; // {id, name, price, image, barbershopName, qty}

    function save() {
      try { localStorage.setItem(STORE_KEY(), JSON.stringify(items)); } catch {}
    }
    function load() {
      try {
        const raw = localStorage.getItem(STORE_KEY());
        items = raw ? JSON.parse(raw) : [];
      } catch { items = []; }
      render();
    }
    function clear() { items = []; save(); render(); updateBadge(); showNotificationSafe('Carrinho limpo!'); }
    function add(product, qty = 1) {
      const found = items.find(i => i.id === product.id);
      if (found) { found.qty += qty; }
      else {
        items.push({
          id: product.id, name: product.name, price: product.price,
          image: product.image, barbershopName: product.__barbershopName || 'Barbearia',
          qty
        });
      }
      save(); render(); updateBadge();
    }
    function remove(id) {
      items = items.filter(i => i.id !== id);
      save(); render(); updateBadge();
    }
    function total() { return items.reduce((s, i) => s + i.price * i.qty, 0); }

    function render() {
      const list = document.querySelector('#bc-cart-items');
      const totalEl = document.querySelector('#bc-cart-total');
      if (!list) return;

      if (items.length === 0) {
        list.innerHTML = `
          <div class="text-center text-gray-400 py-6">
            <i class="fas fa-shopping-cart text-2xl mb-2"></i>
            <p>Seu carrinho está vazio</p>
          </div>`;
      } else {
        list.innerHTML = items.map(i => `
          <div class="bc-cart-item">
            <img src="${i.image}" alt="${i.name}">
            <div style="flex:1">
              <div style="display:flex; justify-content:space-between; gap:8px;">
                <strong>${i.name}</strong>
                <span style="color:#f59e0b">R$ ${i.price.toFixed(2)}</span>
              </div>
              <div class="text-gray-400 text-sm">Loja: ${i.barbershopName} • Qtde: ${i.qty}</div>
              <div class="bc-cart-actions">
                <button class="bc-btn bc-btn-gray" onclick="window.__CartAPI.addQty(${i.id}, 1)">+1</button>
                <button class="bc-btn bc-btn-gray" onclick="window.__CartAPI.addQty(${i.id}, -1)">-1</button>
                <button class="bc-btn bc-btn-red"  onclick="window.__CartAPI.remove(${i.id})">
                  <i class="fas fa-trash mr-1"></i> Remover
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
      if (totalEl) totalEl.textContent = `R$ ${total().toFixed(2)}`;
    }

    function addQty(id, delta) {
      const item = items.find(i => i.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) remove(id); else { save(); render(); updateBadge(); }
    }

    function updateBadge() {
      const badge = document.querySelector('#bc-cart-badge');
      if (!badge) return;
      const count = items.reduce((s, i) => s + i.qty, 0);
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.style.display = count ? 'block' : 'none';
    }

    function open() {
      document.querySelector('#bc-cart-overlay')?.classList.add('active');
      document.querySelector('#bc-cart-drawer')?.classList.add('active');
    }
    function close() {
      document.querySelector('#bc-cart-overlay')?.classList.remove('active');
      document.querySelector('#bc-cart-drawer')?.classList.remove('active');
    }

    // API pública
    window.__CartAPI = { remove, addQty, clear, open, close, add, load, updateBadge };

    return { add, remove, clear, load, updateBadge, open, close };
  })();

  function injectCartButton() {
    const rightBox = document.querySelector('header .flex.items-center.space-x-4');
    if (!rightBox || document.querySelector('#bc-cart-button')) return;

    const btn = document.createElement('button');
    btn.id = 'bc-cart-button';
    btn.className = 'bc-cart-btn text-white hover:text-yellow-400 transition-colors';
    btn.innerHTML = '<i class="fas fa-shopping-cart text-xl"></i><span id="bc-cart-badge" class="bc-cart-badge" style="display:none">0</span>';
    btn.addEventListener('click', () => Cart.open());

    rightBox.appendChild(btn);
  }

  function buildCartDrawer() {
    if (document.querySelector('#bc-cart-drawer')) return;

    const overlay = document.createElement('div');
    overlay.id = 'bc-cart-overlay';
    overlay.className = 'bc-cart-overlay';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) Cart.close();
    });

    const drawer = document.createElement('div');
    drawer.id = 'bc-cart-drawer';
    drawer.className = 'bc-cart-drawer';

    drawer.innerHTML = `
      <div class="bc-cart-header flex justify-between items-center">
        <div class="flex items-center gap-2">
          <i class="fas fa-shopping-cart text-yellow-400"></i>
          <strong>Carrinho</strong>
        </div>
        <button class="bc-btn bc-btn-gray" onclick="window.__CartAPI.close()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div id="bc-cart-items" class="bc-cart-items"></div>
      <div class="bc-cart-footer">
        <div class="bc-total">
          <span>Total</span>
          <span id="bc-cart-total">R$ 0,00</span>
        </div>
        <div class="flex gap-2 mt-3">
          <button class="bc-btn bc-btn-gray flex-1" onclick="window.__CartAPI.clear()">
            <i class="fas fa-trash mr-1"></i> Limpar
          </button>
          <button class="bc-btn bc-btn-yellow flex-1" onclick="finalizePurchase()">
            <i class="fas fa-credit-card mr-1"></i> Finalizar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    Cart.load();
  }

  function finalizePurchase() {
    if (!window.currentUser) { showNotificationSafe('Faça login para finalizar!', 'error'); return; }
    showNotificationSafe('Compra finalizada (exemplo)!');
    Cart.clear();
    Cart.close();
  }

  function patchAddToCart() {
    const original = window.addToCart;
    window.addToCart = function (productId) {
      if (typeof original === 'function') original(productId);
      if (!window.currentUser) return;
      const found = findProductEverywhere(productId);
      if (!found) { showNotificationSafe('Produto não encontrado', 'error'); return; }
      Cart.add(found, 1);
      showNotificationSafe('Produto adicionado ao carrinho!');
    };
  }

  function findProductEverywhere(productId) {
    if (!Array.isArray(window.barbershops)) return null;
    for (const b of window.barbershops) {
      const p = (b.products || []).find(x => x.id === productId);
      if (p) return { ...p, __barbershopName: b.name };
    }
    return null;
  }

  function showNotificationSafe(message, type = 'success') {
    try { window.showNotification(message, type); } catch { alert(message); }
  }

  /* ====================== BUSCA DE BARBEARIAS ====================== */
  function wireSearchBar() {
    const input = document.querySelector('input[placeholder="Buscar barbearias..."]');
    const button = input ? input.parentElement?.querySelector('button') : null;
    if (!input || !button) return;

    let lastTimer = null;

    input.addEventListener('input', () => {
      if (lastTimer) clearTimeout(lastTimer);
      lastTimer = setTimeout(() => doSearch(input.value.trim()), 200);
    });

    button.addEventListener('click', () => doSearch(input.value.trim()));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(input.value.trim()); });
  }

  function doSearch(query) {
    if (!query) {
      renderBarbershopsList(window.barbershops);
      return;
    }
    const q = normalize(query);
    const results = (window.barbershops || []).filter(b => {
      const inName = normalize(b.name).includes(q);
      const inAddress = normalize(b.address).includes(q);
      const inServices = (b.services || []).some(s => normalize(s).includes(q));
      return inName || inAddress || inServices;
    });

    try { window.showAppSection('barbershops'); } catch {}
    renderBarbershopsList(results);
  }

  function renderBarbershopsList(list) {
    const container = document.getElementById('barbershopsList');
    if (!container) return;

    if (!list || list.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-8">
          <i class="fas fa-search text-4xl text-gray-600 mb-4"></i>
          <p class="text-gray-400">Nenhuma barbearia encontrada para sua busca</p>
        </div>`;
      return;
    }

    container.innerHTML = list.map(barbershop => `
      <div class="barbershop-card rounded-lg overflow-hidden card-hover">
        <div class="flex">
          <img src="${barbershop.image}" alt="${barbershop.name}" class="w-32 h-32 object-cover">
          <div class="flex-1 p-4">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-lg font-semibold">${barbershop.name}</h4>
              <button onclick="toggleFavorite(${barbershop.id})" class="text-gray-400 hover:text-yellow-400">
                <i class="fas fa-heart ${Array.isArray(window.favorites) && window.favorites.includes(barbershop.id) ? 'text-yellow-400' : ''}"></i>
              </button>
            </div>
            <p class="text-gray-400 text-sm mb-2">${barbershop.address}</p>
            <div class="flex items-center mb-2">
              <div class="star-rating mr-2 text-sm">${window.generateStars ? window.generateStars(barbershop.rating) : ''}</div>
              <span class="text-sm text-gray-300">${barbershop.rating} (${barbershop.reviews || 0})</span>
            </div>
            <div class="flex flex-wrap gap-1 mb-3">
              ${(barbershop.services || []).slice(0, 3).map(service => `
                <span class="bg-yellow-600 text-black px-2 py-1 rounded text-xs">${service}</span>
              `).join('')}
            </div>
            <div class="flex justify-between items-center">
              <span class="text-yellow-400 font-semibold text-sm">${barbershop.priceRange || ''}</span>
              <button onclick="viewBarbershop(${barbershop.id})" class="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-1 rounded text-sm transition-colors">
                Ver Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function normalize(s) {
    return (s || '')
      .toString()
      .toLowerCase()
      .normalize('NFD').replace(/\p{Diacritic}/gu, '');
  }
})();
