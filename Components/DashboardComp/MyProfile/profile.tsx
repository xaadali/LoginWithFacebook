import styles from "./profile.module.scss";
import { RxCross1 } from "react-icons/rx";
import { RotatingLines } from "react-loader-spinner";
import useProfileSettings from "./useProfile";
import DeleteAccountPopup from "../AccountSettings/DeleteAccount/deleteAccount";
import Modal from "@component/Components/__common/modal";
import Banner from "@component/Components/__common/Banner";

const ProfileSettingsComp = () => {
  const {
    formik,
    loading,
    handleChangePassword,
    handleChangeEmail,
    handleAccount,
    setpopupvisible,
    popupvisible,
    user,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  } = useProfileSettings();
  return (
    <>
      <div className={styles.container}>
        <div style={{ width: "90%" }}>
          {showBanner && expireTimeDuration ? (
            <Banner currentPlanInfo={currentPlanInfo} />
          ) : null}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.title}>My Profile </div>
          <div className={styles.card}>
            <div className={styles.heading}>My Profile</div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.inputWrapper}>
                <label>Name *</label>
                <div className={styles.nameBox}>
                  <div className={styles.inputStyle}>
                    <input
                      type="text"
                      {...formik.getFieldProps("name")}
                      placeholder="Nissan"
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={styles.row}>
                <label>Password*</label>
                <div
                  className={styles.passwordBox}
                  onClick={handleChangePassword}
                >
                  Change my password
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <label>Phone number *</label>
                <div className={styles.nameBox}>
                  <div className={styles.inputStyle}>
                    <input
                      type="text"
                      {...formik.getFieldProps("phone")}
                      placeholder="+31 2987 111"
                    />
                  </div>
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.row}>
                <label>Email*</label>
                <div className={styles.emailBox}>
                  {user?.data?.user?.email ? user?.data?.user?.email : ""} ({" "}
                  <span onClick={handleChangeEmail}>Change email</span>)
                </div>
              </div>
              <div className={styles.devider}></div>
              <div className={styles.footer}>
                <div className={styles.btnWrapper}>
                  <button type="submit">
                    {loading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="22"
                        visible={true}
                      />
                    ) : (
                      "Keep"
                    )}
                  </button>
                  <button className={styles.cancelBtn}>Cancel</button>
                </div>
                <div className={styles.deleteAccount}>
                  <>
                    <RxCross1 className={styles.icon} />
                    <span onClick={handleAccount}>Delete my account</span>
                  </>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal visible={popupvisible} onClose={setpopupvisible}>
        <DeleteAccountPopup
          popupvisible={popupvisible}
          onClose={handleAccount}
        />
      </Modal>
    </>
  );
};

export default ProfileSettingsComp;
