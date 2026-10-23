/* 小铺优选 · 单商户商城 H5(演示版)
 * 数据存 localStorage;后台密码 123456
 */
const LS = { products: 'shop_products_v1', cart: 'shop_cart_v1', orders: 'shop_orders_v1', shop: 'shop_info_v1' };

const SEED = [
  { id: 'p1', name: '山野冷萃咖啡礼盒', price: 128, emoji: '☕', cat: '饮品', tag: '热卖', desc: '云南单一产区冷萃液，0 糖 0 添加，冷藏保存 15 天，一盒 6 支。' },
  { id: 'p2', name: '手作黄油曲奇', price: 46, emoji: '🍪', cat: '零食', tag: '新品', desc: '动物黄油 + 低筋面粉，每日现烤，酥松不腻，200g 罐装。' },
  { id: 'p3', name: '陶瓷马克杯（雾灰）', price: 59, emoji: '☕', cat: '器物', tag: '', desc: '320ml 手工陶瓷，哑光釉面，可进微波炉与洗碗机。' },
  { id: 'p4', name: '原木香薰蜡烛', price: 89, emoji: '🕯️', cat: '器物', tag: '热卖', desc: '大豆蜡 + 雪松精油，燃烧约 40 小时，附赠灭烛罩。' },
  { id: 'p5', name: '高山红茶（50g）', price: 68, emoji: '🍵', cat: '饮品', tag: '', desc: '海拔 1200 米春茶，蜜香回甘，一罐约 20 泡。' },
  { id: 'p6', name: '棉麻收纳袋', price: 35, emoji: '🧺', cat: '器物', tag: '新品', desc: '加厚棉麻，可水洗，中号 30×40cm，通勤购物两用。' },
  { id: 'p7', name: '海盐坚果混合装', price: 52, emoji: '🥜', cat: '零食', tag: '', desc: '腰果、巴旦木、榛子低温烘焙，轻海盐调味，300g。' },
  { id: 'p8', name: '小铺帆布袋', price: 29, emoji: '👜', cat: '周边', tag: '限量', desc: '12 安帆布，加宽肩带，内置小口袋，A4 可放。' },
];

let products = load(LS.products, null) || SEED.slice();
let cart = load(LS.cart, {});
let orders = load(LS.orders, []);
let shop = load(LS.shop, null) || { name: '小铺优选', sub: '单商户 · 精选好物' };
let filterCat = '全部';

function load(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function money(n) { return '¥' + Number(n).toFixed(2).replace(/\.00$/, ''); }
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1600);
}
function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartTotal() { return Object.entries(cart).reduce((s, [id, q]) => { const p = products.find((x) => x.id === id); return s + (p ? p.price * q : 0); }, 0); }
function findP(id) { return products.find((p) => p.id === id); }
function uid() { return 'D' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 90 + 10); }

function addToCart(id, qty = 1) {
  if (!findP(id)) return;
  cart[id] = (cart[id] || 0) + qty;
  save(LS.cart, cart); syncBadge(); toast('已加入购物车');
}
function setQty(id, q) {
  if (q <= 0) delete cart[id]; else cart[id] = q;
  save(LS.cart, cart); syncBadge(); route();
}
function syncBadge() { document.getElementById('cartCount').textContent = cartCount(); }

/* ---------------- views ---------------- */
function viewHome() {
  const cats = ['全部', ...new Set(products.map((p) => p.cat))];
  const list = products.filter((p) => filterCat === '全部' || p.cat === filterCat);
  return `
  <div class="hero">
    <h1>${esc(shop.name)}</h1>
    <p>本周精选：冷萃咖啡、手作曲奇、原木香薰<br>下单后 48 小时内发货</p>
    <span class="pill">单店直营 · 满 99 包邮</span>
  </div>
  <div class="chips">${cats.map((c) => `<button class="chip ${c === filterCat ? 'active' : ''}" onclick="setCat('${esc(c)}')">${esc(c)}</button>`).join('')}</div>
  <div class="grid">
    ${list.map((p) => `
      <div class="pcard" onclick="location.hash='#product/${p.id}'">
        <div class="thumb">${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ''}${p.emoji}</div>
        <div class="info">
          <div class="name">${esc(p.name)}</div>
          <div class="price">${money(p.price)}<small> / 件</small></div>
          <button class="add" onclick="event.stopPropagation();addToCart('${p.id}')">加入购物车</button>
        </div>
      </div>`).join('')}
  </div>
  <div class="empty">— 到底啦，共 ${list.length} 件商品 —</div>`;
}

function viewProduct(id) {
  const p = findP(id);
  if (!p) return `<div class="empty">商品不存在</div>`;
  return `
  <div class="detail-thumb">${p.emoji}</div>
  <h1 class="detail-name">${esc(p.name)}</h1>
  <div class="muted">分类：${esc(p.cat)}${p.tag ? ' · ' + esc(p.tag) : ''}</div>
  <div class="detail-price">${money(p.price)}</div>
  <div class="card"><div class="detail-desc">${esc(p.desc)}</div></div>
  <div class="card">
    <div class="row"><span class="muted">数量</span>
      <div class="qty">
        <button onclick="setDetailQty(-1)">−</button><span id="dqty">1</span><button onclick="setDetailQty(1)">+</button>
      </div>
    </div>
  </div>
  <button class="btn brand" onclick="addDetail()">加入购物车 · ${money(p.price)}</button>
  <a class="btn ghost" style="margin-top:10px" href="#cart">去购物车结算</a>`;
}

