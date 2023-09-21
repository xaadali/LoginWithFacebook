import React, { useState } from "react";
import { logoutUser } from "@component/services/UserSignup";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RotatingLines } from "react-loader-spinner";
import { resetUserState } from "@component/store/reducers/userReducer";
import styles from "./logout.module.scss";
import Modal from "@component/Components/__common/modal";
import { LanguagesEnum } from "@component/utills/languages";

const LogoutModal = ({ onClose, popupvisible }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useRouter();
  const handleLogOut = async () => {
    try {
      setLoading(true);
      const response = await logoutUser();
      if (response) {
        await signOut({
          callbackUrl: "/login",
        });
        dispatch(resetUserState());
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal visible={popupvisible}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <p>Are you sure you want to delete your account?</p>
            <div className={styles.footer}>
              <div className={styles.btnWrapper}>
                <div className={styles.backBtn} onClick={onClose}>
                  Cancel
                </div>
                <div className={styles.btn2} onClick={() => handleLogOut()}>
                  Confirm
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;
