import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "./checkoutForm.module.scss";
import useCheckout from "./useCheckout";
import { RotatingLines } from "react-loader-spinner";
import CountryCodes from "../Dropdown/countryCOdeDropDown";
import { CountryOption } from "@component/utills/enum";
import { useSelector } from "react-redux";
import PaymentCycle from "@component/Components/DashboardComp/PricingPlans/PricingPaymentPlan/PaymentCycle";
import PaymentConfirmation from "../Popups/PaymentConfirmation";

interface props {
  loading: any;
  setLoading: any;
  setpopupvisible: (prop: boolean) => void;
  data: any;
  counter: number;
}
const CheckoutForm = ({ setpopupvisible }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state: any) => state.user);
  const {
    handleSubmit,
    setName,
    setCountry,
    country,
    loading,
    setVisible,
    visible,
  } = useCheckout(setpopupvisible);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.headingWrapper}>
            <label>Stripe</label>
          </div>
          <div className={styles.inputWrapper}>
            <label>Email</label>
            <div className={styles.inputStyle}>
              <input
                value={user?.data?.user?.email}
                // placeholder={user?.data?.user?.email}
                type="email"
                autoComplete="off"
                disabled={true}
                style={{ cursor: "not-allowed" }}
                // onChange={(e: any) => setName(e?.target?.value)}
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label>Card Number</label>
            <CardNumberElement
              id="card-element"
              options={{
                iconStyle: "solid",
                style: {
                  base: {
                    fontSize: "16px",
                    lineHeight: "1.5",
                    "::placeholder": {
                      fontSize: "14px",
                      color: "black",
                    },
                    color: "red",
                    ":focus": {
                      color: "black",
                    },
                  },
                  empty: {
                    color: "gray",
                    "::placeholder": {
                      color: "#a4a4a4",
                    },
                    ":focus": {
                      color: "black",
                    },
                  },
                  invalid: {
                    color: "red",
                  },
                  complete: {
                    backgroundColor: "transparent",
                    color: "green",
                  },
                },
              }}
            />
          </div>
          <div className={styles.middleWrapper}>
            <div className={styles.inputWrapper}>
              <label>Expiry</label>
              <CardExpiryElement
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      lineHeight: "1.5",
                      "::placeholder": {
                        fontSize: "14px",
                        color: "black",
                      },
                      ":focus": {
                        color: "black",
                      },
                    },
                    empty: {
                      color: "gray",
                      "::placeholder": {
                        color: "#a4a4a4",
                      },
                      ":focus": {
                        color: "black",
                      },
                    },
                    invalid: {
                      color: "red",
                    },
                    complete: {
                      backgroundColor: "transparent",
                      color: "green",
                    },
                  },
                }}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label>CVV</label>
              <CardCvcElement
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      lineHeight: "1.5",
                      "::placeholder": {
                        fontSize: "14px",
                        color: "black",
                      },
                      ":focus": {
                        color: "black",
                      },
                    },
                    empty: {
                      color: "gray",
                      "::placeholder": {
                        color: "#a4a4a4",
                      },
                      ":focus": {
                        color: "black",
                      },
                    },
                    invalid: {
                      color: "red",
                    },
                    complete: {
                      backgroundColor: "transparent",
                      color: "green",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className={styles.middleWrapper}>
            <div className={styles.inputWrapper}>
              <label>Country</label>
              <div className={styles.inputDropdown}>
                <CountryCodes
                  selected={country}
                  setSelected={(res: any) => {
                    setCountry(res);
                  }}
                  options={CountryOption}
                  showRightIcon={true}
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label>Postal Code</label>
              <div className={styles.inputStyle}>
                <input
                  placeholder="90210"
                  type="number"
                  autoComplete="off"
                  onChange={(e: any) => setName(e?.target?.value)}
                />
              </div>
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
              <button onClick={() => handleSubmit(stripe, elements)}>
                Pay
              </button>
            )}
          </div>
        </div>
      </div>
      <PaymentConfirmation
        setpopupvisible={setVisible}
        popupvisible={visible}
      />
    </>
  );
};

export default CheckoutForm;
