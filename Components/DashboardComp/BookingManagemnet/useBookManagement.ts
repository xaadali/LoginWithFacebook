/* eslint-disable react-hooks/exhaustive-deps */
import modifyError from "@component/helper";
import {
  changeSingleBookingStatus,
  getBookingManagement,
  postCompComment,
} from "@component/services/BookingManagement";
import { saveBookingDetail } from "@component/store/reducers/companyBookingReducer";
import {
  InprogressStatus,
  UpcommingStatus,
  pendingStatus,
} from "@component/utills/enum";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface BookingAPi {
  page: number;
  limit: number;
  status: string | number;
  bookingDate: string | number | null;
  companyId: string;
}

const UseBookingManagement = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [postComment, setPostComment] = useState({
    comment: "",
    commentIndex: "",
    bookingId: "",
  });

  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const [getDate, setGetDate] = useState<any>("");
  const [filterBy, setFilterBy] = useState("all");
  const [reload, setReload] = useState<boolean>(false);
  const [Status, setStatus] = useState<any>({
    status: "",
    userInfo: {},
    Index: "",
  });
  // Fetch User Data From Redux
  const { user, expireTimeDuration } = useSelector((state: any) => state.user);
  // Fetch Booking List From Redux
  const { bookingList } = useSelector((state: any) => state.booking);
  const { currentPlanInfo } = useSelector((state: any) => state.plan);
  const { showBanner } = useSelector((state: any) => state.compCalendar);
  // Get Booking Details from Server by Date And Day
  const handleBookingDetail = async () => {
    try {
      setLoading(true);
      const params: BookingAPi = {
        page: 0,
        limit: 10,
        status: filterBy ? filterBy?.toLocaleLowerCase() : "all",
        bookingDate: getDate ? moment(getDate).format("YYYY-MM-DD") : null,
        companyId: user?.data?.user?.id,
      };
      const response = await getBookingManagement(params);
      dispatch(saveBookingDetail(response?.data?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      modifyError(error);
    }
  };

  // Post Status Handle
  const handleChangeStatus = async () => {
    try {
      setStatusLoading(true);
      const combinedBookingStartTime = moment(
        `${Status?.userInfo?.bookingDate} ${Status?.userInfo?.startTime}`,
        "YYYY-MM-DD h:mm a"
      ).format("YYYY-MM-DD h:mm a");
      // .toISOString();
      const params = {
        companyId: user?.data?.user?.id ? user?.data?.user?.id : "",
        userId: Status?.userInfo?.userId ? Status?.userInfo?.userId : "",
        bookingId: Status?.userInfo?.bookingId
          ? Status?.userInfo?.bookingId
          : "",
        status:
          Status?.status === "Client Not Presented"
            ? Status?.status
            : String(Status?.status)?.toLowerCase(),
        dateAsString: moment(Status?.userInfo?.bookingDate).format(
          "YYYY-MM-DD"
        ),
        today: new Date(),
        bookingDateAndTime: combinedBookingStartTime,
      };
      const response = await changeSingleBookingStatus(params);
      toast.success(response?.data?.message);
      setStatusLoading(false);
      setReload(!reload);
    } catch (error) {
      modifyError(error);
      // setStatus(Status?.Status === "Pending");
      setStatusLoading(false);
    }
  };

  // Handle Get Status from User and Set Into State
  const handleGetStatus = (status) => {
    if (status === "pending") {
      return pendingStatus;
    } else if (status === "completed") {
      return [];
    } else if (status === "canceled") {
      return [];
    } else if (status === "blocked") {
      return [];
    } else if (status === "inprogress") {
      return InprogressStatus;
    } else if (status === "upcoming") {
      return UpcommingStatus;
    } else {
      return [];
    }
  };

  // Post Comment From Company Side
  const handlePostComment = async () => {
    try {
      setCommentLoading(true);
      const params = {
        companyId: user?.data?.user?.id,
        bookingId: postComment?.bookingId,
        workshopComment: postComment?.comment,
      };
      const response = await postCompComment(params);
      toast.success(response.data?.message);
      setCommentLoading(false);
    } catch (error) {
      if (Array.isArray(error?.response?.data?.message)) {
        if (error?.response?.data?.message.length === 1) {
          const res =
            error?.response?.data?.message[0] ||
            "Something Went Wrong.Request Failed!";
          toast.error(res);
        } else {
          const res =
            error?.response?.data?.message[1] ||
            "Something Went Wrong.Request Failed!";
          toast.error(res);
        }
      } else {
        let errorMessage = error?.response?.message
          ? error?.response?.message
          : error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something Went Wrong.Request Failed!";
        toast.error(errorMessage);
      }
      setCommentLoading(false);
    }
  };

  useEffect(() => {
    if (Status?.status) {
      handleChangeStatus();
    }
  }, [Status]);
  // useEffect(() => {
  //   if (getDate === "" && filterBy !== "all") {

  //     dispatch(saveBookingDetail(null));
  //     toast.error("Please select the filter date first!");
  //   } else if (getDate === "" && filterBy === "all") {

  //     handleBookingDetail();
  //   } else if (getDate !== "" && filterBy === "all") {

  //     handleBookingDetail();
  //   } else if (getDate !== "" && filterBy !== "all") {
  //     handleBookingDetail();
  //   }

  //   // if (filterBy === "all") {
  //   // } else {
  //   //   if (getDate === "") {
  //   //     dispatch(saveBookingDetail(null));
  //   //     toast.error("Please select the filter date first!");
  //   //     return;
  //   //   }
  //   //    else if (filterBy === "all" && getDate === "") {
  //   //     handleBookingDetail();
  //   //   }
  //   //   else {
  //   //     handleBookingDetail();
  //   //   }
  //   // }
  // }, [filterBy, getDate, reload]);

  useEffect(() => {
    if (getDate === "" && filterBy === "all") {
      handleBookingDetail();
    } else if (getDate === "" && filterBy !== "all") {
      dispatch(saveBookingDetail(null));
      toast.error("Please select the filter date first!");
    } else if (getDate !== "" && filterBy === "all") {
      handleBookingDetail();
    } else if (getDate !== "" && filterBy !== "all") {
      handleBookingDetail();
    }
  }, [filterBy, getDate, reload]);
  return {
    filterBy,
    setFilterBy,
    bookingList,
    loading,
    setGetDate,
    getDate,
    setStatus,
    Status,
    handleGetStatus,
    statusLoading,
    setPostComment,
    postComment,
    handlePostComment,
    commentLoading,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  };
};
export default UseBookingManagement;
