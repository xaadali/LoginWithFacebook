import AskMechanicComp from "@component/Components/AskMechanicComponents/AskMechanic";
import SolvedQuestionsComp from "@component/Components/AskMechanicComponents/SolvedQuestions";
import YourQuestionComp from "@component/Components/AskMechanicComponents/YourQuestion";
import styles from "../styles/askMechanic.module.scss";
import { requireAuthentication } from "@component/Components/__common/HOC";

const AskMechanic = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <AskMechanicComp />
          <YourQuestionComp />
          <SolvedQuestionsComp />
        </div>
      </div>
    </>
  );
};

export default AskMechanic;
