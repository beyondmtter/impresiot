"use client";
import useUserAPI from "@/fetchAPI/useUserAPI";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

const ApproveToCreator = () => {
  const { userId } = useParams();
  const { getUser, approveToCreator, rejectedToCreator } = useUserAPI();
  const user = useSelector((state) => state.user.userData, shallowEqual);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser(userId);
      setUserData(user);
      setLoading(false);
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleApproval = async () => {
    const response = await approveToCreator(userId);
  };

  const handleRejection = async () => {
    const response = await rejectedToCreator(userId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black shadow-lg rounded-xl w-[22rem] p-6 flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold text-white">
          Allow <span className="text-indigo-600">{userData?.fullName}</span> to be a Creator
        </h2>
        <div className="flex gap-3 w-full">
          <button
            className="flex-1 bg-neutral-800 text-white py-2 px-4 rounded-lg hover:bg-gray-300 active:scale-95 duration-100 transition-all"
            onClick={handleRejection}
          >
            Reject
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 active:scale-95 duration-100 transition-all"
            onClick={handleApproval}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveToCreator;
