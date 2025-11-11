"use client"
import React from 'react'
import Carousel from 'react-multi-carousel';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';
import Image from 'next/image';

const CustomLeftArrow = ({ onClick }) => (
  <button
    className='md:block absolute left-4 p-2'
    onClick={onClick}
  >
    <HiArrowLongLeft size={30} />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    className='md:block absolute right-4 p-2'
    onClick={onClick}
  >
    <HiArrowLongRight size={30} />
  </button>
);


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

function ProductsCarousel({images}) {
  
    
  return (
    <div>
    <Carousel
  swipeable={true}
  keyBoardControl={true}
  draggable={true}
  centerMode={true}
  responsive={responsive}
  customLeftArrow={<CustomLeftArrow />}
  customRightArrow={<CustomRightArrow />}
  itemClass="px-2"
>
{images.map((img, i) => (
    <Image
      key={i}
      src={img}
      alt='products_img'
      width={0} height={0} className='w-full h-[380px] md:h-[520px]'
      unoptimized
    />
  ))}
</Carousel>
  </div>
  )
}

export default ProductsCarousel;