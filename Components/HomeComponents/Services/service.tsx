import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./services.module.scss";

const Service = () => {
  const { t } = useTranslation();
  const data = [
    {
      id: 1,
      heading: t("homePage.headerBottomHeading.left.heading"),
      para: t("homePage.headerBottomHeading.left.pera"),
    },
    {
      id: 2,
      heading: t("homePage.headerBottomHeading.center.heading"),
      para: t("homePage.headerBottomHeading.center.pera"),
    },
    {
      id: 3,
      heading: t("homePage.headerBottomHeading.right.heading"),
      para: t("homePage.headerBottomHeading.right.pera"),
    },
  ];

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.wrapper}>
          <div className={styles.cardWrapper}>
            {data?.map((item) => {
              const { id, heading, para } = item;
              return (
                <>
                  <div className={styles.column} key={id}>
                    <div className={styles.hoverContainer}>
                      <div className={styles.heading}>{heading}</div>
                      <div className={styles.hiddenContent}>{para}</div>
                    </div>
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

export default Service;
