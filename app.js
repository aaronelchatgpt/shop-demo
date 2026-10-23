/* 栖 · 家居 —— 单商户家具家居商城(演示版)
 * 数据存 localStorage;后台密码 123456
 */
const LS = { products: 'home_products_v1', cart: 'home_cart_v1', orders: 'home_orders_v1', shop: 'home_shop_v1' };

const ICONS = {
  sofa: '<svg viewBox="0 0 64 64"><path d="M12 34v-9a6 6 0 0 1 6-6h28a6 6 0 0 1 6 6v9"/><path d="M8 34a4 4 0 0 1 8 0v9h32v-9a4 4 0 0 1 8 0v11a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z"/><path d="M18 34h28"/></svg>',
  table: '<svg viewBox="0 0 64 64"><path d="M8 26h48"/><path d="M12 26v-4h40v4"/><path d="M16 30v18M48 30v18M16 40h32"/></svg>',
  chair: '<svg viewBox="0 0 64 64"><path d="M20 12v28h24V12"/><path d="M18 40h28l-2 14H20z"/><path d="M22 54v4M42 54v4"/></svg>',
  vase: '<svg viewBox="0 0 64 64"><path d="M26 14h12l-2 8c8 6 8 26 0 30H28c-8-4-8-24 0-30z"/><path d="M26 14h12"/></svg>',
  bed: '<svg viewBox="0 0 64 64"><path d="M8 44V26h48v18"/><path d="M8 36h48"/><path d="M14 26v-8h14a4 4 0 0 1 4 4v4"/><path d="M8 44v8M56 44v8"/></svg>',
  lamp: '<svg viewBox="0 0 64 64"><path d="M32 8v30"/><path d="M20 8h24l-4 14H24z"/><path d="M22 46h20l-4 10H26z"/></svg>',
  rug: '<svg viewBox="0 0 64 64"><rect x="10" y="16" width="44" height="32" rx="3"/><path d="M16 22h32M16 28h32M16 34h32M16 40h32"/></svg>',
  basket: '<svg viewBox="0 0 64 64"><path d="M14 22h36l-4 28H18z"/><path d="M22 22a10 10 0 0 1 20 0"/><path d="M26 30v14M32 30v14M38 30v14"/></svg>',
  cabinet: '<svg viewBox="0 0 64 64"><rect x="14" y="10" width="36" height="44" rx="2"/><path d="M32 10v44"/><path d="M26 30v8M38 30v8"/><path d="M18 54v4M46 54v4"/></svg>',
  mirror: '<svg viewBox="0 0 64 64"><ellipse cx="32" cy="26" rx="16" ry="20"/><path d="M32 46v8"/><path d="M22 54h20"/></svg>',
  shelf: '<svg viewBox="0 0 64 64"><rect x="12" y="8" width="40" height="48" rx="2"/><path d="M12 24h40M12 40h40"/><path d="M20 14v6M28 14v6M36 14v6M44 14v6"/></svg>',
  diffuser: '<svg viewBox="0 0 64 64"><path d="M24 30h16v22a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z"/><path d="M28 30V18h8v12"/><path d="M32 18V6"/><path d="M32 12l8-4M32 16l-8-4"/></svg>',
};

const SEED = [
  { id: 'p1', name: '云几布艺沙发', kind: 'sofa', cat: '客厅', tag: '新品', price: 3980, desc: '三人位，高回弹海绵，可拆洗棉麻面料，坐深 58cm。' },
  { id: 'p2', name: '胡桃木餐桌', kind: 'table', cat: '餐厅', tag: '', price: 2680, desc: '1.6m 实木餐桌，哑光木蜡油饰面，保留自然木纹。' },
  { id: 'p3', name: '千纸鹤单椅', kind: 'chair', cat: '客厅', tag: '', price: 1280, desc: '白蜡木框架，手工编织坐面，轻巧可移动。' },
  { id: 'p4', name: '手作陶土花器', kind: 'vase', cat: '软装', tag: '', price: 268, desc: '手拉坯成型，自然落灰釉，每一件纹理略有不同。' },
  { id: 'p5', name: '亚麻四件套', kind: 'bed', cat: '卧室', tag: '热卖', price: 899, desc: '100% 亚麻，水洗工艺，透气亲肤，四色可选。' },
  { id: 'p6', name: '黄铜落地灯', kind: 'lamp', cat: '客厅', tag: '', price: 1580, desc: '黄铜灯杆，亚麻灯罩，三档调光，营造柔和氛围。' },
  { id: 'p7', name: '手工羊毛地毯', kind: 'rug', cat: '软装', tag: '', price: 2280, desc: '2×3m，手工簇绒，新西兰羊毛，脚感厚实。' },
  { id: 'p8', name: '藤编收纳篮', kind: 'basket', cat: '收纳', tag: '', price: 198, desc: '天然藤编，中号，可叠放，适合衣物与杂物。' },
  { id: 'p9', name: '黑胡桃边柜', kind: 'cabinet', cat: '客厅', tag: '新品', price: 4680, desc: '实木柜体，黄铜把手，两门三抽，收纳与展示兼顾。' },
  { id: 'p10', name: '立式穿衣镜', kind: 'mirror', cat: '卧室', tag: '', price: 1080, desc: '橡木框，防爆镜面，可倾斜角度。' },
  { id: 'p11', name: '实木书架', kind: 'shelf', cat: '书房', tag: '', price: 1880, desc: '五层开放格，白橡木，承重稳，适合藏书与陈列。' },
  { id: 'p12', name: '香薰陶瓷扩香', kind: 'diffuser', cat: '软装', tag: '', price: 328, desc: '无火扩香，木质调，含藤条与 200ml 精油。' },
];

