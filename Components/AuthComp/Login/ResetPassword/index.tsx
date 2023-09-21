import React from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";
import styles from "./reset.module.scss";
import UseLogin from "../useLogin";
import UseResetPassword from "./useResetPassword";

const ResetPasswordComponent = ({
  setActive,
  setActivePassword,
  setActiveOPT,
  setResettoggle,
}) => {
  const {
    formik,
    loading,
    showPass,
    setShowPass,
    showConfirmpass,
    setShowconfirmPass,
  } = UseResetPassword(
    setActive,
    setActivePassword,
    setActiveOPT,
    setResettoggle
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imgWrapper}>
          <img src="/backgrounds/resetimage.svg" alt="reset" />
        </div>
        <div className={styles.loginForm}>
          <div className={styles.formContent}>
            <div className={styles.heading}>Set New Password</div>
            <div className={styles.subHeading}>
              The new password must be different from the old password
            </div>
            <form
              className={styles.loginFormInput}
              onSubmit={formik.handleSubmit}
            >
              <div className={styles.inputWrapper}>
                <div className={styles.inputStyle}>
                  <input
                    autoFocus
                    placeholder="Email"
                    type="text"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles.errorStyle}>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.inputStyle}>
                  <input
                    placeholder="Password"
                    type={showPass ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                  />
                  {!showPass ? (
                    <BsEyeSlashFill
                      className={styles.pIcon}
                      onClick={() => setShowPass(!showPass)}
                    />
                  ) : (
                    <BsEyeFill
                      className={styles.pIcon}
                      onClick={() => setShowPass(!showPass)}
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
                <div className={styles.inputStyle}>
                  <input
                    placeholder="Re-enter Password"
                    type={showConfirmpass ? "text" : "password"}
                    {...formik.getFieldProps("passwordConfirmation")}
                  />
                  {!showConfirmpass ? (
                    <BsEyeSlashFill
                      className={styles.pIcon}
                      onClick={() => setShowconfirmPass(!showConfirmpass)}
                    />
                  ) : (
                    <BsEyeFill
                      className={styles.pIcon}
                      onClick={() => setShowconfirmPass(!showConfirmpass)}
                    />
                  )}
                </div>
                {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation ? (
                  <div className={styles.errorStyle}>
                    {formik.errors.passwordConfirmation}
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
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
