import React from "react";
import styles from "./planModal.module.scss";

interface Props {
  setpopupvisible?: () => void;
  setActivePaymentMethod?: () => void;
}
const PLanConfirmationModal = (prop: Props) => {
  const { setpopupvisible, setActivePaymentMethod } = prop;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img src="/icons/Frame.svg" alt="plan" />
          <div className={styles.heading}>Are You Sure?</div>
          <div className={styles.text}>you want to your Enterprise plan </div>
          <div className={styles.btnWrapper}>
            <div className={styles.noBtn} onClick={setpopupvisible}>
              No
            </div>
            <div className={styles.yesBtn} onClick={setActivePaymentMethod}>
              Yes
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PLanConfirmationModal;
