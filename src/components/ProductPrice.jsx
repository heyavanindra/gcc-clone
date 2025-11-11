"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import usePrice from '@/hooks/usePrice';

const ProductPrice = ({ price }) => {
  const convertedPrice = usePrice(price);
  const currency = useSelector((state) => state.currency.currency);
  const currencySymbols = useSelector((state) => state.currency.currencySymbols);

  return <span className='font-semibold'> {currencySymbols[currency]} {currency === 'INR' ? convertedPrice : convertedPrice.toFixed(2) *2 }</span>;
};

export default ProductPrice;
