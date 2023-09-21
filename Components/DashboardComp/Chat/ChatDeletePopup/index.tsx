import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./chatdelete.module.scss";
import UseChat from "../useChat";

const DeleteChatPopup = ({ onClose, specficCarId, handleDeleteChatRoom }) => {
  const [loading, setLaoding] = useState<boolean>(false);

  const handleClickDeleteBtn = () => {
    setLaoding(true);
    handleDeleteChatRoom(specficCarId);
    setLaoding(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p>Are you sure? You want to delete this chat?</p>
          <div className={styles.footer}>
            <div className={styles.btnWrapper}>
              <div className={styles.backBtn} onClick={() => onClose(false)}>
                Cancel
              </div>
              <div className={styles.btn2} onClick={handleClickDeleteBtn}>
                {loading ? (
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

export default DeleteChatPopup;
