'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        toast.success('Password reset successful');
        router.push('/login');
      } else {
        toast.error('Error resetting password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='pt-36 h-[calc(100vh-6rem)] flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='w-4/12 h-72 flex gap-5 flex-col justify-center items-center shadow-lg rounded-md'>
        <h1 className='text-2xl'>Reset Password</h1>
        <div className='flex items-center gap-3 w-full px-6'>
          <label htmlFor="password" className='w-1/2'>Set new password:</label>
          <input
            id='password'
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='p-2 border block w-3/4 border-gray-300 rounded-md shadow-sm'
          />
        </div>
        <div className='flex items-center gap-3 w-full px-6'>
          <label htmlFor="cnfrm" className='w-1/2'>Confirm Password:</label>
          <input
            id='cnfrm'
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='p-2 border block w-3/4 border-gray-300 rounded-md shadow-sm'
          />
        </div>
        <button type="submit" className='px-3 py-1 bg-black text-white rounded-sm hover:bg-white hover:text-black hover:border border-black'>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
