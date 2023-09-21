import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./delete.module.scss";
import useCar from "../useCar";

const DeleteCarPopup = ({ onClose, specficCarId }) => {
  const { handleDelete, Deleteloading } = useCar(onClose);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p>Are you sure you want to delete car?</p>
          <div className={styles.footer}>
            <div className={styles.btnWrapper}>
              <div className={styles.backBtn} onClick={() => onClose(false)}>
                Cancel
              </div>
              <div
                className={styles.btn2}
                onClick={() => handleDelete(specficCarId)}
              >
                {Deleteloading ? (
                  <RotatingLines
                    strokeColor="#1B2734"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="22"
                    visible={true}
                  />
                ) : (
                  "Confirm"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCarPopup;
