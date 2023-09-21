import React, { useState } from "react";
import Modal from "../../modal";
import { logoutUser } from "@component/services/UserSignup";
import { signOut } from "next-auth/react";
import { resetUserState } from "@component/store/reducers/userReducer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styles from "./logout.module.scss";
import { RotatingLines } from "react-loader-spinner";
import { LanguagesEnum } from "@component/utills/languages";

const LogoutPopup = ({ setpopupvisible, popupvisible }) => {
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
      <Modal visible={popupvisible} onClose={setpopupvisible}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <p>Are you sure you want to logout?</p>
            <div className={styles.logoutSection}>
              <button onClick={() => handleLogOut()}>
                {loading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="25"
                    visible={true}
                  />
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                disabled={loading ? true : false}
                onClick={() => setpopupvisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutPopup;
