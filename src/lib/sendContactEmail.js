import ContactEmail from "../../emails/contactEmail";
import { resend } from "./resend";

export async function sendContactEmail(name, message, email, phoneNumber) {
  console.log("send", phoneNumber)
 
  try {
    await resend.emails.send({
      from: 'Impresiot <service@impresiot.com>',
      to: "admin@impresiot.com",
      subject: 'Impresiot Contact',
      react: ContactEmail({ name, email, message, phoneNumber }),
    });
    return { success: true, message: 'Contact sended.' };
  } catch (emailError) {
    console.error('Error sending contact:', emailError);
    return { success: false, message: 'Failed to send contact email.' };
  }
}