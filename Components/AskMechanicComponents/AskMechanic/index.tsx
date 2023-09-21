/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./askMechanicComp.module.scss";

const AskMechanicComp = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.Wrapper}>
          <div className={styles.left}>
            <div className={styles.heading}>Ask to the Mechanic</div>
            <div className={styles.paraText}>
              You will be able to solve, anonymously, all your doubts regarding
              Car.
            </div>
            <div className={styles.cardWrapper}>
              <div className={styles.Card}>
                <div className={styles.circle}>
                  <div className={styles.count}>1</div>
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>User ask</div>
                  <div className={styles.des}>
                    Ask a short question about your Car problem.
                  </div>
                </div>
              </div>
              <div className={styles.Card}>
                <div className={styles.circle}>
                  <div className={styles.count}>2</div>
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>Moderators filter</div>
                  <div className={styles.des}>
                    Questions are verified by a moderator and sent to the
                    appropriate mechanic.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardWrapper}>
              <div className={styles.Card}>
                <div className={styles.circle}>
                  <div className={styles.count}>3</div>
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>The Mechanic answer</div>
                  <div className={styles.des}>
                    Usually a question is answered by more than one specialist.
                  </div>
                </div>
              </div>
              <div className={styles.Card}>
                <div className={styles.circle}>
                  <div className={styles.count}>4</div>
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>Your doubt is solved!</div>
                  <div className={styles.des}>
                    We will inform you by email of the responses you receive.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <img src="../icons/QA.svg" alt="icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AskMechanicComp;
