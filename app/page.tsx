"use client"
import { div } from "motion/react-client";
import { signOut } from "next-auth/react";
import Image from "next/image";
export default function Home() {
  return (
   <div>
    
    <button onClick={() => signOut()}>Sign Out</button>
   </div>
  );
}
