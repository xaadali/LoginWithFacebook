import LoginComp from "@component/Components/AuthComp/Login";
import React from "react";
import styles from "../styles/login.module.scss";


const Login = () => {
  return (
    <>
      <div className={styles.container}>
        <LoginComp />
      </div>
    </>
  );
};

export default Login;