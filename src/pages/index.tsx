import { useState } from "react";
import Hero from "@/components/Hero";
import Blog, { BlogCard } from "@/components/Blog"; // import BlogCard type
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Head from "next/head";

interface Post {
  id: number;
  date: string;
  readTime: string;
  title: string;
  description: string;
  author: string;
  image: string;
}

export default function Index({ posts }: { posts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const blogCards: BlogCard[] = posts.map((p) => ({
    id: String(p.id),
    category: 0, // default number
    date: p.date,
    dateISO: p.date,
    readTime: p.readTime,
    title: p.title,
    description: p.description,
    author: p.author,
    image: p.image,
    content: p.description,
    authorImage: "/author-placeholder.jpg", // default
  }));

  return (
    <>
      <Head>
        <title>Yathraa | Find, Explore, Inspire</title>
        <meta
          name="description"
          content="Discover insightful articles, tutorials, and stories on technology, design, and creativity."
        />
        <link rel="icon" href="/handshakeWhite.png" />
      </Head>

      <main>
        <Hero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          suggestions={posts.map((p) => p.title)}
        />
        <Blog posts={blogCards} searchTerm={searchTerm} />
        <Gallery />
        <Footer />
      </main>
    </>
  );
}

// SSR
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts`);
  const posts = await res.json();

  return {
    props: { posts },
  };
}
