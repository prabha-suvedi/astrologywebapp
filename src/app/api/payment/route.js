import Razorpay from "razorpay";

export async function POST(req) {
  const { amount, name, address } = await req.json();

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Razorpay accepts amount in paisa
      currency: "INR",
      receipt: `order_rcptid_${Math.random() * 1000}`,
    };

    const order = await razorpay.orders.create(options);

    return Response.json({ success: true, order });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
