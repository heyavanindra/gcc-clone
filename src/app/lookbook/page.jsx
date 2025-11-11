import { Fragment } from 'react';
import Link from 'next/link';
import EditLookbook from '@/components/routepages/EditLookbook';


const getData = async () => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/lookbook`, { cache: 'no-store' });
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
}

const { NEXT_PUBLIC_HOST_URL } = process.env;

async function page() {

  const data = await getData();

  return (
    <div className='pt-36 md:h-[165vh]'>
      {data.length ? data.map((item, i) => <Fragment key={i}>
        <div className='relative h-80'>
          <img src={item.banner} alt="banner" loading='lazy' className='w-full h-full object-cover' />
          <div className='absolute inset-0 text-white flex flex-col justify-center items-center gap-4'>
            <p>{item.title}</p>
            <p className='text-3xl md:text-4xl tracking-wider uppercase'>{item.desc}</p>
            <div className='mt-2'>
              <Link href='/blog/66a7343b111e2f1182d2c6d6' className='px-6 py-3 border bg-transparent text-white border-white hover:bg-white hover:text-black'>Explore Lookbook</Link>
            </div>
            <EditLookbook item={item} api={`${NEXT_PUBLIC_HOST_URL}/api/lookbook`} />
          </div>
        </div>

        <div className='md:flex justify-center gap-10 mt-24'>
          <div className='relative w-full md:w-1/2 flex justify-center md:justify-end'>
            <img
              src={item.imageL}
              loading='lazy'
              alt="lookbook_img"
              className='w-9/12 h-[600px] object-cover'
              style={{ maxHeight: '600px' }}
            />
            <Link
              href='/blog/66a7343b111e2f1182d2c6d7'
              className='absolute top-[80%] md:top-[75%] left-[50%] md:left-[63%] transform -translate-x-1/2 z-10 px-6 py-3 border bg-transparent text-white border-white hover:bg-white hover:text-black'>
              Explore Lookbook
            </Link>
          </div>
          <div className='relative w-full md:w-1/2 flex justify-center md:justify-start mt-4 md:m-0'>
            <img
              src={item.imageR}
              loading='lazy'
              alt="lookbook_img"
              className='w-9/12 h-[600px] object-cover'
              style={{ maxHeight: '600px' }}
            />
            <Link
              href='/blog/66a922bc7825cf514d9e84e0'
              className='absolute top-[80%] md:top-[76%] left-[50%] md:left-[38%] transform -translate-x-1/2 z-10 px-6 py-3 border bg-transparent text-white border-white hover:bg-white hover:text-black'>
              Explore Lookbook
            </Link>
          </div>
        </div>



      </Fragment>) : <p>failed to load data</p>}
    </div>
  )
}

export default page;