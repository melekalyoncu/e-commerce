import { CartProvider } from "@/context/CartContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <main className="flex-grow bg-gray-50">{children}</main>
    </CartProvider>
  );
}
