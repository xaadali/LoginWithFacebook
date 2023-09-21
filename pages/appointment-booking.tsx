import BookAppointmentComp from "@component/Components/AskMechanicComponents/AppointmentBooking";
import React from "react";
import styles from "../styles/askMechanic.module.scss";
import { requireAuthentication } from "@component/Components/__common/HOC";

const BookAppointment = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <BookAppointmentComp />
        </div>
      </div>
    </>
  );
};

export default BookAppointment;

