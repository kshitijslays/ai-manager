import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/LenisProvider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Scalez",
  description: "Business-first automation systems",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <LenisProvider>
          <Navbar />

          <main>
            {children}
          </main>

          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
