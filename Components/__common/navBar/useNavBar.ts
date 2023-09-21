import {
  getsearchingData,
  saveReload,
  setComponantLoader,
  setCountofLookingData,
  setLookforData,
} from "@component/store/reducers/bookAppointmentReducer";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import filterArrayData from "../filterArrayData";
import { companySideBarLink, userSideBarLink } from "./data";
import { setTruestate } from "@component/store/reducers/mechanic";
import { handleGeocode } from "@component/services/googleServices";
import { RadiusOption } from "@component/utills/enum";
import { removeNotification } from "@component/store/reducers/notificationsSlice";
import { useTranslation } from "react-i18next";
import { getDay } from "@component/utills/dates";
import { searchWorkshop } from "@component/services/BookAppointment";
import { saveSidebar } from "@component/store/reducers/userReducer";

const useNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const locationDataRef: any = useRef(null);
  const userd = useSelector(
    (state: any) => state?.bookingAppointment?.lookFordata?.category
  );
  const { lookFordata } = useSelector(
    (state: any) => state?.bookingAppointment
  );
  console.log(
    "🚀 ~ file: useNavBar.ts:34 ~ useNavBar ~ lookFordata:",
    lookFordata
  );
  const location = useRouter();
  const notificationsRef: any = useRef(null);
  const [address, setAddress] = useState();
  const [addressLoading, setAddressLoading] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<any>();
  const [popupvisible, setpopupvisible] = useState(false);
  const { FilterType } = filterArrayData();
  const [searchMenu, setSearchMenu] = useState<any>({
    name: "",
    Category: "",
  });
  const [filterRadiusby, setFilterradiusBy] = useState("No Radius");
  const [value, setValue] = useState<any>("");
  const [selectedInputValue, setSelectedInputValue] = useState(false);

  // ################
  const [showNotifications, setShowNotifications] = useState(false);

  // ################

  const dispatch = useDispatch();
  const { user, notificationUserData } = useSelector(
    (state: any) => state?.user
  );

  const notifications = useSelector((state: any) => state?.notifications);
  const { Reload } = useSelector((state: any) => state?.bookingAppointment);

  useEffect(() => {
    setSearchMenu({
      name: userd ? userd : "",
    });
  }, []);

  const [active, setActive] = useState(false);
  const options = [
    "Fast Mechanic",
    " General Mechanic",
    "Tires",
    "Sheet metal and paint",
    "Electromechanical",
  ];
  const [filterBy, setFilterBy] = useState("Select");
  const [page, setPage] = useState(false);
  window.addEventListener("scroll", function () {
    if (window.pageYOffset <= 50) {
      setPage(true);
    } else {
      setPage(false);
    }
  });

  useEffect(() => {
    if (window.pageYOffset <= 20) {
      setPage(true);
    }
  }, []);
  const handleClose = () => {
    setActive(!active);
  };
  const handleLogin = () => {
    router.push("/login");
  };
  const handleSignup = () => {
    router.push("/signup");
  };
  const handleMyaccount = () => {
    setSearchMenu({
      name: "",
      Category: "",
    });
    let params = {
      category: "",
      subcategory: "filterBy",
      country: "spain",
      lat: "",
      lng: "",
      address: "",
    };

    dispatch(setTruestate(false));
    dispatch(setLookforData(params));
    router.push("/dashboard");
  };
  const handleBackscreen = () => {
    router.back();
  };

  // Filtered notification by user id //

  const notificationsData = useMemo(() => {
    const notificationChatRoomId = notifications?.find(
      (item) =>
        notificationUserData?.chatRooomId ===
        item?.data?.["gcm.notification.chatRoomId"]
    );

    if (
      notificationUserData != null &&
      notificationUserData?.chatRooomId ===
        notificationChatRoomId?.data?.["gcm.notification.chatRoomId"]
    ) {
      dispatch(
        removeNotification({
          messageId:
            notificationChatRoomId?.data?.["gcm.notification.chatRoomId"],
        })
      );
      return notifications;
    } else {
      return notifications;
    }
  }, [notifications]);

  useEffect(() => {
    window?.addEventListener("resize", function () {
      if (window?.innerWidth > 1201) {
        setActive(false);
      }
    });
    return () => {
      window?.removeEventListener("resize", function () {
        if (window?.innerWidth > 1201) {
          setActive(false);
        }
      });
    };
  }, []);

  const handleProfile = () => {
    dispatch(saveSidebar("Account Settings"));
    router.push("/dashboard/my-profile");
  };
  const workShoplist = async (paramsList) => {
    try {
      setComponantLoader(true);
      const day = getDay(new Date());
      // const convertToSelectedDate = moment(new Date()).format("YYYY-MM-DD");
      const convertToSelectedDate = moment(new Date()).format(
        "YYYY-MM-DD H:mm"
      );
      const res = await searchWorkshop(
        paramsList?.category,
        paramsList?.subcategory,
        paramsList?.country,
        day,
        convertToSelectedDate,
        paramsList?.lat,
        paramsList?.lng,
        paramsList?.radius,
        paramsList?.address
      );
      dispatch(getsearchingData(res?.data?.data));
      dispatch(setCountofLookingData(res?.data?.count));
      setComponantLoader(false);
      return res;
    } catch (error) {
      if (error?.response?.data?.statusCode === 400) {
        dispatch(getsearchingData(null));
        setComponantLoader(false);
      } else {
        dispatch(getsearchingData(null));
        setComponantLoader(false);
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const handleSearch = async () => {
    if (searchMenu?.name === "") {
      toast.error("Please select the category");
      return;
    } else if (!value?.label) {
      toast.error("Please Add Location");
      return;
    }
    // dispatch(setTruestate(true));
    const res = await handleGeocode(value?.label);
    let params = {
      category: searchMenu?.Category?.title,
      subcategory: searchMenu.name,
      country: "spain",
      lat: res?.lat,
      lng: res?.lng,
      address: value?.label,
      radius: filterRadiusby === "No Radius" ? 0 : filterRadiusby,
    };

    dispatch(setLookforData(params));
    dispatch(saveReload(!Reload));
    dispatch(setTruestate(false));
    const response = await workShoplist(params);
    location.push("/search-booking");
  };

  useEffect(() => {
    console.log("top console");

    let params = {
      category: lookFordata?.category,
      subcategory: lookFordata?.subcategory,
      country: "spain",
      lat: lookFordata?.lat,
      lng: lookFordata?.lng,
      address: lookFordata?.address,
      radius: lookFordata?.radius,
    };
    if (pathname === "/search-booking") {
      workShoplist(params);
    }
  }, [pathname]);
  const filteredLinks = () => {
    if (user?.data?.user?.userType === "user" || user?.userType === "user") {
      return userSideBarLink;
    }
    return companySideBarLink;
  };

  // #####################

  const getNotifications = () => {
    setShowNotifications(true);
  };

  const handleClickOutside = (event) => {
    if (
      notificationsRef.current &&
      !notificationsRef?.current?.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  };

  const handleOutsideClick = (event) => {
    // Check if the clicked element is outside the div
    if (
      locationDataRef.current &&
      !locationDataRef.current.contains(event.target)
    ) {
      setSelectedInputValue(false);
    }
  };

  useEffect(() => {
    // Add event listener to the document when the div is open
    document.addEventListener("mousedown", handleOutsideClick);
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (i18n.language === "en-US") {
      i18n.changeLanguage("es");
    }
  }, [i18n]);

  const handleRadiusOncahnge = (e: any) => {};
  return {
    active,
    location,
    handleClose,
    handleLogin,
    handleSignup,
    options,
    filterBy,
    setFilterBy,
    page,
    user,
    handleMyaccount,
    handleBackscreen,
    handleProfile,
    searchMenu,
    setSearchMenu,
    handleSearch,
    dispatch,
    FilterType,
    filteredLinks,
    showNotifications,
    setShowNotifications,
    getNotifications,
    setAddress,
    address,
    setClickedLocation,
    clickedLocation,
    setpopupvisible,
    popupvisible,
    setValue,
    value,
    setSelectedInputValue,
    selectedInputValue,
    locationDataRef,
    addressLoading,
    notificationsData,
    notificationsRef,
    setFilterradiusBy,
    filterRadiusby,
    handleRadiusOncahnge,
    RadiusOption,
    i18n,
    t,
  };
};

export default useNavBar;
