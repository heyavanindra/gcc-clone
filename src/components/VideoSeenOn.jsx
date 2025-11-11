// "use client"
// import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';

// const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false });

// const CustomLeftArrow = ({ onClick }) => (
//     <button
//         className='absolute p-1 left-8 bg-white'
//         aria-label="Previous Slide"
//         onClick={onClick}
//     >
//         <HiArrowLongLeft size={20} />
//     </button>
// );

// const CustomRightArrow = ({ onClick }) => (
//     <button
//         className='absolute right-8 p-1 bg-white'
//         aria-label="Next Slide"
//         onClick={onClick}
//     >
//         <HiArrowLongRight size={20} />
//     </button>
// );

// const responsive = {
//     superLargeDesktop: {
//         breakpoint: { max: 4000, min: 1024 },
//         items: 4,
//     },
//     desktop: {
//         breakpoint: { max: 1024, min: 768 },
//         items: 4,
//     },
//     tablet: {
//         breakpoint: { max: 768, min: 464 },
//         items: 1,
//     },
//     mobile: {
//         breakpoint: { max: 464, min: 0 },
//         items: 1,
//     },
// };

// const videoData = [
//     {
//         video: 'https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/d605ba87fefc4e12b36e0701d92f335a/d605ba87fefc4e12b36e0701d92f335a.HD-1080p-7.2Mbps-32346937.mp4?v=0',
//         img: 'https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio_March2022_-860.jpg',
//         title: 'Aria One',
//         amount: 250
//     },
//     {
//         video: 'https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/e39dce8782664f97b92616c1d65efee0/e39dce8782664f97b92616c1d65efee0.HD-1080p-2.5Mbps-32348530.mp4?v=0',
//         img: 'https://sahara-theme.myshopify.com/cdn/shop/products/Photo29-8-2022_115044am.jpg',
//         title: 'Honey Top Ivory',
//         amount: 250
//     },
//     {
//         video: 'https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/598d470bce9f4c27af0392188b2f3b46/598d470bce9f4c27af0392188b2f3b46.HD-1080p-7.2Mbps-32348531.mp4?v=0',
//         img: 'https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio-228.jpg',
//         title: 'Goldie Top Aloha',
//         amount: 250
//     },
//     {
//         video: 'https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/3c676eb806bd4fa892bfc258d751b787/3c676eb806bd4fa892bfc258d751b787.HD-1080p-3.3Mbps-32348416.mp4?v=0',
//         img: 'https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio-890.jpg',
//         title: 'Carrier Mini Skirt Espresso',
//         amount: 250
//     },
//     {
//         video: 'https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/e667bfb122f94e56a056ac5dca85b72e/e667bfb122f94e56a056ac5dca85b72e.HD-1080p-3.3Mbps-32348398.mp4?v=0',
//         img: 'https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio-130.jpg',
//         title: 'Goldie Top Coconur',
//         amount: 250
//     },
//     {
//         video: 'https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/694dc49d01e048619a5172fc8a759afb/694dc49d01e048619a5172fc8a759afb.HD-1080p-2.5Mbps-32347481.mp4?v=0',
//         img: 'https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio-606_21117be2-6b4d-40e0-a468-56502c073c1c.jpg',
//         title: 'Gypsy Top Nero',
//         amount: 250
//     },
// ]

// function VideoSeenOn() {
//     return (
//         <div className='px-6 md:px-12 flex flex-col justify-center py-10'>
//             <div className='flex justify-between items-center mb-10'>
//                 <p className='text-lg md:text-3xl uppercase tracking-wider'>As Seen On</p>
//                 <Link href='https://www.instagram.com/golden_ghaf_clothing_company?igsh=MWpvemJja3EwbGp5dw%3D%3D&utm_source=qr' className='px-4 py-1 md:px-6 md:py-3 bg-white border border-black hover:bg-black hover:text-white text-black'>Follow @ Golden Ghaf</Link>
//             </div>
//             <div>
//                 <Carousel
//                     responsive={responsive}
//                     swipeable={false}
//                     draggable={false}
//                     ssr={true} // means to render carousel on server-side.
//                     keyBoardControl={true}
//                     customLeftArrow={<CustomLeftArrow />}
//                     customRightArrow={<CustomRightArrow />}
//                     itemClass='mr-3'
//                 >
//                     {videoData.map((item, i) => (
//                         <div key={i} className="w-full md:w-11/12 h-full relative flex justify-center">
//                             <video
//                                 src={item.video}
//                                 muted
//                                 playsInline
//                                 autoPlay
//                                 loop
//                                 className="h-full w-full object-cover"
//                             ></video>
//                             <div className="absolute bottom-0 left-0 w-full p-4 text-white">
//                                 <div className="flex items-center gap-4">
//                                     <img src={item.img} alt="product" className="w-24 h-28 md:w-16 md:h-20" />
//                                     <div className="flex flex-col">
//                                         <p className="text-xl md:text-lg">{item.title}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </Carousel>
//             </div>
//         </div>
//     );
// }

// export default VideoSeenOn;
import React from 'react'

function VideoSeenOn() {
  return (
    <div>VideoSeenOn</div>
  )
}

export default VideoSeenOn