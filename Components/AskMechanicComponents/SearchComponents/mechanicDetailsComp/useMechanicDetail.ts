import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  checkSlot,
  getSpecficslot,
  searchWorkshop,
} from "@component/services/BookAppointment";
import {
  getsearchingData,
  saveCarnameData,
  savePhonenumberData,
  saveSlotDetail,
  saveUserNamedata,
} from "@component/store/reducers/bookAppointmentReducer";
import {
  favouriteMechanic,
  handleGetmechanicDetail,
} from "@component/services/Mechanic";
import {
  getSpecficDetailMechanic,
  setFavouriteitem,
} from "@component/store/reducers/mechanic";
import { getDay } from "@component/utills/dates";
import { handleGeocode } from "@component/services/googleServices";
import { saveCompMessageData } from "@component/store/reducers/userReducer";

const useMechanicDetail = () => {
  const ForUseEffect = useRef<boolean>(false);
  const { user } = useSelector((state: any) => state?.user);
  const { specficMechanicdetail } = useSelector(
    (state: any) => state?.mechanic
  );

  const { lookFordata, slotDetail } = useSelector(
    (state: any) => state?.bookingAppointment
  );
  const { setitem, setTrue } = useSelector((state: any) => state?.mechanic);

  const location: any = useRouter();
  const dispatch = useDispatch();
  let userid = user?.data?.user?.id;
  const [popupvisible, setpopupvisible] = useState(false);
  const [dataLoading, setDateLoading] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState("");
  const [less, setLess] = useState<boolean>(true);
  const [favroriteLoading, setFavoriteloading] = useState(false);
  const [simpleLoader, setSimpleloader] = useState(0);
  const [clickedLocation, setClickedLocation] = useState<any>();
  const [allFalse, setAllFalse] = useState(false);
  const [btnLoading, setBtnloading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<{
    slots: any;
    selectedDate: string | number;
  }>({
    slots: [],
    selectedDate: "",
  });
  useEffect(() => {}, [specficMechanicdetail]);
  const handlebookAppointment = () => {
    if (!user?.data?.access_token) {
      toast.error("Login first to book appointment.");
      return;
    }
    location.push("/appointment-booking");
  };
  const handleSelectSlot = (item: any) => {
    dispatch(saveSlotDetail(item));
    setSelectedItems((prevSelectedItems: any) => {
      // Check if the item is already selected
      const itemIndex = prevSelectedItems.indexOf(item.startTime);
      if (itemIndex !== -1) {
        // If the item is already selected, remove it from the selectedItems array
        // return prevSelectedItems.filter((_, index) => index !== itemIndex);
        return "";
      } else {
        // If the item is not selected, add it to the selectedItems array
        return item.startTime;
      }
    });
  };
  const handleDateChange = async (item: any, e: any) => {
    const convertToDay = moment(new Date(e?.unix * 1000)).format("dddd");
    const convertToDate = moment(new Date(e?.unix * 1000)).format("ll");
    // const convertToSelectedDate = new Date(e?.unix * 1000);
    // const convertToSelectedDate = moment(new Date(e?.unix * 1000)).format(
    //   "YYYY-MM-DD"
    // );
    const convertToSelectedDate = moment(new Date(e?.unix * 1000)).format(
      "YYYY-MM-DD H:mm"
    );
    try {
      setDateLoading(true);
      setAllFalse(false);
      const res = await getSpecficslot(
        item?.companyId,
        convertToDay,
        convertToSelectedDate
      );
      setAvailableSlots({
        slots: res?.data?.data,
        selectedDate: convertToDate,
      });
      const allAreFalse = res?.data?.data?.every(
        (item) => item.isOpen === false
      );
      if (allAreFalse === true) {
        setAllFalse(allAreFalse);
      }
      setSelectedItems("");
      // if (validate?.data) {
      setBookingDate(e);
      // }
      setDateLoading(false);
    } catch (error) {
      e?.pop();
      setBookingDate(e);
      setDateLoading(false);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {}, [availableSlots]);

  useEffect(() => {
    if (ForUseEffect.current === false) {
      // if (!setTrue) {
      //   setAvailableSlots({
      //     slots: setitem?.companySlots,
      //     selectedDate: setitem?.currentDate,
      //   });
      // } else {
      setAvailableSlots({
        slots: setitem?.companySlots,
        selectedDate: setitem?.currentDate,
      });
      // }
    }
    return () => {
      ForUseEffect.current = true;
    };
  }, []);
  const handleMonthChange = () => {};
  const navigateBookingAppointment = async (item: any, previousItem: any) => {
    if (!user?.data?.access_token) {
      toast.error("Login first to book appointment.");
      return;
    }
    if (selectedItems === "") {
      toast.error("Select the slot");
      return;
    } else {
      if (availableSlots?.selectedDate === undefined) {
        const converttoTime = moment(new Date()).format("hh:mm A");
        let params = {
          day: slotDetail?.day,
          bookingDate: moment(bookingDate).format("YYYY-MM-DD"),
          companyId: item?.companyId,
          slotId: slotDetail?.slotId,
          slotTime: slotDetail?.startTime,
          userTime: converttoTime,
        };
        try {
          setBtnloading(true);
          const res = await checkSlot(params);
          if (res?.data) {
            const modifyObject = {
              bookingSlotdate: bookingDate,
              companySlots: previousItem?.companySlots,
              ...item,
            };
            const newData = Object?.assign({ ...modifyObject, ...slotDetail });
            dispatch(setFavouriteitem(newData));
            dispatch(savePhonenumberData("")),
              dispatch(saveUserNamedata("")),
              dispatch(saveCarnameData("")),
              location.push("/appointment-booking");
            setBtnloading(false);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
          setBtnloading(false);
        }
      } else {
        const converttoTime = moment(new Date()).format("hh:mm A");
        let params = {
          day: slotDetail?.day,
          bookingDate: moment(availableSlots?.selectedDate).format(
            "YYYY-MM-DD"
          ),
          companyId: item?.companyId,
          slotId: slotDetail?.slotId,
          slotTime: slotDetail?.startTime,
          userTime: converttoTime,
        };
        try {
          setBtnloading(true);
          const res = await checkSlot(params);
          if (res?.data) {
            const modifyObject = {
              bookingSlotdate: availableSlots?.selectedDate,
              companySlots: previousItem?.companySlots,
              ...item,
            };
            const newData = Object?.assign({ ...modifyObject, ...slotDetail });
            dispatch(setFavouriteitem(newData));
            dispatch(savePhonenumberData("")),
              dispatch(saveUserNamedata("")),
              dispatch(saveCarnameData("")),
              location.push("/appointment-booking");
            setBtnloading(false);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
          setBtnloading(false);
        }
      }
    }
  };
  const handleDetail = async () => {
    try {
      const day = getDay(new Date());

      const res = await handleGetmechanicDetail(
        location?.query?.companyId,
        day

        // userid
      );
      console.log(
        "🚀 ~ file: useMechanicDetail.ts:222 ~ handleDetail ~ res:",
        res?.[0]
      );

      // // const testing = await handleGeocode()
      // setClickedLocation({
      //   lat: res?.data?.data?.workshopAddress?.lat,
      //   lng: res?.data?.data?.workshopAddress?.lng,
      // });
      dispatch(getSpecficDetailMechanic(res?.data[0]));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (setitem) {
      handleDetail();
    }
  }, []);
  const modifyArray = specficMechanicdetail?.languages?.map((item, index) => {
    return item?.label;
  });
  const handleMorespecialties = () => {
    setLess(!less);
  };
  const handleFavourit = () => {
    if (!user?.data?.access_token) {
      toast.error("Login first to mark as favourite.");
      return;
    }
  };
  const handleFavouritemechanics = async (items: any, loading: number) => {
    try {
      setSimpleloader(loading);
      setFavoriteloading(true);
      if (items?.companyReviews) {
        const res = await favouriteMechanic(
          items?.companyId,
          userid,
          items?.isFavourite === true ? false : true,
          items?.imageUrl,
          Number(items?.totalCount),
          items?.companyReviews == null ? 0 : items?.companyReviews
        );
        toast.success(res?.data?.message);
      } else {
        const res = await favouriteMechanic(
          items?.companyId,
          userid,
          items?.isFavourite === true ? false : true,
          items?.imageUrl,
          Number(items?.totalCount),
          items?.reviews == null ? 0 : items?.reviews
        );
        toast.success(res?.data?.message);
      }
      handleDetail();
      // const updatedObject = { ...setitem };
      // Update the desired property value
      // updatedObject.isFavourite = setitem?.isFavourite === false ? true : false;
      // Dispatch the action to update the Redux state
      // dispatch(setFavouriteitem(updatedObject));
      setFavoriteloading(false);
    } catch (error) {
      setFavoriteloading(false);
      if (Array.isArray(error?.response?.data?.message)) {
        toast.error(error?.response?.data?.message[0]);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleMessageData = (item) => {
    // dispatch(saveCompMessageData(item));
    location.push("/dashboard/chat");
  };

  // useEffect(() => {
  //   if (setitem?.workshopAddress) {
  //     const handleGoofleApi = async () => {
  //       const latAndLngRes = await handleGeocode(
  //         setitem?.workshopAddress?.title
  //       );
  //       setClickedLocation({
  //         lat: latAndLngRes?.lat,
  //         lng: latAndLngRes?.lng,
  //       });
  //     };
  //     handleGoofleApi();
  //   } else {
  //     const handleGoofleApi = async () => {
  //       const latAndLngRes = await handleGeocode(
  //         specficMechanicdetail?.workshopAddress?.title
  //       );
  //       setClickedLocation({
  //         lat: latAndLngRes?.lat,
  //         lng: latAndLngRes?.lng,
  //       });
  //     };
  //     handleGoofleApi();
  //   }
  // }, [setitem, specficMechanicdetail]);
  const handleMapAddress = (address: any) => {
    console.log(
      "🚀 ~ file: useSearch.ts:32 ~ handleMapAddress ~ address:",
      address
    );
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address?.lat},${address?.lng}`;
    window.open(url, "_blank");
  };
  return {
    popupvisible,
    setpopupvisible,
    navigateBookingAppointment,
    handleDateChange,
    handlebookAppointment,
    handleMonthChange,
    bookingDate,
    specficMechanicdetail,
    setitem,
    selectedItems,
    handleSelectSlot,
    availableSlots,
    dataLoading,
    modifyArray,
    less,
    handleMorespecialties,
    user,
    handleFavourit,
    handleFavouritemechanics,
    favroriteLoading,
    simpleLoader,
    clickedLocation,
    setClickedLocation,
    handleMessageData,
    allFalse,
    handleMapAddress,
    btnLoading,
  };
};

export default useMechanicDetail;
