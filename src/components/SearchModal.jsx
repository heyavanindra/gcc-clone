"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CiSearch } from "react-icons/ci";
import { HiMiniArrowUturnRight } from "react-icons/hi2";
import BeatLoader from "react-spinners/BeatLoader";
import { toast, Toaster } from 'sonner';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ featured: [], type: [], collection: [] });
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === 'drawer-overlay') {
        onClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  const handleSearch = async () => {
    if (!query) return toast.error('Enter item name first!');
    setSearched(true);
    setLoading(true);
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayUniqueProducts = (products, uniqueTitles, category) => {
    return products.map((items, index) => {
      const uniqueProducts = items.product.filter((p) => {
        if (uniqueTitles.has(p.title)) {
          return false;
        } else {
          uniqueTitles.add(p.title);
          return true;
        }
      });

      return (
        uniqueProducts.length > 0 && (
          <div key={index} className="p-2 border-b border-gray-200">
            {uniqueProducts.map((item,i) => (
              <div className='flex items-center cursor-pointer my-2' key={i} onClick={() => {
                router.push(`/${category}/${items.mainTitle}/${item._id}`);
                onClose();
              }}>
                <div>
                  <img src={item.img[0]} alt={item.title} className='h-20 w-20 border rounded-md mr-2' />
                </div>
                <p className='text-black'>{item.title}</p>
              </div>
            ))}
          </div>
        )
      );
    });
  };

  const uniqueTitles = new Set();

  return (
    <>
      {isOpen && (
        <div id="drawer-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-4/12 bg-white shadow-xl z-50 p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              <HiMiniArrowUturnRight />
            </button>
            <div className="flex mt-8">
              <input
                type="text"
                className="w-full mt-4 p-6 text-3xl border-b border-gray-300 focus:outline-none text-black"
                placeholder="Search..."
                value={query}
                onInput={(e) => setQuery(e.target.value)}
              />
              <button
                className='text-4xl text-gray-400 border-b border-gray-300'
                onClick={handleSearch}
              >
                <CiSearch />
              </button>
            </div>
            <div className="mt-4">
              <Toaster closeButton />
              {loading ? (
                <div className="flex justify-center items-center">
                  <BeatLoader loading={loading} size={10} color='white' aria-label="Loading Spinner" data-testid="loader" />
                </div>
              ) : (
                <>
                  {results.featured.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg text-black">Featured</h3>
                      {displayUniqueProducts(results.featured, uniqueTitles, 'featured')}
                    </div>
                  )}
                  {results.type.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg">Type</h3>
                      {displayUniqueProducts(results.type, uniqueTitles, 'types')}
                    </div>
                  )}
                  {results.collection.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg">Collection</h3>
                      {displayUniqueProducts(results.collection, uniqueTitles, 'collections')}
                    </div>
                  )}
                  {searched && results.featured.length === 0 && results.type.length === 0 && results.collection.length === 0 && (
                    <p className='text-xl text-black'>No results found</p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
