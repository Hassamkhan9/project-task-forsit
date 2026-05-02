# 📦 Forsit Dashboard — Inventory & Product Management

A modern admin dashboard built with **Vue 3**, **TypeScript**, and **Vite**. It includes an inventory manager, product registration, and revenue analytics — all powered by mock data and a clean, responsive UI.

---

## ✨ Features

- **Dashboard** — Overview cards showing key metrics: revenue analytics and low stock alerts
- **Inventory Management** — Browse, filter, and manage products with live stock status
- **Product Registration** — Add new products through a structured form
- **Revenue Analytics** — Visual charts powered by Chart.js
- **Low Stock Alerts** — Card-based alerts for items running low
- **Responsive UI** — Fully mobile-friendly layout via Tailwind CSS

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API) |
| Language | TypeScript |
| Build Tool | Vite |
| State Management | Pinia |
| Charts | Chart.js |
| Styling | Tailwind CSS |
| Data | Mock data (no backend required) |

---

## 📁 Project Structure

```
project-task-forsit/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable Vue components
│   ├── pages/            # Dashboard, Inventory, Registration views
│   ├── stores/           # Pinia state stores
│   ├── assets/           # Images, icons
│   └── main.ts           # App entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Hassamkhan9/project-task-forsit.git

# 2. Navigate into the project directory
cd project-task-forsit

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📸 Pages Overview

### Dashboard
The main landing page displaying:
- Revenue analytics chart (Chart.js)
- Low stock alert cards
- Quick stats overview

### Inventory Management
- Full product listing table
- Stock level indicators
- Filter and search functionality

### Product Registration
- Form to add new products
- Category and stock input fields

---

## 📦 Dependencies

```json
{
  "vue": "^3.x",
  "pinia": "^2.x",
  "chart.js": "^4.x",
  "typescript": "^5.x",
  "vite": "^5.x",
  "tailwindcss": "^3.x"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built as a frontend task project for Forsit.
