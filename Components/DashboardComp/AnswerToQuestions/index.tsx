import styles from "./answerQuestions.module.scss";
import { RotatingLines } from "react-loader-spinner";
import UseAnswer from "./useAnswer";
import { EmptyCompo, PlanCompo } from "@component/Components/__common/Empty";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import Banner from "@component/Components/__common/Banner";

const AnswerQuestionComp = () => {
  const {
    formik,
    loading,
    questionDetails,
    answerLoading,
    handleFindIndex,
    findIndex,
    planInfo,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  } = UseAnswer();
  console.log(
    "🚀 ~ file: index.tsx:21 ~ AnswerQuestionComp ~ questionDetails:",
    questionDetails
  );

  return (
    <>
      <div className={styles.container}>
        <h1>Answer to Questions</h1>
        <div style={{ width: "98%" }}>
          {showBanner && expireTimeDuration ? (
            <Banner currentPlanInfo={currentPlanInfo} />
          ) : null}
        </div>
        <div className={styles.wrapper}>
          {planInfo ? (
            <PlanCompo />
          ) : loading ? (
            <CompLoader />
          ) : !Boolean(questionDetails?.length) ? (
            <EmptyCompo />
          ) : (
            <div className={styles.QuestionBox}>
              <div className={styles.cardWrapper}>
                {questionDetails?.map((item, index) => (
                  <>
                    <div className={styles.card} key={index}>
                      <div className={styles.questinWrapper}>
                        <div className={styles.question}>Question</div>
                        <div className={styles.text}>
                          <div className={styles.border} />
                          {item?.question ? item?.question : ""}
                        </div>
                      </div>
                      <div className={styles.answerWrapper}>
                        <div className={styles.question}>Latest Answer</div>
                        <div className={styles.text}>
                          {item?.question && item?.latestAnswer?.answer
                            ? item?.latestAnswer?.answer
                            : "No latest answer"}
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                          <div className={styles.inputWrapper}>
                            <div className={styles.inputStyle}>
                              <input
                                placeholder="Write your Answer here"
                                type="text"
                                // value={item?.latestAnswer?.answer}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "answer",
                                    e.target.value
                                  );
                                }}
                                onClick={() => {
                                  handleFindIndex(index),
                                    formik.setFieldValue(
                                      "questionId",
                                      item?._id
                                    );
                                }}
                              />
                            </div>

                            {formik.touched.answer && formik.errors.answer ? (
                              <div className={styles.errorStyle}>
                                {formik.errors.answer}
                              </div>
                            ) : null}
                          </div>
                          <div className={styles.btnWrapper}>
                            <button type="submit">
                              {findIndex === index && answerLoading ? (
                                <RotatingLines
                                  strokeColor="white"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="22"
                                  visible={true}
                                />
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnswerQuestionComp;
