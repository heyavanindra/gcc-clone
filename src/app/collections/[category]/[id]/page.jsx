import React from 'react';
import Link from 'next/link';
import ProductsCarousel from '@/components/ProductsCarousel';
import SizeSelector from '@/components/SizeSelector';
import ProductPrice from '@/components/ProductPrice';
import CompleteSet from '@/components/CompleteSet';
import Faq from '@/components/Faq';

const {NEXT_PUBLIC_HOST_URL} = process.env;

const getProductData = async (category, id) => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/collections/${category}/${id}`,{cache: 'no-store'});
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getMoreProducts = async() => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/products/shop_all`,{cache: 'no-store'});
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function page({ params }) {
  const { category ,id } = params;
  const data = await getProductData(category, id);
  let item = [];
  const allData = await getMoreProducts();
  item.push(data)
  
  
  return (
    <div className='pt-36'>
      {item.length > 0 ? (
        <>
        <div>
          <div className='md:flex justify-evenly'>
          <div className='md:w-5/12 md:mr-10'>
          <p className='text-xs p-5 text-gray-400'><Link href='/' className='hover:underline pr-2'>Home</Link>/ <span className='pl-1 cursor-pointer'>{item[0].title}</span></p>
          <ProductsCarousel images={item[0].img}/>
          </div>
          <div className='md:w-4/12 px-6 pt-8 md:pt-20'>
          <h1 className='text-2xl font-bold tracking-widest'>{item[0].title}</h1>
          <p className='font-semibold py-2'><ProductPrice price={item[0].amount}/></p>
          <p className='text-xs py-1 md:text-sm'>Tax included. Shipping calculated at checkout.</p>
          <div className='py-4'>
            <p className='text-sm pb-2'>SIZE:</p>
            <SizeSelector id={item[0]._id} sizes={item[0].quantity.size} amount={item[0].amount} title={item[0].title} img={item[0].img} category={category} productType={'collections'} 
             desc={item[0].desc} styleTip={item[0].styleTip} modalInfo={item[0].modalInfo}
            />
          </div>
          </div>
          </div>
          <div>
          <CompleteSet items={allData} desc={item[0].desc} styleTip={item[0].styleTip} modalInfo={item[0].modalInfo}/>
          <Faq/>
          <div className='flex flex-col justify-center items-center px-20'>
          <p className='text-xl md:text-3xl tracking-widest pb-10 mt-16'>EXPLORE THE SEASON</p>
          <p className='text-center w-full md:w-3/4'>Our bikinis combine glamour and sustainability, giving you a look that will turn heads. With our luxuriously soft and sustainable fabrics, you can feel confident that you’re making an ethical choice while looking your best. Whether you’re hitting the beach or lounging by the pool, our bikinis are sure to make you feel your most confident and stylish self.</p>
        </div>
        <div className='px-12 md:px-28 mt-20 h-[75vh] flex justify-center gap-20'>
          <div className='bg-cover bg-center w-full h-5/6  md:w-4/12' style={{backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-611_2.jpg)'}}>
            <div className='flex flex-col h-full md:pl-0 justify-end pb-8 items-center'>
            <p className='tracking-widest text-3xl pl-10 md:pl-16 text-white'>RUSTY DIAMOND TRIANGLE RANGE</p>
            <button className='px-8 py-3 bg-transparent text-white border border-white hover:bg-white hover:text-black'>Explore</button>
            </div>
          </div>

          <div className='hidden md:block w-4/12'>
            <img src="https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-794_1.jpg?v=1677685612&width=720" loading='lazy' alt="banner" className='w-full h-5/6'/>
          </div>
          
        </div>
        <div className='h-[68vh] bg-cover bg-center flex flex-col justify-center items-center gap-8' style={{backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/products/birdielace_54e56656-b257-4199-a565-19d9bcc80a6c.jpg)'}}>
        <p className='text-xl text-white'>Where sustainability meets understated luxury</p>
        <p className='tracking-widest text-2xl font-semibold text-white'>LUXURIOUS SWIMWEAR</p>
        <button className='px-8 py-3 bg-transparent text-white border border-white hover:bg-white hover:text-black'>Explore All Products</button>
        </div>
          </div>
        </div>
      </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default page;
