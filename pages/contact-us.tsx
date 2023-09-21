import React from "react";
import styles from "../styles/contactus.module.scss";
import ContactUsComp from "@component/Components/ContactUs";
import { requireAuthentication } from "@component/Components/__common/HOC";

const ContactUs = () => {
  return (
    <>
      <div className={styles.container}>
        <ContactUsComp />
      </div>
    </>
  );
};

export default ContactUs;
