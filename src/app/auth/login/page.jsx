"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import useUserAPI from '@/fetchAPI/useUserAPI';
import { useRouter } from 'next/navigation';
import ForgotPass from '@/components/ForgotPass';
import VerifyAccount from '@/components/VerifyAccount';

const SignIn = () => {
    const router = useRouter()
    const { login } = useUserAPI();

    const [open, setOpen] = useState(false)
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = formValues;

        if (!email || !password) {
            setMessage("Please enter both email and password");
            return;
        }

        const response = await login(email, password);
        if (response.OTP) {
            setOpen(true)
            return;
        }
        if (response.success) {
            router.push("/main")
            router.refresh();
            setMessage("Login successful!");
        } else {
            setMessage(response.message || "An error occurred during login");
        }
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-[22rem] flex flex-col items-center gap-6 p-6 bg-[#0D0D0D] rounded-lg">
                    {/* Logo Section */}
                    <div className="flex justify-center mb-4">
                        <Image src='/logo.png' height={200} width={400} alt='logo' className='w-[10rem] h-[4rem]' />
                    </div>

                    {/* Heading */}
                    <h2 className="text-[1.4rem] text-white">Sign In</h2>

                    {/* Form Section */}
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                        {/* Email Input */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-white text-[.9rem]">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                className="py-2 px-3 bg-white text-black text-[.9rem] rounded w-full"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-white text-[.9rem]">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                className="py-2 px-3 bg-white text-black text-[.9rem] rounded w-full"
                            />
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex justify-between items-center text-white text-[.9rem]">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={formValues.rememberMe}
                                    onChange={handleInputChange}
                                    className="accent-red-600"
                                />
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>
                            {/* <button type="button" className="text-red-500 active:scale-95 duration-100 transition-all hover:underline">Forgot Password</button> */}
                            <ForgotPass />
                        </div>

                        {/* Sign In Button */}
                        <button type="submit" className="bg-red-600 text-white active:scale-95 duration-100 transition-all py-2 rounded w-full mt-2">
                            Sign In
                        </button>

                        {/* Display Message */}
                        {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}

                        {/* Navigation Link */}
                        <p className="text-center text-white text-sm mt-4">
                            New User? <span className="text-red-600 cursor-pointer hover:underline"
                                onClick={() => router.push("/auth/signup")}
                            >
                                Create Account
                            </span>
                        </p>
                    </form>
                </div>
            </div>
            <VerifyAccount open={open} setOpen={setOpen} email={formValues.email} />
        </>
    );
}

export default SignIn;
