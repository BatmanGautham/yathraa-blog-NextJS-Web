import { useRouter } from "next/router";
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Static destinations array
const destinations = [
  {
    slug: "hiking-wonders",
    title: "Exploring the Wonders of Hiking",
    description:
      "An iconic landmark, this post unveils the secrets that make this destination a traveler’s paradise.",
    date: "22 Aug 2025",
    readTime: "8 mins",
    author: "Bruce Wayne",
    authorImage: "/author1.jpg",  
    image: "/img1.jpg",          
    content: `Hiking is more than just an activity—it's an adventure that connects us with nature, pushes our limits, and provides unforgettable memories. If you're an outdoor enthusiast or someone looking to break away from the hustle and bustle of city life, hiking offers a rejuvenating experience that refreshes both the body and the mind. Today, let’s dive into the world of hiking, and explore one of the most captivating hiking destinations in India—Kerala, a place of lush green hills, tranquil landscapes, and rich biodiversity.

As you trek through Kerala's vast landscapes, the journey itself becomes just as enriching as the destination. The experience of breathing in the fresh mountain air, hearing the soothing sounds of nature, and witnessing the incredible variety of flora and fauna is what makes hiking here so special. Kerala’s Western Ghats are a treasure trove for hikers, offering some of the most scenic views in the country. Whether you're walking through mist-covered forests, alongside gushing waterfalls, or over rugged mountain terrain, every step brings you closer to the raw beauty of nature.

One of the best things about hiking in Kerala is the diversity of trails available for all kinds of adventurers. From easy, family-friendly hikes that take you through picturesque tea plantations to more challenging, high-altitude treks that test your endurance, Kerala has something for every level of hiker. The state’s rich biodiversity is another reason to visit—it's not uncommon to spot exotic birds, rare butterflies, and even wild animals like the Nilgiri Tahr. Every trail you take feels like an exploration into a different world, and the chance to reconnect with nature in such an untouched environment is an experience like no other.`
  },
  // add more posts as needed
];

export default function DestinationDetail() {
  const router = useRouter();
  const { slug } = router.query;

  // If slug is undefined, it means the page is still loading
  if (!slug) {
    return <p>Loading...</p>;
  }

  // Find the post based on the slug
  const post = destinations.find((d) => d.slug === slug);

  // If no post is found, show a 404-like message
  if (!post) {
    return <p className="text-center mt-20 text-gray-600">Destination not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-white to-indigo-50">
      {/* Optional Navbar if you want */}
      <Nav
        searchTerm=""
        setSearchTerm={() => {}}
        suggestions={destinations.map((d) => d.title)}
        setAuthType={() => {}}
      />

      <article className="max-w-3xl mx-auto px-5 py-16">
        <Image
          src={post.image}
          alt={post.title}
          width={900}
          height={600}
          className="rounded-xl mb-6 w-full object-contain"
        />
        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {post.date} • {post.readTime} • {post.author}
        </p>
        <p className="text-base text-gray-600 mb-6 italic">{post.description}</p>
        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {post.content}
        </p>

        <div className="flex items-center gap-3 mt-8">
          <Image
            src={post.authorImage}
            alt={post.author}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-sm font-medium">{post.author}</span>
        </div>
      </article>

      <Footer />
    </div>
  );
}
