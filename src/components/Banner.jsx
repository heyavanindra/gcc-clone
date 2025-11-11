import Link from 'next/link';
import EditBanner from './landingPage/EditBanner';
import Image from 'next/image';
import shoes from '../../public/assets/shoe1.webp';

const { NEXT_PUBLIC_HOST_URL } = process.env;

const getData = async () => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/banner`, { cache: 'no-cache' });
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function Banner() {
  const data = await getData() || [];
  return (
    <>
      {
        data.length > 0 ? data.map((item, i) => <div key={i} className='h-96 relative flex flex-col tracking-wider justify-center text-black gap-5 items-center bg-cover bg-center'>
          <Image src={shoes} alt='shoe-banner' fill style={{ objectFit: 'cover' }} unoptimized />
          {/* <EditBanner item={item} api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/banner`} storageUrl={'banner'} /> */}
          <div className='absolute text-center'>
            <p className='text-base py-2'>Casual Shoes, created with style</p>
            <p className='text-4xl py-2'>Shoes Collections</p>
          </div>
          <div className='flex gap-3 absolute top-[65%]'>
            <Link href={item.url} className='px-6 py-3 border border-black text-black bg-transparent hover:bg-black hover:text-white text-sm'>Shop New In</Link>
            <Link href={item.url2} className='px-6 py-3 border border-black text-black bg-transparent hover:bg-black hover:text-white text-sm'>All Products</Link>
          </div>
        </div>) : <p>Failed to load data!</p>
      }
    </>
  )
}

export default Banner