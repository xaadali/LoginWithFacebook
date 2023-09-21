import { useDebounce } from "use-debounce";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setLookforData,
  setComponantLoader,
  getsearchingData,
  setCountofLookingData,
} from "@component/store/reducers/bookAppointmentReducer";
import {
  AgriculturalSubCategory,
  BikeSubCategory,
  BusSubCategory,
  CarSubCategory,
  GOOGLE_API_KEY,
  LaundrySubCategory,
  TruckSubCategory,
  VanSubCategory,
  RadiusOption,
} from "@component/utills/enum";

import { setTruestate } from "@component/store/reducers/mechanic";
import moment from "moment";
import { getDay } from "@component/utills/dates";
import { searchWorkshop } from "@component/services/BookAppointment";
import {
  handleGeoAddress,
  handleGeocode,
} from "@component/services/googleServices";
import usePlacesWidget from "react-google-places-autocomplete";
import { useTranslation } from "react-i18next";

const useHeader = () => {
  const { t } = useTranslation();
  const location = useRouter();
  const dispatch = useDispatch();
  const locationDataRef: any = useRef(null);
  const { user } = useSelector((state: any) => state?.user);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState();
  const [clickedLocation, setClickedLocation] = useState<any>();
  const [popupvisible, setpopupvisible] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState<any>("");
  const [selectedInputValue, setSelectedInputValue] = useState(false);
  const [btnLoading, setBtnloading] = useState(false);
  // const [selectedAddress] = useDebounce(value, 1000);
  const [subCategoryOption, setSubCategoryOption] =
    useState<any>(CarSubCategory);

  const [category, setCategory] = useState("car");
  const handleSubcategory = (item: string) => {
    setCategory(item);
    if (item === "car") {
      setSubCategoryOption(CarSubCategory);
      setReload(!reload);
    } else if (item === "motorcycle") {
      setSubCategoryOption(BikeSubCategory);
      setReload(!reload);
    } else if (item === "agriculture") {
      setSubCategoryOption(AgriculturalSubCategory);
    } else if (item === "truck") {
      setSubCategoryOption(TruckSubCategory);
    } else if (item === "bus") {
      setSubCategoryOption(BusSubCategory);
    } else if (item === "van") {
      setSubCategoryOption(VanSubCategory);
    } else if (item === "laundry") {
      setSubCategoryOption(LaundrySubCategory);
    }
    setReload(!reload);
  };

  useEffect(() => {}, [reload]);

  useEffect(() => {
    // if (category?.name === "car") {
    //   setSubCategoryOption(CarSubCategory);
    // }
  }, [subCategoryOption, category]);

  const [filterBy, setFilterBy] = useState("Select");
  const [filterRadiusby, setFilterradiusBy] = useState("No Radius");

  // navigate All data
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
  const navigateExplore = async () => {
    if (filterBy === "Select") {
      toast.error("Please select the sub-category");
      return;
    } else if (!value?.label) {
      toast.error("Please Add Location");
      return;
    }
    setBtnloading(true);
    const res = await handleGeocode(value?.label);
    let params = {
      category: category,
      subcategory: filterBy,
      country: "spain",
      lat: res?.lat,
      lng: res?.lng,
      address: value?.label,
      radius: filterRadiusby === "No Radius" ? 0 : filterRadiusby,
    };
    dispatch(setTruestate(false));
    dispatch(setLookforData(params));
    const response = await workShoplist(params);
    // setBtnloading(false)
    setTimeout(() => {
      location.push("/search-booking");
    }, 1000);
    setBtnloading(false);
  };

  const onchange = (e: any) => {
    if (e.target.value === "") {
      if (category === "car") {
        setSubCategoryOption(CarSubCategory);
        setReload(!reload);
      } else if (category === "motorcycle") {
        setSubCategoryOption(BikeSubCategory);
        setReload(!reload);
      } else if (category === "agricultural") {
        setSubCategoryOption(AgriculturalSubCategory);
      } else if (category === "truck") {
        setSubCategoryOption(TruckSubCategory);
      } else if (category === "bus") {
        setSubCategoryOption(BusSubCategory);
      } else if (category === "van") {
        setSubCategoryOption(VanSubCategory);
      } else if (category === "laundry") {
        setSubCategoryOption(LaundrySubCategory);
      }
    } else {
      const filteredResults = subCategoryOption.filter((item) => {
        // Customize the logic for your specific search requirements
        return item?.value
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSubCategoryOption(filteredResults);
    }
  };
  const handleRadiusOncahnge = (e: any) => {};
  useEffect(() => {
    // Add event listener to the document when the div is open
    if (selectedInputValue) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Clean up the event listener

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedInputValue]);

  const handleOutsideClick = (event) => {
    // Check if the clicked element is outside the div
    if (
      locationDataRef.current &&
      !locationDataRef.current.contains(event.target)
    ) {
      setSelectedInputValue(false);
    }
  };

  return {
    navigateExplore,
    filterBy,
    setFilterBy,
    loading,
    setCategory,
    category,
    handleSubcategory,
    subCategoryOption,
    onchange,
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
    setFilterradiusBy,
    filterRadiusby,
    handleRadiusOncahnge,
    RadiusOption,
    t,
    btnLoading,
  };
};

export default useHeader;
