import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./changeEmail.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import UseChangePassword from "./";
import UseChangeEmail from "./useChangeEmail";

const ChangeEmailComp = () => {
  const { formik, showPass, setShowPass, handleBackscreen, loading } =
    UseChangeEmail();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <label>Change email</label>
            <div className={styles.content}>
              Write the new email and confirm with your current password
            </div>
          </div>

          <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <div className={styles.formContent}>
              <div className={styles.backArrow} onClick={handleBackscreen}>
                <FaArrowLeft />
              </div>
              <div className={styles.heading}>
                <label>Change email</label>
                <div className={styles.content}>
                  Write the new email and confirm with your current password
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <label>New Email</label>
                <div className={styles.inputStyle}>
                  <input
                    placeholder="New Email"
                    type="text"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles.errorStyle}>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className={styles.inputWrapper}>
                <label>Password</label>
                <div className={styles.inputStyle}>
                  <input
                    placeholder="Password"
                    type={showPass ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                  />
                  {!showPass ? (
                    // <BsEyeSlashFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShowPass(!showPass)}
                    // />
                    <img
                      src="/icons/closeEye.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShowPass(!showPass)}
                    />
                  ) : (
                    // <BsEyeFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShowPass(!showPass)}
                    // />
                    <img
                      src="/icons/showPass.svg"
                      alt="seprator"
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
              <div className={styles.btnWrapper}>
                <button type="submit">
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
                    "Keep"
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

export default ChangeEmailComp;
