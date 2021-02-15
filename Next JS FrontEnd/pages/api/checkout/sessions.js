import Stripe from "stripe";
import axios from "axios";
import { server } from "../../../config/index";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req, res) => {
  const { quantity, user } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.PRICE_ID,
        quantity,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/create_post`,
  });

  res.status(200).json({ sessionId: session.id });
};
