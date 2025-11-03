import VerificationEmail from "../../emails/verificationEmail";
import { resend } from "./resend";

export async function sendVerificationEmail(
  fullName,
  verifyCode,
  email
) {
  try {
    await resend.emails.send({
      from: 'Impresiot <support@impresiot.com>',
      to: email,
      subject: 'Impresiot Verification',
      react: VerificationEmail({ fullName, otp: verifyCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}