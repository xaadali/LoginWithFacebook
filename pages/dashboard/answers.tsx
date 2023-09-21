import AnswerQuestionComp from "@component/Components/DashboardComp/AnswerToQuestions";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";

const AnswerQuestion = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AnswerQuestionComp />
      </div>
    </div>
  );
};
AnswerQuestion.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default AnswerQuestion;
