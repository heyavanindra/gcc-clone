import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EditItemSale from './landingPage/EditItemSale';
import itemSale from '../../public/assets/itemsale.jpg';


const {NEXT_PUBLIC_HOST_URL} = process.env;

const getData = async() => {
  try {
      let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/itemSale`, {cache: 'no-store'});
      res = await res.json();
      return res;
  } catch(err) {
      console.error(err);
      return [];
  }
}

async function ItemSale() {
  const data = await getData();

  return (
    <div className='h-[80vh] md:flex text-white gap-1 tracking-wider'>
    {data.length > 0 ? (
      <div className='relative bg-cover bg-center h-3/4 md:h-full w-full md:w-1/2 flex flex-col justify-end items-center'>
        <Image
          src={itemSale}
          alt='sale'
          fill
          style={{objectFit: 'cover'}}
          unoptimized
        />
        <div className='absolute bottom-10 w-full flex flex-col items-center text-center'>
          <p className='text-3xl font-semibold uppercase mb-4'>{data[0].title}</p>
          <Link
            href='/collections/mediterranean_love'
            className='border border-white bg-transparent hover:bg-white hover:text-black px-5 py-2 md:px-8 md:py-3'
          >
            Shop Our Collection
          </Link>
        </div>
        <EditItemSale
          item={data[0]}
          api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/itemSale`}
          storageUrl={'itemSale'}
        />
      </div>
    ) : (
      <p>Failed to load data!</p>
    )}
    <div className='bg-teal-100 h-1/4 md:h-full w-full md:w-1/2 flex flex-col text-black items-center justify-center gap-4 py-2'>
      <p className='text-xl md:text-3xl md:pt-24'>ON SALE ITEMS</p>
      <p className='text-lg md:text-xl'>Discover our on sale items now.</p>
      <Link
        href='/featured/sale'
        className='border border-black bg-transparent hover:bg-black hover:text-white px-6 py-2 md:px-8 md:py-3 transition ease-in delay-50'
      >
        SHOP SALE
      </Link>
    </div>
  </div>
  
  )
}

export default ItemSale;