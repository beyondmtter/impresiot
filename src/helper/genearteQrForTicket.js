import { toDataURL } from 'qrcode';

export const generateQrCode = async({title, fullName, number}) => {
  
  const qrData = `Workshop: ${title}\nName: ${fullName}\nContact: ${number}`;

  const qrCodeDataUrl = await toDataURL(qrData, { width: 300 });
  return qrCodeDataUrl;
}
