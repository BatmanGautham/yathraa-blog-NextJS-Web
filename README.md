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


