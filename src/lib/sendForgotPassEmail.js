import ForgotPasswordEmail from "../../emails/forgotPasswordEmail";
import { resend } from "./resend";

export async function sendForgotPassEmail(fullName, otpCode, email ) {
 
  try {
    await resend.emails.send({
      from: 'Impresiot <service@impresiot.com>',
      to: email,
      subject: 'Impresiot Forgot Password Email',
      react: ForgotPasswordEmail({ fullName, otpCode }),
    });
    return { success: true, message: 'Forgot password email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending forgot password email:', emailError);
    return { success: false, message: 'Failed to send forgot password  email.' };
  }
}