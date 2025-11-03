"use client";
import VerifyAccount from '@/components/VerifyAccount';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useUserAPI from '@/fetchAPI/useUserAPI';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { State } from "country-state-city";

const Signup = () => {
  const router = useRouter();
  const { signUp } = useUserAPI();
  const [open, setOpen] = useState(false)
  const [formValues, setFormValues] = useState({
    fullname: '',
    contact: '',
    contact: '',
    email: '',
    password: '',
    countryCode: "+91",
    confirmPassword: '',
    country: 'India',
    state: 'New Delhi',
    terms: false,
  });
  const [states, setStates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleCountryChange = (value) => {

    const isoCode = countries.filter((country) => country.name === value)[0].isoCode;
    const allStates = State.getStatesOfCountry(isoCode);
    setStates(allStates);

    setFormValues((prevFormData) => ({
      ...prevFormData,
      state: allStates[0].name,
      country: value
    }));

  };

  useEffect(() => {
    if (states.length === 0) {
      const allStates = State.getStatesOfCountry("IN");
      setStates(allStates);
    }
  }, [])

  const handleStateChange = (value) => {
    setFormValues((prevFormData) => ({
      ...prevFormData,
      state: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormValues((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formValues.fullname || !formValues.countryCode || !formValues.contact || !formValues.email || !formValues.password || !formValues.confirmPassword || !formValues.country || !formValues.state) {
      setError("Please fill in all fields.");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formValues.terms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setError(null); // Clear any previous errors
    setLoading(true); // Set loading state while submitting

    // Call the signUp API
    const response = await signUp({
      fullname: formValues.fullname,
      contact: formValues.contact,
      countryCode: formValues.countryCode,
      email: formValues.email,
      password: formValues.password,
      country: formValues.country,
      state: formValues.state,
      agreeToTerms: formValues.terms
    });

    setLoading(false); // Reset loading state

    if (response.success) {
      setOpen(true)
    } else {
      setError(response.message); // If the API returns an error, display it
    }
  };

  return (
    <>
      <div className='mt-[4rem] flex justify-center'>
        <div className='w-[24rem] flex flex-col items-center gap-4 py-[2rem] bg-[#0D0D0D]'>
          {/* Logo Section */}
          <div className='flex justify-center'>
            <Image src='/logo.png' height={200} width={400} alt='logo' className='w-[10rem] h-[4rem]' />
          </div>
          <div>
            <h2 className='text-[1.4rem]'>Create Account</h2>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          {/* Form Section */}
          <form className='w-[20rem] flex flex-col gap-4' onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="fullname">Full Name</label>
              <input
                id="fullname"
                type="text"
                placeholder="Enter your full name"
                value={formValues.fullname}
                onChange={handleInputChange}
                className='py-2 px-2 text-[.9rem] rounded text-black'
              />
            </div>

            {/* Contact */}
            
            <div className='flex flex-col gap-2'>
              <label>Contact</label>
              <div className='flex items-center'>
                <Select onValueChange={(value) => handleSelectChange('countryCode', value.split('+')[1])}>
                  <SelectTrigger className="w-[4rem] bg-white text-black">
                    <SelectValue placeholder="+91">{`+${formValues.countryCode}`}</SelectValue>
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
                  id="contact"
                  type="text"
                  placeholder="Enter your contact number"
                  value={formValues.contact}
                  onChange={handleInputChange}
                  className='py-2 px-2 text-[.9rem] w-full rounded text-black'
                />
              </div>
            </div>


            {/* Email */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formValues.email}
                onChange={handleInputChange}
                className='py-2 px-2 text-[.9rem] rounded text-black'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleInputChange}
                className='py-2 px-2 text-[.9rem] rounded text-black'
              />
            </div>

            {/* Confirm Password */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                className='py-2 px-2 text-[.9rem] rounded text-black'
              />
            </div>

            {/* Country and State */}
            <div className='flex gap-2 justify-between'>
              <div className='w-[10rem]'>
                <label htmlFor="country">Country</label>
                <Select onValueChange={(value) => handleCountryChange(value)}>
                  <SelectTrigger className="rounded bg-white text-black">
                    <SelectValue placeholder={formValues.country} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.isoCode} value={country.name}>{country.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='w-[10rem]'>
                <label htmlFor="state">State</label>
                <Select onValueChange={(value) => handleStateChange(value)}>
                  <SelectTrigger className="rounded bg-white text-black">
                    <SelectValue placeholder={formValues.state} />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.name}>{state.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='flex items-center gap-2'>
              <input
                type="checkbox"
                id="terms"
                checked={formValues.terms}
                onChange={handleInputChange}
                className='accent-red-600'
              />
              <label htmlFor="terms">
                I Agree to <span className='text-red-600'>Terms and Conditions</span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button type="submit" className='bg-red-600 text-white active:scale-95 duration-100 transition-all py-2 rounded mt-2 w-full' disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Navigation Link */}
            <p className='text-center text-sm mt-2'>
              Already a user? <span className='text-red-600 cursor-pointer'
                onClick={() => router.push("/auth/login")}>Log In</span>
            </p>
          </form>
        </div>
      </div>
      <VerifyAccount open={open} setOpen={setOpen} email={formValues.email} />
    </>
  );
}

export default Signup;


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
