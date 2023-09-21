/* eslint-disable react/jsx-key */
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./repairServices.module.scss";
const RepairService = () => {
  const { t } = useTranslation();
  const repairServiceone = [
    {
      id: 1,
      icon: "/icons/car.svg",
      name: t("homePage.repairServices.cardData.cardOne.1"),
    },
    {
      id: 2,
      icon: "/icons/oil.svg",
      name: t("homePage.repairServices.cardData.cardOne.2"),
    },
    {
      id: 3,
      icon: "/icons/brake.svg",
      name: t("homePage.repairServices.cardData.cardOne.3"),
    },
    {
      id: 4,
      icon: "/icons/timing.svg",
      name: t("homePage.repairServices.cardData.cardOne.4"),
    },
    {
      id: 5,
      icon: "/icons/purchase.svg",
      name: t("homePage.repairServices.cardData.cardOne.5"),
    },
    {
      id: 6,
      icon: "/icons/battery.svg",
      name: t("homePage.repairServices.cardData.cardOne.6"),
    },
  ];
  const repairServicetwo = [
    {
      id: 1,
      icon: "/icons/starter.svg",
      name: t("homePage.repairServices.cardData.cardTwo.1"),
    },
    {
      id: 2,
      icon: "/icons/alter.svg",
      name: t("homePage.repairServices.cardData.cardTwo.2"),
    },
    {
      id: 3,
      icon: "/icons/timing.svg",
      name: t("homePage.repairServices.cardData.cardTwo.3"),
    },
    {
      id: 4,
      icon: "/icons/spark.svg",
      name: t("homePage.repairServices.cardData.cardTwo.4"),
    },
    {
      id: 5,
      icon: "/icons/pump.svg",
      name: t("homePage.repairServices.cardData.cardTwo.5"),
    },
    {
      id: 6,
      icon: "/icons/fuel.svg",
      name: t("homePage.repairServices.cardData.cardTwo.6"),
    },
  ];

  const repairServicethree = [
    {
      id: 1,
      icon: "/icons/radiator.svg",
      name: t("homePage.repairServices.cardData.cardThree.1"),
    },
    {
      id: 2,
      icon: "/icons/timing.svg",
      name: t("homePage.repairServices.cardData.cardThree.2"),
    },
    {
      id: 3,
      icon: "/icons/timing.svg",
      name: t("homePage.repairServices.cardData.cardThree.3"),
    },
    {
      id: 4,
      icon: "/icons/timing.svg",
      name: t("homePage.repairServices.cardData.cardThree.4"),
    },
    {
      id: 5,
      icon: "/icons/timing.svg",
      name: t("homePage.repairServices.cardData.cardThree.5"),
    },
    {
      id: 6,
      icon: "/icons/timing.svg",
      name: t("homePage.repairServices.cardData.cardThree.6"),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <label>
          {t("homePage.repairServices.headingText.heading")} <br />
          <span>{t("homePage.repairServices.headingText.subHeading")}</span>
        </label>
        <div className={styles.cardWrapper}>
          {[...Array(3)].map((item, index) => (
            <div className={styles.card}>
              {index === 0
                ? repairServiceone.map((element) => (
                    <div className={styles.textWrapper}>
                      <div className={styles.imgWrapper}>
                        <img src={element?.icon} alt="no-icon" />
                      </div>
                      {element?.name}
                    </div>
                  ))
                : index === 1
                ? repairServicetwo.map((element) => (
                    <div className={styles.textWrapper}>
                      <div className={styles.imgWrapper}>
                        {" "}
                        <img src={element?.icon} alt="no-icon" />
                      </div>
                      {element?.name}
                    </div>
                  ))
                : index === 2
                ? repairServicethree.map((element) => (
                    <div className={styles.textWrapper}>
                      <div className={styles.imgWrapper}>
                        {" "}
                        <img src={element?.icon} alt="no-icon" />
                      </div>
                      {element?.name}
                    </div>
                  ))
                : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepairService;
