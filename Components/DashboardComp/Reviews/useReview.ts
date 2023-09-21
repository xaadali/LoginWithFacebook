/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modifyError from "@component/helper";
import { getReviews } from "@component/services/Reviews";
import { saveReviewData } from "@component/store/reducers/reviewReducer";
import { PlanTypeEnum } from "@component/utills/enum";
const UseReviews = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [planInfo, setPlanInfo] = useState<boolean>(false);

  const { reviewDetails } = useSelector((state: any) => state.review);
  const { planTitle, user, expireTimeDuration } = useSelector(
    (state: any) => state?.user
  );
  const { currentPlanInfo } = useSelector((state: any) => state.plan);
  const { showBanner } = useSelector((state: any) => state.compCalendar);
  const handleGetReview = async () => {
    try {
      setLoading(true);
      const response = await getReviews(user?.data?.user?.id);
      dispatch(saveReviewData(response.data?.data));
      setLoading(false);
    } catch (error) {
      modifyError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planTitle === PlanTypeEnum.StarterPlan) {
      setPlanInfo(true);
    } else {
      handleGetReview();
    }
  }, []);

  return {
    loading,
    reviewDetails,
    planInfo,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  };
};

export default UseReviews;
