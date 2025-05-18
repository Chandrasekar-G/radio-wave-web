# 📻 Radio Web

**Radio Web** is a modern, Spotify-inspired web app to **browse and stream live radio stations** from around the globe. It uses the [radio-browser.info](https://www.radio-browser.info) API and features a responsive, dark/light mode design built with Next.js, Tailwind CSS, and ShadCN UI.

---

## 🚀 Features

- 🎧 Stream thousands of live radio stations worldwide
- 📍 Auto-detect user’s country and preload local stations
- 🔍 Filter stations by:
  - Country
  - Language
  - Genre/Tag
  - Codec (MP3, AAC, etc.)
  - Popularity (most clicked, most voted, verified)
- 🌙 Dark and light mode toggle
- 📱 Fully responsive and mobile-friendly layout
- 🎵 Sticky bottom player with audio controls
- ⚡ Fast API caching with React Query
- 🔁 Global state management with Zustand

---

## 🛠 Tech Stack

| Layer            | Technology                                                |
| ---------------- | --------------------------------------------------------- |
| Framework        | [Next.js](https://nextjs.org) (App Router)                |
| Styling          | [Tailwind CSS](https://tailwindcss.com)                   |
| UI Components    | [ShadCN UI](https://ui.shadcn.com)                        |
| Icons            | [Lucide Icons](https://lucide.dev)                        |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/)                  |
| Data Fetching    | [React Query](https://tanstack.com/query)                 |
| Audio Playback   | HTML5 `<audio>` element                                   |
| Theming          | [next-themes](https://github.com/pacocoursey/next-themes) |
| Deployment       | [Vercel](https://vercel.com)                              |

---

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/radio-web.git
   cd radio-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```yml
app/
├── layout.tsx # Root layout with theme and player
├── page.tsx # Home page (country-based station loader)
├── components/ # Reusable UI components
├── lib/ # API functions and utils
├── store/ # Zustand state stores
├── styles/ # Tailwind and global styles
public/
next.config.js
tailwind.config.ts
```

---

## 🌐 API

Powered by [radio-browser.info](https://www.radio-browser.info)
Sample endpoints used:

- `/stations/bycountry/{country}`
- `/stations/bylanguage/{language}`
- `/stations/bytag/{tag}`
- `/stations/topvote`
- `/stations/topclick`

---

## ⚙️ Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Lint project code        |

---

## 🎨 UI Inspiration

- **Spotify** – Sidebar layout, dark theme, modern aesthetic
- **Apple Music** – Clean grid layout, accessible design

---

## 🪪 License

MIT © [Chandrasekar-G]

---

## 🤝 Contributing

Pull requests and suggestions are welcome!
