"use client"
import React, {useState} from 'react';
import { toast } from 'sonner';

function Page() {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          let res = await fetch('/api/email/reset-password', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
          });

          res = await res.json();

          if (res.ok) {
              toast.success('Password reset link sent!');
          } else {
              toast.error(res.error || 'Error sending reset link.');
          }
      } catch (error) {
          console.error('Error:', error);
          toast.error('Error sending reset link.');
      }
  };

  return (
    <div className='pt-36 h-[calc(100vh-6rem)] flex justify-center items-center'>
        
        <form onSubmit={handleSubmit} className='w-4/12 h-72 flex gap-4 flex-col justify-center items-center shadow-lg rounded-md'>
        <h1 className='text-2xl'>Reset Password!</h1>
            <div className='flex items-center gap-3 w-full px-6'>
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' className='p-2 border block w-full border-gray-300 rounded-md shadow-sm' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button type='submit' className='px-3 py-1 bg-black text-white rounded-sm hover:bg-white hover:text-black hover:border border-black'>Send Reset Link</button>
        </form>
    </div>
  )
}

export default Page;