import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripeGateway = ({ user }) => {
  const handleClick = async () => {
    // Call your backend to create the Checkout session.
    const { sessionId } = await fetch("/api/checkout/sessions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ quantity: 1, user: user }),
    }).then((res) =>
      res.json(console.log("in response block", res, sessionId))
    );
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
  };
  return (
    <div className="page-container">
      <h1>Blogger Membership</h1>
      <p>Become a Permenant Member now 💖</p>
      <button role="link" onClick={handleClick}>
        Checkout
      </button>
    </div>
  );
};

export default StripeGateway;