let products = load(LS.products, null) || SEED.slice();
let cart = load(LS.cart, {});
let orders = load(LS.orders, []);
let shop = load(LS.shop, null) || { name: '栖 · 家居', sub: 'FURNITURE & HOME' };
let searchQ = '';
let filterCat = '全部';

function load(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function money(n) { return '¥' + Number(n).toLocaleString('zh-CN'); }
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function icon(kind) { return ICONS[kind] || ICONS.shelf; }

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1600);
}
function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartTotal() { return Object.entries(cart).reduce((s, [id, q]) => { const p = products.find((x) => x.id === id); return s + (p ? p.price * q : 0); }, 0); }
function findP(id) { return products.find((p) => p.id === id); }
function uid() { return 'HM' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 90 + 10); }

function addToCart(id, qty = 1) {
  if (!findP(id)) return;
  cart[id] = (cart[id] || 0) + qty;
  save(LS.cart, cart); syncBadge(); toast('已加入购物袋');
}
function setQty(id, q) { if (q <= 0) delete cart[id]; else cart[id] = q; save(LS.cart, cart); syncBadge(); route(); }
function syncBadge() { document.getElementById('cartCount').textContent = cartCount(); }

/* ---------- 广告位 ---------- */
function heroAd() {
  return `<div class="hero">
    <div class="eyebrow">2026 AUTUMN / WINTER</div>
    <h1>木与光</h1>
    <p>让家回归安静与秩序<br>实木 · 亚麻 · 黄铜 · 手作</p>
    <a class="cta" href="javascript:document.querySelector('.grid')?.scrollIntoView({behavior:'smooth'})">探索系列</a>
  </div>`;
}
function midAd() {
  return `<div class="ad">
    <div><div class="lbl">SERVICE</div><h3>空间搭配服务</h3><p>专业设计师 1 对 1 提案<br>免费上门量尺</p></div>
    <span class="adcta" onclick="toast('已记录，稍后与你联系')">预约</span>
  </div>`;
}
function bottomAd() {
  return `<div class="ad dark">
    <div><div class="lbl">MEMBER</div><h3>会员专享</h3><p>首单 9 折 · 满 2999 包安装</p></div>
    <span class="adcta" onclick="toast('会员权益即将上线')">了解</span>
  </div>`;
}

/* ---------- 视图 ---------- */
function pcard(p) {
  return `<div class="pcard" onclick="location.hash='#product/${p.id}'">
    <div class="thumb">${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ''}${icon(p.kind)}</div>
    <div class="info">
      <div class="name">${esc(p.name)}</div>
      <div class="cat">${esc(p.cat)}</div>
      <div class="price">${money(p.price)}</div>
      <button class="add" onclick="event.stopPropagation();addToCart('${p.id}')">加入购物袋</button>
    </div>
  </div>`;
}

