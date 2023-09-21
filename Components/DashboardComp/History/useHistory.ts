import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import { addReview, historyDetaillist } from "@component/services/History";

const UseHistory = (toggleState?, singleData?: any) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const { user } = useSelector((state: any) => state?.user);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewloading] = useState(false);
  const [rating, setRating] = useState();
  const [apiData, setApiData]: any[] = useState();
  const [specficData, setSpecficdata] = useState({});
  const [popupvisible, setpopupvisible] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    // validationSchema: yup.object({
    //   description: yup
    //     .string()
    //     .max(1000, "Character limit exceeds")
    //     .required("Description is required"),
    // }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    // singleData

    if (rating === undefined) {
      toast.error("Please choose rating for the company");
      return;
    }
    try {
      setReviewloading(true);
      let params = {
        userName: singleData?.name,
        carName: singleData?.carName,
        review: rating,
        status: singleData?.status,
        dateAndTime: new Date(),
        comment: values?.description,
        userId: userid,
        bookingId: singleData?.bookingId,
        companyId: singleData?.companyId,
      };
      const res = await addReview(params);
      toast.success(res?.data?.message);
      setReviewloading(false);
      formik.resetForm();
      setpopupvisible(false);
      toggleState(false);
      setRating(undefined);
      getHistoryDetail(userid);
    } catch (error) {
      setReviewloading(false);
      setRating(undefined);
      toast.error(error?.response?.data?.message);
    }
  };
  const getHistoryDetail = async (id: string) => {
    try {
      setLoading(true);
      const res = await historyDetaillist(id);
      setApiData(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getHistoryDetail(userid);
  }, []);
  return {
    formik,
    loading,
    apiData,
    setpopupvisible,
    popupvisible,
    setRating,
    setSpecficdata,
    specficData,
    reviewLoading,
  };
};

export default UseHistory;
