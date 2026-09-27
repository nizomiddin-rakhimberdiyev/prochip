const products = [
 {id:1, name:'Gaming PC RTX 4070', cat:'pc', price:1499, img:'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=80'},
 {id:2, name:'Gaming PC RTX 3060', cat:'pc', price:899, img:'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=700&q=80'},
 {id:3, name:'RGB Mechanical Keyboard', cat:'accessory', price:89, img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80'},
 {id:4, name:'Gaming Mouse RGB', cat:'accessory', price:49, img:'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=80'},
 {id:5, name:'Gaming Headset', cat:'accessory', price:79, img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'},
 {id:6, name:'27" Gaming Monitor', cat:'accessory', price:299, img:'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80'},
 {id:7, name:'RTX 4070 Ti', cat:'pc', price:999, img:'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=700&q=80'},
 {id:8, name:'32GB RGB RAM', cat:'accessory', price:129, img:'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=700&q=80'}
];

const cartKey = 'prochipCart';
const wishKey = 'prochipWish';

let cart = JSON.parse(localStorage.getItem(cartKey) || localStorage.getItem('unichipCart') || '[]');
let wishes = new Set(JSON.parse(localStorage.getItem(wishKey) || localStorage.getItem('unichipWish') || '[]'));

function money(n) {
    return '$' + n.toLocaleString('en-US');
}

function renderProducts(list = products) {
    const el = document.getElementById('products');
    if (!el) return;
    el.innerHTML = list.map(p => `<article class="product">
        <button class="heart" onclick="toggleWish(${p.id})">${wishes.has(p.id) ? '♥' : '♡'}</button>
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)}</div>
        <button class="btn" onclick="addToCart('${p.name.replace(/'/g, "\'")}', ${p.price})">Savatga qo'shish</button>
    </article>`).join('') || '<p class="empty">Hech narsa topilmadi</p>';
}

function filterProducts(cat, btn) {
    document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(cat === 'all' ? products : products.filter(p => p.cat === cat));
}

function addToCart(name, price) {
    cart.push({ name, price });
    save();
    showToast('Savatga qo\'shildi');
    updateBadges();
}

function save() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    localStorage.setItem(wishKey, JSON.stringify([...wishes]));
}

function updateBadges() {
    const cEl = document.getElementById('cartCount');
    const wEl = document.getElementById('wishCount');
    if (cEl) cEl.textContent = cart.length;
    if (wEl) wEl.textContent = wishes.size;
}

function toggleWish(id) {
    wishes.has(id) ? wishes.delete(id) : wishes.add(id);
    save();
    renderProducts();
    updateBadges();
}

function openCart() {
    document.getElementById('cartModal').classList.add('open');
    renderCart();
}

function renderCart() {
    let total = cart.reduce((s, x) => s + x.price, 0);
    let el = document.getElementById('cart');
    el.innerHTML = cart.length 
        ? cart.map((x, i) => `<div class="cartRow"><span>${x.name}</span><b>${money(x.price)} <button onclick="removeCart(${i})" style="background:none;border:0;color:#f66">×</button></b></div>`).join('') + `<h3 style="text-align:right">Jami: ${money(total)}</h3>` 
        : '<div class="empty">Savat bo\'sh</div>';
}

function removeCart(i) {
    cart.splice(i, 1);
    save();
    updateBadges();
    renderCart();
}

function checkout() {
    if (!cart.length) return showToast('Savat bo\'sh');
    showToast('Buyurtma demo rejimda qabul qilindi');
    cart = [];
    save();
    updateBadges();
    renderCart();
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(x => x.classList.remove('open'));
}

function openSearch() {
    document.getElementById('searchModal').classList.add('open');
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
}

function openAccount() {
    document.getElementById('accountModal').classList.add('open');
}

function searchProducts(q) {
    q = q.toLowerCase();
    document.getElementById('searchResults').innerHTML = products
        .filter(p => p.name.toLowerCase().includes(q))
        .map(p => `<div class="cartRow"><span>${p.name}</span><b>${money(p.price)}</b></div>`)
        .join('') || '<div class="empty">Hech narsa topilmadi</div>';
}

function showToast(msg) {
    let t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => {
        if (e.target === m) m.classList.remove('open');
    }));
    renderProducts();
    updateBadges();

    const heroTitle = document.getElementById('heroTitle');
    const heroImg = document.getElementById('heroImg');
    const slides = [
        ['BUILD YOUR', 'NEW PC', 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1200&q=85'],
        ['POWER YOUR', 'GAMING', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=85'],
        ['PLAY LIKE A', 'PRO', 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85']
    ];
    let slide = 0;
    if (heroTitle && heroImg) {
        setInterval(() => {
            slide = (slide + 1) % slides.length;
            heroTitle.innerHTML = slides[slide][0] + ' <span>' + slides[slide][1] + '</span>';
            heroImg.src = slides[slide][2];
        }, 5000);
    }
});
