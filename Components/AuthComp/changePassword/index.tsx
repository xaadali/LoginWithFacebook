import React from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./changePassword.module.scss";
import UseChangePassword from "./useChangePassword";

const ChangePasswordComp = () => {
  const {
    formik,
    handleBackscreen,
    loading,
    setShowoldPass,
    showOldpass,
    setShownewPass,
    showNewpass,
    setShowconfirmPass,
    showConfirmpass,
  } = UseChangePassword();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <label>Change Password</label>
          </div>
          <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <div className={styles.formContent}>
              <div className={styles.backArrow} onClick={handleBackscreen}>
                <FaArrowLeft />
              </div>
              <div className={styles.heading}>
                <label>Change Password</label>
              </div>
              <div className={styles.inputWrapper}>
                <label>Old password</label>
                <div className={styles.inputStyle}>
                  <input
                    type={showOldpass ? "text" : "password"}
                    {...formik.getFieldProps("oldPassword")}
                  />
                  {!showOldpass ? (
                    // <BsEyeSlashFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShowoldPass(!showOldpass)}
                    // />
                    <img
                      src="/icons/closeEye.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShowoldPass(!showOldpass)}
                    />
                  ) : (
                    // <BsEyeFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShowoldPass(!showOldpass)}
                    // />
                    <img
                      src="/icons/showPass.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShowoldPass(!showOldpass)}
                    />
                  )}
                </div>
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                  <div className={styles.errorStyle}>
                    {formik.errors.oldPassword}
                  </div>
                ) : null}
              </div>
              <div className={styles.inputWrapper}>
                <label>New password</label>
                <div className={styles.inputStyle}>
                  <input
                    type={showNewpass ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                  />
                  {!showNewpass ? (
                    // <BsEyeSlashFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShownewPass(!showNewpass)}
                    // />
                    <img
                      src="/icons/closeEye.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShownewPass(!showNewpass)}
                    />
                  ) : (
                    // <BsEyeFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShownewPass(!showNewpass)}
                    // />
                    <img
                      src="/icons/showPass.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShownewPass(!showNewpass)}
                    />
                  )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className={styles.errorStyle}>
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className={styles.inputWrapper}>
                <label>Confirm your new password</label>
                <div className={styles.inputStyle}>
                  <input
                    type={showConfirmpass ? "text" : "password"}
                    {...formik.getFieldProps("passwordConfirmation")}
                  />
                  {!showConfirmpass ? (
                    // <BsEyeSlashFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShowconfirmPass(!showConfirmpass)}
                    // />
                    <img
                      src="/icons/closeEye.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShowconfirmPass(!showConfirmpass)}
                    />
                  ) : (
                    // <BsEyeFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShowconfirmPass(!showConfirmpass)}
                    // />
                    <img
                      src="/icons/showPass.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShowconfirmPass(!showConfirmpass)}
                    />
                  )}
                </div>
                {formik?.touched?.passwordConfirmation &&
                formik?.errors?.passwordConfirmation ? (
                  <div className={styles.errorStyle}>
                    {formik?.errors?.passwordConfirmation}
                  </div>
                ) : null}
              </div>
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
                    "Send"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordComp;
