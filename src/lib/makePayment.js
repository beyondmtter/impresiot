export const makePayment = async (order, paymentVerification) => {
    return new Promise((resolve, reject) => {
        const options = {
            key: process.env.RAZOR_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Imprisiot",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            handler: async (response) => {
                try {
                    const value = {
                        ...response,
                    };
                    
                    const { finalOrder } = await paymentVerification(value);
                                        
                    let orderData = {
                        ...finalOrder,
                        price: order.amount / 100,
                    };
                    
                    resolve(orderData);
                } catch (error) {
                    reject(error);
                }
            },
            prefill: {
                name: order?.fullName,
                email: order?.email,
                contact: order?.contact,
            },
            notes: {
                address: "Emprisiot Office",
            },
            theme: {
                color: "#212120",
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();

        razor.on('payment.failed', (response) => {
            reject(new Error("Payment failed"));
        });
    });
};
