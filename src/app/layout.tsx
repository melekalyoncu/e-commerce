// app/auth/layout.tsx
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '../../src/context/CartContext'

export const metadata = {
  title: 'Giriş - BeeTech',
  description: 'BeeTech Giriş Sayfası',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
              <CartProvider>

      <body className="flex flex-col min-h-screen text-gray-700">
        {/* Navbar her sayfada */}
        <Navbar />

        {/* Ana içerik: flex column ve boşluğu dolduracak flex-grow */}
        <main className="flex flex-col flex-grow bg-gray-50">
          {children}
        </main>

        {/* Footer her zaman en altta */}
        <Footer />
      </body>
              </CartProvider>

    </html>
  )
}
