<h1 align="center">
  🎵 SoundCore Frontend
</h1>

<p align="center">
  Modern music marketplace UI built with <strong>Next.js 16</strong> & <strong>React 19</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Radix_UI-components-purple?style=flat-square" />
</p>

---

## 📋 Requirements

| Tool    | Version |
| ------- | ------- |
| Node.js | ≥ 18.x  |
| npm     | ≥ 9.x   |

> Make sure the **SoundCore API** backend is running before starting the frontend.

---

## 🚀 Installation

### 1. Clone the repository

```bash
https://github.com/ChouMonyrith/frontend-soundcore.git
cd soundcore-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment file

```bash
cp .env.example .env.local
```

### 4. Configure your `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at **`http://127.0.0.1:3000`**.

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

## ⚙️ Key Features

- 🎵 **Audio Playback** — WaveSurfer.js waveform player
- 🛒 **Cart & Checkout** — KHQR QR payment integration
- 💿 **Collections** — User-curated playlists/collections
- 📊 **Dashboard** — Sales analytics (Recharts)
- 🌙 **Dark Mode** — via `next-themes`
- 🔔 **Toasts** — Sonner notification system
- 🧩 **UI Components** — Radix UI + shadcn/ui patterns

---

## 📁 Project Structure

```
soundcore-frontend/
├── app/
│   ├── (app)/              # Main app routes (layout with navbar)
│   │   ├── checkout/       # Checkout & KHQR payment page
│   │   ├── sounds/         # Browse & play sounds
│   │   ├── collections/    # User collections
│   │   ├── orders/         # Order history
│   │   └── dashboard/      # Producer/admin dashboard
│   ├── components/
│   │   ├── ui/             # Reusable UI primitives
│   │   └── ...             # Feature components
│   ├── contexts/           # React context providers (Cart, Auth)
│   └── services/           # API service functions (Axios)
└── public/                 # Static assets
```

---

## 🔗 Related

- **Backend API:** [soundcore-api](../soundcore-api) — Laravel 12 REST API

---

## 📄 License

MIT License © SoundCore
