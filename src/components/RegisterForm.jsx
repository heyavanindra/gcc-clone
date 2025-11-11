"use client"
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import BeatLoader from "react-spinners/BeatLoader";

function RegisterForm() {
  const router = useRouter();
  let [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    const { firstName, lastName, email, password } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return firstName && lastName && emailPattern.test(email) && password;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (!isFormValid()) {
      toast.error("Please fill out all the fields or check your email credentials.");
      setLoading(false);
      return;
  }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if(result.res){
        toast.success(result.res)
        setLoading(false)
       setTimeout(() => {
        router.push('/login')
       },1500)
      }
      else if (result.ok) {
        toast.success('User Registered Successfully!');
        setLoading(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          router.push('/login')
         },1500)
      } else {
        toast.error('User not registered!');
      }
    } catch (err) {
      console.error("Failed to submit form", err);
      toast.error("Error registering user");
    }
  };

  return (
    <>
      <Toaster richColors closeButton position="bottom-right" />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 w-[50vh] md:w-[30vw]">
          <div className='flex flex-col'>
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="fname"
              className="w-full p-2 border"
              placeholder="Enter first name"
              value={formData.firstName} 
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lname"
              className="w-full p-2 border"
              placeholder="Enter last name"
              value={formData.lastName} 
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
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
        <div>
          <button type="submit" className="uppercase text-sm tracking-wider px-16 py-3 bg-black text-white hover:bg-white border border-black hover:text-black" disabled={loading}>
          {loading ? <BeatLoader loading={loading} size={10} color='white'
              aria-label="Loading Spinner"
              data-testid="loader" /> : 'Create Account'}
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
