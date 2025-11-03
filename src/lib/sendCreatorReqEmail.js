import CreatorReqEmail from "../../emails/creatorReqEmail";
import { resend } from "./resend";

export async function sendCreatorReqEmail(fullName, InstaProfile, YoutubeProfile, userId, email) {
 
  try {
    await resend.emails.send({
      from: 'Impresiot <creator@impresiot.com>',
      to: "support@impresiot.com",
      subject: 'Impresiot Creator Request',
      react: CreatorReqEmail({ fullName, InstaProfile, YoutubeProfile, userId }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
} 