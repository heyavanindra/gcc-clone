"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from './ProductPrice';


function ShopAll({ product, img, title, url, categories }) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(10);

  const handleViewMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
  };


  return (
    <div className='pt-36'>
      <div className='h-80 relative'>
        <img
          src={img}
          alt="img"
          className='h-full w-full object-cover'
        />
        <p className='text-white text-2xl uppercase font-semibold md:text-4xl tracking-wider absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[100%]'>
          {title}
        </p>
      </div>

      <div className='p-8 border-y flex flex-col justify-center gap-6 items-center'>
        <div className='md:hidden border-b pb-10'>
          <ul className='flex justify-center gap-2 text-left'>
            {categories.map((cat, index) => (
              <li key={index} className='group'>
                <Link href={`/${url}/${cat}`} className='text-sm whitespace-nowrap group-hover:underline underline-offset-2'>
                  {cat.replace(/_/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className='text-xl text-center'>{`${product.length} Products`}</p>
      </div>
      <div className='flex'>
        <div className='hidden md:flex justify-center md:w-2/12'>
          <ul className='flex flex-col justify-center gap-4 text-left h-96 sticky top-8 border-r px-16'>
            {categories.map((cat, index) => (
              <li key={index} className='group'>
                <Link href={`/${url}/${cat}`} className='group-hover:underline underline-offset-2'>
                  {cat.replace(/_/g, ' ').toUpperCase()}
                </Link>
              </li>
            ))}
            <li className='hover:underline underline-offset-2'>
              <Link href={`/types/shop_all`}>Shop All</Link>
            </li>
          </ul>
        </div>
        <div className='md:w-10/12 flex flex-wrap justify-center md:pl-8'>
          {(product.length > 10 ? product.slice(0, visibleItems) : product).map((item, i) => (
            <div key={i} className='w-1/2 md:w-1/4 px-2 mb-4 cursor-pointer' onClick={() => router.push(`/${url}/shop_all/${item._id}`)}>
              <div className='rounded overflow-hidden shadow-lg'>
                <Image src={item.img[0]} alt={item.title} width={0} height={0} className='w-64 h-80' style={{objectFit: 'cover'}} unoptimized/>
                <div className='px-6 py-4'>
                  <p className='font-bold text-xl mb-2'>{item.title}</p>
                  <p className='text-gray-700 text-base'><ProductPrice price={item.amount}/></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visibleItems < product.length && (
        <div className='flex justify-center mt-4'>
          <button
            className='bg-black text-white px-4 py-2'
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}

export default ShopAll;
