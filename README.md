# TravelMate

TravelMate is a responsive React, TypeScript and styled-components travel guide.
It uses the supplied TravelMate REST API for countries, cities, attractions and
their Danish and English descriptions.

## Run locally

Start the API:

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

In another terminal, start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL printed in the terminal. Vite proxies `/api` and `/assets` to
the API at `http://localhost:3001`; port 3000 remains available for Wallywood.

## Features

- Responsive home page with country, city and featured-place cards.
- Country, city and place listings and detail pages, including an OpenStreetMap
  view for locations with coordinates.
- Search across countries, cities, attractions and translated descriptions.
- Light/dark theme and English/Danish language controls; both preferences are
  remembered in local storage.
- Reusable API and local-storage hooks with loading and error states.

## Checks

```bash
cd frontend
npm run lint
npm run build
```
