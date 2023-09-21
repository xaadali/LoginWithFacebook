import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./package.module.scss";
import Modal from "@component/Components/__common/modal";
import UsePaymentMethod from "../paymentMethods/usePaymentMethods";
import { RiErrorWarningLine } from "react-icons/ri";

const DeletePackagePopup = ({ onClose, popupvisible }) => {
  const { packageLoader, handleEndpackage } = UsePaymentMethod();
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <RiErrorWarningLine className={styles.icon} />
            {/* <img
              src="/icons/waring.svg"
              alt="no-icon"
              width={100}
              height={100}
            /> */}
          </div>

          <div className={styles.content}>
            <p style={{ fontWeight: "900" }}>Are you sure?</p>
            <p>
              {" "}
              Canceling your plan will switch your account to the free plan. The
              free plan offers limited features. You can upgrade to a paid plan
              at any time. If you need further assistance, feel free to contact
              us. Thank you.
            </p>
          </div>

          <div className={styles.footer}>
            <div className={styles.btnWrapper}>
              {/* <div className={styles.backBtn} onClick={onClose}>
                Cancel
              </div> */}
              <div className={styles.btn2} onClick={() => handleEndpackage()}>
                {" "}
                {packageLoader ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="22"
                    visible={true}
                  />
                ) : (
                  "Confirm"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePackagePopup;
