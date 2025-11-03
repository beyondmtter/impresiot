import Link from 'next/link'
import React from 'react'

const ContactLink = () => {
    return (
        <div className="p-6 border-t border-neutral-800 text-neutral-400 text-[.8rem]">
            <p>General support:
                <Link
                    href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=support@impresiot.com&su=General%20Support&body=Hi,%20I%20have%20a%20question..."
                    target='_blank'
                    className="text-gray-200 hover:underline">support@impresiot.com
                </Link>
            </p>
            <p>Want to be a impresiot creator:
                <Link href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=creator.desk@impresiot.com&su=Creator%20Inquiry&body=Hi,%20I%20want%20to%20become%20an%20Impresiot%20creator..."
                    target='_blank'
                    className="text-gray-200 hover:underline">creator.desk@impresiot.com
                </Link>
            </p>
            <p>Finance/contract support:
                <Link href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=finance@impresiot.com&su=Finance%20Support&body=Hi,%20I%20have%20an%20issue%20related%20to%20finance..."
                    target='_blank'
                    className="text-gray-200 hover:underline">finance@impresiot.com
                </Link>
            </p>
            <p>Media/copyright issue:
                <Link href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=media@impresiot.com&su=Media%20Issue&body=Hi,%20I%20have%20an%20issue%20related%20to%20media..."
                    target='_blank'
                    className="text-gray-200 hover:underline">media@impresiot.com
                </Link>
            </p>
        </div>
    )
}

export default ContactLink