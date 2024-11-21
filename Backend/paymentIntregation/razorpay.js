// razorpay.js
import Razorpay from 'razorpay';
import express from 'express';
const router = express.Router();

const razorpay = new Razorpay({
    key_id: 'rzp_test_FzNm8xwjZR6SCt',
    key_secret: '1lokxaA4T8FeKGtsvPSSeXkr',
});

// Create an order
// Create an order
router.post('/create-order', async (req, res) => {
    const amount = req.body.amount; // amount in rupees

    if (amount < 1) { // Minimum amount in rupees
        return res.status(400).json({
            statusCode: 400,
            error: {
                code: 'BAD_REQUEST_ERROR',
                description: 'Order amount less than minimum amount allowed',
                metadata: {},
                reason: 'Amount must be at least ₹1',
                source: 'order',
                step: 'NA'
            }
        });
    }

    const options = {
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        receipt: 'receipt#1', // optional
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
});


export default router
