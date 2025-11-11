"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HiMiniArrowUturnRight } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import BeatLoader from "react-spinners/BeatLoader";
import { useRouter } from 'next/navigation';
import ProductPrice from './ProductPrice';

function CartModal({ isOpen, onClose }) {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [del, setDel] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setCartData(data.cartData); 
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.ok) {
        setDel(!del);
      }
    } catch (err) {
      console.error('Error deleting item:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [del, isOpen]);

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

  const updateCartItem = async (id, size, newQuantity) => {
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, size, newQuantity }),
      });
      if (!res.ok) {
        throw new Error('Failed to update cart item');
      }
      const updatedItem = await res.json();
      return updatedItem.cartItem;
    } catch (error) {
      console.error('Error updating cart item:', error.message);
    }
  };

  const handleDecrease = async (id, size) => {
    const updatedCartData = await Promise.all(
      cartData.map(async (item) => {
        if (item._id === id && item.size === size && item.quantity > 1) {
          const updatedItem = await updateCartItem(id, size, item.quantity - 1);
          return updatedItem || item;
        }
        return item;
      })
    );
    setCartData(updatedCartData);
  };

  const handleIncrease = async (id, size) => {
    const updatedCartData = await Promise.all(
      cartData.map(async (item) => {
        if (item._id === id && item.size === size) {
          const updatedItem = await updateCartItem(id, size, item.quantity + 1);
          return updatedItem || item;
        }
        return item;
      })
    );
    setCartData(updatedCartData);
  };

  const paymentPage = async () => {
    try {
      const paymentData = cartData.map(item => ({
        id: item._id,
        title: item.title,
        quantity: item.quantity,
        img: item.img,
        amount: item.amount,
        size: item.size,
        sessionId: item.sessionId,
      }));

      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(paymentData),
      });

      if (!res.ok) {
        throw new Error('Failed to complete payment');
      }

      onClose();
      router.push('/payment');
      if (pathName === '/payment') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error posting payment data:', error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div id="drawer-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-9/12 md:w-4/12 bg-white shadow-xl z-50 p-6 overflow-y-scroll scrollbar-hide"
          >
            <button
              onClick={onClose}
              className="absolute top-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              <HiMiniArrowUturnRight />
            </button>
            <div className="flex flex-col mt-8 text-black ">
              <h1 className="py-2 border-b text-2xl">Your Cart</h1>
              {loading ? (
                <div className='h-72 content-center mx-auto'>
                  <BeatLoader loading={loading} size={20} color='black' aria-label="Loading Spinner" data-testid="loader" />
                </div>
              ) : cartData && cartData.length > 0 ? (
                cartData.map((item, i) => (
                  <div key={i} className="flex items-center p-4 border-b border-gray-200">
                    <img src={item.img[0]} alt={item.title} className="w-20 h-28 object-cover rounded mr-4" />
                    <div className='flex justify-between w-full'>
                      <ul className="flex-1">
                        <li className="mb-2">
                          <p className="text-lg font-semibold">{item.title}</p>
                        </li>
                        <li className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => handleDecrease(item._id, item.size)} className="bg-black text-white px-2 py-1 rounded">-</button>
                            <p className='px-6'>{item.quantity}</p>
                            <button onClick={() => handleIncrease(item._id, item.size)} className="bg-black text-white px-2 py-1 rounded">+</button>
                          </div>
                        </li>
                        <li className="mb-2">
                          <p>Size: {item.size}</p>
                        </li>
                        <li>
                          <p>Amount: <ProductPrice price={item.amount}/></p>
                        </li>
                      </ul>
                      <button className='text-xl self-start' onClick={() => deleteItem(item._id)}><RiDeleteBinLine /></button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-2">Your cart is empty!</p>
              )}
              {cartData && cartData.length === 0 ? (
                <Link
                  href='/'
                  onClick={onClose}
                  className="text-white text-center bg-black py-2 px-20 mt-4"
                >
                  Shop Now
                </Link>
              ) : (
                <button
                  onClick={paymentPage}
                  className="bg-black text-white py-2 px-20 mt-4"
                >
                  Proceed to Pay
                </button>
              )}
            </div>
            <div className='mt-4 flex justify-center' onClick={paymentPage}>
            <Link href='/payment' className="hover:underline underline-offset-4">Go to payment page</Link>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default CartModal;
