import styles from "./accountSettings.module.scss";
import { RxCross1 } from "react-icons/rx";
import useAccountSettings from "./useAccountSettings";
import { RotatingLines } from "react-loader-spinner";
import DeleteAccountPopup from "./DeleteAccount/deleteAccount";
import Modal from "@component/Components/__common/modal";

const AccountSettingsComp = () => {
  const {
    formik,
    loading,
    user,
    handleChangePassword,
    handleChangeEmail,
    handleAccount,
    setpopupvisible,
    popupvisible,
    handleCancel,
    userEmail,
  } = useAccountSettings();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Account settings</div>
          <div className={styles.card}>
            <div className={styles.heading}>Account settings</div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.inputWrapper}>
                <label>Name *</label>
                <div className={styles.nameBox}>
                  <div className={styles.inputStyle}>
                    <input type="text" {...formik.getFieldProps("name")} />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div className={styles.errorStyle}>
                      {formik?.errors?.name}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={styles.row}>
                <label>Password</label>
                <div
                  className={styles.passwordBox}
                  onClick={handleChangePassword}
                >
                  Change my password
                </div>
              </div>
              <div className={styles.row}>
                <label>Email</label>
                <div className={styles.emailBox}>
                  {userEmail}
                  <span onClick={handleChangeEmail}> (Change email)</span>
                </div>
                <span onClick={handleChangeEmail}> (Change email)</span>
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
                  <button
                    className={styles.cancelBtn}
                    onClick={handleCancel}
                    type="button"
                  >
                    Cancel
                  </button>
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

export default AccountSettingsComp;
