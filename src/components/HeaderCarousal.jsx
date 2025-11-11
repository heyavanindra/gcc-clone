"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Carousel from 'react-multi-carousel';
import { Client, Storage } from "appwrite";
import Image from 'next/image';
import FormModal from './FormModal';
import 'react-multi-carousel/lib/styles.css';
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { decode } from 'jsonwebtoken';
import { toast } from 'sonner';
import header1 from '../../public/assets/header1.webp';
import header2 from '../../public/assets/header2.jpg';
import header3 from '../../public/assets/header3.webp';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

const CustomLeftArrow = ({ onClick }) => (
    <button
        className='hidden text-black md:block absolute left-4 p-2'
        aria-label="Previous Slide"
        onClick={onClick}
    >
        <HiArrowLongLeft size={40} />
    </button>
);

const CustomRightArrow = ({ onClick }) => (
    <button
        className='hidden text-black md:block absolute right-4 p-2'
        aria-label="Next Slide"
        onClick={onClick}
    >
        <HiArrowLongRight size={40} />
    </button>
);

function HeaderCarousel() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    // const [images, setImages] = useState([]);
    const [mainAdmin, setMainAdmin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(null);

    const { data } = useSession();

    useEffect(() => {
        if (data) {
            setToken(data.user.accessToken);
        }
    }, [data]);

    const closeFormModal = () => {
        setIsFormOpen(!isFormOpen);
    };

    // const fetchImages = async () => {
    //     let res = await fetch('/api/updates/carousel');
    //     res = await res.json();
    //     setImages(res);
    // };

    // useEffect(() => {
    //     fetchImages();
    // }, []);

    const images = [
        {images: header1},
        {images: header2},
        {images: header3},
    ]

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsAdmin(decodedToken.isAdmin);
                    setMainAdmin(decodedToken.email);
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        } else {
            setIsAdmin(false);
            setMainAdmin(null);
        }
    }, [token]);


    const deleteImage = async (imageURL, id) => {
        console.log(id);
        
        if (!imageURL) {
            toast.error('No image URL provided!');
            return;
        }

        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

        const storage = new Storage(client);
        const fileIdMatch = imageURL.match(/\/files\/([^\/]*)\//);
        const fileId = fileIdMatch ? fileIdMatch[1] : null;
    
        try {
            let res = await fetch('/api/updates/carousel', {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            res = await res.json();
            if (res.ok) {
                toast.success('Image deleted from DB!');
                await storage.deleteFile(
                    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, // bucketId
                    fileId // fileId
                );
                toast.success('Image deleted from bucket!');
                fetchImages();
            }
        } catch (err) {
            toast.error('Failed to delete image!');
            console.log(err);
        }
    };

    return (
        <div className='h-screen relative'>
            <Carousel
                responsive={responsive}
                ssr={true}
                infinite={true} // Ensure this is true for infinite looping
                autoPlay={true}
                autoPlaySpeed={3000}
                transitionDuration={500}

                removeArrowOnDeviceType={["tablet", "mobile"]}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
                dotListClass="custom-dot-list-style"
            >
                {images.length > 0 && images.map((item, i) => (
                    <div key={i} className='h-screen w-screen'>
                        <Image src={item.images} alt='carousel_images' fill style={{objectFit: 'cover'}} unoptimized/>
                        {isAdmin && <button onClick={() => deleteImage(item.images, item._id)} className='p-2 absolute top-40 right-5 bg-black text-white'>Delete Image</button>}
                    </div>
                ))}

                {/* <div className='h-screen w-screen'>
                    <video
                        src="https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/58b76d3b993a49dda787c082767e6ecf/58b76d3b993a49dda787c082767e6ecf.HD-1080p-4.8Mbps-12867843.mp4?v=0"
                        muted
                        playsInline
                        autoPlay
                        loop
                        className='h-full w-full object-cover'
                    ></video>
                </div> */}
            </Carousel>
            {isAdmin && (
                <div className='absolute top-40 p-5'>
                    <button className='bg-black text-white p-3' onClick={closeFormModal}>Add Image</button>
                </div>
            )}
            {isFormOpen && <FormModal onClose={closeFormModal} onImageUpload={fetchImages} />}
        </div>
    );
}

export default HeaderCarousel;
