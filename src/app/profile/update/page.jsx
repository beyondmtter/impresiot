"use client";
import ForgotPass from '@/components/ForgotPass';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useUserAPI from '@/fetchAPI/useUserAPI';
import usePreviewImg from '@/hooks/usePreviewImg';
import nullAvatar from "../../../../public/nullAvatar.jpg"
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SearchResult from '@/components/SearchResult';
import useScreenWidth from '@/hooks/useScreenWidth';
import { State } from "country-state-city";

const UpdateProfile = () => {
    const { screenWidth } = useScreenWidth()
    const router = useRouter();
    const fileRef = useRef(null)
    const { updateUser } = useUserAPI();
    const { handleImageChange, imgUrl } = usePreviewImg()
    const user = useSelector((state) => state.user.userData, shallowEqual);
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);

    const [formData, setFormData] = useState({
        fullName: '',
        contact: '',
        email: "",
        profilePicture: "",
        countryCode: "",
        state: "",
        instagram: "",
        facebook: "",
        twitter: "",
        youtube: "",
        linkedin: "",
        website: "",
        country: "",
        about: "",
        currentPassword: '',
        profession: "",
        deleteProfilePic: false,
        newPassword: '',
        confirmNewPassword: ''
    });
    const [states, setStates] = useState([]);

    useEffect(() => {
        if (user) {
            // Extract contact details
            const contactDetails = user.contact?.split("-") || [];
            const countryCode = contactDetails[0] || "+91";
            const contactNumber = contactDetails[1] || "";
    
            setFormData({
                fullName: user.fullName || '',
                contact: contactNumber,
                email: user.email || '',
                countryCode: countryCode,
                state: user.location?.state || "Delhi",
                country: user.location?.country || "India",
                instagram: user.socialLinks?.instagram || "",
                facebook: user.socialLinks?.facebook || "",
                twitter: user.socialLinks?.twitter || "",
                youtube: user.socialLinks?.youtube || "",
                website: user.socialLinks?.website || "",
                profilePicture: user.profilePicture || "",
                profession: user.profession || "",
                about: user.about || "",
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        }
    }, [user]);
    

    useEffect(() => {
        if (states.length === 0) {
            const allStates = State.getStatesOfCountry("IN");
            setStates(allStates);
        }
    }, [])
    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "about" && formData.about.length >= 500) {
            return
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (imgUrl) {
            setFormData((prevData) => ({
                ...prevData,
                profilePicture: imgUrl,
            }));
        }
    }, [imgUrl]);

    // Handle select changes
    const handleSelectChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const setSelectedState = (value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            state: value,
        }));
    };
    const setSelectedCountry = (value) => {
        const isoCode = countries.filter((country) => country.name === value)[0].isoCode;
        const allStates = State.getStatesOfCountry(isoCode);
        setStates(allStates);

        setFormData((prevFormData) => ({
            ...prevFormData,
            state: allStates[0].name,
            country: value
        }));

        setFormData((prevFormData) => ({
            ...prevFormData,
            country: value,
        }));
    };

    const handleDeletePorfilePic = () => {
        setFormData((prevData) => ({
            ...prevData,
            deleteProfilePic: true,
            profilePicture: "",
        }));
    }

    const isValidURL = (url) => {
        const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}\/[^\s]*$/;
        return regex.test(url);
    };

    const handleUpdate = async () => {

        if (
            formData.instagram && !isValidURL(formData.instagram) ||
            formData.facebook && !isValidURL(formData.facebook) ||
            formData.twitter && !isValidURL(formData.twitter) ||
            formData.youtube && !isValidURL(formData.youtube) ||
            formData.linkedin && !isValidURL(formData.linkedin)
        ) {
            alert("Please provide valid social media links.");
            return;
        }

        const payload = {
            ...formData,
        };

        try {
            await updateUser(payload, user?._id);

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile');
        }
    };

    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className={`flex flex-col gap-8 mt-[6rem] mb-[5rem] w-[24rem] sm:w-[50rem] ${screenWidth > 1024 ? "ml-[20rem]" : "m-auto"}`}>
                    {/* Profile Header */}
                    <div
                        className='flex items-center gap-4 hover:bg-neutral-500 hover:text-white rounded-[8px] p-2 cursor-pointer active:scale-95 transition-all duration-250 w-full sm:w-[10rem]'
                        onClick={() => router.push(`/profile/${user?._id}`)}
                    >
                        <ChevronLeft />
                        Your Profile
                    </div>

                    {/* Main Section */}
                    <div className='flex flex-col lg:flex-row gap-8'>
                        {/* Profile Picture Section */}
                        <div id='profilePic' className='flex flex-col items-center gap-4'>
                            <Image
                                width={400}
                                height={400}
                                alt='userProfile'
                                src={imgUrl || formData?.profilePicture || nullAvatar}
                                className='bg-white w-[5rem] h-[5rem] object-cover rounded-full'
                            />
                            <button
                                className='bg-white p-2 px-4 w-full sm:w-[10rem] text-black active:scale-95 duration-100 transition-all rounded-[8px]'
                                onClick={() => fileRef.current.click()}
                            >
                                Change Photo
                            </button>
                            <button
                                className='bg-black p-2 px-4 w-full sm:w-[10rem] rounded-[8px] active:scale-95 duration-100 transition-all text-white'
                                onClick={handleDeletePorfilePic}
                            >
                                Delete Photo
                            </button>
                            <input
                                type='file'
                                hidden
                                ref={fileRef}
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Profile Info Section */}
                        <div id='profileInfo' className='flex flex-col items-start justify-center sm:flex-row gap-8'>
                            {/* Left Section */}
                            <div className='flex flex-col gap-4'>
                                {/* Full Name */}
                                <div className='flex flex-col gap-2 w-full sm:w-[18rem]'>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name='fullName'
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder='Enter your full name'
                                        className='p-2 w-full bg-transparent text-white text-[.9rem] border-[1px] border-neutral-800 pl-3 outline-none rounded-[8px]'
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div className='flex flex-col gap-2 w-full sm:w-[18rem]'>
                                    <label>Contact</label>
                                    <div className='flex items-center'>
                                        <Select onValueChange={(value) => handleSelectChange('countryCode', value.split('+')[1])}>
                                            <SelectTrigger className="w-[100px]">
                                                <SelectValue placeholder="+91">{`+${formData.countryCode}`}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countryCodes.map((country) => (
                                                    <SelectItem key={country.code} value={`${country.name}${country.code}`}>
                                                        {country.name} {country.code}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <input
                                            type="text"
                                            name='contact'
                                            value={formData.contact}
                                            onChange={handleChange}
                                            placeholder='Enter your mobile number'
                                            className='p-2 w-full bg-transparent text-white border-neutral-800 rounded-r-[8px] text-[.9rem] border-[1px] pl-3 outline-none'
                                        />
                                    </div>
                                </div>

                                {/* Other Fields (State, Country, Social Links) */}
                                <div className='flex flex-col gap-2 w-full sm:w-[18rem]'>
                                    <label>State</label>
                                    <Select onValueChange={(value) => setSelectedState(value)}>
                                        <SelectTrigger className="rounded-[8px]">
                                            <SelectValue placeholder={formData.state} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {states.map((state) => (
                                                <SelectItem key={state.isoCode} value={state.name}>{state.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-2 w-full sm:w-[18rem]'>
                                    <label>Country</label>
                                    <Select onValueChange={(value) => setSelectedCountry(value)}>
                                        <SelectTrigger className="rounded-[8px]">
                                            <SelectValue placeholder={formData.country} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country) => (
                                                <SelectItem key={country.isoCode} value={country.name}>{country.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Social Links */}
                                {user?.approvedToCreator &&
                                    ['instagram', 'facebook', 'twitter', 'youtube', 'website'].map((field) => (
                                        <div className='flex flex-col gap-2 w-full sm:w-[18rem]' key={field}>
                                            <label>{`${field.charAt(0).toUpperCase()}${field.slice(1)} Link`}</label>
                                            <input
                                                type="text"
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                placeholder={`Enter your ${field} Link`}
                                                className='p-2 w-full bg-transparent text-white text-[.9rem] border-[1px] border-neutral-800 pl-3 outline-none rounded-[8px]'
                                            />
                                        </div>
                                    ))
                                }
                            </div>

                            {/* Right Section */}
                            <div className='flex flex-col gap-4'>
                                {/* Email */}
                                <div className='flex flex-col gap-2 w-full sm:w-[18rem]'>
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Enter your email'
                                        className='p-2 w-full bg-transparent text-white text-[.9rem] border-[1px] border-neutral-800 pl-3 outline-none rounded-[8px]'
                                    />
                                </div>

                                <div className='flex flex-col gap-2 w-full sm:w-[18rem]'>
                                    <label>Profession</label>
                                    <input
                                        type="text"
                                        name="profession"
                                        value={formData.profession}
                                        onChange={handleChange}
                                        placeholder='Eg: Gamer'
                                        className='p-2 w-full bg-transparent text-white text-[.9rem] border-[1px] border-neutral-800 pl-3 outline-none rounded-[8px]'
                                    />
                                </div>

                                {/* About */}
                                <div className='flex flex-col gap-2 w-[18rem]'>
                                    <label>About</label>
                                    <input
                                        type="text"
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                        placeholder='Enter about yourself'
                                        className='p-2 w-full bg-transparent text-white text-[.9rem] border-[1px] border-neutral-800 pl-3 outline-none rounded-[8px]'
                                    />
                                    <div className="text-sm text-neutral-500">
                                        {formData.about.length}/{500} characters
                                    </div>
                                </div>

                                {/* Password Change */}
                                <div className='flex flex-col gap-2 w-full sm:w-[18rem]'>
                                    <label>Change Password</label>
                                    <ForgotPass />
                                </div>

                                {/* Update Button */}
                                <button
                                    onClick={handleUpdate}
                                    className='bg-white text-black p-2 w-full sm:w-[10rem] active:scale-95 duration-100 transition-all rounded-[8px]'
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    );
};

export default UpdateProfile;

const countryCodes = [
    { name: "India", code: "+91" },
    { name: "Pakistan", code: "+92" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "Canada", code: "+12" },
    { name: "Australia", code: "+61" },
    { name: "China", code: "+86" },
    { name: "France", code: "+33" },
    { name: "Germany", code: "+49" },
    { name: "Japan", code: "+81" },
    { name: "South Korea", code: "+82" },
    { name: "Brazil", code: "+55" },
    { name: "Mexico", code: "+52" },
    { name: "Russia", code: "+7" },
    { name: "South Africa", code: "+27" },
    { name: "Italy", code: "+39" },
    { name: "Spain", code: "+34" },
    { name: "Sweden", code: "+46" },
    { name: "Netherlands", code: "+31" },
    { name: "Switzerland", code: "+41" },
    // Add more countries as needed
];


const countries = [
    { name: "India", isoCode: "IN" },
    { name: "Pakistan", isoCode: "PK" },
    { name: "United States", isoCode: "US" },
    { name: "United Kingdom", isoCode: "GB" },
    { name: "Canada", isoCode: "CA" },
    { name: "Australia", isoCode: "AU" },
    { name: "China", isoCode: "CN" },
    { name: "France", isoCode: "FR" },
    { name: "Germany", isoCode: "DE" },
    { name: "Japan", isoCode: "JP" },
    { name: "South Korea", isoCode: "KR" },
    { name: "Brazil", isoCode: "BR" },
    { name: "Mexico", isoCode: "MX" },
    { name: "Russia", isoCode: "RU" },
    { name: "South Africa", isoCode: "ZA" },
    { name: "Italy", isoCode: "IT" },
    { name: "Spain", isoCode: "ES" },
    { name: "Sweden", isoCode: "SE" },
    { name: "Netherlands", isoCode: "NL" },
    { name: "Switzerland", isoCode: "CH" }
];
