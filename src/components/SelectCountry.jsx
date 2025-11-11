"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, fetchExchangeRates } from '@/redux/slice';

const SelectCountry = ({onGetCountry}) => {
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.currency);

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    onGetCountry(newCurrency); 
    dispatch(setCurrency(newCurrency));
    dispatch(fetchExchangeRates());
  };

  return (
    <select value={currency} onChange={handleCurrencyChange} className='mt-2 p-2 border block w-full border-gray-300 rounded-md shadow-sm'>
      <option value="INR">INDIA</option>
      <option value="USD">USA</option>
      <option value="EUR">EUROPE</option>
      <option value="GBP">UK</option>
    </select>
  );
};

export default SelectCountry;
