import AskMechanicComp from "@component/Components/AskMechanicComponents/AskMechanic";
import SolvedQuestionsComp from "@component/Components/AskMechanicComponents/SolvedQuestions";
import YourQuestionComp from "@component/Components/AskMechanicComponents/YourQuestion";
import styles from "../styles/askMechanic.module.scss";
import { requireAuthentication } from "@component/Components/__common/HOC";
import SolvedQuestionsDetail from "@component/Components/AskMechanicComponents/QuestionDetail";

const AskMechanicDetail = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <AskMechanicComp />
          <YourQuestionComp />
          <SolvedQuestionsDetail />
        </div>
      </div>
    </>
  );
};

export default AskMechanicDetail;
