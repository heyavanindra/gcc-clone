import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProductPrice from "./ProductPrice";

const { NEXT_PUBLIC_HOST_URL } = process.env;

const getData = async () => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/products/best_seller`);
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return { products: [] };
  }
};

async function Sales() {
 const data = await getData()
  return (
    <div className="h-screen px-12 md:px-24 py-10 bg-orange-50">
      <div className="py-6 flex justify-between">
        <h1 className="text-3xl font-semibold uppercase">Best Sellers</h1>
        <div className="hidden md:block ">
          <Link
            href="/featured/best_seller"
            className="px-12 py-4 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase"
          >
            Explore All
          </Link>
        </div>
      </div>

      <div className="w-full h-3/4 overflow-x-scroll scrollbar-hide">
        <div className="flex h-full w-[calc(100vw * 6)] md:w-[calc(25% * 6)] md:overflow-x-scroll scrollbar-hide gap-1">
          {data.products ? (
            data.products.slice(0, 5).map((item, i) => (
              <div
                className="w-[80vw] md:w-[25%] h-full relative flex-shrink-0"
                key={i}
              >
                <Link
                  href={"/featured/best_seller/" + item._id}
                  className="flex flex-col items-center justify-center w-full md:w-full h-full overflow-hidden"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={item.img[0]}
                      alt={item.title}
                      width={0}
                      height={0}
                      unoptimized
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col items-center mt-3">
                    <p>{item.title}</p>
                    <p>
                      <ProductPrice price={item.amount} />
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>no data</p>
          )}
        </div>
      </div>

      <div className="md:hidden flex justify-center my-8">
        <Link
          href="/featured/best_seller"
          className="px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase"
        >
          Explore All
        </Link>
      </div>
    </div>
  );
}

export default Sales;