function viewCart() {
  const ids = Object.keys(cart);
  if (!ids.length) return `<div class="empty">购物车还是空的<br><a class="btn sm brand" style="margin-top:14px" href="#home">去逛逛</a></div>`;
  return `
  <div class="section-title">购物车（${cartCount()} 件）</div>
  <div class="card">
    ${ids.map((id) => { const p = findP(id); if (!p) return ''; return `
      <div class="cart-item">
        <div class="cart-thumb">${p.emoji}</div>
        <div class="cart-info"><div class="cart-name">${esc(p.name)}</div><div class="cart-price">${money(p.price)}</div></div>
        <div class="qty">
          <button onclick="setQty('${id}',${cart[id] - 1})">−</button><span>${cart[id]}</span>
          <button onclick="setQty('${id}',${cart[id] + 1})">+</button>
        </div>
      </div>`; }).join('')}
  </div>
  <div class="card">
    <div class="total-row"><span>合计（不含运费）</span><b>${money(cartTotal())}</b></div>
    <div class="muted" style="margin-bottom:10px">满 99 元包邮，未满收 ¥8 运费</div>
    <button class="btn brand" onclick="location.hash='#checkout'">去结算</button>
  </div>`;
}

function viewCheckout() {
  if (!cartCount()) return `<div class="empty">购物车是空的</div>`;
  const ship = cartTotal() >= 99 ? 0 : 8;
  return `
  <div class="section-title">填写收货信息</div>
  <div class="card">
    <div class="field"><label>收货人</label><input id="cName" placeholder="请输入姓名"></div>
    <div class="field"><label>手机号</label><input id="cPhone" placeholder="请输入手机号" inputmode="tel"></div>
    <div class="field"><label>收货地址</label><textarea id="cAddr" placeholder="省 / 市 / 区 / 详细地址"></textarea></div>
  </div>
  <div class="card">
    <div class="total-row"><span>商品小计</span><b>${money(cartTotal())}</b></div>
    <div class="row muted" style="margin-top:6px"><span>运费</span><span>${ship ? money(ship) : '包邮'}</span></div>
    <div class="total-row"><span>应付</span><b>${money(cartTotal() + ship)}</b></div>
    <button class="btn brand" onclick="submitOrder()">提交订单（演示，不扣款）</button>
  </div>`;
}

function viewOrders() {
  if (!orders.length) return `<div class="empty">还没有订单<br><a class="btn sm brand" style="margin-top:14px" href="#home">去下单</a></div>`;
  return `<div class="section-title">我的订单（${orders.length}）</div>` + orders.map((o) => `
    <div class="card">
      <div class="order-head"><span>${o.id} · ${new Date(o.createdAt).toLocaleString('zh-CN', { hour12: false })}</span><span class="status">${esc(o.status)}</span></div>
      ${o.items.map((it) => `<div class="order-item"><span>${it.emoji} ${esc(it.name)} × ${it.qty}</span><span>${money(it.price * it.qty)}</span></div>`).join('')}
      <div class="order-total"><span>合计</span><span>${money(o.total)}</span></div>
    </div>`).join('');
}

function viewAdmin() {
  if (sessionStorage.getItem('shop_admin') !== '1') {
    return `<div class="section-title">后台登录</div>
      <div class="card">
        <div class="field"><label>密码</label><input id="adminPwd" type="password" placeholder="演示密码：123456"></div>
        <button class="btn" onclick="adminLogin()">登录</button>
      </div>`;
  }
  return `
  <div class="admin-head"><div class="section-title" style="margin:0">商品管理（${products.length}）</div><button class="btn sm ghost" onclick="adminLogout()">退出</button></div>
  <div class="card">
    <div class="field"><label>店铺名称</label><input id="sName" value="${esc(shop.name)}"></div>
    <button class="btn sm ghost" onclick="saveShop()">保存店铺信息</button>
  </div>
  <div class="card">
    <div class="section-title" style="margin:0 0 8px">新增商品</div>
    <div class="field"><label>名称</label><input id="pName" placeholder="商品名称"></div>
    <div class="field"><label>价格</label><input id="pPrice" placeholder="如 59" inputmode="decimal"></div>
    <div class="field"><label>分类</label><input id="pCat" placeholder="如 饮品 / 零食 / 器物"></div>
    <div class="field"><label>图标（emoji）</label><input id="pEmoji" placeholder="如 ☕" maxlength="4"></div>
    <button class="btn brand" onclick="addProduct()">添加商品</button>
  </div>
  <div class="card">
    ${products.map((p) => `
      <div class="admin-item">
        <div class="admin-thumb">${p.emoji}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13.5px;font-weight:800">${esc(p.name)}</div>
          <div class="muted">${esc(p.cat)} · ${money(p.price)}</div>
        </div>
        <button class="btn sm ghost" onclick="editProduct('${p.id}')">改价</button>
        <button class="btn sm ghost" onclick="delProduct('${p.id}')">删除</button>
      </div>`).join('')}
  </div>
  <div class="section-title">订单（${orders.length}）</div>
  ${orders.length ? orders.map((o) => `
    <div class="card">
      <div class="order-head"><span>${o.id}</span><span class="status">${esc(o.status)}</span></div>
      <div class="muted">${esc(o.customer.name)} ${esc(o.customer.phone)} · ${esc(o.customer.address)}</div>
      <div class="order-total"><span>合计</span><span>${money(o.total)}</span></div>
      ${o.status === '待发货' ? `<button class="btn sm brand" style="margin-top:8px" onclick="shipOrder('${o.id}')">标记已发货</button>` : ''}
    </div>`).join('') : '<div class="empty">暂无订单</div>'}`;
}

