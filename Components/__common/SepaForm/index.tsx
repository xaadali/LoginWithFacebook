import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  IbanElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "./checkoutForm.module.scss";
import useCheckout from "./useCheckout";
import { RotatingLines } from "react-loader-spinner";
import CountryCodes from "../Dropdown/countryCOdeDropDown";
import { CountryOption } from "@component/utills/enum";
import { useSelector } from "react-redux";

interface props {
  loading: any;
  setLoading: any;
  setpopupvisible: (prop: boolean) => void;
  data: any;
  counter: number;
}
const SepaForm = ({ setpopupvisible }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state: any) => state.user);
  const { handleSubmit, handleGetValue, loading } =
    useCheckout(setpopupvisible);
  const IBAN_STYLE = {
    base: {
      color: "#707070",
      fontSize: "14px",
      "::placeholder": {
        color: "rgba(50, 50, 93, 0.5)",
      },
      ":-webkit-autofill": {
        color: "#707070",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
      ":-webkit-autofill": {
        color: "#fa755a",
      },
    },
  };
  const IBAN_ELEMENT_OPTIONS = {
    supportedCountries: ["SEPA"],
    placeholderCountry: "DE",
    style: IBAN_STYLE,
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <div className={styles.headingWrapper}>
          <label>SEPA</label>
        </div> */}
        <div className={styles.middleWrapper}>
          <div className={styles.inputWrapper}>
            <label>Name</label>
            <div className={styles.inputStyle}>
              <input
                placeholder="Jenny Rosen"
                type="text"
                autoComplete="off"
                name="name"
                onChange={(e: any) => handleGetValue("name", e?.target?.value)}
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label>Email</label>
            <div className={styles.inputStyle}>
              <input
                // placeholder="jennyrosen@gmail.com"
                value={user?.data?.user?.email}
                type="email"
                autoComplete="off"
                disabled={true}
                name="email"
                onChange={(e: any) => handleGetValue("email", e?.target?.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label>IBAN</label>
          <div className={styles.inputStyles}>
            <IbanElement options={IBAN_ELEMENT_OPTIONS} />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.ibanText}>
            By providing your IBAN and confirming this payment, you are
            authorizing Rocketship Inc. and Stripe, our payment service
            provider, to send instructions to your bank to debit your account
            and your bank to debit your account in accordance with those
            instructions. You are entitled to a refund from your bank under the
            terms and conditions of your agreement with your bank. A refund must
            be claimed within 8 weeks starting from the date on which your
            account was debited.
          </div>
        </div>

        <div className={styles.btnWrapper}>
          {loading ? (
            <button>
              <RotatingLines
                strokeColor="#fff"
                strokeWidth="5"
                animationDuration="0.75"
                width="15"
                visible={true}
              />
            </button>
          ) : (
            <button onClick={() => handleSubmit(stripe, elements)}>Pay</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SepaForm;
