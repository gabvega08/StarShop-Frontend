<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<div align="center">
  <img src="public/starshop-logos/StarShop-Logo.svg" height="200">
</div>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

# 🌟 StarShop Frontend

StarShop is an innovative platform designed to empower small businesses and entrepreneurs by providing an easy-to-use marketplace infused with blockchain technology. The platform fosters transparency and trust by utilizing Non-Fungible Tokens (NFTs) to create unique digital experiences for customers and businesses alike.

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router (routes, layouts, pages)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── buyer/                    # Buyer routes
│   └── seller/                   # Seller routes
│
├── features/                     # Business domain modules
│   ├── buyer/                    # Buyer logic (faq, profile, cart, ...)
│   │   ├── faq/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── profile/
│   │   ├── cart/
│   │   └── index.ts
│   │
│   ├── seller/                   # Seller logic (products, orders, ...)
│   │   ├── products/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── types/
│   │   │   └── ...
│   │   ├── orders/
│   │   └── index.ts
│
├── shared/                       # Reusable elements
│   ├── components/               # Global UI components (Navbar, Modal, etc.)
│   │   ├── ui/                   # Atoms, Molecules, Organisms
│   │   └── layout/
│   ├── hooks/                    # Reusable hooks (useAuth, useDebounce, ...)
│   ├── utils/                    # Pure utility functions
│   ├── constants/                # App-wide constants
│   ├── types/                    # Global types
│   ├── styles/                   # Global styles (globals.css)
│   └── api/                      # General reusable APIs (e.g. login)
│
├── providers/                    # Global context providers
│   └── ...
│
├── i18n/                         # Internationalization
│   └── i18n.ts
│
├── lib/                          # Non-UI business logic helpers
│   └── ...
│
├── index.ts                      # Common exports entrypoint
└── types.d.ts                    # Global ambient types
```

---

## 🚀 Features
* 🛒 **Easy Product Registration:** Small businesses can quickly register and start selling their products.
* 🔗 **Blockchain Transparency:** Builds trust through immutable and transparent blockchain transactions.
* 🎟️ **NFTs for Purchases:** Customers receive a unique NFT for every purchase, serving as a digital collectible tied to the store.
* 🏆 **Milestone NFTs for Businesses:** Businesses earn milestone NFTs based on their sales achievements, showcasing their growth and success.
* 🤝 **Celebrating Growth and Connection:** Strengthens the relationship between businesses and customers through a marketplace that values trust, growth, and connection.

---

## ⚙ Technologies
* ⚡ [Next.js](https://nextjs.org/) (TypeScript)
* 🎨 [TailwindCSS](https://tailwindcss.com/)
* 🧩 [ShadCn](https://ui.shadcn.com)
* 🌠 [Lucide-React](https://lucide.dev/)
* 🌐 [Zustand](https://zustand-demo.pmnd.rs/)
* 📡 [Axios](https://axios-http.com/)
* 📊 [React Query](https://tanstack.com/query/latest)

---

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/StarShop-Frontend.git
   cd StarShop-Frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

If you encounter installation issues, try:
- `npm cache clean --force`
- `rm -rf node_modules`
- `rm package-lock.json`
- `npm install`
- Or: `npm install --legacy-peer-deps`

---

## 🤝 Contributing
We welcome contributions to StarShop! Check out our [Contributor's Guide](https://github.com/StarShopCr/contributors-guide) to get started.

---

## ⭐ Don't forget to Star this repo!!

