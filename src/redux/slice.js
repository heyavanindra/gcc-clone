import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch exchange rates from an API
export const fetchExchangeRates = createAsyncThunk(
  'currency/fetchExchangeRates',
  async () => {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
    const data = await response.json();
    return data.rates;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: 'INR',
    currencySymbols: {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
    },
    exchangeRates: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exchangeRates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
