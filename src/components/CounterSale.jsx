import React from "react";
import Link from "next/link";
import Image from "next/image";
import CounDown from "./CountDown";
import EditCounter from "./landingPage/EditCounter";
import EditCounterSale from "./landingPage/EditCounterSale";
import shoe2 from "../../public/assets/shoe2.jpg";
import shoe3 from "../../public/assets/shoe3.jpg";

const { NEXT_PUBLIC_HOST_URL } = process.env;

// const getData = async () => {
//     try {
//         let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/counterSale`);
//         res = await res.json();
//         return res;
//     } catch (err) {
//         console.log(err);
//         return [];
//     }
// }

const getCounter = async () => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/counter`);
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const data = [
  {
    title: "DISCOVER URBAN's,CASUAL SHOES",
    image: shoe2,
    url: "",
  },
  {
    title: "URBAN'S GENTS,SHOE COLLECTION",
    image: shoe3,
    url: "",
  },
];

async function CounterSale() {
  // const data = await getData();
  let count = [];
  try {
    count = await getCounter();
  } catch (err) {
    count = [];
  }

  return (
    <div className="uppercase h-[120vh] w-screen md:w-auto pb-10">
      {count.length !== 0 ? (
        <div className="relative h-1/4 md:h-[20%] flex flex-col md:flex-row justify-between items-center px-12 mt-10 md:m-0 md:border-b">
          <h1 className="text-2xl md:text-3xl tracking-widest font-semibold my-4 uppercase">
            {count[0].title}
          </h1>
          <div className="md:border-x border-y md:border-y-0 px-20 md:px-48 py-4 md:py-8">
            <CounDown date={count[0].count} />
          </div>
          <div className="relative">
            <Link
              href={count[0].url}
              className="px-10 py-4 text-sm bg-black border text-white border-black hover:bg-white hover:text-black mt-4"
            >
              Sale
            </Link>
            <EditCounter
              item={count[0]}
              api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/counter`}
            />
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}

      <div className="flex flex-col md:flex-row px-10 md:px-40 gap-2 md:gap-10 h-[80%] md:h-[65%] text-center my-20">
        {data ? (
          data.map((item, i) => (
            <div
              key={i}
              className="bg-cover relative bg-center h-[70vh] w-full md:w-1/2"
            >
              <Image
                unoptimized
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-0 flex flex-col h-full justify-end w-full items-center pb-20 gap-4">
                <p className="text-xl md:text-3xl tracking-widest text-white">
                  {item.title.split(",").map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < item.title.split(",").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <Link
                  href={item.url}
                  className="px-6 py-2 bg-transparent border text-white border-white hover:border-black hover:bg-black hover:text-white"
                >
                  shop now
                </Link>
              </div>
              <EditCounterSale
                item={item}
                api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/counterSale`}
                storageUrl={"couterSale"}
              />
            </div>
          ))
        ) : (
          <p>Failed to load data!</p>
        )}
      </div>
    </div>
  );
}

export default CounterSale;
