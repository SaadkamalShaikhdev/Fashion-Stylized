"use client"

import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import NewArrival from "../components/NewArrival";
import StorySection from "../components/StorySection";
import Link from "next/link";
import Image from "next/image";



export default function Home() {
  return (
 <>
<HeroSection />
<CategorySection />
<NewArrival />
<StorySection />

 </>
  );
}
