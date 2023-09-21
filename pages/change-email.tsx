import ChangeEmailComp from "@component/Components/AuthComp/changeEmail";
import React from "react";
import styles from "../styles/login.module.scss";
import { requireAuthentication } from "@component/Components/__common/HOC";

const ChangePassword = () => {
  return (
    <>
      <div className={styles.container}>
        <ChangeEmailComp />
      </div>
    </>
  );
};

export default ChangePassword;

