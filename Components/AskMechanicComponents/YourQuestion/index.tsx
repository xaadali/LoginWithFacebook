import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import * as yup from "yup";
import styles from "./yourQuestion.module.scss";
import { useSelector } from "react-redux";
import { postQuestion } from "@component/services/Question";

const YourQuestionComp = () => {
  const { user } = useSelector((state: any) => state?.user);
  let userid = user?.data?.user?.id;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      question: "",
    },
    validationSchema: yup.object({
      question: yup.string().required("Enter Your Question"),
    }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    if (!user) {
      toast.error("Only logged in users can ask questions.");
      return;
    }
    try {
      setLoading(true);
      let params = {
        question: values?.question,
        userId: userid,
      };
      const res = await postQuestion(params);
      toast.success(res?.data?.message);
      formik.resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.Heading}></div>
          <form className={styles.questionForm} onSubmit={formik.handleSubmit}>
            <div className={styles.inputWrapper}>
              <label>Your Question</label>
              <div className={styles.inputStyle}>
                <textarea
                  placeholder="Write Your Question here..."
                  {...formik.getFieldProps("question")}
                />
              </div>
              {formik.touched.question && formik.errors.question ? (
                <div className={styles.errorStyle}>
                  {formik.errors.question}
                </div>
              ) : null}
            </div>
            <div className={styles.btnWrapper}>
              <button type="submit">
                {loading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="18"
                    visible={true}
                  />
                ) : (
                  "Send Question"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default YourQuestionComp;
