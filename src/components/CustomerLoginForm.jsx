"use client"
import React, { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../../firebase';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { BeatLoader } from 'react-spinners';

function CustomerLoginForm() {

    const [loading, setLoading] = useState(false);
    const[emailLoad, setEmailLoad] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('');
    const [result, setResult] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerify, setEmailVerify] = useState(false);
    const auth = getAuth(app);

    const router = useRouter();

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {

            },
            'expired-callback': () => {

            }
        })
    }, [auth]);

    const phoneNumChangeHandler = (e) => {
        setPhoneNumber(e.target.value)
    }

    const otpChangeHandler = (e) => {
        setOtp(e.target.value)
    };

    const sentOtpChangeHandler = async () => {
        setLoading(true)
        try {
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setResult(confirmation);
            setOtpSent(true);
            toast.success('OTP sent Successfully');
            setLoading(false)
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
            setLoading(false)
        }
    }

    const otpSubmitHandler = async () => {
        setLoading(true)
        try {
            await result.confirm(otp);
            setOtp('');
            setTimeout(() => {
                router.push('/')
            }, 1500)
            setLoading(false)
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    const emailVerifyHandler = async (e) => {
        e.preventDefault();
        const data = {
            email: email
        }
        setEmailLoad(true);
        let res = await fetch('/api/email_verify',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        if (res.ok) {
            setEmailLoad(false);
            return setEmailVerify(!emailVerify);
        } else {
            setEmailLoad(false);
            return toast.error(res.message)
        }
    }

    return (
        <>
            {!otpSent && <div id='recaptcha-container'></div>}
            <Toaster closeButton position="bottom-right" />
            <div className="flex flex-col gap-4">
                <form onSubmit={emailVerifyHandler}>
                    <div className="flex flex-col w-[50vh] md:w-[30vw]">
                        <label htmlFor="email">Email:</label>
                        <input
                            id='email'
                            type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Email'
                            className="w-full p-2 border"
                            required
                            disabled={emailVerify}
                        />
                    </div>
                    <div className='mt-3'>
                        <button
                            type='submit'
                            className="uppercase text-sm tracking-wider px-16 py-3 bg-black text-white"
                            disabled={loading || email === ''}
                        >
                            {emailLoad ? <BeatLoader loading={emailLoad} size={10} color='white'
                                aria-label="Loading Spinner"
                                data-testid="loader" /> : <span>{emailVerify ? 'Verified' : 'Verify'}</span>}
                        </button>
                    </div>
                </form>
                {emailVerify && <>
                    <div className="flex flex-col w-[50vh] md:w-[30vw]">
                        <label htmlFor="phone">Mobile Number:</label>
                        <input
                            id='phone'
                            type="tel" value={phoneNumber}
                            onChange={phoneNumChangeHandler}
                            placeholder='Enter Phone Number'
                            className="w-full p-2 border"
                            required
                        />
                    </div>
                    <div className="flex flex-col w-[50vh] md:w-[30vw]">
                        <label htmlFor="otp">Otp:</label>
                        <input
                            id='otp'
                            type="text" value={otp}
                            onChange={otpChangeHandler}
                            placeholder='Enter Otp'
                            className="w-full p-2 border"
                            required
                        />
                    </div>
                    <div>
                        <button
                            className="uppercase text-sm tracking-wider px-16 py-3 bg-black text-white"
                            disabled={loading || phoneNumber === ''}
                            onClick={otpSent ? otpSubmitHandler : sentOtpChangeHandler}
                        >
                            {loading ? <BeatLoader loading={loading} size={10} color='white'
                                aria-label="Loading Spinner"
                                data-testid="loader" /> : <span>{otpSent ? 'Submit OTP' : 'Send OTP'}</span>}
                        </button>
                    </div>
                </>}
            </div>
        </>
    )
}

export default CustomerLoginForm;
