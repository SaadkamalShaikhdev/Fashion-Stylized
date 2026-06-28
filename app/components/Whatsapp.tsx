"use client"
import Image from "next/image";
export default function Whatsapp(){
    return (<a href="https://wa.me/923182942654?text=Hello!" className="fixed bottom-4 right-4" target="_blank" rel="noopener noreferrer">
  <Image src="/whatapp.png" alt="WhatsApp" width={50} height={50} />
</a>)
}