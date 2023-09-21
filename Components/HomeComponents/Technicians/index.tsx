/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from "react";
import styles from "./technicians.module.scss";
import { BsDot } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Technicians = () => {
  const { t } = useTranslation();
  const data = [
    {
      id: 0,
      brand: t("homePage.meetOur.cardData.cardOne.heading"),
      name: t("homePage.meetOur.cardData.cardOne.subHeading"),
      logo: "./icons/audi.svg",
    },
    {
      id: 1,
      brand: t("homePage.meetOur.cardData.cardTwo.heading"),
      name: t("homePage.meetOur.cardData.cardTwo.subHeading"),
      logo: "./icons/bmw.svg",
    },
    {
      id: 2,
      brand: t("homePage.meetOur.cardData.cardThree.heading"),
      name: t("homePage.meetOur.cardData.cardThree.subHeading"),
      logo: "./icons/chevrolet.svg",
    },
    {
      id: 3,
      brand: t("homePage.meetOur.cardData.cardFour.heading"),
      name: t("homePage.meetOur.cardData.cardFour.subHeading"),
      logo: "./icons/ford.svg",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <label>
          {t("homePage.meetOur.headingData.heading")}{" "}
          <span>{t("homePage.meetOur.headingData.subHeading")}</span>
        </label>
        <div className={styles.cardWrapper}>
          {data.map((item) => (
            <div className={styles.card} key={item?.id}>
              <div className={styles.logo}>
                <img src={item?.logo} alt="logo" />
              </div>
              <div className={styles.brand}>{item?.brand}</div>
              <div className={styles.seprator}></div>
              <div className={styles.name}>{item?.name}</div>

              {/* <div className={styles.ratingWrapper}>
                <BsDot className={styles.icon} />
                <BsDot className={styles.icon} />
                <BsDot className={styles.icon} />
                <BsDot className={styles.icon} />
                <BsDot className={styles.icon} />
              </div> */}

              <div className={styles.ratingBox}>
                <div className={styles.stars}>
                  <div className={styles.ratingBox} />
                  <div className={styles.ratingBox} />
                  <div className={styles.ratingBox} />
                  <div className={styles.ratingBox} />
                  <div className={styles.ratingBox} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technicians;
