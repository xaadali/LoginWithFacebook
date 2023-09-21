/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./professional.module.scss";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
const Professional = () => {
  const location = useRouter();
  const { t, i18n } = useTranslation();
  const navigateToPricingPLans = () => {
    location.push("/pricing-plans");
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <img src={"/backgrounds/test.png"} alt="" />
        </div>
        <div className={styles.rightWrapper}>
          <label>{t("homePage.areYouProfessional.heading")}</label>
          <p>{t("homePage.areYouProfessional.pera")}</p>
          <div className={styles.btnWrapper}>
            {/* <button>
              I want to know more <BsArrowRight className={styles.icon} />
            </button> */}
            <button onClick={() => navigateToPricingPLans()}>
              {t("homePage.areYouProfessional.buttonText")}{" "}
              <BsArrowRight className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professional;
