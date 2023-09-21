/* eslint-disable react-hooks/exhaustive-deps */
import modifyError from "@component/helper";
import {
  currentPlan,
  getPlans,
  postBillingMethod,
  endPackage,
} from "@component/services/PricePlans";
import {
  saveCurrentPlan,
  savePlansData,
  setSelectedplan,
} from "@component/store/reducers/planReducer";
import { resetUserState } from "@component/store/reducers/userReducer";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UsePaymentMethod = () => {
  const [activeCreditCard, setActiveCreditCard] = useState<boolean>();
  const [popupvisible, setpopupvisible] = useState(false);
  const [packageLoader, setPackageloader] = useState(false);
  const { plansDetails, currentPlanInfo } = useSelector(
    (state: any) => state.plan
  );
  const { showBanner } = useSelector((state: any) => state.compCalendar);
  const { user, expireTimeDuration } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const handleGetPlans = async () => {
    try {
      setLoading(true);
      const Response = await getPlans();
      dispatch(savePlansData(Response.data?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      modifyError(error);
    }
  };

  const handleCurrentCompanyPlan = async () => {
    try {
      const response = await currentPlan(user?.data?.user?.id);
      dispatch(saveCurrentPlan(response.data));
    } catch (error) {}
  };
  useEffect(() => {
    handleCurrentCompanyPlan();
    handleGetPlans();
  }, []);

  const handlePackage = () => {
    setpopupvisible(!popupvisible);
  };
  const handleEndpackage = async () => {
    try {
      setPackageloader(true);
      let param = {
        companyId: user?.data?.user?.id,
      };
      const res = await endPackage(param);
      if (res) {
        await signOut({
          callbackUrl: "/",
        });
        dispatch(resetUserState());
        setPackageloader(false);
        setpopupvisible(!popupvisible);
      }
    } catch (error) {
      setPackageloader(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return {
    activeCreditCard,
    setActiveCreditCard,
    loading,
    plansDetails,
    currentPlanInfo,
    showBanner,
    handlePackage,
    setpopupvisible,
    popupvisible,
    packageLoader,
    handleEndpackage,
    user,
    expireTimeDuration,
    setSelectedplan,
    dispatch,
  };
};

export default UsePaymentMethod;
