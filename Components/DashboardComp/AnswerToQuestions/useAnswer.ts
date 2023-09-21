/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  getQuestions,
  postAnswer,
} from "@component/services/QuestionAndAnswers";
import { saveQuestionsData } from "@component/store/reducers/questionReducer";
import modifyError from "@component/helper";
import { PlanTypeEnum } from "@component/utills/enum";
const UseAnswer = () => {
  const dispatch = useDispatch();
  const location = useRouter();
  const [loading, setLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [findIndex, setFindIndex] = useState<any>(null);
  const [planInfo, setPlanInfo] = useState<boolean>(false);
  const { questionDetails } = useSelector((state: any) => state.question);
  const { user, planTitle, expireTimeDuration } = useSelector(
    (state: any) => state.user
  );
  const { currentPlanInfo } = useSelector((state: any) => state.plan);
  const { showBanner } = useSelector((state: any) => state.compCalendar);
  const handleGetQuestion = async () => {
    try {
      setLoading(true);
      const response = await getQuestions();
      dispatch(saveQuestionsData(response?.data));
      setLoading(false);
    } catch (error) {
      modifyError(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      answer: "",
      questionId: "",
    },
    validationSchema: yup.object({
      answer: yup.string().required("Answer is required"),
    }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const params = {
        companyId: user?.data?.user?.id,
        questionId: values.questionId,
        answer: values?.answer,
      };
      setAnswerLoading(true);
      const response = await postAnswer(params);
      toast.success(response?.data?.message);
      setAnswerLoading(false);
    } catch (error) {
      modifyError(error);
      setAnswerLoading(false);
    }
  };

  const handleFindIndex = (index: number | string) => {
    setFindIndex(index);
  };
  useEffect(() => {
    if (
      planTitle === PlanTypeEnum.StarterPlan ||
      planTitle === PlanTypeEnum.ProfessionalPlan
    ) {
      setPlanInfo(true);
    } else {
      handleGetQuestion();
    }
  }, []);

  return {
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
  };
};

export default UseAnswer;
