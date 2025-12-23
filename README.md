# Runmarked 🏃‍♂️📍

**Every Mile Has a Story** — Discover the hidden history beneath your feet.

Upload your run and uncover historical facts along your route.

![Runmarked Preview](preview.png)

## Features

- 📤 **GPX Upload** — Import runs from Strava, Garmin, Apple Watch, or any GPX source
- 🗺️ **Interactive Map** — Detailed Manhattan map with your route and historical markers
- 📚 **105+ Historical Facts** — Spanning 400 years of NYC history
- 🏷️ **Category Filtering** — Filter by maritime, colonial, civil-rights, and more
- 📱 **Instagram Story Sharing** — Generate beautiful shareable images (1080x1920)
- 📅 **Timeline View** — See your discoveries in chronological order

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

## Deploy to Vercel

### Option A: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/runmarked)

### Option B: CLI Deploy

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. For production:
```bash
vercel --prod
```

### Option C: GitHub Integration (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repo
5. Click "Deploy"

**That's it!** Vercel auto-deploys on every push.

## Project Structure

```
runmarked-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Instagram Story Sharing

The app generates Instagram-optimized images (1080x1920) featuring:
- Your route on a stylized map
- Run statistics
- Top 3 historical discoveries
- Runmarked branding and CTA

Users download the image and upload to Instagram Stories manually.

## Customization

### Adding New Cities

Historical facts are stored in `HISTORICAL_FACTS` array in `App.jsx`. Each fact needs:

```javascript
{
  id: 1,
  lat: 40.7028,
  lng: -74.0169,
  title: "Location Name",
  fact: "Historical description...",
  year: "1811",
  category: "military" // or: maritime, colonial, civil-rights, etc.
}
```

### Styling

The app uses Tailwind CSS with a custom color palette:
- Navy: `#1E3A5F`
- Burnt Orange: `#D97B3D`
- Muted Teal: `#4A7C7E`
- Sand Background: `#F7F3ED`

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **Canvas API** — Story image generation

## Roadmap

- [ ] User accounts & saved runs
- [ ] More cities (Boston, Chicago, SF)
- [ ] Native iOS app (React Native)
- [ ] Direct Instagram API sharing
- [ ] Strava integration
- [ ] AI-powered fact generation

## License

MIT

---

Built with ❤️ for runners who love history.
