"use client";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Client, Account, ID } from "appwrite";

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

function LoginForm() {
  const router = useRouter();
  const currency = useSelector((state) => state.currency.currency);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [otpMode, setOtpMode] = useState(false); // State to toggle between OTP and email/password login
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  // Initialize Appwrite
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const account = new Account(client);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (otpMode) {
      // Handle OTP login
      if (!otpSent) {
        // Request OTP
        const phoneNumberString = `+${formData.phone.replace(/\D/g, '')}`;
        if (formData.phone === "") {
          setLoading(false);
          return toast.warning('Please enter the phone number first');
        }
        try {
          const token = await account.createPhoneToken(
            ID.unique(),
            phoneNumberString
          );
          if (token.userId) {
            setUserId(token.userId);
            setOtpSent(true);
            setLoading(false);
            toast.success('OTP sent successfully!');
          }
        } catch (err) {
          setLoading(false);
          toast.error(`OTP Request Failed: ${err.message}`);
        }
      } else {
        // Verify OTP
        try {
          setLoading(true);
          const session = await account.createSession(
            userId,
            formData.otp
          );
          if (session) {
            toast.success('User Logged in Successfully!');
            setLoading(false);
            router.push('/');
          }
        } catch (err) {
          setLoading(false);
          console.log(err);
          
          toast.error(`OTP Verification Failed: ${err.message}`);
        }
      }
    } else {
      // Handle email/password login
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          throw new Error(result.error);
        }

        toast.success('User Logged in Successfully!');
        setLoading(false);
        setFormData({
          email: "",
          password: "",
          phone: "",
          otp: "",
        });
        router.push('/');
      } catch (err) {
        setLoading(false);
        toast.error(`Login Failed: ${err.message}`);
      }
    }
  };

  return (
    <>
      <Toaster closeButton position="bottom-right" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!otpMode ? (
          <>
            <div className="flex flex-col w-[50vh] md:w-[30vw]">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : !otpSent ? (
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <PhoneInput
              country={getCountryCode(currency)}
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              inputProps={{
                name: 'phoneNumber',
                required: true,
                autoComplete: 'tel',
                className: 'mt-1 p-3 border block w-full border-gray-300 rounded-md shadow-sm'
              }}
              onlyCountries={allowedCountries}
            />
          </div>
        ) : (
          <div className="flex flex-col w-[50vh] md:w-[30vw]">
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              name="otp"
              id="otp"
              className="w-full p-2 border"
              placeholder="Enter the OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            className="uppercase text-sm tracking-wider px-16 py-3 bg-black text-white hover:bg-white border border-black hover:text-black"
            disabled={loading}
          >
            {loading ? (
              <BeatLoader
                loading={loading}
                size={10}
                color="white"
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : otpMode && !otpSent ? (
              'Send OTP'
            ) : otpMode && otpSent ? (
              'Verify OTP'
            ) : (
              'Login'
            )}
          </button>
          <button
            type="button"
            className="uppercase text-sm tracking-wider px-6 md:px-16 py-3 bg-gray-300 text-black border border-black"
            onClick={() => setOtpMode(!otpMode)}
            disabled={loading}
          >
            {otpMode ? 'Login with Email' : 'Login with OTP'}
          </button>
        </div>
      </form>
      {!otpMode && (
        <Link
          className="pt-4 hover:underline underline-offset-2"
          href="/forgetpassword"
        >
          Forget Password?
        </Link>
      )}
    </>
  );
}

export default LoginForm;
