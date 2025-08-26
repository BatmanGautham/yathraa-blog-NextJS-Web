import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type BlogCard = {
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

const categories = ["All", "Destination", "Culinary", "Lifestyle", "Tips & Hacks"] as const;
type Category = typeof categories[number];
type SortBy = "newest" | "oldest";

type BlogProps = {
  posts: BlogCard[];
  searchTerm: string;
};

const Blog: React.FC<BlogProps> = ({ posts, searchTerm }) => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ddRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 9;

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Map category number to string
  const mappedPosts = posts.map((p) => {
    const num = Number(p.category);
    const catIndex = num % categories.length;
    return {
      ...p,
      category: categories[catIndex] ?? "Unknown",
    };
  });

  // Filter + search + sort
  const filtered = mappedPosts
    .filter((p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const da = new Date(a.dateISO).getTime();
      const db = new Date(b.dateISO).getTime();
      return sortBy === "newest" ? db - da : da - db;
    });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visible = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (postsRef.current) postsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="blog-section" className="max-w-[1200px] mx-auto px-5 py-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">Blog</h2>
      <p className="text-gray-700 text-lg mb-8">
        Here, we share travel tips, destination guides, and stories that inspire your next adventure.
      </p>

      {/* Filter + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === c
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => {
                setActiveCategory(c);
                setCurrentPage(1);
                if (postsRef.current) postsRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative" ref={ddRef}>
          <span className="mr-2 text-gray-700 font-medium">Sort by:</span>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg flex items-center gap-1 text-sm font-medium hover:bg-gray-300 transition"
            onClick={() => setOpen((v) => !v)}
          >
            {sortBy === "newest" ? "Newest" : "Oldest"} <span>▾</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-20">
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${
                  sortBy === "newest" ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSortBy("newest");
                  setOpen(false);
                  if (postsRef.current) postsRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Newest
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${
                  sortBy === "oldest" ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSortBy("oldest");
                  setOpen(false);
                  if (postsRef.current) postsRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Oldest
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div ref={postsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="cursor-pointer">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative transition-transform duration-500 ease-in-out hover:scale-105">
                {/* <img src={post.image} alt={post.title} className="w-full h-52 object-cover " /> */}
                <Image
                  src={post.image}         // external URL
                  alt={post.title}
                  width={600}              // specify width
                  height={208}             // specify height
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <div className="inline-block bg-gradient-to-br from-zinc-100/40 to-zinc-300/20 border-0 py-2 px-3 rounded-full text-sm sm:text-base shadow-[0_0.4rem_0.8rem_0.2rem_rgba(0,0,0,0.2)] backdrop-blur-md cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white">
                    {post.category}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-500 text-xs">{post.date} • {post.readTime}</p>
                <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                <p className="text-gray-700 mt-2 text-sm">{post.description}</p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-4">
                  <div
                    className="w-9 h-9 flex-shrink-0 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.authorImage})` }}
                  />
                  <strong className="text-sm sm:text-base font-medium">{post.author}</strong>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === i + 1 ? "bg-gray-900 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;