import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  if (!Array.isArray(req.body) || req.body.length === 0) {
    return res.status(400).json({ error: "Cart is empty or invalid" });
  }

  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1M3qTbJAdcOFUudYrhdD7Zcj",
        },
      ],
      line_items: req.body.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace("image-", "https://cdn.sanity.io/images/ai9mc751/production/")
          .replace("-webp", ".webp");

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: Math.round(item.price * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/canceled`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return res
      .status(err.statusCode || 500)
      .json({ error: err.message ?? "Unable to create checkout session" });
  }
}
