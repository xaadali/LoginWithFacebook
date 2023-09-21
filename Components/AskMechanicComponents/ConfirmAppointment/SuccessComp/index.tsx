/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./success.module.scss";
import UseConfirmBooking from "../useConfirmBooking";

const SuccessComp = () => {
  const { hanldeReturnhome } = UseConfirmBooking();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            Your Appointment Booked Successful
          </div>
          <div className={styles.imgWrapper}>
            <img src="../icons/Frame.svg" />
          </div>
          <div className={styles.btnWrapper}>
            <div className={styles.btn} onClick={() => hanldeReturnhome()}>
              Back To Home
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.text1}>
              This site is protected by reCAPTCHA.{" "}
              <span>Google's Privacy Policy</span> and
              <span>Terms of Service</span> apply .
            </div>
            <div className={styles.text2}>
              doctoralia.es © 2023- Find your specialist and make an appointment
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessComp;
