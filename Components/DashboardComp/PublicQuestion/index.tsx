import { useRouter } from "next/router";
import styles from "./question.module.scss";

const QuestionComp = () => {
  const location = useRouter();
  const handleAskmechanic = () => {
    location.push("/ask-mechanics");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1>My Questions</h1>
            <p>
              You will be able to solve, anonymously, all your doubts regarding
              Car.
            </p>
          </div>
          <div className={styles.card}>
            <img src="../icons/QA.svg" />
            <div
              className={styles.sendButton}
              onClick={() => handleAskmechanic()}
            >
              Ask to the Mechanic
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionComp;
