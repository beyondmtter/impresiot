import React, { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import useUserAPI from "@/fetchAPI/useUserAPI";
import { useRouter } from "next/navigation";
import useEmailAPI from "@/fetchAPI/useEmailAPI";

const VerifyAccount = ({ open, setOpen, email }) => {
    const { sendVerifyAccEmail } = useEmailAPI()
    const router = useRouter()
    const { verifyUser, updateSession } = useUserAPI();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");


    const handleSendEmail = async () => {
        if (!email) {
            setStatus("isValidEmail");
            return;
        }
        const res = await sendVerifyAccEmail(email);
        
        if (res.success) {
            setStatus("otpSent");
        } else {
            setStatus("error");
        }
    };

    

    const handleVerify = async () => {
        if (!otp) {
            setStatus("Please enter the OTP.");
            return;
        }

        setLoading(true);
        setStatus("pending");

        try {
            const response = await verifyUser(email, otp);

            if (response.success) {
                setStatus("Verification successful!");
                await updateSession()
                router.push("/explore")
                router.refresh();
            } else {
                setStatus("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("Verification error", error);
            setStatus("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className=" w-[24rem] sm:max-w-[425px] p-6 rounded-[10px]">
                    <h2 className="text-center text-lg font-semibold mb-4">
                        Verify Your Account
                    </h2>
                    <p className="text-center text-sm mb-4">
                        Please enter the OTP sent to your email: <strong>{email}</strong>
                    </p>

                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm mb-2">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-2 border rounded-md text-black"
                            maxLength={6} // Assuming OTP is 6 digits
                            placeholder="Enter OTP"
                        />
                    </div>

                    {status && (
                        <p
                            className={`text-center text-sm ${status === "Verification successful!"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                        >
                            {status}
                        </p>
                    )}

                    <div className="mt-4 text-center flex flex-col gap-2">
                        <button
                            onClick={handleVerify}
                            disabled={loading}
                            className={`w-full p-2 bg-blue-600 text-white rounded-md ${loading ? "opacity-50" : "hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                        <button
                                onClick={handleSendEmail}
                                className="rounded-[10px] text-[.8rem] h-[2.5rem] bg-neutral-900 text-white transition duration-150 ease-in-out hover:bg-black active:scale-95 mb-4"
                            >
                                Send OTP
                            </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default VerifyAccount;
