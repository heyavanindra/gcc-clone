"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import Image from "next/image";

const CustomLeftArrow = ({ onClick }) => (
  <button
    className="hidden md:block absolute -bottom-4 right-20 p-2"
    aria-label="Previous Slide"
    onClick={onClick}
  >
    <HiArrowLongLeft size={40} />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    className="hidden md:block absolute -bottom-4 right-4 p-2"
    aria-label="Next Slide"
    onClick={onClick}
  >
    <HiArrowLongRight size={40} />
  </button>
);

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ImageSlider = ({ items }) => {
  return (
    <div className="relative">
      <Carousel
        swipeable={true}
        keyBoardControl={true}
        draggable={true}
        responsive={responsive}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        itemClass="px-2"
      >
        {(Array.isArray(items) ? items : []).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full h-full group"
          >
            <Image
              width={500}
              height={500}
              src={item?.image}
              alt={item?.title || 'image'}
              className="object-cover md:h-96 h-56 w-full group-hover:opacity-75"
              loading="lazy"
            />
            <div className="flex flex-col items-start gap-1 p-4 h-1/3 md:h-auto">
              <p className="text-lg font-semibold group-hover:underline underline-offset-2">
                {item?.title || ''}
              </p>
              <p className="text-xs h-16">
                {(item?.desc ? String(item.desc) : '').slice(0, 160)}...
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
