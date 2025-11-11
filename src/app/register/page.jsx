import RegisterForm from '@/components/RegisterForm';
import Link from "next/link";

function Register() {

  return (
    <div className="h-[calc(114.3vh)] flex pt-36">
        <div className='hidden md:block h-full w-1/2'>
            <img src="https://sahara-theme.myshopify.com/cdn/shop/files/account3.jpg" alt="" />
        </div>
        <div className="h-full md:w-1/2 flex flex-col justify-center pl-10 md:pl-20 md:pr-10 items-start">
            <div className="md:w-full flex flex-col justify-center items-start border-b py-16">
            <h1 className="uppercase text-3xl font-semibold tracking-wider py-5 mt-28">Welcome!</h1>
            <RegisterForm />
            </div>
            <div className="uppercase my-8">
                <h2 className="text-2xl font-semibold tracking-wider py-6">Already have an account?</h2>
                <Link href='/login' className="underline underline-offset-2">Login to your account</Link>
            </div>
        </div>
    </div>
  )
}

export default Register;