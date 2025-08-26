// pages/posts/[id].tsx
import { GetServerSideProps } from "next";
import React from "react";
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

type BlogCard = {
  id: string;
  category: number;
  date: string;
  dateISO: string;
  readTime: string;
  title: string;
  description: string;
  author: string;
  image: string;
  content: string;
  authorImage: string;
};

type Props = {
  post: BlogCard | null;
  allPosts?: BlogCard[];
};

const PostDetail: React.FC<Props> = ({ post, allPosts = [] }) => {

  const [searchTerm, setSearchTerm] = React.useState("");

  const setAuthType = React.useState<"login" | "signup" | null>(null)[1];

  const suggestions = allPosts.map((p) => p.title); // use titles for dropdown

  if (!post) return <p className="text-center mt-20 text-gray-600">Post not found.</p>;

  return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-white to-indigo-50">

      <Nav
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        setAuthType={setAuthType}
      />

      <article className="max-w-3xl  mx-auto px-5 py-16">
        <Image
          src={post.image}
          alt={post.title}
          width={500}
          height={300}
          className="rounded-xl mb-6 w-full object-contain"
        />
        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {post.date} • {post.readTime} • {post.author}
        </p>
        <p className="text-base text-gray-600 mb-6 italic">
          {post.description}
        </p>
        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {post.content}
        </p>

        {/* 👇 Author info at bottom right */}
        <div className="flex justify-end mt-8">
          <div className="flex items-center gap-3">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{post.author}</span>
          </div>
        </div>
      </article>

      <Footer/>
    </div>
  );
};

// Fetch post + all posts for search suggestions
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts/${id}`);

  if (!res.ok) return { props: { post: null, allPosts: [] } };

  const post: BlogCard = await res.json();

  // Fetch all posts for search suggestions
  const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts`);
  const allPosts: BlogCard[] = allRes.ok ? await allRes.json() : [];

  return { props: { post, allPosts } };
};

export default PostDetail;
