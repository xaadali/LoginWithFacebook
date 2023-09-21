import React from "react";
import styles from "./contactUs.module.scss";
import UseContactUs from "./useContactUS";
import { RotatingLines } from "react-loader-spinner";

const ContactUsComp = () => {
  const { formik, loading, setTerms, terms } = UseContactUs();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>Contact Us </div>
          <form className={styles.contactForm} onSubmit={formik.handleSubmit}>
            <div className={styles.formContent}>
              <div className={styles.heading}>Contact Us </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Enter Your Email</label>
                <div className={styles.inputStyle}>
                  <input
                    placeholder="Enter your Email"
                    type="text"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles.errorStyle}>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Write here</label>
                <div className={styles.textAreaStyle}>
                  <textarea
                    rows={13}
                    style={{ height: "auto", resize: "none" }}
                    placeholder="Write here"
                    {...formik.getFieldProps("des")}
                  />
                </div>
                {formik.touched.des && formik.errors.des ? (
                  <div className={styles.errorStyle}>{formik.errors.des}</div>
                ) : null}
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.checkboxStyle}>
                  <input
                    {...formik.getFieldProps("terms")}
                    className={styles.checkbox}
                    type="checkbox"
                  />
                  <label>
                    I agree to the car marketplace{" "}
                    <a href="/terms" target="_blank">
                      <span>terms & conditions.</span>
                    </a>
                  </label>
                </div>
                {formik.touched.terms && formik.errors.terms ? (
                  <div className={styles.errorStyle}>{formik.errors.terms}</div>
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

export default ContactUsComp;
