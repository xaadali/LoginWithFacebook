import ChangePasswordComp from "@component/Components/AuthComp/changePassword";
import React from "react";
import styles from "../styles/login.module.scss";
import { requireAuthentication } from "@component/Components/__common/HOC";

const ChangePassword = () => {
  return (
    <>
      <div className={styles.container}>
        <ChangePasswordComp />
      </div>
    </>
  );
};

export default ChangePassword;

