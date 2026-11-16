// Products Data
const products = [
  {
    id: 0,
    name: "Air Force 1",
    subtitle: "The Timeless Classic",
    price: 119,
    color: "#0071e3",
    swoosh: "#ffffff",
    bodyColor: "#f5f5f7",
    desc: "The radiance lives on with crisp stitched leather overlays, bold accents, and the perfect amount of court heritage."
  },
  {
    id: 1,
    name: "Air Jordan 1 Retro",
    subtitle: "High-Top Heritage",
    price: 180,
    color: "#ff3b30",
    swoosh: "#1d1d1f",
    bodyColor: "#ffffff",
    desc: "Remastered with premium leather and encapsulated Air-Sole cushioning for an unmistakable silhouette."
  },
  {
    id: 2,
    name: "Nike Blazer Mid '77",
    subtitle: "Vintage Court Styling",
    price: 109,
    color: "#0071e3",
    swoosh: "#1d1d1f",
    bodyColor: "#ffffff",
    desc: "Praised by the streets for classic simplicity and comfort with vintage treatment on the midsole."
  },
  {
    id: 3,
    name: "Crater Impact",
    subtitle: "Reclaimed Materials",
    price: 115,
    color: "#ff9500",
    swoosh: "#ffffff",
    bodyColor: "#e5e5ea",
    desc: "Built with at least 25% recycled material by weight, transforming waste into durable daily sneakers."
  },
  {
    id: 4,
    name: "Space Hippie",
    subtitle: "Exploratory Footwear",
    price: 130,
    color: "#af52de",
    swoosh: "#ff2d55",
    bodyColor: "#d1d1d6",
    desc: "Constructed with 'Space Waste Yarn' utilizing recycled plastic bottles, t-shirts, and textile scraps."
  }
];

let cart = [];

// DOM Elements
const heroCircle = document.getElementById("heroCircle");
const heroPrice = document.getElementById("heroPrice");
const heroTitle = document.getElementById("heroTitle");
const shoeArtwork = document.getElementById("shoeArtwork");
const catPills = document.querySelectorAll(".cat-pill");
const productGrid = document.getElementById("productGrid");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItemsList = document.getElementById("cartItemsList");
const cartTotalVal = document.getElementById("cartTotalVal");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const searchInput = document.getElementById("searchInput");
const heroBuyBtn = document.getElementById("heroBuyBtn");

let activeProductIndex = 2; // Default to Blazer

function renderHero(index) {
  const p = products[index];
  activeProductIndex = index;

  if (heroCircle) heroCircle.style.backgroundColor = p.color;
  if (heroPrice) heroPrice.textContent = `₹${p.price}.00`;
  if (heroTitle) heroTitle.innerHTML = `${p.name.toUpperCase()}<br><span>${p.subtitle}</span>`;

  // Update SVG sneaker colors
  if (shoeArtwork && shoeArtwork.children.length >= 3) {
    shoeArtwork.children[0].setAttribute("fill", p.bodyColor);
    shoeArtwork.children[2].setAttribute("fill", p.swoosh);
  }

  catPills.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
}

function renderCatalog(items) {
  if (!productGrid) return;
  productGrid.innerHTML = items.map(p => `
    <article class="product-bento">
      <div class="product-stage">
        <svg viewBox="0 0 500 300" style="max-height: 120px;">
          <g>
            <path d="M70,210 Q90,210 150,210 L390,210 Q430,210 440,195 Q450,175 420,150 L370,110 Q340,70 300,75 L230,120 L160,140 Q110,145 90,165 Q70,185 70,210 Z" fill="${p.bodyColor}" stroke="#1d1d1f" stroke-width="3"/>
            <path d="M60,210 L450,210 Q455,225 440,230 L70,230 Q55,225 60,210 Z" fill="#efeff4" stroke="#1d1d1f" stroke-width="2.5"/>
            <path d="M140,140 C220,180 320,120 410,165 C330,205 210,170 140,140 Z" fill="${p.swoosh}"/>
            <circle cx="250" cy="150" r="90" fill="${p.color}" opacity="0.1"/>
          </g>
        </svg>
      </div>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-footer">
        <span class="product-price">₹${p.price}</span>
        <button class="btn-card-add" onclick="addToCart(${p.id})">Add to Bag</button>
      </div>
    </article>
  `).join("");
}

function addToCart(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...prod, qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartCount) cartCount.textContent = totalCount;
  if (cartTotalVal) cartTotalVal.textContent = `₹${totalPrice}.00`;

  if (!cartItemsList) return;
  if (cart.length === 0) {
    cartItemsList.innerHTML = `<p class="empty-msg">Your shopping bag is empty.</p>`;
  } else {
    cartItemsList.innerHTML = cart.map(item => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #e5e5ea;">
        <div>
          <div style="font-weight:600;font-size:14px;color:#1d1d1f;">${item.name}</div>
          <div style="color:#6e6e73;font-size:12px;">₹${item.price}.00 &times; ${item.qty}</div>
        </div>
        <button onclick="removeFromCart(${item.id})" style="background:none;border:none;color:#ff3b30;cursor:pointer;font-size:18px;padding:4px 8px;">&times;</button>
      </div>
    `).join("");
  }
}

// Category filter button clicks
catPills.forEach((btn, index) => {
  btn.addEventListener("click", () => renderHero(index));
});

// Hero Buy Button
heroBuyBtn?.addEventListener("click", () => {
  addToCart(activeProductIndex);
  cartModal?.classList.add("open");
});

// Search filter
searchInput?.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
  );
  renderCatalog(filtered);
});

// Cart Drawer open / close
cartBtn?.addEventListener("click", () => cartModal?.classList.add("open"));
closeCart?.addEventListener("click", () => cartModal?.classList.remove("open"));
cartOverlay?.addEventListener("click", () => cartModal?.classList.remove("open"));

// Checkout Dialog
checkoutBtn?.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Please add at least one item to your bag before checking out.");
    return;
  }
  cartModal?.classList.remove("open");
  checkoutModal?.classList.add("open");
});

closeCheckout?.addEventListener("click", () => checkoutModal?.classList.remove("open"));

function handleCheckoutSubmit() {
  const form = document.getElementById("checkoutForm");
  const confirmBox = document.getElementById("orderConfirmation");
  if (form) form.style.display = "none";
  if (confirmBox) confirmBox.style.display = "block";
  cart = [];
  updateCartUI();
  setTimeout(() => {
    checkoutModal?.classList.remove("open");
    if (form) {
      form.reset();
      form.style.display = "block";
    }
    if (confirmBox) confirmBox.style.display = "none";
  }, 2200);
}

// Initial Render
renderHero(2);
renderCatalog(products);

// Theme Synchronization with Master Portfolio
if (typeof window !== "undefined" && typeof document !== "undefined") {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark");
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">light_mode</span>';
        themeToggleBtn.title = "Switch to Light Mode";
      }
    } else {
      document.documentElement.classList.remove("dark");
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">dark_mode</span>';
        themeToggleBtn.title = "Switch to Dark Mode";
      }
    }
  }

  const currentTheme = localStorage.getItem("vanshika_portal_theme") || "light";
  applyTheme(currentTheme === "dark");

  themeToggleBtn?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("vanshika_portal_theme", newTheme);
    applyTheme(!isDark);
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "vanshika_portal_theme") {
      applyTheme(e.newValue === "dark");
    }
  });
}
