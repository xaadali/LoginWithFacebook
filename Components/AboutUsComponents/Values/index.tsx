/* eslint-disable @next/next/no-img-element */
import styles from "./values.module.scss";

const ValuesComp = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Our Values</div>
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.sectionOne}>
              <div className={styles.heading}>An Elusive Taco</div>
              <div className={styles.text}>
                The birth of Thirst & Growl (TnG) was out of necessity for the
                love of tacos al pastor tacos to be precise.
                <br />
                After finding out for the third time in a row that his
                neighborhoods favorite taco stand hadnt setup for the night, our
                co-founder, Mosses, needed a way to be notified when the local
                street food vendor (shall we call them mobile restaurateur) was
                going to be around.
              </div>
              <div className={styles.label}>
                Hence the birth of Thirst & Growl.
              </div>
            </div>
            <div className={styles.sectionTwo}>
              <img src="/backgrounds/values.svg" alt="img" />
              <div className={styles.heading}>A Postulation</div>
              <div className={styles.text}>
                The premise was simple. Foodies who are passionate about street
                food vendors, and cooks who are enamored about sharing their
                specialties and latest creations in different neighborhoods– now
                they can do so with a simple app.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValuesComp;
