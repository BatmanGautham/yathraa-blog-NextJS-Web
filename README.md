<<<<<<< HEAD
# Yathraa Travel Blog (NextJS)

**Yathraa** is a simple travel blog web application built with **Next.js** and **Tailwind CSS**, using **MockAPI** for post data. It demonstrates Server-Side Rendering (SSR), search functionality, and a fully responsive design.

## Features

- Browse curated travel destinations
- Read detailed travel posts with author info
- Search posts with real-time suggestions
- Responsive gallery for images
- Server-Side Rendering (SSR) with Next.js
- Simple setup using MockAPI for posts
- Fully responsive design

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **API:** MockAPI
- **Image Optimization:** Next.js `Image` component

## MockAPI - Posts Resource

The blog uses a **MockAPI resource** called `posts`. Below is the schema used to generate the mock data:


| Field        | Type / Generator                   |
|------------- |----------------------------------|
| id           | Object ID                         |
| category     | Number                            |
| date         | Faker.js `date.past`              |
| dateISO      | Faker.js `address.buildingNumber` |
| readTime     | Number                            |
| title        | Faker.js `lorem.words`            |
| description  | Faker.js `lorem.sentence`         |
| author       | Faker.js `name.firstName`         |
| image        | Faker.js `image.urlPicsumPhotos`  |
| content      | Faker.js `lorem.paragraphs`       |
| authorImage  | Faker.js `image.personPortrait`   |
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
>>>>>>> 114e1de (Initial commit from Create Next App)
