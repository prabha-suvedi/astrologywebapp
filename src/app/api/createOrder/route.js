import PaytmChecksum from "paytmchecksum";
import "dotenv/config";


export async function POST(req) {
  try {
    const { name, address, phone, amount, paymentMethod, item } = await req.json();

    if (!name || !address || !phone || !amount) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = "ORDER_" + Date.now();
    const paytmParams = {
      MID: process.env.PAYTM_MID,
      ORDER_ID: orderId,
      CUST_ID: phone,
      TXN_AMOUNT: amount.toString(),
      CHANNEL_ID: "WEB",
      WEBSITE: "WEBSTAGING",
      INDUSTRY_TYPE_ID: "Retail",
      CALLBACK_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paymentResponse`,
      PAYMENT_MODE_ONLY: "YES",
      PAYMETHOD: paymentMethod === "UPI" ? "UPI" : "CC",
    };

    // Generate checksum
    const checksum = await PaytmChecksum.generateSignature(
      paytmParams,
      process.env.PAYTM_MERCHANT_KEY
    );
    paytmParams.CHECKSUMHASH = checksum;

    // Construct payment URL
    const paymentUrl = `https://securegw-stage.paytm.in/order/process?${new URLSearchParams(
      paytmParams
    )}`;

    console.log("PAYTM_MERCHANT_KEY:", process.env.PAYTM_MERCHANT_KEY);


    return Response.json({ success: true, paymentUrl });
  } catch (error) {
    console.error("Error processing payment:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
