// app/layout.tsx
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'BeeTech',
  description: 'E-ticaret siteniz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        {/* tüm sayfaların ortak başlığı */}
        <Navbar />

        {/* her route’un içeriği */}
        <main className="border-t border-gray-200">{children}</main>
                <Footer />

      </body>
    </html>
  )
}