function viewHome() {
  const q = searchQ.trim().toLowerCase();
  const list = products.filter((p) => {
    const okQ = !q || (p.name + p.desc + p.cat + (p.tag || '')).toLowerCase().includes(q);
    const okC = filterCat === '全部' || p.cat === filterCat;
    return okQ && okC;
  });
  if (q) {
    return `<div class="sechead"><div><div class="lbl">SEARCH</div><h2>“${esc(searchQ)}”</h2></div><span class="more">${list.length} 件</span></div>
      ${list.length ? `<div class="grid">${list.map(pcard).join('')}</div>` : '<div class="empty">没有找到相关商品<br>换个关键词试试</div>'}`;
  }
  const first = list.slice(0, 8);
  const rest = list.slice(8);
  return `
    ${heroAd()}
    <div class="sechead"><div><div class="lbl">COLLECTION</div><h2>精选系列</h2></div><span class="more">${list.length} 件</span></div>
    <div class="grid">${first.map(pcard).join('')}</div>
    ${midAd()}
    ${rest.length ? `<div class="sechead"><div><div class="lbl">MORE</div><h2>更多单品</h2></div></div><div class="grid">${rest.map(pcard).join('')}</div>` : ''}
    ${bottomAd()}`;
}

function viewProduct(id) {
  const p = findP(id);
  if (!p) return `<div class="empty">商品不存在</div>`;
  const slides = [
    { cls: 'v1', label: '正面' },
    { cls: 'v2', label: '细节' },
    { cls: 'v3', label: '场景' },
    { cls: 'v4', label: '侧面' },
    { cls: 'v5', label: '包装' },
  ];
  return `
  <div class="detail-layout">
    <div class="detail-media">
      <div class="gallery" id="gallery" onscroll="onGalleryScroll()">
        ${slides.map((s, i) => `<div class="slide ${s.cls}"><div class="stage">${icon(p.kind)}</div><span class="vnum">${i + 1} / 5</span><span class="vlabel">${s.label}</span></div>`).join('')}
      </div>
      <div class="thumbs" id="thumbs">
        ${slides.map((s, i) => `<button class="thumb-i ${i === 0 ? 'active' : ''}" onclick="goSlide(${i})">${icon(p.kind)}</button>`).join('')}
      </div>
    </div>
    <div class="detail-info">
      <h1 class="detail-name">${esc(p.name)}</h1>
      <div class="detail-sub">${esc(p.cat)}${p.tag ? ' · ' + esc(p.tag) : ''}</div>
      <div class="detail-price">${money(p.price)}</div>
      <div class="card"><div class="detail-desc">${esc(p.desc)}</div></div>
      <div class="card">
        <div class="row muted"><span>送货</span><span>入户安装 · 满 2999 包邮</span></div>
        <div class="row muted" style="margin-top:10px"><span>服务</span><span>7 天无理由 · 一年质保</span></div>
      </div>
      <div class="card"><div class="row"><span class="muted">数量</span>
        <div class="qty"><button onclick="setDetailQty(-1)">−</button><span id="dqty">1</span><button onclick="setDetailQty(1)">+</button></div>
      </div></div>
      <button class="btn brand" onclick="addDetail()">加入购物袋</button>
      <a class="btn ghost" style="margin-top:10px" href="#cart">查看购物袋</a>
    </div>
  </div>`;
}

function goSlide(i) {
  const g = document.getElementById('gallery');
  if (!g) return;
  g.scrollTo({ left: i * g.clientWidth, behavior: 'smooth' });
}
function onGalleryScroll() {
  const g = document.getElementById('gallery');
  if (!g) return;
  const idx = Math.round(g.scrollLeft / g.clientWidth);
  document.querySelectorAll('#thumbs .thumb-i').forEach((b, i) => b.classList.toggle('active', i === idx));
}

function viewCart() {
  const ids = Object.keys(cart);
  if (!ids.length) return `<div class="empty">购物袋是空的<br><a class="btn sm ghost" style="margin-top:16px" href="#home">去逛逛</a></div>`;
  return `<div class="sechead"><div><div class="lbl">BAG</div><h2>购物袋</h2></div><span class="more">${cartCount()} 件</span></div>
  <div class="card">
    ${ids.map((id) => { const p = findP(id); if (!p) return ''; return `
      <div class="cart-item">
        <div class="cart-thumb">${icon(p.kind)}</div>
        <div class="cart-info"><div class="cart-name">${esc(p.name)}</div><div class="cart-price">${money(p.price)}</div></div>
        <div class="qty"><button onclick="setQty('${id}',${cart[id] - 1})">−</button><span>${cart[id]}</span><button onclick="setQty('${id}',${cart[id] + 1})">+</button></div>
      </div>`; }).join('')}
  </div>
  <div class="card">
    <div class="total-row"><span>合计（不含运费）</span><b>${money(cartTotal())}</b></div>
    <div class="muted" style="margin-bottom:12px">满 2999 元包邮并含安装，未满收 ¥60 运费</div>
    <button class="btn brand" onclick="location.hash='#checkout'">去结算</button>
  </div>`;
}

