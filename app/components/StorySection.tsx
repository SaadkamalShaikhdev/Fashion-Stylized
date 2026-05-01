import { Image } from '@imagekit/next'
import React from 'react'

const StorySection = () => {
  return (
<section className='relative py-32 px-6 lg:px-12 overflow-hidden'>
<div className='absolute inset-0'>
<Image
                    urlEndpoint='https://ik.imagekit.io/fashionstylized'
                    alt="Story Image"
                    fill={true}
                    className='w-full h-full object-cover opacity-30'
                    src="photo-1748943214874-e93ea54971ec.jpg"
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent'></div>
</div>
<div className='relative z-10 max-w-[1600px] mx-auto' >
    <div className='max-w-2xl'>
        <h2 className='text-6xl lg:text-7xl mb-8 leading-tight font-cormorant-garamond'>Crafted for the
            < br/>
            <span className='text-(--primary)'>Exceptional
</span>
        </h2>
        <p className='text-lg text-(--muted-foreground) mb-8 leading-relaxed tracking-wide'>
            Each piece in our collection is meticulously selected to embody the perfect balance of form and function. From Italian leather wallets to Swiss-engineered timepieces, we curate only the finest accessories for those who appreciate true craftsmanship.
        </p>
        <button className="border border-(--primary) text-primary px-12 py-4 uppercase tracking-widest hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors cursor-pointer
        ">Our Story</button>
    </div>
</div>
</section>
  )
}

export default StorySection