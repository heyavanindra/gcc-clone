import { useSelector } from 'react-redux';

const usePrice = (priceInINR) => {
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  
  if (!priceInINR) return 0; // Handle cases where priceInINR might be undefined
  
  if (currency === 'INR') {
    return priceInINR;
  }

  const exchangeRate = exchangeRates[currency];
  return exchangeRate ? priceInINR * exchangeRate : priceInINR;
};


export default usePrice;