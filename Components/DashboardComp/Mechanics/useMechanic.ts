import React, { useState, useEffect } from "react";
import moment from "moment";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import { getDates } from "./../../../services/Dates/index";
import {
  favouriteMechanic,
  getAllfvtmechanic,
  getSinglefavoriteDetail,
  handleGetmechanicDetail,
} from "@component/services/Mechanic";
import Email from "next-auth/providers/email";
import {
  getSpecficDetailMechanic,
  getallFvrtMechanicData,
  setFavouriteitem,
  setTruestate,
} from "@component/store/reducers/mechanic";
// import { getDay } from "@utills/getDates";
import { getDay } from "@component/utills/dates";
import { saveCompMessageData } from "@component/store/reducers/userReducer";

const useMechanic = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fvrtLoading, setFvrtloading] = useState(false);
  const [companyID, setCompanyID] = useState<string>("");
  const { user } = useSelector((state: any) => state?.user);
  const { fvrtMechanicList } = useSelector((state: any) => state?.mechanic);

  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const handleDetail = async (item: object | any) => {
    try {
      const day = getDay(new Date());
      const convertToSelectedDate = moment(new Date()).format(
        "YYYY-MM-DD H:mm"
      );
      const res = await getSinglefavoriteDetail(
        day,
        item?.companyId,
        userid,
        convertToSelectedDate
      );
      setTimeout(() => {
        const modifyObject = {
          isFavourite: true,
          ...res?.data[0],
        };
        dispatch(setTruestate(true));
        dispatch(setFavouriteitem(modifyObject));

        location.push({
          pathname: "/mechanic-detail",
          query: { companyId: item?.companyId }, // Add any other query parameters here
        });
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getAllfavourite = async () => {
    try {
      setLoading(true);
      const res = await getAllfvtmechanic(userid);
      dispatch(getallFvrtMechanicData(res?.data?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllfavourite();
  }, []);
  const handleFavouritemechanics = async (item) => {
    try {
      setFvrtloading(true);
      setCompanyID(item?.companyId);
      const res = await favouriteMechanic(
        item?.companyId,
        userid,
        false,
        item?.imageUrl,
        Number(item?.totalCount),
        item?.reviews === null ? 0 : item?.reviews
      );
      toast.success(res?.data?.message);
      setFvrtloading(false);
      setCompanyID("");
      getAllfavourite();
    } catch (error) {
      setFvrtloading(false);
      if (Array.isArray(error?.response?.data?.message)) {
        toast.error(error?.response?.data?.message[0]);
        toast.error(error?.response?.data?.message[1]);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleMessageData = (item) => {
    let param = {
      _id: item?.workshopId,
      fullName: item?.fullName,
      imageUrl: item?.imageUrl,
    };

    // dispatch(saveCompMessageData(param));
    location.push("/dashboard/chat");
  };

  return {
    handleDetail,
    handleFavouritemechanics,
    fvrtMechanicList,
    loading,
    companyID,
    fvrtLoading,
    handleMessageData,
  };
};

export default useMechanic;
