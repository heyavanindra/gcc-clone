import Link from 'next/link';
import EditBlog from '@/components/routepages/EditBlog';

const {NEXT_PUBLIC_HOST_URL} = process.env;

const getData = async (id) => {
  try {
      let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/blog/${id}`, {
        cache: 'no-store'
      });
      res = await res.json();
      return res;
  } catch (err) {
      console.log(err);
      return [];
  }
}

async function page({params}) {

  const data = await getData(params.id);

  return (
    <div className='pt-36'>
      <div className='h-48'>
      <p className='text-sm text-center py-4'><Link href='/'>Home</Link> / <Link href='/blog'>News</Link> / {data && data.title}</p>
      </div>
      <div className='flex flex-col items-center'>
        <EditBlog item={data} api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/blog`} />
        <p className='text-3xl md:text-5xl font-bold tracking-wider py-8'>{data.title}</p>
        <div className='relative h-[80vh] w-[80vw] md:h-[60vh] md:w-[40vw]'>
          <img src={data.image} alt={data.title} className='h-full w-full object-cover'/>
        </div>
        <div className='w-3/4 py-4'>
        <p className='px-10'>{data.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default page;