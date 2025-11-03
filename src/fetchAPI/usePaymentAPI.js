
const usePaymentAPI = () => {

    const createOrder = async(amount) => {
        try {
            const response = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({amount}),
            });

            const data = await response.json();
            return { message: data.message, orderData: data.order };
        } catch (error) {
            return { message: "An error occurred while creating the workshop. Please try again." };
        }
    }

    const paymentVrification = async(value) => {
        try {
            const response = await fetch("/api/payment/payment-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            const data = await response.json();
            return { message: data.message, finalOrder: data.orderData };
        } catch (error) {
            return { message: "An error occurred while creating the workshop. Please try again." };
        }
    }




    return {
        createOrder,
        paymentVrification
    }
}

export default usePaymentAPI