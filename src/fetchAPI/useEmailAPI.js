import { useToast } from "@/hooks/use-toast";

const useEmailAPI = () => {
    const { toast } = useToast()
    const sendCreatorRequest = async(fullName, instaProfile, youtubeProfile, userId) => {
        try {
            const response = await fetch("/api/email/send-creator-req", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({fullName, instaProfile, youtubeProfile, userId}),
            });

            const data = await response.json();
            return { message: data.message, order: data.order };
        } catch (error) {
            return { message: "An error occurred while sending creator request email. Please try again." };
        }
    }

    const sendForgotPassEmail = async(email) => {
        try {
            const response = await fetch("/api/email/send-forgot-pass", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email})
            });

            const data = await response.json();
            toast({
                description: data.message,
              })
            return { message: data.message, success: data.success };
        } catch (error) {
            return { message: "An error occurred while sending forgot password email. Please try again." };
        }
    }

    const sendVerifyAccEmail = async(email) => {
        try {
            const response = await fetch("/api/email/send-verification", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email})
            });

            const data = await response.json();
            toast({
                description: data.message,
              })
            return { message: data.message, success: data.success };
        } catch (error) {
            return { message: "An error occurred while sending verification email. Please try again." };
        }
    }
    const sendTicketEmail = async(fullName, title, boughtDate) => {
        try {
            const response = await fetch("/api/email/send-ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({fullName, title, boughtDate})
            });

            const data = await response.json();
            toast({
                description: data.message,
              })
            return { message: data.message, success: data.success };
        } catch (error) {
            return { message: "An error occurred while sending ticket email. Please try again." };
        }
    }
    const sendContactEmail = async(name, email, message, phoneNumber) => {
        try {
            const response = await fetch("/api/email/send-contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, message, phoneNumber})
            });

            const data = await response.json();
            toast({
                description: data.message,
              })
            return { message: data.message, success: data.success };

        } catch (error) {
            return { message: "An error occurred while sending ticket email. Please try again." };
        }
    }

    return {
        sendCreatorRequest,
        sendContactEmail,
        sendForgotPassEmail,
        sendVerifyAccEmail,
        sendTicketEmail
    }
}


export default useEmailAPI