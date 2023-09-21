import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SepaForm from "../SepaForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const SepaPaymentModal = ({ setpopupvisible }) => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <SepaFormComp setpopupvisible={setpopupvisible} />
      </Elements>
    </>
  )
};
const SepaFormComp = ({ setpopupvisible }) => {
  return (
    <>
      <SepaForm setpopupvisible={setpopupvisible}
      />
    </>
  );
};

export default SepaPaymentModal;
