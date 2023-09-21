/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styles from "./splashscreen.module.css";
export default function Splash({ setSplash }) {
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 1000);
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            {/* <img src={"/icons/logo.svg"} alt="" style={{ cursor: "pointer" }} /> */}
            <img
              src={"/icons/darkLogo.png"}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
