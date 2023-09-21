/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./serviceModal.module.scss";

const ServiceModals = () => {
  const { t, i18n } = useTranslation();
  const ModalsData = [
    {
      id: 1,
      name: t("homePage.services.cars.1"),
      icon: "./modals/bmw.svg",
    },
    {
      id: 2,
      name: t("homePage.services.cars.2"),
      icon: "./modals/toyota.svg",
    },
    {
      id: 3,
      name: t("homePage.services.cars.3"),
      icon: "./modals/honda.svg",
    },
    {
      id: 4,
      name: t("homePage.services.cars.4"),
      icon: "./modals/ford.svg",
    },
    {
      id: 5,
      name: t("homePage.services.cars.5"),
      icon: "./modals/chevrolet.svg",
    },
    {
      id: 6,
      name: t("homePage.services.cars.6"),
      icon: "./modals/nissan.svg",
    },
    {
      id: 7,
      name: t("homePage.services.cars.7"),
      icon: "./modals/dodge.svg",
    },
    {
      id: 8,
      name: t("homePage.services.cars.8"),
      icon: "./modals/volkswagen.svg",
    },
    {
      id: 9,
      name: t("homePage.services.cars.9"),
      icon: "./modals/mercedes.svg",
    },
    {
      id: 10,
      name: t("homePage.services.cars.10"),
      icon: "./modals/jeep.svg",
    },
    {
      id: 11,
      name: t("homePage.services.cars.11"),
      icon: "./modals/acura.svg",
    },
    {
      id: 12,
      name: t("homePage.services.cars.12"),
      icon: "./modals/hyundai.svg",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <label>
            {t("homePage.services.headingText.heading")} <br />
            <span> {t("homePage.services.headingText.subHeading")}</span>
          </label>
          <div className={styles.cardWrapper}>
            {ModalsData.map((item) => {
              return (
                <>
                  <div className={styles.card} key={item?.id}>
                    <div className={styles.headerImg}>
                      <img src={item?.icon} className={styles.icon} alt="" />
                    </div>
                    <div className={styles.btn}>{item?.name}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceModals;
