"use client"
import SearchResult from '@/components/SearchResult';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const RefundCancellationPolicy = () => {
  const isSearch = useSelector((state) => state.search.isSearch, shallowEqual);
  return (
    <>
      {isSearch && <SearchResult />}
      {!isSearch &&
        <div className="p-[1.5rem] w-full  text-white flex mb-[4rem] justify-center mt-[4rem] text-[.9rem]">
          <div className="w-[40rem] flex flex-col gap-4">
            <h1>Refund and Cancellation Policy</h1>
            <p><strong>Effective Date:</strong>17/11/2024</p>
            <p><strong>Legal Name:</strong> Impresiot Marketing and Lifestyle Private Limited</p>

            <p>We strive to ensure a seamless user experience. This policy explains the terms for refunds and cancellations.</p>

            <h2 className="font-semibold text-[1rem]">1. Refunds for Services</h2>
            <ul>
              <li><strong>Workshops/Courses:</strong> Refunds are permitted if cancellations are made at least 48 hours before the event.</li>
              <li><strong>Service Fees:</strong> Platform service fees are non-refundable unless there is an error on our part.</li>
            </ul>

            <h2 className="font-semibold text-[1rem]">2. Cancellation Policy</h2>
            <ul>
              <li>Users may cancel their services via their Impresiot account dashboard.</li>
              <li>Cancellations within 48 hours of scheduled workshops or events will not be eligible for refunds.</li>
            </ul>

            <h2 className="font-semibold text-[1rem]">3. Force Majeure</h2>
            <p>Refunds or cancellations due to unforeseen circumstances (e.g., natural disasters) will be addressed on a case-by-case basis.</p>

            <h3>For any issues or assistance, contact us at:</h3>
            <p>Email: <a href="mailto:support@impresiot.com">support@impresiot.com</a></p>
            <p>Phone: +91-9315287983</p>
          </div>
        </div>
      }
    </>
  );
};

export default RefundCancellationPolicy;
