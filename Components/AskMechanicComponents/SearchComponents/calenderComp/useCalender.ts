/* eslint-disable react-hooks/exhaustive-deps */
import {
  searchWorkshop,
  getSpecficslot,
  checkSlot,
} from "@component/services/BookAppointment";
import { favouriteMechanic } from "@component/services/Mechanic";
import {
  getsearchingData,
  saveCarnameData,
  savePhonenumberData,
  saveSlotDetail,
  saveUserNamedata,
  setComponantLoader,
  setCountofLookingData,
} from "@component/store/reducers/bookAppointmentReducer";
import {
  setFavouriteitem,
  setTruestate,
} from "@component/store/reducers/mechanic";
import moment from "moment";
import { getDay } from "@component/utills/dates";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
const UseCalender = () => {
  const ForUseEffect = useRef<boolean>(false);
  const ForUseEffectFav = useRef<boolean>(false);
  const { user } = useSelector((state: any) => state?.user);
  const {
    lookFordata,
    slotDetail,
    searchingList,
    sortLoader,
    Reload,
    compoentLoader,
  } = useSelector((state: any) => state?.bookingAppointment);
  const { setTrue } = useSelector((state: any) => state?.mechanic);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const location = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [favroriteLoading, setFavoriteloading] = useState(false);
  const [simpleLoader, setSimpleloader] = useState(0);
  const [slotLoading, setSlotloading] = useState(false);
  const [activeHours, setActiveHours] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState();
  const [date, setDate] = useState();
  const [less, setLess] = useState<boolean>(true);
  const [faveCheck, setFavCheck] = useState(false);
  const [fetchSlots, setFetchSlots] = useState<any>([]);

  const [selectedItems, setSelectedItems] = useState("");
  const [availableSlots, setAvailableSlots] = useState<any>([]);
  const [allFalse, setAllFalse] = useState(false);

  const [companyID, setCompanyID] = useState<string>("");
  const [reload, setReload] = useState(false);
  const [testLoading, setTestloading] = useState(true);
  const [btnLoading, setBtnloading] = useState(false);
  console.log(
    "🚀 ~ file: useCalender.ts:63 ~ UseCalender ~ btnLoading:",
    btnLoading
  );
  // const workShoplist = async () => {
  //   console.log("hjk");
  //   try {
  //     const day = getDay(new Date());
  //     // const convertToSelectedDate = moment(new Date()).format("YYYY-MM-DD");
  //     const convertToSelectedDate = moment(new Date()).format(
  //       "YYYY-MM-DD H:mm"
  //     );
  //     setLoading(true);
  //     const res = await searchWorkshop(
  //       lookFordata?.category,
  //       lookFordata?.subcategory,
  //       lookFordata?.country,
  //       day,
  //       convertToSelectedDate,
  //       lookFordata?.lat,
  //       lookFordata?.lng,
  //       lookFordata?.radius,
  //       lookFordata?.address
  //     );
  //     handleFilterBookingSlots(res?.data?.data);
  //     dispatch(getsearchingData(res?.data?.data));
  //     dispatch(setCountofLookingData(res?.data?.count));
  //     setLoading(false);
  //   } catch (error) {
  //     if (error?.response?.data?.statusCode === 400) {
  //       dispatch(getsearchingData(null));
  //       setLoading(false);
  //     } else {
  //       dispatch(getsearchingData(null));
  //       setLoading(false);
  //       toast.error(error?.response?.data?.message);
  //     }
  //   }
  // };

  // useLayoutEffect(() => {
  //   if (Boolean(setTrue)) {
  //     // setFetchSlots([]);
  //     console.log("in if");
  //     // setTimeout(() => {
  //     dispatch(getsearchingData(null));
  //     workShoplist();
  //     dispatch(setTruestate(false));
  //     // }, 1000);
  //   }
  //   if (ForUseEffect.current === false) {
  //     workShoplist();
  //   }
  //   return () => {
  //     ForUseEffect.current = true;
  //   };
  // }, [Reload, faveCheck, setTrue]);

  const handleDateChange = async (item: any, e: any, index: number) => {
    const convertToDay = moment(new Date(e?.unix * 1000)).format("dddd");
    const convertToDate = moment(new Date(e?.unix * 1000)).format("ll");
    // const convertToSelectedDate = moment(new Date(e?.unix * 1000)).format(
    //   "YYYY-MM-DD"
    // );
    const convertToSelectedDate = moment(new Date(e?.unix * 1000)).format(
      "YYYY-MM-DD H:mm"
    );
    setSelectedItems("");
    try {
      setSlotloading(true);
      setAllFalse(false);
      const res = await getSpecficslot(
        item?.companyId,
        convertToDay,
        convertToSelectedDate
      );
      const response = fetchSlots?.filter(
        (elem, i) => elem?.companyIndex !== item?.companyId
      );
      const allAreFalse = res?.data?.data?.every(
        (item) => item.isOpen === false
      );
      if (allAreFalse === true) {
        setAllFalse(allAreFalse);
      }
      const modifyObject = {
        companyIndex: item?.companyId,
        slots: res?.data?.data,
        selectedDate: convertToDate,
        value: e ? e : new Date(),
      };
      response.push(modifyObject);
      setFetchSlots(response);
      setSlotloading(false);
      // if (validate?.data) {
      setBookingDate(e);
      // }
    } catch (error) {
      e?.pop();
      setBookingDate(e);
      setSlotloading(false);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {}, [allFalse]);
  const handleMonthChange = () => {};
  const handleAvailableHours = () => {
    setActiveHours(true);
  };
  const navigateBookingAppointment = async (item: any, elem: any) => {
    if (!user?.data?.access_token) {
      toast.error("Login first to book appointment.");
      return;
    }
    if (selectedItems === "") {
      toast.error("Select the slot");
      return;
    } else {
      try {
        setBtnloading(true);
        const converttoTime = moment(new Date()).format("hh:mm A");
        let params = {
          day: slotDetail?.day,
          bookingDate: moment(elem?.selectedDate).format("YYYY-MM-DD"),
          companyId: item?.companyId,
          slotId: slotDetail?.slotId,
          slotTime: slotDetail?.startTime,
          userTime: converttoTime,
        };
        const res = await checkSlot(params);
        toast.success(res?.data?.message);
        if (res) {
          const modifyObject = {
            bookingSlotdate: moment(elem?.selectedDate).format("YYYY-MM-DD"),
            ...item,
          };
          const newData = Object.assign(modifyObject, slotDetail);
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
  };
  const navigateToMechanicDetails = (items: any) => {
    dispatch(setFavouriteitem(items));
    location.push({
      pathname: "/mechanic-detail",
      query: { companyId: items?.companyId }, // Add any other query parameters here
    });
    // location.push("/mechanic-detail");
  };

  const handleFavourit = () => {
    if (!user?.data?.access_token) {
      toast.error("Login first to mark as favourite.");
      return;
    }
  };
  const handleSelectSlot = (item: any) => {
    dispatch(saveSlotDetail(item));
    setSelectedItems((prevSelectedItems: any) => {
      // Check if the item is already selected
      const itemIndex = prevSelectedItems.indexOf(item.slotId);
      if (itemIndex !== -1) {
        // If the item is already selected, remove it from the selectedItems array
        // return prevSelectedItems.filter((_, index) => index !== itemIndex);
        return "";
      } else {
        // If the item is not selected, add it to the selectedItems array
        return item.slotId;
      }
    });
  };

  const handleFavouritemechanics = async (items: any, loading: number) => {
    try {
      setSimpleloader(loading);
      setCompanyID(items?.companyId);
      setFavoriteloading(true);
      const res = await favouriteMechanic(
        items?.companyId,
        userid,
        items?.isFavourite === true ? false : true,
        items?.imageUrl,
        Number(items?.totalCount),
        items?.companyReviews === null ? 0 : items?.companyReviews
      );
      setFavoriteloading(false);
      toast.success(res?.data?.message);
      // setReload(!reload);
      const day = getDay(new Date());
      const convertToSelectedDate = moment(new Date()).format(
        "YYYY-MM-DD H:mm"
      );
      // setLoading(true);
      const response = await searchWorkshop(
        lookFordata?.category,
        lookFordata?.subcategory,
        lookFordata?.country,
        day,
        convertToSelectedDate,
        lookFordata?.lat,
        lookFordata?.lng,
        lookFordata?.radius,
        lookFordata?.address
      );

      // handleFilterBookingSlots(response?.data?.data);
      dispatch(getsearchingData(response?.data?.data));
      dispatch(setCountofLookingData(response?.data?.count));
      // setLoading(false);
      setCompanyID("");
    } catch (error) {
      setFavoriteloading(false);
      if (Array.isArray(error?.response?.data?.message)) {
        toast.error(error?.response?.data?.message[0]);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const handleFilterBookingSlots = (ele: any) => {
    setComponantLoader(true);
    setTestloading(true);
    fetchSlots.splice(0, fetchSlots.length);
    for (let index = 0; index < ele?.length; index++) {
      const element = ele[index];
      const modifyObject = {
        companyIndex: element?.companyId,
        slots: element?.companySlots,
        selectedDate: moment.utc(new Date()).local().format(),
        value: new Date(),
      };
      fetchSlots.push(modifyObject);
    }
    setTimeout(() => {
      setTestloading(false);
      setComponantLoader(false);
    }, 1000);
    // if (!Boolean(setTrue)) {
    // }
    // else {
    //   setTestloading(true);
    //   fetchSlots.splice(0, fetchSlots.length);
    //   for (let index = 0; index < ele?.length; index++) {
    //     const element = ele[index];
    //     const modifyObject = {
    //       companyIndex: element?.companyId,
    //       slots: element?.companySlots,
    //       selectedDate: moment.utc(new Date()).local().format(),
    //       value: new Date(),
    //     };
    //     fetchSlots.push(modifyObject);
    //   }
    //   setTestloading(false);
    // }
  };
  useEffect(() => {
    handleFilterBookingSlots(searchingList);
  }, [searchingList]);
  const handleMorespecialties = () => {
    setLess(!less);
  };
  const handleMapLink = ({ latitude, longitude }) => {
    const url = `https://www.google.co.in/maps/dir/?saddr=&daddr=${latitude},${longitude}&directionsmode=driving`;
    window.open(url, "_blank");
  };
  return {
    handleDateChange,
    handleMonthChange,
    handleAvailableHours,
    navigateBookingAppointment,
    navigateToMechanicDetails,
    activeHours,
    bookingDate,
    handleFavouritemechanics,
    loading,
    setDate,
    date,
    handleSelectSlot,
    selectedItems,
    searchingList,
    availableSlots,
    fetchSlots,
    favroriteLoading,
    slotLoading,
    companyID,
    user,
    handleFavourit,
    simpleLoader,
    sortLoader,
    handleMorespecialties,
    less,
    handleMapLink,
    allFalse,
    compoentLoader,
    testLoading,
    btnLoading,
  };
};

export default UseCalender;
