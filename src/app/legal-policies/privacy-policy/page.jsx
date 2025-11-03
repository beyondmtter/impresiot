"use client"
import SearchResult from '@/components/SearchResult';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const PrivacyPolicy = () => {
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className='p-[1.5rem] w-full text-white flex justify-center mb-[4rem] mt-[4rem] text-[.9rem]'>
                    <div className='w-[40rem] flex flex-col gap-4'>

                        <h1>Privacy Policy</h1>
                        <p><strong>Effective Date:</strong>17/11/2024</p>
                        <p><strong>Legal Name:</strong> Impresiot Marketing and Lifestyle Private Limited</p>

                        <p>We respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information.</p>

                        <h2 className="font-semibold text-[1rem]">1. Information We Collect</h2>
                        <ul>
                            <li><strong>Personal Data:</strong> Name, email, contact details, and payment information.</li>
                            <li><strong>Usage Data:</strong> Interaction patterns on the platform, including clicks and session times.</li>
                        </ul>

                        <h2 className="font-semibold text-[1rem]">2. Use of Information</h2>
                        <p>Your data is used to:</p>
                        <ul>
                            <li>Facilitate platform services, such as workshop hosting and course sales.</li>
                            <li>Provide personalized recommendations using Brand+ AI technology.</li>
                            <li>Enhance user experience and improve marketing strategies.</li>
                        </ul>

                        <h2 className="font-semibold text-[1rem]">3. Data Sharing</h2>
                        <ul>
                            <li>Data may be shared with third-party partners essential to service delivery.</li>
                            <li>Impresiot does not sell personal data to third parties.</li>
                        </ul>

                        <h2 className="font-semibold text-[1rem]">4. Data Security</h2>
                        <p>We employ secure servers and encryption to protect your data. However, no method of transmission over the internet is entirely secure.</p>

                        <h2 className="font-semibold text-[1rem]">5. User Rights</h2>
                        <p>Users may request data access, correction, or deletion by contacting <a href="mailto:support@impresiot.com">support@impresiot.com</a>.</p>
                    </div>
                </div>
            }
        </>
    );
};

export default PrivacyPolicy;
