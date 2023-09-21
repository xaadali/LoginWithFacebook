import React from "react";
import moment from "moment";
import styles from "./banner.module.scss";

const Banner = ({ currentPlanInfo }) => {
  return (
    <div
      className={styles.header}
      dangerouslySetInnerHTML={{
        __html: `
      <marquee
        className=${JSON.stringify(styles.header)}
        behavior="scroll"
        direction="left"
        scrollamount="10"
      >
        <div className=${JSON.stringify(styles.leftSide)}>
          <div className=${JSON.stringify(styles.date)}>
            Your ${
              currentPlanInfo?.isTrial
                ? "Trial Offer"
                : currentPlanInfo?.planTitle
            } will end on ${
          currentPlanInfo?.renewDate === "Lifetime"
            ? currentPlanInfo?.renewDate
            : moment(currentPlanInfo?.renewDate).format("lll")
        }. After your free trial ends, you will no longer have access to all of
      our features. You can subscribe to our plan to continue using all of
      our features.
          </div>
        </div>
      </marquee>
      `,
      }}
    ></div>
  );
};

export default Banner;