function viewCheckout() {
  if (!cartCount()) return `<div class="empty">购物袋是空的</div>`;
  const ship = cartTotal() >= 2999 ? 0 : 60;
  return `<div class="sechead"><div><div class="lbl">CHECKOUT</div><h2>收货信息</h2></div></div>
  <div class="card">
    <div class="field"><label>收货人</label><input id="cName" placeholder="请输入姓名"></div>
    <div class="field"><label>手机号</label><input id="cPhone" placeholder="请输入手机号" inputmode="tel"></div>
    <div class="field"><label>收货地址</label><textarea id="cAddr" placeholder="省 / 市 / 区 / 详细地址"></textarea></div>
  </div>
  <div class="card">
    <div class="total-row"><span>商品小计</span><b>${money(cartTotal())}</b></div>
    <div class="row muted" style="margin:6px 0"><span>运费与安装</span><span>${ship ? money(ship) : '包邮含安装'}</span></div>
    <div class="total-row"><span>应付</span><b>${money(cartTotal() + ship)}</b></div>
    <button class="btn brand" onclick="submitOrder()">提交订单（演示，不扣款）</button>
  </div>`;
}

function viewOrders() {
  if (!orders.length) return `<div class="empty">还没有订单<br><a class="btn sm ghost" style="margin-top:16px" href="#home">去下单</a></div>`;
  return `<div class="sechead"><div><div class="lbl">ORDERS</div><h2>我的订单</h2></div><span class="more">${orders.length}</span></div>` + orders.map((o) => `
    <div class="card">
      <div class="order-head"><span>${o.id} · ${new Date(o.createdAt).toLocaleString('zh-CN', { hour12: false })}</span><span class="status">${esc(o.status)}</span></div>
      ${o.items.map((it) => `<div class="order-item"><span>${esc(it.name)} × ${it.qty}</span><span>${money(it.price * it.qty)}</span></div>`).join('')}
      <div class="order-total"><span>合计</span><span>${money(o.total)}</span></div>
    </div>`).join('');
}

function viewAdmin() {
  if (sessionStorage.getItem('home_admin') !== '1') {
    return `<div class="sechead"><div><div class="lbl">ADMIN</div><h2>后台登录</h2></div></div>
      <div class="card">
        <div class="field"><label>密码</label><input id="adminPwd" type="password" placeholder="演示密码：123456"></div>
        <button class="btn" onclick="adminLogin()">登录</button>
      </div>`;
  }
  return `<div class="admin-head"><div><div class="lbl" style="font-size:9.5px;letter-spacing:3px;color:var(--brass)">ADMIN</div><h2 class="serif" style="font-size:20px;font-weight:400;letter-spacing:2px;margin:3px 0 0">商品管理（${products.length}）</h2></div><button class="btn sm ghost" onclick="adminLogout()">退出</button></div>
  <div class="card">
    <div class="field"><label>店铺名称</label><input id="sName" value="${esc(shop.name)}"></div>
    <button class="btn sm ghost" onclick="saveShop()">保存店铺信息</button>
  </div>
  <div class="card">
    <div class="muted" style="margin-bottom:10px">新增商品</div>
    <div class="field"><label>名称</label><input id="pName" placeholder="商品名称"></div>
    <div class="field"><label>价格</label><input id="pPrice" placeholder="如 1280" inputmode="decimal"></div>
    <div class="field"><label>分类</label><input id="pCat" placeholder="客厅 / 餐厅 / 卧室 / 软装"></div>
    <div class="field"><label>说明</label><input id="pDesc" placeholder="一句简短描述"></div>
    <button class="btn brand" onclick="addProduct()">添加商品</button>
  </div>
  <div class="card">
    ${products.map((p) => `
      <div class="admin-item">
        <div class="admin-thumb">${icon(p.kind)}</div>
        <div style="flex:1;min-width:0"><div style="font-family:Georgia,'Songti SC',serif;font-size:13.5px;letter-spacing:.5px">${esc(p.name)}</div><div class="muted">${esc(p.cat)} · ${money(p.price)}</div></div>
        <button class="btn sm ghost" onclick="editProduct('${p.id}')">改价</button>
        <button class="btn sm ghost" onclick="delProduct('${p.id}')">删除</button>
      </div>`).join('')}
  </div>
  <div class="sechead"><div><div class="lbl">ORDERS</div><h2>订单</h2></div><span class="more">${orders.length}</span></div>
  ${orders.length ? orders.map((o) => `
    <div class="card">
      <div class="order-head"><span>${o.id}</span><span class="status">${esc(o.status)}</span></div>
      <div class="muted">${esc(o.customer.name)} ${esc(o.customer.phone)} · ${esc(o.customer.address)}</div>
      <div class="order-total"><span>合计</span><span>${money(o.total)}</span></div>
      ${o.status === '待发货' ? `<button class="btn sm brand" style="margin-top:10px" onclick="shipOrder('${o.id}')">标记已发货</button>` : ''}
    </div>`).join('') : '<div class="empty">暂无订单</div>'}`;
}

