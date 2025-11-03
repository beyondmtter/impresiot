'use client'

import ContactLink from '@/components/ContactLink'
import SearchResult from '@/components/SearchResult'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useEmailAPI from '@/fetchAPI/useEmailAPI'
import Link from 'next/link'
import { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export default function ContactCard() {
    const { sendContactEmail } = useEmailAPI()
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSelectChange = (value) => {
        setCountryCode(value)
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const contact = `${countryCode}-${phoneNumber}`
        setIsSending(true)
        await sendContactEmail(name, email, message, contact)
        setIsSending(false)
        setIsSent(true)

        setTimeout(() => {
            setName('')
            setEmail('')
            setMessage('')
            setPhoneNumber('')
            setIsSent(false)
        }, 3000)
    }

    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className="flex items-center justify-center min-h-screen bg-black p-4 mt-[4rem] pb-[4rem]">
                    <div className="w-full max-w-md bg-black text-gray-100 shadow-xl border border-neutral-800 rounded-lg overflow-hidden">
                        <div className="border-b border-neutral-800 p-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Us
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300 block">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-900 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-900 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-300">Phone Number</label>
                                <div className='flex'>
                                    <Select onValueChange={(value) => handleSelectChange(value.split('+')[1])}>
                                        <SelectTrigger className="w-[4rem]">
                                            <SelectValue placeholder="+91">{`+${countryCode}`}</SelectValue>
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
                                        placeholder="Your Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-900 rounded-r-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300 block">Message</label>
                                <textarea
                                    id="message"
                                    placeholder="Your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-900 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent h-32 resize-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-neutral-800 border border-neutral-900 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors ${(isSending || isSent) ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                                disabled={isSending || isSent}
                            >
                                {isSending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : isSent ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Sent!
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Message
                                    </span>
                                )}
                            </button>
                            <ContactLink />
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

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


