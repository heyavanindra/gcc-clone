import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

function Login() {
  return (
    <div className="h-[calc(117.3vh)] flex pt-36">
      <div className="hidden md:block h-full w-1/2">
        <Image
          width={500}
          height={500}
          src="https://sahara-theme.myshopify.com/cdn/shop/files/bg_4a93eafd-a31f-4d25-a585-6c3aea1db6a4.jpg"
          alt=""
        />
      </div>
      <div className="h-full md:w-1/2 flex flex-col justify-center pl-10 md:pl-20 md:pr-10 items-start">
        <div className="md:w-full flex flex-col justify-center items-start border-b py-16">
          <h1 className="uppercase text-3xl font-semibold tracking-wider py-5">
            Welcome Back
          </h1>
          <LoginForm />
        </div>
        <div className="uppercase my-8">
          <h2 className="text-2xl font-semibold tracking-wider py-6">
            Don&apos;t have an account?
          </h2>
          <Link href="/register" className="underline underline-offset-2">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
