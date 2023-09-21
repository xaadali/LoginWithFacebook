/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./login.module.scss";
import { RotatingLines } from "react-loader-spinner";
import UseLogin from "./useLogin";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import PinInputExamples from "@component/Components/__common/pinCode/pinCode";
import ResetPasswordComponent from "./ResetPassword";

const LoginComp = () => {
  const {
    formik,
    loading,
    navigateToSignUp,
    handleSocialLogin,
    handleSubmitEmail,
    setResendEmailInfo,
    resendLoading,
    active,
    setActive,
    showPass,
    setShowPass,
    setActivePassword,
    activePassword,
    navigateToLogin,
    activeOPT,
    handleSubmitOTP,
    recieveOTP,
    resetToggle,
    setActiveOPT,
    setResettoggle,
  } = UseLogin();

  return (
    <>
      {resetToggle ? (
        <>
          <ResetPasswordComponent
            setActive={setActive}
            setActivePassword={setActivePassword}
            setActiveOPT={setActiveOPT}
            setResettoggle={setResettoggle}
          />
        </>
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.imgWrapper}>
                <img src="/backgrounds/login.svg" alt="login" />
              </div>
              <div className={styles.loginForm}>
                <div className={styles.formContent}>
                  <div className={styles.heading}>Login into your account</div>

                  {/* sso */}

                  <div className={styles.socialBtnWrapper}>
                    <div
                      className={styles.btnGoogle}
                      onClick={() => handleSocialLogin("facebook")}
                    >
                      <div className={styles.googleContent}>
                        <div className={styles.logo}>
                          <img
                            src="./icons/facebook.svg"
                            alt="no-icon"
                            width={100}
                            height={100}
                          />
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
                          <img
                            src="./icons/google.svg"
                            alt="no-icon"
                            width={100}
                            height={100}
                          />
                        </div>
                        <p>Continue with Google</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.separator}>
                    <img src="/icons/saperator.svg" alt="seprator" />
                  </div>

                  {/* traditional login */}
                  {activePassword === false && activeOPT === false ? (
                    <form
                      className={styles.loginFormInput}
                      onSubmit={formik.handleSubmit}
                    >
                      <div className={styles.inputWrapper}>
                        <div className={styles.inputStyle}>
                          <input
                            placeholder="Email"
                            type="email"
                            {...formik.getFieldProps("email")}
                          />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                          <div className={styles.errorStyle}>
                            {formik.errors.email}
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
                      {/* <div className={styles.forgot}>
                    <label
                      onClick={() => {
                        setActive(true), setActivePassword(false);
                      }}
                    >
                      Resend Email
                    </label>
                  </div> */}
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
                            "Log in"
                          )}
                        </button>
                      </div>
                    </form>
                  ) : activePassword === true && activeOPT === false ? (
                    <div className={styles.loginFormInput}>
                      <div className={styles.heading}>Forgot Password?</div>
                      <div className={styles.inputWrapper}>
                        <div className={styles.inputStyle}>
                          <input
                            autoFocus
                            placeholder="Enter your email"
                            type="text"
                            onChange={(e) => setResendEmailInfo(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.btnWrapper}>
                        <button onClick={() => handleSubmitEmail()}>
                          {resendLoading ? (
                            <RotatingLines
                              strokeColor="white"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="22"
                              visible={true}
                            />
                          ) : (
                            <>Reset Password</>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : null}
                  {activePassword === true ? null : (
                    <>
                      <div className={styles.forgot}>
                        <label
                          onClick={() => {
                            setActivePassword(true), setActive(false);
                          }}
                        >
                          I forgot my password
                        </label>
                      </div>
                    </>
                  )}
                  {activeOPT === true ? (
                    <>
                      <div className={styles.loginFormInput}>
                        <div className={styles.heading}>
                          Enter The 6 Digit Code
                        </div>
                        <PinInputExamples from="settings" submit={recieveOTP} />
                        <div className={styles.btnWrapper}>
                          <button onClick={() => handleSubmitOTP()}>
                            {resendLoading ? (
                              <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="22"
                                visible={true}
                              />
                            ) : (
                              <>Confirm</>
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className={styles.devider}></div>
                  <div className={styles.footerContent}>
                    {active === false && activePassword === false ? (
                      <>
                        <div className={styles.text}>Still no account? </div>
                        <span onClick={() => navigateToSignUp()}>
                          I want to register
                        </span>
                      </>
                    ) : (
                      <>
                        <span onClick={() => navigateToLogin()}>
                          Back to Login
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginComp;
