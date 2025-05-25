
# ShowTrackr

ShowTrackr is a modern Next.js application for discovering TV shows, powered by the free [TVmaze API](https://www.tvmaze.com/api). The app allows users to browse popular series, view detailed show information, explore episodes and cast, and manage a list of favorite shows.

## Features

- Browse trending TV shows (e.g., latest or top-rated)
- Detailed show pages (poster, title, genres, rating, summary, etc.)
- Episode list and cast for each show
- Add/remove shows to/from favorites
- View saved favorite shows in a responsive grid
- Custom API routes for managing favorites (GET, POST, DELETE)
- Basic SEO optimization
- Global loading and 404 error pages
- Production deployment via Vercel
- Infinite scroll
- Search series

## Possible upgrades

- currently favorites are stored only locally, permanent storage is planned;
- filtering by genres;
- no integrated user authentication system

All these upgrades are planned for future versions of the application.

## 🛠️ Technologies

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TVmaze API](https://www.tvmaze.com/api)
- [Vercel](https://vercel.com/) for production hosting

## 📦 Getting Started
Za lokalno pokretanje projekta potrebno je:
1. Klonirati repozitorij:
    `git clone https:https://github.com/amrkonjic/ShowTrackr.git`
    
2. Ući u mapu projekta:
    `cd show-trackr`
    
3. Instalirati ovisnosti:
    `npm install`
    
4. Pokrenuti razvojni server:
    `npm run dev`
    
Dodati .env datoteku s varijablom NEXT_PUBLIC_SITE_URL:
`NEXT_PUBLIC_SITE_URL=http://localhost:3000`

Za build i deploy, potrebno je:
1. Izgraditi aplikaciju za produkciju:
    `npm run build`
    
2. Pokrenuti lokalni server za testiranje builda:
    `npm run start`
    
3. Aplikacija je deployana na Vercel i dostupna putem adrese:
    https://show-trackr.vercel.app/

