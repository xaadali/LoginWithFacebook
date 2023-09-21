/* eslint-disable @next/next/no-img-element */
import styles from "./vision.module.scss";

const VisionComp = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftWrapper}>
            <img src="/backgrounds/valuesTwo.svg" alt="img" />
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.heading}>Our Vision</div>
            <div className={styles.text}>
              Every day, we work hard to get closer to reaching our ultimate
              goal — to become the best premium design studio in the CEE region,
              with a legion of satisfied clients all around the world and a team
              full of ambitious designers who are not afraid to go the extra
              mile.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionComp;
