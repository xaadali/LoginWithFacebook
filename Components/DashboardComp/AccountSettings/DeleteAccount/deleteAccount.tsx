import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./delete.module.scss";
import Modal from "@component/Components/__common/modal";
import useAccountSettings from "../useAccountSettings";

const DeleteAccountPopup = ({ onClose, popupvisible }) => {
  const { handleDeleteaccount, loading } = useAccountSettings();
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p>Are you sure you want to delete your account?</p>
          <div className={styles.footer}>
            <div className={styles.btnWrapper}>
              <div className={styles.backBtn} onClick={onClose}>
                Cancel
              </div>
              <div className={styles.btn2} onClick={handleDeleteaccount}>
                {" "}
                {loading ? (
                  <RotatingLines
                    strokeColor="white"
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

export default DeleteAccountPopup;
