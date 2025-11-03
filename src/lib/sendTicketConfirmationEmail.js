import TicketConfirmationEmail from "../../emails/ticketConfirmationEmail";
import { resend } from "./resend";

export async function sendTicketConfirmationEmail({
  fullName,
  title,
  boughtDate,
  email,
  eventDate,
  time,
  location,
  qrCodeUrl
}) {
  try {
    await resend.emails.send({
      from: 'Impresiot <support@impresiot.com>',
      to: email,
      subject: `${title} - (Ticket Confirmation)`,
      react: TicketConfirmationEmail({ fullName, title, boughtDate, eventDate, time, location, qrCodeUrl }),
    });
    return { success: true, message: 'Ticket email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending ticket email:', emailError);
    return { success: false, message: 'Failed to send ticket email.' };
  }
}