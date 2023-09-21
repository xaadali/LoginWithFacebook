import React, { useState } from "react";
import styles from "./paymentMethods.module.scss";
import { BsArrowLeft } from "react-icons/bs";
import ShopPaymentModal from "@component/Components/__common/stripePayment";
import SepaForm from "@component/Components/__common/SepaForm";
import PaymentConfirmation from "@component/Components/__common/Popups/PaymentConfirmation";
import SepaPaymentModal from "@component/Components/__common/sepaPayment";

const PaymentMethod = () => {
  const [active, setActive] = useState<number>(0);
  const [popupvisible, setpopupvisible] = useState<boolean>(false);

  return (
    <>
      {popupvisible && (
        <PaymentConfirmation
          popupvisible={popupvisible}
          setpopupvisible={setpopupvisible}
        />
      )}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.heading}>
              <div className={styles.headingArrow}>
                <BsArrowLeft className={styles.LeftIcon} />
              </div>
              <div className={styles.headingText}>Select Payment Method</div>
            </div>
            <div className={styles.radioButtonsWrapper}>
              <div className={styles.creditCard}>
                <input
                  type="radio"
                  id="option"
                  checked={active === 0 ? true : false}
                  name="select"
                  onClick={() => setActive(0)}
                />
                <div className={styles.text}>Credit Card</div>
              </div>
              <div className={styles.creditCard}>
                <input
                  type="radio"
                  id="option"
                  name="select"
                  onClick={() => setActive(1)}
                />
                <div className={styles.text}>Method SEPA</div>
              </div>
            </div>
          </div>
          <div className={styles.stripePayment}>
            {active === 0 ? (
              <ShopPaymentModal setpopupvisible={setpopupvisible} />
            ) : active === 1 ? (
              <SepaPaymentModal setpopupvisible={setpopupvisible} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
