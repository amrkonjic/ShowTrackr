
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

## Technologies

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TVmaze API](https://www.tvmaze.com/api)
- [Vercel](https://vercel.com/) for production hosting

## Getting Started
To start the project locally, you need:
1. Clone the repository: 
`git clone https://github.com/amrkonjic/ShowTrackr.git`

2. Enter the project folder: 
`cd show-trackr`

3. Install dependencies: 
`npm install`

4. Start the development server: 
`npm run dev`

Add the .env file with the NEXT_PUBLIC_SITE_URL variable:
`NEXT_PUBLIC_SITE_URL=http://localhost:3000`

For build and deploy, you need:
1. Build an application for production: 
`npm run build`

2. Start the local server for testing the build: 
`npm run start'

3. The application is deployed on Vercel and available via the address: 
https://show-trackr.vercel.app/

More detailed documentation (with notes about the design and submission of the project):
https://boiled-packet-d4d.notion.site/Zavr-ni-projekt-JuniorDev-dokumentacija-1fdb0a75ac3c808aa2dff7708167400b
