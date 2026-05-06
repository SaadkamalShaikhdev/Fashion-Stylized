"use client";
import {useCartStore} from "@/app/store/cartStore"
import {ArrowLeft, ShoppingBag} from "lucide-react"
import React from 'react'
import {useRouter} from "next/navigation"
const Cart = () =>  {
  const { itemCount } = useCartStore()
const router = useRouter()




  return (
    <>    <div className="border-b border-(--border)">

  <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6">

    <button onClick={() => router.back()}className="flex text-(--muted-foreground) gap-3 justify-center items-center cursor-pointer hover:text-(--foreground) transition-colors mb-6">

    <ArrowLeft className="h-5 w-5" />
    <span>Continue Shopping</span>

    </button>
    <h1 className="text-5xl lg:text-6xl font-cormorant-garamond">
      Shopping Cart
    </h1>
    
    
    </section>  
    </div> 
  {
    itemCount == 0 ? (
            <section className="max-w-[1600px] min-h-[calc(100vh-210px)] mx-auto px-6 lg:px-12 py-6 flex flex-col justify-center items-center gap-4">
      <ShoppingBag className="h-24 w-24 mb-6 opacity-20 text-(--muted-foreground)" />
      <h2 className="text-3xl mb-4 font-cormorant-garamond">Your Cart is Empty</h2>
      <p className="text-(--muted-foreground) mb-6">Discover our curated collection of premium accessories</p>
      <button className="bg-(--primary) tracking-widest text-(--primary-foreground) hover:bg-(--primary)/90 px-12 py-4 uppercase">Start Shopping</button>
            </section>

    ) : (
      <p>Your cart contains {itemCount} items.</p>
    ) 
  }
    </>
  )
}

export default Cart