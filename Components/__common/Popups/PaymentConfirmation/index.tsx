/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Modal from "../../modal";
import { useRouter } from "next/router";
import styles from "./logout.module.scss";
import { useSelector } from "react-redux";
import { PlanTypeEnum } from "@component/utills/enum";

const PaymentConfirmation = ({ setpopupvisible, popupvisible }) => {
  const { SelectedPlan } = useSelector((state: any) => state.plan);

  return (
    <>
      <Modal visible={popupvisible} onClose={setpopupvisible}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.congrats}>
              <img src="/backgrounds/congrats.svg" alt="" />
            </div>
            <div className={styles.heading}>Congratulations</div>
            <div className={styles.description}>
              {SelectedPlan?.title} has been purchased successfully.
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PaymentConfirmation;
