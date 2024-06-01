const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECERAT_KEY
});

exports.checkout = (async (req, res, next) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: Number(amount * 100),
            currency: "INR"
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

