import {
  getCompanyAnswer,
  getUserAnswers,
  getUserQuestions,
} from "@component/services/CompanySignup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import QuestionSlider from "./questionsSlider";
import styles from "./solvedQuestions.module.scss";
import { useSelector } from "react-redux";

const SolvedQuestionsComp = () => {
  const { user } = useSelector((state: any) => state?.user);
  const [data, setData] = useState<any>([]);

  const fetchAllQuestionsData = async () => {
    try {
      const res = await getUserQuestions();
      setData(res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllQuestionsData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {data?.length === 0 ? null : (
          <>
            <div className={styles.heading}>Last 4 Questions Solved</div>
            {/* <div className={styles.devider}></div> */}
            <div className={styles.questionsWrapper}>
              <QuestionSlider data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SolvedQuestionsComp;
