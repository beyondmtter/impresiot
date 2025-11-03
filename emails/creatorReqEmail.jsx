import {
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Html,
  Link,
  Tailwind,
} from "@react-email/components";

export default function CreatorReqEmail({
  fullName,
  InstaProfile,
  YoutubeProfile,
  userId,
}) {
  const fullNameStr = String(fullName || "");
  const instaProfileStr = String(InstaProfile || "");
  const youtubeProfileStr = String(YoutubeProfile || "");
  const userIdStr = String(userId || "");

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Creator Request</title>
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
      <Tailwind>
        <Section className="bg-black rounded-[8px] w-[20rem] p-[2rem] text-white flex flex-col justify-center">
          <Heading className="font-semibold text-[1.2rem] mb-4">Creator Request</Heading>
          <Text className="mb-4">By {fullNameStr}</Text>
          {/* Buttons with spacing using margin-bottom */}
          <Button
            href={`https://www.instagram.com/${instaProfileStr}`}
            className="bg-neutral-700 text-white text-[.9rem] py-2 px-4 rounded-[8px] mb-4"
          >
            Instagram Profile
          </Button>
          <Button
            href={`https://www.youtube.com/${youtubeProfileStr}`}
            className="bg-neutral-700 text-white text-[.9rem] py-2 px-4 rounded-[8px] mb-4"
          >
            Youtube Profile
          </Button>
          <Button
            href={`https://impresiot.com/approve-to-creator/${userIdStr}`}
            className="bg-red-500 text-white text-[.9rem] py-2 px-4 rounded-[8px]"
          >
            Approve Request
          </Button>
        </Section>
      </Tailwind>
    </Html>
  );
}
