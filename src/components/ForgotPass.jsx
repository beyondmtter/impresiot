"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import useEmailAPI from "@/fetchAPI/useEmailAPI";
import useUserAPI from "@/fetchAPI/useUserAPI";
import { usePathname } from "next/navigation";

const ForgotPass = () => {
    const path = usePathname()
    const { sendForgotPassEmail } = useEmailAPI();
    const { updatePassword } = useUserAPI()
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPassVisible, setPassVisible] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSend, setOtpSend] = useState(false);
    const [status, setStatus] = useState("");
    const [updating, setUpdating] = useState(false);

    // Handle OTP Email Sending
    const handleSendEmail = async () => {
        if (!email) {
            setStatus("isValidEmail");
            return;
        }
        const res = await sendForgotPassEmail(email);
        
        if (res.success) {
            setOtpSend(true);
            setStatus("otpSent");
        } else {
            setStatus("error");
        }
    };

    

    // Handle Password Update
    const handleUpdatePassword = async () => {
        // Input validation
        if (!otp || !newPassword || !confirmPassword) {
            setStatus("isValidUpdate");
            return;
        }

        if (newPassword.length < 8) {
            setStatus("isCorrectPassLength");
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatus("unMatchedPass");
            return;
        }

        try {
            setUpdating(true);
            setStatus("");

            const response = await updatePassword(email, newPassword, confirmPassword, otp);

            if (response.success) {
                setStatus("success");
                setTimeout(() => {
                    resetForm();
                }, 2000);
            } else {
                if (response.message === "Invalid OTP") {
                    setStatus("invalidOtp");
                } else if (response.message === "OTP has expired") {
                    setStatus("otpExpired");
                } else if (response.message === "User not found") {
                    setStatus("userNotFound");
                } else {
                    setStatus("error"); 
                }

            }
        } catch (error) {
            console.error("Error updating password:", error);
            setStatus("error");
        } finally {
            setUpdating(false);
        }
    };

    const resetForm = () => {
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
        setOtpSend(false);
        setStatus("profileUpdate");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {path.includes("update")
                    ?
                    <button className='bg-white text-black p-2 w-[10rem] active:scale-95 duration-100 transition-all rounded-[8px]'>
                        Update Password
                    </button>
                    :
                    <button
                        className="text-red-500 active:scale-95 duration-100 transition-all hover:underline"
                    >
                        Forgot Password
                    </button>
                }
            </DialogTrigger>
            <DialogContent className=" w-[24rem] sm:max-w-md bg-[#0A0A0A] border-none rounded-[10px] p-6">
                <div className="text-white text-[1.1rem] text-center font-light mb-4">
                    Update Password
                    <span
                        className={`${status === "profileUpdate" ? "flex" : "hidden"
                            } text-[#5bed18] mt-3 text-[.8rem]`}
                    >
                        Update Successful
                    </span>
                </div>
                <div className="flex flex-col w-full max-w-md">
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white text-sm mb-1 block">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="your email"
                            className="bg-black rounded-[10px] h-[2.5rem] p-[.5rem] outline-none text-[.8rem] w-full border border-[#1C1C1C]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={otpSend}
                        />
                        <span
                            className={`${status === "isValidEmail" ? "flex" : "hidden"
                                } text-red-500 text-[.8rem]`}
                        >
                            Please enter a valid email
                        </span>

                    </div>

                    {/* OTP Field - Visible when OTP is sent */}
                    {otpSend && (
                        <div className="mb-4">
                            <label htmlFor="otp" className="text-white text-sm mb-1 block">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                placeholder="Enter your OTP"
                                className="bg-black rounded-[10px] h-[2.5rem] p-[.5rem] outline-none text-[.8rem] w-full border border-[#1C1C1C]"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                    )}

                    {/* New Password and Confirm Password Fields - Visible when OTP is sent */}
                    {otpSend && (
                        <>
                            <div className="mb-4">
                                <label
                                    htmlFor="newPassword"
                                    className="text-white text-sm mb-1 block"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={isPassVisible ? "text" : "password"}
                                        id="newPassword"
                                        placeholder="••••••••"
                                        className="bg-black rounded-[10px] h-[2.5rem] p-[.5rem] outline-none text-[.8rem] w-full border border-[#1C1C1C]"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <div
                                        className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-400 cursor-pointer"
                                        onClick={() => setPassVisible(!isPassVisible)}
                                    >
                                        {isPassVisible ? "Hide" : "Show"}
                                    </div>
                                </div>
                                <span
                                    className={`${status === "isCorrectPassLength" ? "flex" : "hidden"
                                        } text-red-500 text-[.8rem]`}
                                >
                                    Password should be at least 8 characters
                                </span>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-white text-sm mb-1 block"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    className="bg-black rounded-[10px] h-[2.5rem] p-[.5rem] outline-none text-[.8rem] w-full border border-[#1C1C1C]"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span
                                    className={`${status === "unMatchedPass" ? "flex" : "hidden"
                                        } text-red-500 text-[.8rem]`}
                                >
                                    Password does not match
                                </span>
                            </div>
                        </>
                    )}

                    {/* Validation Error Message */}
                    <span
                        className={`${status === "isValidUpdate" ? "flex" : "hidden"
                            } text-red-500 text-[.8rem]`}
                    >
                        Please fill all the fields
                    </span>

                    {/* OTP Send Button */}
                    {!otpSend && (
                        <button
                            onClick={handleSendEmail}
                            className="rounded-[10px] text-[.8rem] h-[2.5rem] bg-blue-500 text-white transition duration-150 ease-in-out hover:bg-blue-600 active:scale-95 mb-4"
                        >
                            Send OTP
                        </button>
                    )}

                    {/* Update Password Button */}
                    {otpSend && (
                        <>
                            <button
                                onClick={handleUpdatePassword}
                                disabled={updating}
                                className={`rounded-[10px] text-[.8rem] h-[2.5rem] mt-4 ${updating ? "bg-gray-500" : "bg-red-500"
                                    } text-white transition duration-150 ease-in-out hover:bg-red-600 active:scale-95`}
                            >
                                {updating ? "Updating..." : "Update Password"}
                            </button>
                            <button
                                onClick={handleSendEmail}
                                className="rounded-[10px] text-[.8rem] mt-4 h-[2.5rem] bg-neutral-900 text-white transition duration-150 ease-in-out hover:bg-black active:scale-95 mb-4"
                            >
                                Send OTP
                            </button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ForgotPass;
