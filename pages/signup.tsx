import SignupComp from "@component/Components/AuthComp/Signup";
import React from "react";
import styles from "../styles/login.module.scss";


const Signup = () => {
  return (
    <>
      <div className={styles.container}>
        <SignupComp />
      </div>
    </>
  );
};

export default Signup;

