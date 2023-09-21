/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "./signup.module.scss";
import { RotatingLines } from "react-loader-spinner";
import useSignUp from "./useSignup";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import UseLogin from "../Login/useLogin";
const SignupComp = () => {
  const {
    showPass,
    setShowPass,
    formik,
    setShowRepPass,
    showRepPass,
    loading,
    navigateToLogin,
    isCorrectEmail,
  } = useSignUp();
  const { handleSocialLogin } = UseLogin();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.imgWrapper}>
            <img src="/backgrounds/login.svg" alt="login" />
          </div>
          <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <div className={styles.formContent}>
              <div className={styles.heading}>Create account</div>
              <div className={styles.socialBtnWrapper}>
                <div
                  className={styles.btnGoogle}
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <div className={styles.googleContent}>
                    <div className={styles.logo}>
                      <img src="./icons/facebook.svg" alt="" />
                    </div>
                    <p>Continue with Facebook</p>
                  </div>
                </div>
                <div
                  className={styles.btnGoogle}
                  onClick={() => handleSocialLogin("google")}
                >
                  <div className={styles.googleContent}>
                    <div className={styles.logo}>
                      <img src="./icons/google.svg" alt="" />
                    </div>
                    <p>Continue with Google</p>
                  </div>
                </div>
              </div>
              <div className={styles.separator}>
                <img src="/icons/saperator.svg" alt="seprator" />
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.inputStyle}>
                  <input
                    placeholder="Email"
                    type="text"
                    {...formik.getFieldProps("email")}
                  />
                  {isCorrectEmail === true ? (
                    <GiCheckMark className={styles.pIcon} />
                  ) : isCorrectEmail === false ? (
                    <RxCross1 className={styles.pIcon} />
                  ) : null}
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles.errorStyle}>
                    {formik?.errors?.email}
                  </div>
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
              <div className={styles.inputWrapper}>
                <div className={styles.inputStyle}>
                  <input
                    placeholder="Repeat Password"
                    type={showRepPass ? "text" : "password"}
                    {...formik.getFieldProps("passwordConfirmation")}
                  />
                  {!showRepPass ? (
                    // <BsEyeSlashFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShowRepPass(!showRepPass)}
                    // />
                    <img
                      src="/icons/closeEye.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShowRepPass(!showRepPass)}
                    />
                  ) : (
                    // <BsEyeFill
                    //   className={styles.pIcon}
                    //   onClick={() => setShowRepPass(!showRepPass)}
                    // />
                    <img
                      src="/icons/showPass.svg"
                      alt="seprator"
                      className={styles.pIcon}
                      onClick={() => setShowRepPass(!showRepPass)}
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
                    "Sign Up"
                  )}
                </button>
              </div>
              <div className={styles.btnWrapper}>
                <Link href="/professionals">
                  <button>Are you a professional?</button>
                </Link>
              </div>

              <div className={styles.devider}></div>
              <div className={styles.footerContent}>
                <div className={styles.grayText}>Log in to Car Marketplace</div>
                <span onClick={() => navigateToLogin()}>
                  Access Your Account
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupComp;
