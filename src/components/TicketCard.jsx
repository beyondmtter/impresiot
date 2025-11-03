import React from 'react'
import Image from 'next/image'
import ticket from '../../public/ticket.png'

const TicketCard = ({ ticketData }) => {
    const formattedDate = new Date(ticketData.createdAt).toLocaleDateString()
    const formattedEventDate = new Date(ticketData.eventDate).toLocaleDateString();

    return (
        <>
            <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-lg w-[18rem] mx-auto">
                {/* Header Section */}
                <section className="text-center mb-2">
                    <Image
                        src={ticket}
                        alt="Event Banner"
                        className="w-full max-h-24 object-cover rounded-md"
                    />
                </section>

                {/* Confirmation Header */}
                <section className="bg-yellow-400 text-black py-1 rounded-t-lg text-center">
                    <h2 className="text-sm font-semibold">🎫 Ticket Confirmation 🎉</h2>
                </section>

                {/* Main Content */}
                <section className="bg-white p-3 rounded-b-lg shadow-sm">
                    <div className="mb-2">
                        <p className="text-purple-800 text-sm font-medium">
                            Hello, <strong>{ticketData.buyerDetails.fullName}</strong>! 🎊
                        </p>
                    </div>

                    <div className="mb-2">
                        <p className="text-gray-700 text-xs">
                            Thank you for registering for the workshop! Here are your details:
                        </p>
                    </div>

                    {/* Ticket Details */}
                    <div className="mb-1">
                        <p className="text-blue-700 text-xs font-semibold">
                            🎟️ <strong>Event:</strong> <span className="text-black">{ticketData.workshopDetails.title}</span>
                        </p>
                    </div>

                    <div className="mb-1">
                        <p className="text-blue-700 text-xs font-semibold">
                            📅 <strong>Event Date:</strong> <span className="text-black">{formattedEventDate}</span>
                        </p>
                    </div>
                    <div className="mb-1">
                        <p className="text-blue-700 text-xs font-semibold">
                            📅 <strong>Time:</strong> <span className="text-black">{ticketData.time}</span>
                        </p>
                    </div>
                    <div className="mb-1">
                        <p className="text-blue-700 text-xs font-semibold">
                            📅 <strong>Location:</strong> <span className="text-black">{ticketData.workshopDetails.location}</span>
                        </p>
                    </div>
                    <div className="mb-1">
                        <p className="text-blue-700 text-xs font-semibold">
                            📅 <strong>Purchase Date:</strong> <span className="text-black">{formattedDate}</span>
                        </p>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-1">
                        <p className="text-gray-600 text-xs">
                            If you have any questions, please reach out to our support team.
                        </p>
                    </div>
                </section>

                {/* Footer Section */}
                <section className="text-center bg-pink-600 text-white py-1 rounded-md mt-3">
                    <p className="text-xs">
                        Powered by <strong>Impresiot</strong> 💜
                    </p>
                </section>
            </section>
        </>
    )
}

export default TicketCard
