import React from "react";
import styles from "./nodata.module.scss";

const NoDataFound = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img src="/icons/nodata.svg" alt="no-image" />
          <h2>No Data Found</h2>
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
