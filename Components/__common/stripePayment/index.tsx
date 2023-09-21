import CheckoutForm from "@component/Components/__common/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const ShopPaymentModal = ({ setpopupvisible }) => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <StripeForm setpopupvisible={setpopupvisible} />
      </Elements>
    </>
  )
};
const StripeForm = ({ setpopupvisible }) => {
  return (
    <>
      <CheckoutForm setpopupvisible={setpopupvisible}
      />
    </>
  );
};

export default ShopPaymentModal;
