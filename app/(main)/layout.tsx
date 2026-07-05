import type { Metadata } from "next"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Whatsapp from "../components/Whatsapp"
import TopBanner from "../components/layout/TopBanner"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <TopBanner />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Whatsapp />
      <Footer />
</> 
 )
}