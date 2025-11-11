"use client"
import { useState } from 'react';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import ProductPrice from './ProductPrice';
import Image from 'next/image';
import SinglePageModal from './SinglePageModal';
import { AnimatePresence } from 'framer-motion';
import { FaAngleRight } from "react-icons/fa6";
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';

const CustomLeftArrow = ({ onClick }) => (
    <button
        className='md:block absolute left-4 p-2'
        onClick={onClick}
    >
        <HiArrowLongLeft size={30} />
    </button>
);

const CustomRightArrow = ({ onClick }) => (
    <button
        className='md:block absolute right-4 p-2'
        onClick={onClick}
    >
        <HiArrowLongRight size={30} />
    </button>
);


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 2,
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 768, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

function CompleteSet({ items, desc, styleTip, modalInfo }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });

    const handleOpenModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    // Ensure desc is an object and has the required structure
    const descriptionContent = desc && typeof desc === 'object' && Object.keys(desc).length > 0 ? desc : {
        info: 'Sorry no description for this product.',
        features: '',
        sizing: '',
    };

    const contents = [
        { title: 'Description', body: descriptionContent },
        {
            title: 'Delivery', body: (
                <div>
                    <p>Shipping</p>
                    <ul>
                        <li>Free shipping on US orders over $150</li>
                        <li>US Flat Rate Shipping $5</li>
                        <li>International shipping & duties charges calculated at checkout</li>
                        <li>Carbon-Neutral Shipping</li>
                        <li>All of our packaging is plastic-free and recyclable...</li>
                    </ul>
                    <p>For more info on shipping, & international orders swing by our FAQs</p>
                </div>
            )
        },
        { title: 'Stylist Tip', body: styleTip ? styleTip : 'Stylist tip for the product.' },
        { title: 'Model Info', body: modalInfo ? modalInfo : 'Info of the model.' },
    ];

    return (
        <div className='md:flex justify-between px-2 md:px-10 h-screen'>
            <div className='w-full md:w-1/2 flex flex-col items-start justify-center gap-6 pl-8 md:pl-36 md:order-last py-6'>
                <ul className='h-1/2 cursor-pointer w-11/12 md:w-3/4 text-gray-500 text-lg md:text-2xl tracking-wider'>
                    {contents.map((item, i) => (
                        <li
                            key={i}
                            className='py-3 border-b border-gray-200 flex justify-between hover:text-gray-600 group'
                            onClick={() => handleOpenModal(item)}
                        >
                            {item.title}
                            <span className='text-gray-400 transform transition-transform duration-300 group-hover:translate-x-2'>
                                <FaAngleRight />
                            </span>
                        </li>
                    ))}
                    <li className='py-3 hover:text-gray-600 group'><Link href='/contact' className='flex justify-between'><span>Contact us</span>
                        <span className='text-gray-400 transform transition-transform duration-300 group-hover:translate-x-2'>
                            <FaAngleRight />
                        </span>
                    </Link></li>
                </ul>

                <AnimatePresence>{isOpen && <SinglePageModal isOpen={isOpen} onClose={handleCloseModal} content={modalContent} />}</AnimatePresence>
            </div>

            <div className='w-full md:w-1/2 md:order-first'>
                <p className='text-2xl tracking-wide py-3'>Complete the set!</p>
                <Carousel
                    swipeable={true}
                    keyBoardControl={true}
                    draggable={true}
                    responsive={responsive}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                    itemClass="px-2">
                    {items.products.length && items.products.slice(0, 4).map((item, i) => (
                        <Link href={'/featured/shop_all/' + item._id} key={i}>
                            <li>
                            <Image src={item.img[0]} alt="img" width={300} height={1} unoptimized/>
                            </li>
                            <li className='text-center'>
                                <li>{item.title}</li>
                                <ProductPrice price={item.amount} />
                            </li>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}


export default CompleteSet;