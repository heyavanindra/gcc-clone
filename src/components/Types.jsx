"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductFormModal from './ProductFormModal';
import EditProductsBanner from './EditProductsBanner';
import { useSession } from 'next-auth/react';
import { decode } from 'jsonwebtoken';
import ProductPrice from './ProductPrice';

const {NEXT_PUBLIC_HOST_URL} = process.env;

const getData = async (category) => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/types/${category}`, { cache: 'no-store' });
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

function Types({ product, img, title, categories }) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(10);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState(product);
  const [allCategories, setAllCategories] = useState(categories);
  const { data } = useSession();

  const handleViewMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  useEffect(() => {
    if (data) {
      setToken(data.user.accessToken);
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAdmin(decodedToken.isAdmin);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(title);
        console.log(fetchedData); // Debug the response
        if (fetchedData) {
          setProducts(fetchedData.products || []);
          setAllCategories(fetchedData.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    fetchData();
  }, [title]);

  const closeProductFormModal = () => {
    setIsProductFormOpen(!isProductFormOpen);
  };

  const closeEditBannerModal = () => {
    setIsEditing(!isEditing);
  };


  return (
    <div className='pt-36'>
      <div className='h-80 relative'>
        <Image
          src={img}
          alt="img"
          fill
          style={{objectFit: 'cover'}}
          unoptimized
        />
        <p className='text-white text-2xl uppercase font-semibold md:text-4xl tracking-wider absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[100%]'>
          {title.replace(/_/g, ' ')}
        </p>
      </div>

      <div className='p-8 border-y flex flex-col justify-center gap-6 items-center'>
        <div className='md:hidden border-b pb-10'>
          <ul className='flex justify-center gap-2 text-left'>
            {allCategories.map((cat, index) => (
              <li key={index} className='group'>
                <Link href={`/types/${cat}`} className='text-sm whitespace-nowrap group-hover:underline underline-offset-2'>
                  {cat.replace(/_/g, ' ').toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className='text-xl text-center'>{`${products.length} Products`}</p>
      </div>
      <div className='flex'>
        <div className='hidden md:flex justify-center md:w-2/12'>
          <ul className='flex flex-col justify-center gap-4 text-left h-96 sticky top-8 border-r px-16'>
            {allCategories.map((cat, index) => (
              <li key={index} className='group'>
                <Link href={`/types/${cat}`} className='group-hover:underline underline-offset-2'>
                  {cat.replace(/_/g, ' ').toUpperCase()}
                </Link>
              </li>
            ))}
            <li className='hover:underline underline-offset-2'><Link href='/types/shop_all'>Shop All</Link></li>
          </ul>
        </div>
        <div className='md:w-10/12 flex flex-wrap justify-center md:pl-8'>
          {(products.length > 10 ? products.slice(0, visibleItems) : products).map((item, i) => (
            <div key={i} className='w-1/2 md:w-1/4 px-2 mb-4 cursor-pointer' onClick={() => router.push(`/types/${title}/${item._id}`)}>
              <div className='rounded overflow-hidden shadow-lg'>
                <div className='flex justify-center'>
                <Image src={item.img[0]} alt={item.title} unoptimized width={0} height={0} className='w-64 h-80'/>
                </div>
                <div className='px-6 py-4'>
                  <p className='font-bold text-xl mb-2'>{item.title}</p>
                  <p className='text-gray-700 text-base font-semibold'><ProductPrice price={item.amount}/></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visibleItems < products.length && (
        <div className='flex justify-center mt-4'>
          <button
            className='bg-black text-white px-4 py-2'
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
      {isAdmin && (
        <div className='absolute top-40 p-5 flex gap-8'>
          <button className='bg-black text-white p-3' onClick={closeProductFormModal}>Add Product</button>
          <button className='bg-black text-white p-3' onClick={closeEditBannerModal}>Edit Banner</button>
        </div>
      )}
      {isProductFormOpen && <ProductFormModal onClose={closeProductFormModal} maintitle={title} apiRoute={`/api/types/${title}`}
        storagePath={'productImages/types'} method={'POST'} />}
      {
          isEditing && <EditProductsBanner onClose={closeEditBannerModal} api={`/api/types/${title}`} banner={img}
          storageUrl={'productImages/types/banner'}
          />
        }
    </div>
  );
}

export default Types;
