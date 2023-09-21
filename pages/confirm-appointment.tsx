import BookAppointmentComp from "@component/Components/AskMechanicComponents/AppointmentBooking";
import ConfirmAppointmentComp from "@component/Components/AskMechanicComponents/ConfirmAppointment";
import React from "react";
import styles from "../styles/confirm.module.scss";
import { requireAuthentication } from "@component/Components/__common/HOC";

const ConfirmAppointment = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <ConfirmAppointmentComp />
        </div>
      </div>
    </>
  );
};

export default ConfirmAppointment;
