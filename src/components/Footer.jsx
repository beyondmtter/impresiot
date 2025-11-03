"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
    const path = usePathname()
    return (
        <footer className={` ${path === "/" || path.includes("legal-policies") ? "block" :"hidden"} bg-muted text-muted-foreground text-white bg-black p-[4rem] ${path === "/" ? "mt-0" : "mt-[10rem]"}`}>
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-4 lg:px-0">
                <div className="grid gap-4">
                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                        <span className="text-lg font-bold"> Impresiot Marketing and Lifestyle Private Limited</span>
                    </Link>
                    <p className="text-sm">From Creators to Consumers, Unlock Exclusive Experiences.</p>
                </div>
                <div className="grid gap-2">
                    <h3 className="text-sm font-medium uppercase">Quick Links</h3>
                    <nav className="grid gap-1">
                        <Link href="/legal-policies/privacy-policy" className="text-sm hover:underline" prefetch={false}>
                            Privacy Policy
                        </Link>
                        <Link href="/legal-policies/terms-conditions" className="text-sm hover:underline" prefetch={false}>
                            Terms of Service
                        </Link>
                        <Link href="/legal-policies/refund-cancellation-policy" className="text-sm hover:underline" prefetch={false}>
                            Refund and Cancellation Policy
                        </Link>
                    </nav>
                </div>
                <div className="grid gap-2">
                    <h3 className="text-sm font-medium uppercase">Follow Us</h3>
                    <div className="flex items-center gap-2">
                        {socialLink.map((item) => (
                            <Link
                                href={item.link}
                                key={item.id}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                                prefetch={false}
                            >
                                <item.icon className="h-4 w-4" />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="grid gap-2">
                    <h3 className="text-sm font-medium uppercase">Contact Us</h3>
                    <div className="grid gap-1 text-sm">
                        <div className="flex">
                            <MailIcon className="mr-2 inline h-4 w-4" />
                            <p>support@impresiot.com</p>
                        </div>
                        <div className="flex">
                            <PhoneIcon className="mr-2 inline h-4 w-4" />
                            <div className="flex gap-2">
                                <p>+91-9315287983</p>
                            </div>
                        </div>
                        <div>
                            <MapPinIcon className="mr-2 inline h-4 w-4" />
                            New Delhi Delhi 110091 INDIA
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 border-t pt-6 text-center text-xs">
                <p>&copy; 2024 Impresiot. All rights reserved.</p>
            </div>
        </footer>
    )
}

const socialLink = [
    {
        id: 2,
        icon: InstagramIcon,
        link: "https://www.instagram.com/impresiot/?igsh=MXRiNWVrOHBud2Rj",
    },
    {
      id: 3,
      icon: LinkedinIcon,
      link: "https://www.linkedin.com/company/impresiot/posts/?feedView=all",
    },
    // {
    //   id: 4,
    //   icon: TwitterIcon,
    //   link: "https://www.twitter.com/",
    // },
]

function FacebookIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    )
}


function InstagramIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}


function LinkedinIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}


function MailIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}


function MapPinIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}


function PhoneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}


function TwitterIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    )
}