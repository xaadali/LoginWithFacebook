/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./map.module.scss";

const MapModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/backgrounds/mapbG.png" />
      </div>
    </div>
  );
};

export default MapModal;
