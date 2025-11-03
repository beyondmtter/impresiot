import {
    Head,
    Html,
    Section,
    Text,
    Heading,
    Tailwind,
  } from "@react-email/components";
  
  export default function ContactEmail({ message, email, name, phoneNumber }) {
    console.log("email",phoneNumber)
    const messageStr = String(message || "");
    const emailStr = String(email || "");
    const nameStr = String(name || "");
    const phoneNumberStr = String(phoneNumber || "");
  
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Contact Email</title>
        </Head>
        <Tailwind>
          <Section className="p-4 bg-gray-100 rounded-lg w-full max-w-md mx-auto text-gray-800">
            <Heading className="text-lg font-semibold mb-4">New Contact Message</Heading>
            <Text className="mb-2">
              <strong>Name:</strong> {nameStr}
            </Text>
            <Text className="mb-2">
              <strong>Email:</strong> {emailStr}
            </Text>
            <Text className="mb-2">
              <strong>Phone Number:</strong> {phoneNumberStr}
            </Text>
            <Text className="mb-4">
              <strong>Message:</strong>
              <br />
              {messageStr}
            </Text>
            <Text className="text-sm text-gray-600">
              This email was sent via your contact form.
            </Text>
          </Section>
        </Tailwind>
      </Html>
    );
  }
  