/* ---------------- actions ---------------- */
let detailQty = 1;
function setDetailQty(d) { detailQty = Math.max(1, detailQty + d); const el = document.getElementById('dqty'); if (el) el.textContent = detailQty; }
function addDetail() { const id = location.hash.split('/')[1]; addToCart(id, detailQty); detailQty = 1; syncBadge(); }
function setCat(c) { filterCat = c; route(); }

function submitOrder() {
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const addr = document.getElementById('cAddr').value.trim();
  if (!name || !phone || !addr) { toast('请填写完整的收货信息'); return; }
  if (!/^1\d{10}$/.test(phone)) { toast('手机号格式不对'); return; }
  const ship = cartTotal() >= 99 ? 0 : 8;
  const o = {
    id: uid(), createdAt: new Date().toISOString(),
    items: Object.entries(cart).map(([id, q]) => { const p = findP(id); return { id, name: p.name, price: p.price, qty: q, emoji: p.emoji }; }),
    total: cartTotal() + ship, status: '待发货', customer: { name, phone, address: addr },
  };
  orders.unshift(o); save(LS.orders, orders);
  cart = {}; save(LS.cart, cart); syncBadge();
  document.getElementById('view').innerHTML = `
    <div class="empty">✅ 下单成功<br><b style="color:var(--ink);font-size:18px">订单号 ${o.id}</b><br>商家会尽快联系你<br><br>
    <a class="btn sm brand" href="#orders">查看订单</a></div>`;
}

function adminLogin() {
  const v = document.getElementById('adminPwd').value;
  if (v === '123456') { sessionStorage.setItem('shop_admin', '1'); toast('已登录'); route(); }
  else toast('密码错误（演示密码 123456）');
}
function adminLogout() { sessionStorage.removeItem('shop_admin'); route(); }
function saveShop() { shop.name = document.getElementById('sName').value.trim() || shop.name; save(LS.shop, shop); applyShop(); toast('已保存'); }
function applyShop() { document.querySelector('.shop-name').textContent = shop.name; }
function addProduct() {
  const name = document.getElementById('pName').value.trim();
  const price = parseFloat(document.getElementById('pPrice').value);
  const cat = document.getElementById('pCat').value.trim() || '其他';
  const emoji = document.getElementById('pEmoji').value.trim() || '📦';
  if (!name || !(price > 0)) { toast('请填写名称和有效价格'); return; }
  products.push({ id: 'p' + Date.now(), name, price, cat, emoji, tag: '新品', desc: '新上架商品。' });
  save(LS.products, products); toast('已添加'); route();
}
function editProduct(id) {
  const p = findP(id); if (!p) return;
  const v = prompt('新的价格（元）', p.price);
  if (v === null) return;
  const n = parseFloat(v);
  if (!(n > 0)) { toast('价格无效'); return; }
  p.price = n; save(LS.products, products); toast('已改价'); route();
}
function delProduct(id) {
  if (!confirm('确定删除这个商品？')) return;
  products = products.filter((p) => p.id !== id); save(LS.products, products); toast('已删除'); route();
}
function shipOrder(id) {
  const o = orders.find((x) => x.id === id); if (!o) return;
  o.status = '已发货'; save(LS.orders, orders); toast('已标记发货'); route();
}

/* ---------------- router ---------------- */
function route() {
  const h = location.hash.replace(/^#/, '') || 'home';
  const [name, arg] = h.split('/');
  let html = '';
  if (name === 'home') html = viewHome();
  else if (name === 'product') html = viewProduct(arg);
  else if (name === 'cart') html = viewCart();
  else if (name === 'checkout') html = viewCheckout();
  else if (name === 'orders') html = viewOrders();
  else if (name === 'admin') html = viewAdmin();
  else html = viewHome();
  document.getElementById('view').innerHTML = html;
  document.querySelectorAll('.tabbar a').forEach((a) => a.classList.toggle('active', a.dataset.tab === name));
  syncBadge(); window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => { applyShop(); route(); syncBadge(); });
