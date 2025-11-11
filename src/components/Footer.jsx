import React from 'react';
import Link from 'next/link';
import { PiPackage } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="h-[100vh] mt-20 uppercase text-center">

<div className='h-[40%] border-y overflow-x-auto md:overflow-x-hidden w-full scrollbar-hide'>
      <div className='flex md:flex-row h-full md:w-full md:justify-evenly w-[100vw]'>
        <div className='w-full md:w-1/3 h-full flex-shrink-0 flex flex-col justify-center items-center gap-5'>
          <div className='rounded-full bg-gray-300 text-gray-600 text-4xl p-4'><PiPackage /></div>
          <p className='text-3xl text-center'>Fast Shipping</p>
          <Link href='/shipping' className='underline underline-offset-2'>Learn More</Link>
        </div>

        <div className='w-full md:w-1/3 h-full flex-shrink-0 flex flex-col justify-center border-x items-center gap-5'>
         <img src="/box.gif" alt="contact_img" className='w-8/12 object-cover'/>
        </div>

        <div className='w-full md:w-1/3 h-full flex-shrink-0 flex flex-col justify-center items-center gap-5'>
          <div className='rounded-full bg-gray-300 text-gray-600 text-4xl p-4'><CiCreditCard1 /></div>
          <p className='text-3xl text-center'>100% Secure <br /> payments</p>
          <Link href='/secure-payment' className='underline underline-offset-2'>Learn More</Link>
        </div>
      </div>
    </div>

    <div className='bg-white text-black py-8 h-[60%] text-left'>
      <div className='container mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          <div>
            <p className='text-lg font-semibold mb-4'>Company</p>
            <ul className='space-y-2'>
              <li><Link href='/blog'>Blog</Link></li>
              <li><Link href='/contact'>Contact Us</Link></li>
              <li><Link href='/founder'>Founder</Link></li>
            </ul>
          </div>
          <div>
            <p className='text-lg font-semibold mb-4'>Get Help</p>
            <ul className='space-y-2'>
              <li><Link href='/FAQ'>FAQ</Link></li>
              <li><Link href='/privacy-policy'>Privacy Policy</Link></li>
              <li><Link href='/terms-of-service'>Terms of Service</Link></li>
              <li><Link href='/shipping'>Shipping Info</Link></li>
            </ul>
          </div>
          <div>
            <p className='text-lg font-semibold mb-4'>Account</p>
            <ul className='space-y-2'>
              <li><Link href='/login'>Log In</Link></li>
              <li><Link href='/register'>Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <p className='text-lg font-semibold mb-4'>Connect</p>
            <div className='flex gap-2'>
              <Link href='https://www.instagram.com/golden_ghaf_clothing_company?igsh=MWpvemJja3EwbGp5dw%3D%3D&utm_source=qr'><Image src='/instagram.png' alt='instagram' width={25} height={20}/></Link>
              <Link href='https://www.linkedin.com/'><Image src='/linkedin.png' alt='instagram' width={25} height={20}/></Link>
            </div>
          </div>
        </div>
      </div>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='h-full flex flex-col justify-center gap-4 items-center w-7/12'>
        <img src="/banner.webp" alt="banner" className='w-full object-cover' loading='lazy'/>
        <p className='text-2xl text-center'>LUCKNOW</p>
        </div>
        <p className='self-start p-4 text-sm'>© 2024 GOLDEN GHAF Trading & Consultancy LLP, All rights reserved.</p>
      </div>
    </div>

    </footer>
  );
}

export default Footer;
