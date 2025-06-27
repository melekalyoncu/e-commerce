// app/blog/page.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Post {
  id: string
  title: string
  excerpt: string
  cover: string
  date: string
}

const posts: Post[] = [
  {
    id: '1',
    title: 'Yaz Lezzetleriyle Serin Kalın',
    excerpt:
      'Yaz aylarında ferahlatıcı içecekler ve hafif atıştırmalıklarla serin kalmanın yollarını keşfedin.',
    cover: '/images/1.jpg',
    date: '2025-06-15',
  },
  {
    id: '2',
    title: 'Organik Malzeme Seçmenin Püf Noktaları',
    excerpt:
      'Doğru organik ürünleri seçerken nelere dikkat etmeli, etiketleri nasıl okumalı? İpuçlarımız burada.',
    cover: '/images/2.jpg',
    date: '2025-06-10',
  },
  {
    id: '3',
    title: '10 Dakikada Pratik Akşam Yemekleri',
    excerpt:
      'Yoğun iş günlerinin ardından hızlıca hazırlayabileceğiniz, lezzetten ödün vermeyen tarifler.',
    cover: '/images/3.jpg',
    date: '2025-06-05',
  },
  // Daha fazla post ekleyebilirsin…
]

export default function BlogPage() {
  return (
    <>
      {/* Hero / Breadcrumb */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Blog</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">
              Anasayfa
            </Link>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition"
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <time className="text-xs text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString('tr-TR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 flex-1">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-block text-green-600 hover:underline text-sm font-medium"
                  >
                    Devamını Oku →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
