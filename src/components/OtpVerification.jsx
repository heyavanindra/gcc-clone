"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Client, Account, ID } from "appwrite";
import { toast } from "sonner";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BeatLoader } from "react-spinners";

const allowedCountries = ['us', 'gb', 'in', 'fr'];

const getCountryCode = (currency) => {
  switch (currency) {
    case 'INR':
      return 'in';
    case 'USD':
      return 'us';
    case 'GBP':
      return 'gb';
    case 'EUR':
      return 'fr';
    default:
      return 'in';
  }
};

const OtpVerification = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const currency = useSelector((state) => state.currency.currency);

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const account = new Account(client);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onSignInSubmit = async () => {
    const phoneNumberString = `+${phoneNumber.replace(/\D/g, '')}`;
    if (phoneNumber === "") {
      return toast.warning('Please enter the phone number first');
    }
    try {
      setLoading(true);

      const sessions = await account.getSession('current');
      if (sessions) {
        // Delete the current session
        await account.deleteSession('current');
      }

      // Generate a new OTP
      const token = await account.createPhoneToken(
        ID.unique(),
        phoneNumberString
      );

      if (token.userId) {
        setUserId(token.userId);
        toast.success('Otp Sent!');
        setConfirmationResult(true);
        setTimer(120); // Set timer for 2 minutes (120 seconds)
      }

    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyCodeSubmit = async () => {
    try {
      setLoading(true);
      const session = await account.createSession(
        userId,
        otp
      );
      onSubmit();
      setOtp('');
      if (session) {
        toast.success('OTP verified!');
      }

    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Enter your phone number</h3>
      <PhoneInput
        country={getCountryCode(currency)}
        value={phoneNumber}
        onChange={(phone) => setPhoneNumber(phone)}
        inputProps={{
          name: 'phoneNumber',
          required: true,
          autoComplete: 'tel',
          className: 'mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm'
        }}
        onlyCountries={allowedCountries}
      />
      <button
        disabled={loading || timer > 0}
        type="button"
        onClick={onSignInSubmit}
        className="my-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? <BeatLoader loading={loading} size={15} color='white' aria-label="Loading Spinner" data-testid="loader" /> : `Send OTP ${timer > 0 ? `(${timer}s)` : ''}`}
      </button>

      {confirmationResult && <>
        <h3>Enter the OTP</h3>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button onClick={onVerifyCodeSubmit} disabled={loading}
          className="my-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >Verify OTP</button>
      </>}

      {error && <p>{error}</p>}
    </div>
  );
};

export default OtpVerification;