/* ---------- 操作 ---------- */
let detailQty = 1;
function setDetailQty(d) { detailQty = Math.max(1, detailQty + d); const el = document.getElementById('dqty'); if (el) el.textContent = detailQty; }
function addDetail() { addToCart(location.hash.split('/')[1], detailQty); detailQty = 1; }
function setCat(c) { filterCat = c; route(); }

function submitOrder() {
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const addr = document.getElementById('cAddr').value.trim();
  if (!name || !phone || !addr) { toast('请填写完整的收货信息'); return; }
  if (!/^1\d{10}$/.test(phone)) { toast('手机号格式不对'); return; }
  const ship = cartTotal() >= 2999 ? 0 : 60;
  const o = {
    id: uid(), createdAt: new Date().toISOString(),
    items: Object.entries(cart).map(([id, q]) => { const p = findP(id); return { id, name: p.name, price: p.price, qty: q }; }),
    total: cartTotal() + ship, status: '待发货', customer: { name, phone, address: addr },
  };
  orders.unshift(o); save(LS.orders, orders);
  cart = {}; save(LS.cart, cart); syncBadge();
  document.getElementById('view').innerHTML = `<div class="empty">下单成功<br><b style="color:var(--ink);font-size:19px">${o.id}</b><br>我们会尽快与你确认送货时间<br><br><a class="btn sm ghost" href="#orders">查看订单</a></div>`;
}

function adminLogin() {
  if (document.getElementById('adminPwd').value === '123456') { sessionStorage.setItem('home_admin', '1'); toast('已登录'); route(); }
  else toast('密码错误（演示密码 123456）');
}
function adminLogout() { sessionStorage.removeItem('home_admin'); route(); }
function saveShop() { shop.name = document.getElementById('sName').value.trim() || shop.name; save(LS.shop, shop); applyShop(); toast('已保存'); }
function applyShop() { document.querySelector('.shop-name').textContent = shop.name; }
function addProduct() {
  const name = document.getElementById('pName').value.trim();
  const price = parseFloat(document.getElementById('pPrice').value);
  const cat = document.getElementById('pCat').value.trim() || '其他';
  const desc = document.getElementById('pDesc').value.trim() || '新上架商品。';
  if (!name || !(price > 0)) { toast('请填写名称和有效价格'); return; }
  products.push({ id: 'p' + Date.now(), name, price, cat, kind: 'shelf', tag: '新品', desc });
  save(LS.products, products); toast('已添加'); route();
}
function editProduct(id) {
  const p = findP(id); if (!p) return;
  const v = prompt('新的价格（元）', p.price);
  if (v === null) return;
  const n = parseFloat(v); if (!(n > 0)) { toast('价格无效'); return; }
  p.price = n; save(LS.products, products); toast('已改价'); route();
}
function delProduct(id) {
  if (!confirm('确定删除这个商品？')) return;
  products = products.filter((p) => p.id !== id); save(LS.products, products); toast('已删除'); route();
}
function shipOrder(id) { const o = orders.find((x) => x.id === id); if (!o) return; o.status = '已发货'; save(LS.orders, orders); toast('已标记发货'); route(); }

/* ---------- 搜索 ---------- */
function onSearch(e) {
  searchQ = e.target.value;
  document.querySelector('.search').classList.toggle('active', !!searchQ);
  route();
}
function clearSearch() {
  searchQ = ''; const i = document.getElementById('searchInput'); if (i) i.value = '';
  document.querySelector('.search').classList.remove('active'); route();
}

/* ---------- 路由 ---------- */
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
  document.body.dataset.view = name;
  document.querySelectorAll('.tabbar a, .topnav a').forEach((a) => a.classList.toggle('active', a.dataset.tab === name));
  syncBadge(); window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  applyShop(); route(); syncBadge();
  document.getElementById('searchInput').addEventListener('input', onSearch);
});
