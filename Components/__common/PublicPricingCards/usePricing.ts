import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPlans } from "@component/services/PricePlans";
import { savePlansData } from "@component/store/reducers/planReducer";

const usePricing = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: any) => state?.user);
  const { plansDetails } = useSelector((state: any) => state?.plan);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;

  const getPricinglist = async () => {
    try {
      setLoading(true);
      const res = await getPlans();
      dispatch(savePlansData(res.data?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getPricinglist();
  }, []);

  return {
    plansDetails,
  };
};

export default usePricing;
