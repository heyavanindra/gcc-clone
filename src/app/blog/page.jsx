import React from 'react';
import Link from 'next/link';
import AddBlog from '@/components/routepages/AddBlog';

const { NEXT_PUBLIC_HOST_URL } = process.env;

const getData = async () => {
  try {
      const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000';
      const url = typeof window === 'undefined' 
          ? `${baseUrl}/api/landingPage/blog`  // Use absolute URL on the server
          : '/api/landingPage/blog';            // Use relative URL on the client
      
      let res = await fetch(url, { cache: 'no-store' });
      res = await res.json();
      return res;
  } catch (err) {
      console.log('Error fetching blog data:', err);
      return [];
  }
}


async function Page() {
    const data = await getData();

    return (
        <div className='px-2 pt-36'>
            <p className='text-center text-sm py-2'> <Link href='/'>HOME</Link></p>
            <div className='h-16 text-center content-center'>
                <h1 className='text-bold text-2xl'>NEWS</h1>
                <AddBlog api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/blog`} storageUrl={'blog'} />
            </div>

            <div className='border-y h-16 mb-4 content-center'>
                <p className='uppercase pl-10'>All Articles</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
  {data.length > 0 ? (
    data.map((item, i) => (
      <Link
        href={`blog/${item._id}`}
        key={i}
        className="flex flex-col items-start justify-between group bg-white shadow-md rounded-lg overflow-hidden"
      >
        <div className="w-full h-60 md:h-[330px] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="object-cover w-full h-full group-hover:opacity-75 transition-opacity duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-lg font-semibold group-hover:underline underline-offset-2">
            {item.title}
          </p>
          <p className="text-xs mt-2">
            {item.desc.split("").slice(0, 160)}...
          </p>
        </div>
      </Link>
    ))
  ) : (
    <p>Failed to load data!</p>
  )}
</div>

        </div>
    )
}

export default Page;
