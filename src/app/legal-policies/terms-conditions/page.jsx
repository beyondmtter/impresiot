"use client"
import SearchResult from '@/components/SearchResult';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const TermAndCondition = () => {
    const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
    return (
        <>
            {isSearch && <SearchResult />}
            {!isSearch &&
                <div className='p-[1.5rem] w-full  text-white mb-[4rem] flex justify-center mt-[4rem] text-[.9rem]'>
                    <div className='w-[40rem] flex flex-col gap-4'>
                        <h1>Terms and Conditions</h1>
                        <p><strong>Effective Date:</strong> 17/11/2024</p>
                        <p><strong>Legal Name:</strong> Impresiot Marketing and Lifestyle Private Limited</p>

                        <p>Welcome to Impresiot.com. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our services.</p>

                        <h2 className="font-semibold text-[1rem]">1. Use of Platform</h2>
                        <ul>
                            <li><strong>Eligibility:</strong> You must be at least 18 years old to use our platform.</li>
                            <li><strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account credentials.</li>
                            <li><strong>Prohibited Activities:</strong> Users are prohibited from engaging in unlawful activities, fraudulent conduct, or activities that disrupt platform functionality.</li>
                        </ul>

                        <h2 className="font-semibold text-[1rem]">2. Services</h2>
                        <p>Impresiot provides:</p>
                        <ul>
                            <li>Tools for creators to host workshops, sell courses, and establish independent businesses.</li>
                            <li>Brand+ AI technology to connect brands with creators for marketing campaigns.</li>
                        </ul>

                        <h2 className="font-semibold text-[1rem]">3. Fees and Payments</h2>
                        <ul>
                            <li>Commission fees for services are outlined under each service description.</li>
                            <li>Users agree to pay applicable service fees without delay.</li>
                        </ul>

                        <h2 className="font-semibold text-[1rem]">4. Intellectual Property</h2>
                        <p>All content on the platform, including trademarks and software, is owned by Impresiot Marketing and Lifestyle Private Limited. Unauthorized use is prohibited.</p>

                        <h2 className="font-semibold text-[1rem]">5. Limitation of Liability</h2>
                        <p>Impresiot is not liable for any loss or damages arising from misuse of the platform or third-party interactions.</p>

                        <h2 className="font-semibold text-[1rem]">6. Modifications</h2>
                        <p>Impresiot reserves the right to modify these terms at its discretion. Updated terms will be posted on the website.</p>

                        <h3>For detailed inquiries, contact us at:</h3>
                        <p>Email: <a href="mailto:support@impresiot.com">support@impresiot.com</a></p>
                        <p>Phone: +91-9315287983</p>
                    </div>
                </div>
            }
        </>
    );
};

export default TermAndCondition;
