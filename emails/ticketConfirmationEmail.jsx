import {
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Html,
  Tailwind,
  Img,
} from "@react-email/components";

export default function TicketConfirmationEmail({
  fullName,
  title,
  boughtDate,
  eventDate,
  time,
  location
}) {
  const ticketImg = "https://imprisiotmedia.blob.core.windows.net/util-images/ticket.png"
  

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Your Ticket Confirmation</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>🎟️ Your ticket for {title} is confirmed! Scan QR for details.</Preview>
      <Tailwind>
        <Section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-md w-full max-w-md mx-auto">
          {/* Header */}
          <Section className="text-center mb-4">
            <Img
              src={ticketImg}
              width={500}
              height={300}
              alt="Event Banner"
              className="rounded-md w-full max-h-40 object-cover"
              style={{ borderRadius: '8px' }}
            />
          </Section>

          <Section className="bg-yellow-400 text-black py-4 rounded-t-md text-center">
            <Heading as="h2" className="text-2xl font-bold">
              🎫 Ticket Confirmation 🎉
            </Heading>
          </Section>

          {/* Main Content */}
          <Section className="bg-white p-6 rounded-b-md shadow-lg">
            <Row className="mb-4">
              <Text className="text-purple-800 text-lg font-medium">
                Hello, <strong>{fullName}</strong>! 🎊
              </Text>
            </Row>
            <Row className="mb-4">
              <Text className="text-gray-700 text-md">
                Thank you for registering for the workshop! Here are your details:
              </Text>
            </Row>

            {/* Ticket Details */}
            <Row className="mb-4">
              <Text className="text-blue-700 font-semibold">
                🎟️ <strong>Event:</strong> <span className="text-black">{title}</span>
              </Text>
            </Row>
            <Row className="mb-4">
              <Text className="text-blue-700 font-semibold">
                📅 <strong>Event Date:</strong> <span className="text-black">{eventDate}</span>
              </Text>
            </Row>
            <Row className="mb-4">
              <Text className="text-blue-700 font-semibold">
                📅 <strong>Event Time:</strong> <span className="text-black">{time}</span>
              </Text>
            </Row>
            <Row className="mb-4">
              <Text className="text-blue-700 font-semibold">
                📅 <strong>Location:</strong> <span className="text-black">{location}</span>
              </Text>
            </Row>
            <Row className="mb-4">
              <Text className="text-blue-700 font-semibold">
                📅 <strong>Purchase Date:</strong> <span className="text-black">{boughtDate}</span>
              </Text>
            </Row>

            {/* Additional Information */}
            <Row className="mb-4">
              <Text className="text-gray-600 text-sm">
                If you have any questions, please reach out to our support team.
              </Text>
            </Row>
          </Section>

          {/* Footer */}
          <Section className="text-center bg-pink-600 text-white py-3 rounded-md mt-6">
            <Text className="text-xs">
              Powered by <strong>Impresiot</strong> 💜
            </Text>
          </Section>
        </Section>
      </Tailwind>
    </Html>

  );
}
