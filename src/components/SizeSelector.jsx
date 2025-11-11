'use client';
import { useState, useEffect } from "react";
import CartModal from "@/components/CartModal";
import { CiStopwatch } from "react-icons/ci";
import { AnimatePresence } from "framer-motion";
import { IoCheckmark } from "react-icons/io5";
import Button from "./Button";
import { usePathname } from "next/navigation";
import { FaTimes } from 'react-icons/fa';

function SizeSelector({ id, sizes, amount, title, img, category, productType, desc, styleTip, modalInfo }) {
    const [selected, setSelected] = useState(sizes[0].size);
    const [quantity, setQuantity] = useState(1);
    const [totalAmount, setTotalAmount] = useState(amount);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        return () => { };
    }, []);

    const selectHandler = (size) => {
        setSelected(size);
        setQuantity(1);
        setTotalAmount(amount);
    };

    const toggleCartDrawer = () => {
        setIsCartDrawerOpen(!isCartDrawerOpen);
    };

    const quantityIncHandler = () => {
        const selectedSizeObj = sizes.find(sizeObj => sizeObj.size === selected);
        if (quantity < selectedSizeObj.quantity) {
            setQuantity(prev => prev + 1);
            setTotalAmount(prev => prev + amount);
        }
    };

    const quantityDecHandler = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
            setTotalAmount(prev => prev - amount);
        }
    };

    const cartHandler = async () => {
        const cartData = {
            id, title, quantity, img,
            amount: totalAmount,
            size: selected,
            availableQuantity: sizes.find(sizeObj => sizeObj.size === selected).quantity,
            unitPrice: amount
        };
        try {
            let res = await fetch('/api/cart', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(cartData)
            });
            res = await res.json();
            console.log(res);
        } catch (err) {
            console.log(err);
        }

        setIsCartDrawerOpen(true);
    };

    // Determine if all sizes are sold out
    const allSoldOut = sizes.every(sizeObj => sizeObj.quantity === 0);
    const selectedSizeObj = sizes.find(sizeObj => sizeObj.size === selected);
    const sizeQuantity = selectedSizeObj ? selectedSizeObj.quantity : 0;

    return (
        <>
            <AnimatePresence>
                {isCartDrawerOpen && <CartModal isOpen={isCartDrawerOpen} onClose={toggleCartDrawer} />}
            </AnimatePresence>
            <div className="border-b pb-10 md:pb-20">
                <ul className='flex gap-3'>
                    {sizes.map((sizeObj, i) => (
                        <li
                            key={i}
                            className={`px-3 py-1 border cursor-pointer flex items-center justify-center relative ${
                                sizeObj.quantity === 0 ? 'text-gray-400 bg-gray-100' : 
                                selected === sizeObj.size ? 'bg-gray-500 text-white' : ''
                            }`}
                            onClick={() => sizeObj.quantity > 0 && selectHandler(sizeObj.size)}
                            style={{
                                pointerEvents: sizeObj.quantity === 0 ? 'none' : 'auto'
                            }}
                        >
                            {sizeObj.size}
                            {sizeObj.quantity === 0 && (
                                <FaTimes className="absolute top-1 right-1 text-red-500" />
                            )}
                        </li>
                    ))}
                </ul>
                <div className="md:flex items-center gap-2 md:py-4">
                    <div className="flex border w-full md:w-1/4 h-12 items-center my-4 justify-between">
                        <button
                            onClick={quantityDecHandler}
                            className="w-14 p-4 text-xl"
                            disabled={quantity === 1 || allSoldOut || sizeQuantity === 0}
                            style={{ color: quantity === 1 || allSoldOut || sizeQuantity === 0 ? 'gray' : 'black' }}
                        >
                            -
                        </button>
                        <p className="flex-grow text-center text-xl">{quantity}</p>
                        <button
                            onClick={quantityIncHandler}
                            className="w-14 p-4 text-xl"
                            disabled={quantity >= sizeQuantity || allSoldOut || sizeQuantity === 0}
                            style={{ color: quantity >= sizeQuantity || allSoldOut || sizeQuantity === 0 ? 'gray' : 'black' }}
                        >
                            +
                        </button>
                    </div>
                    <div className="h-12 w-full">
                        <button
                            onClick={cartHandler}
                            className="p-3 md:p-2 w-full text-xl border border-black bg-black text-white hover:bg-white hover:text-black"
                            disabled={allSoldOut || sizeQuantity === 0}
                        >
                            {allSoldOut ? "Sold Out" : "Add to cart"}
                        </button>
                    </div>
                </div>
                {!pathname.includes('shop_all') && <Button id={id} category={category} sizes={sizes} title={title} img={img} amount={amount} productType={productType}
                    desc={desc} styleTip={styleTip} modalInfo={modalInfo}
                />}
                <div className="pt-4 md:p-0">
                    <p className="mt-4 text-sm flex items-center gap-1"><span className="text-xl"><CiStopwatch /></span>Only {sizeQuantity} left in stock for selected size, Order soon.</p>
                    <p className="mt-4 text-sm flex items-center gap-1"><span className="pl-1"><IoCheckmark /></span>Free delivery and shipping</p>
                    <p className="mt-4 text-sm flex items-center gap-1"><span className="pl-1"><IoCheckmark /></span>Secure online payment</p>
                </div>
            </div>
        </>
    );
}

export default SizeSelector;
