// pages/destination/index.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import authorImage from "../../../public/author1.jpg";
import Footer from "@/components/Footer";
import Nav from "@/components/Navbar";

const destinations = [
  {
    slug: "hiking-wonders",
    title: "Exploring the Wonders of Hiking",
    description:
      "An iconic landmark, this post unveils the secrets that make this destination a traveler’s paradise.",
    date: "22 Aug 2025",
    readTime: "8 mins",
    author: "Bruce Wayne",
    authorImage: authorImage,
    image: "/img1.jpg",
  },
];

export default function DestinationList() {

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-white to-indigo-50">
        {/* Navbar */}
        <Nav
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          suggestions={destinations.map((d) => d.title)}
          setAuthType={() => {}}
        />

        {/* Content */}
        <div className="max-w-5xl mx-auto px-5 py-16">
          <h1 className="text-4xl font-bold mb-6">Destinations</h1>
          <p className="text-lg text-gray-600 mb-10">
            Hand-picked travel guides and experiences from our authors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {destinations.map((dest) => (
              <Link key={dest.slug} href={`/destination/${dest.slug}`}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    width={600}
                    height={400}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-5">
                    <p className="text-gray-500 text-xs">
                      {dest.date} • {dest.readTime}
                    </p>
                    <h3 className="text-lg font-bold mt-2">{dest.title}</h3>
                    <p className="text-gray-700 mt-2 text-sm">
                      {dest.description}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <Image
                        src={dest.authorImage}
                        alt={dest.author}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <strong className="text-sm font-medium">
                        {dest.author}
                      </strong>
                    </div>

                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
