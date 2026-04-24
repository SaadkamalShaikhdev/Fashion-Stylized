"use client"
import Image from 'next/image'
import Link from 'next/link'
import {ShoppingBag, Menu} from "lucide-react"
import { useState } from 'react';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
<>
<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

<header className='sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-b-foreground/10'>
  <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
    <div className='flex items-center justify-center gap-20'>
      <div>
      <Image src="/logo2.png"  alt="Logo" width={100} height={40} />
      </div>
      <ul className='hidden gap-8 lg:flex'>
      <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/Watches">Watches</Link></li>
      <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/wallet">Wallet</Link></li>
      <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/glasses">Glasses</Link></li>
      <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/collection">Collection</Link></li>
      <li><Link className='text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity' href="/contact">Contact</Link></li>

    </ul>
    </div>
    
    <div className='flex items-center justify-cente gap-7'>
      <Link href="/cart" className='relative'>
        <ShoppingBag className='h-6 w-6 opacity-70 hover:opacity-100 transition-opacity' size={24} />
        </Link>
        <Link className="hidden lg:block px-6 py-2 border border-foreground hover:bg-foreground/20 transition-colors" href="/signIn">SIGN IN</Link>
    <button onClick={()=>{setSidebarOpen(true)}}  className='block lg:hidden'><Menu className='h-6 w-6 opacity-70 hover:opacity-100 transition-opacity cursor-pointer' /></button>
    </div>
  </nav>
</header>
</>
)
}

export default Navbar