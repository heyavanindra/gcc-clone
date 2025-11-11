import React from 'react';
import Types from '@/components/Types';
import ShopAll from '@/components/ShopAll';

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

async function Page({ params }) {
  const { category } = params;
  const data = await getData(category);
  const imgSrc = data?.img.banner || '/no-pictures.png'

  return (
    <>
      {category === 'shop_all' ? (
        <ShopAll
          product={data.products}
          categories={data.categories}
          img={imgSrc}
          title={'Shop All'}
          url={'types'}
        />
      ) : (
        <Types
          product={data.products}
          categories={data.categories}
          img={imgSrc}
          title={category}
        />
      )}
    </>
  );
}

export default Page;
