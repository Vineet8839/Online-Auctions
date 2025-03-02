import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentProcessor = ({ amount, auctionId, onSuccess, onFailure }) => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        try {
            const response = await axios.get('/api/payment-methods');
            setPaymentMethods(response.data);
            // Set default payment method if available
            const defaultMethod = response.data.find(m => m.is_default);
            if (defaultMethod) setSelectedMethod(defaultMethod.id);
        } catch (error) {
            console.error('Error fetching payment methods:', error);
        }
    };

    const handlePayment = async () => {
        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }

        setProcessing(true);
        try {
            const response = await axios.post('/api/process-payment', {
                amount,
                auction_id: auctionId,
                payment_method_id: selectedMethod
            });

            if (response.data.payment_details) {
                // Handle UPI/Razorpay payment
                const options = {
                    key: "YOUR_RAZORPAY_KEY",
                    amount: amount * 100,
                    currency: "INR",
                    name: "Auction System",
                    description: "Bid Payment",
                    order_id: response.data.payment_details.id,
                    handler: function (response) {
                        onSuccess(response);
                    },
                    prefill: {
                        name: "User Name",
                        email: "user@example.com",
                        contact: "9999999999"
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            console.error('Payment failed:', error);
            onFailure(error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="payment-processor">
            <h3>Complete Payment</h3>
            <div className="amount-display">
                Amount to Pay: ₹{amount}
            </div>

            <div className="payment-method-selector">
                <h4>Select Payment Method</h4>
                {paymentMethods.map(method => (
                    <div key={method.id} className="payment-option">
                        <input
                            type="radio"
                            id={`method-${method.id}`}
                            name="payment-method"
                            checked={selectedMethod === method.id}
                            onChange={() => setSelectedMethod(method.id)}
                        />
                        <label htmlFor={`method-${method.id}`}>
                            {method.type === 'upi' && `UPI (${method.details.upi_id})`}
                            {method.type === 'bank' && `Bank Account (${method.details.bank_name})`}
                            {method.type === 'paypal' && `PayPal (${method.details.paypal_email})`}
                        </label>
                    </div>
                ))}
            </div>

            <button 
                onClick={handlePayment} 
                disabled={processing || !selectedMethod}
                className="pay-button"
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default PaymentProcessor; 