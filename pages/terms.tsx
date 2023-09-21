import React from "react";
import styles from "../styles/terms.module.scss";
import TermsComponent from "@component/Components/TermsComponent/Terms";

const Terms = () => {
  return (
    <>
      <div className={styles.container}>
        <TermsComponent />
      </div>
    </>
  );
};

export default Terms;
