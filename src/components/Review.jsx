"use client"
import {useState, useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';
import Link from 'next/link';
import EditReview from './landingPage/EditReview';
import 'react-multi-carousel/lib/styles.css';
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 2,
    },
};

const CustomLeftArrow = ({ onClick }) => (
    <button
      className='hidden md:block absolute bottom-8 left-5 p-2'
      aria-label="Previous Slide"
      onClick={onClick}
    >
      <HiArrowLongLeft size={40} />
    </button>
  );
  
  const CustomRightArrow = ({ onClick }) => (
    <button
      className='hidden md:block absolute bottom-8 left-20 p-2'
      aria-label="Next Slide"
      onClick={onClick}
    >
      <HiArrowLongRight size={40} />
    </button>
  );

function Review() {
    const [data, setData] = useState(null);



    useEffect(() => {
        const getData = async() => {
            try{
                let res = await fetch('/api/landingPage/reviewSection', {cache: 'no-cache'});
                res = await res.json();
                setData(res);
            }catch(err){
                console.log(err);
            }
        }
        getData();
    },[]);

  return (
    <div className="bg-orange-50 flex flex-col justify-center mt-36 md:mt-0 py-6">
  {data ? (
    <>
      <p className="uppercase pl-20 md:mt-8">From the People</p>
      <Carousel
        responsive={responsive}
        ssr={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {data.length > 0 && data.map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row px-4 md:px-20 h-auto md:h-screen pt-10 md:pt-20">
            <EditReview item={item} api={`/api/landingPage/reviewSection`} storageUrl={'reviews'}/>
            <div className="w-full md:w-3/4 self-start">
              <div className="w-full md:w-[68%]">
                <p className="text-sm md:text-4xl tracking-widest font-thin leading-6 md:leading-12">
                  &#34;{item.desc}&#34;
                </p>
                <p className="pt-3 text-xs md:text-base">
                  {item.title}
                  <span className="ml-2">{new Date(item.date).getFullYear()}</span>
                </p>
              </div>
            </div>
            <Link href={item.url} className="relative w-full md:w-2/4 h-[50vh] md:h-[78%] hover:opacity-80 pt-0 order-first md:order-2 mt-4 md:mt-0">
              <Image src={item.image}
                alt={item.title} fill className="absolute inset-0 object-cover" unoptimized/>
              <p className="absolute bottom-4 md:-bottom-12 right-4 md:right-0 text-white md:text-black p-2 text-xs md:text-xl underline tracking-wide">
                {item.name}
              </p>
            </Link>
          </div>
        ))}
      </Carousel>
    </>
  ) : (
    <p>Failed to load data!</p>
  )}
</div>

  )
 
}

export default Review;