import { useState } from "react";
import Hero from "@/components/Hero";
import Blog from "@/components/Blog";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

import Head from "next/head";

export default function Home({ posts }: { posts: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const suggestions = posts.map((p) => p.title);

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
        suggestions={suggestions} 
      />
      <Blog posts={posts} searchTerm={searchTerm} />
      <Gallery />
      <Footer />
    </main>
    </>
  );
}

// SSR
export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/posts`
  );
  const posts = await res.json();

  return {
    props: { posts },
  };
}
