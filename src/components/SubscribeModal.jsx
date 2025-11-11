"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SubscribeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Check if the modal has been shown before
  useEffect(() => {
    const hasSubscribed = localStorage.getItem('hasSubscribed');
    if (!hasSubscribed) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSubscribed', false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Email:', email);
    setIsOpen(false);
    localStorage.setItem('hasSubscribed', true)
    // You can also add code here to handle the email subscription logic
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded shadow-lg w-[70%] md:w-[40%] lg:w-[33%] xl:w-[30%] h-[75%] md:h-[90%] overflow-y-scroll">
    <div className="relative h-60 md:h-72 lg:h-80 w-full"> {/* Adjust height as needed */}
      <Image
        src="https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-809.jpg?v=1674918082&width=360"
        alt="subscribe modal image"
        fill
        style={{ objectFit: 'cover', objectPosition: 'top' }}
        className="rounded-t-lg"
      />
    </div>
    <div className="p-6 md:p-8 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Sign up and get early access</h2>
      <p className="text-base md:text-lg">Sign up to receive early access to our deals. Our selection of products is vast and offers something for everyone. Shop now and save.</p>
      <form onSubmit={handleSubmit} className="relative pt-5">
        <div className="relative group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 pr-24 border rounded mb-4 group-hover:border-black transition-colors duration-200"
            required
          />
          <button
            type="submit"
            className="absolute right-0 top-0 p-3 border-t border-r border-b bg-white rounded-r group-hover:border-black hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <button
            type="button"
            onClick={handleClose}
            className="hover:underline"
          >
            No Thanks
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
};

export default SubscribeModal;
