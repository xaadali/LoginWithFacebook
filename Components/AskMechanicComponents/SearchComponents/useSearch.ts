import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import { searchWorkshop } from "@component/services/BookAppointment";
import {
  getsearchingData,
  sortLoading,
} from "@component/store/reducers/bookAppointmentReducer";
import { Filter } from "@component/utills/enum";
import { handleGeocode } from "@component/services/googleServices";

const useSearchComponent = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);
  const { searchingList } = useSelector(
    (state: any) => state?.bookingAppointment
  );
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const [loading, setLoading] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<any>();
  const options = ["Recently", "Top Reveiws"];
  const [filterBy, setFilterBy] = useState("Filter");
  const [popupvisible, setpopupvisible] = useState(false);
  const [address, setAddress] = useState();

  const handleMapAddress = (address: any) => {
    setAddress(address?.title);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address?.lat},${address?.lng}`;
    // const url = `https://www.google.com/maps/dir/?api=1&origin=ORIGIN_LATITUDE,ORIGIN_LONGITUDE&destination=${address?.lat},${address?.lng}`;
    window.open(url, "_blank");
    // setpopupvisible(true);
  };

  const handleSortdata = (item: string) => {
    if (item === Filter?.Top_Reveiws) {
      dispatch(sortLoading(true));
      let modifyArrayforTopreveiws = [...searchingList]?.sort(
        (a, b) => b?.totalCount - a?.totalCount
      );
      dispatch(getsearchingData(modifyArrayforTopreveiws));
      setTimeout(() => {
        dispatch(sortLoading(false));
      }, 1000);
    } else {
      dispatch(sortLoading(true));
      let modifyArrayforTopreveiws = [...searchingList]?.sort(
        (a, b) =>
          new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
      );
      dispatch(getsearchingData(modifyArrayforTopreveiws));
      setTimeout(() => {
        dispatch(sortLoading(false));
      }, 1000);
    }
  };

  const handleGoogleLatAndLng = async () => {
    const res = await handleGeocode(address);
    setClickedLocation({
      lat: res?.lat,
      lng: res?.lng,
    });
  };

  useEffect(() => {
    if (address) {
      handleGoogleLatAndLng();
    }
  }, [address]);

  return {
    options,
    filterBy,
    setFilterBy,
    loading,
    popupvisible,
    setpopupvisible,
    handleSortdata,
    searchingList,
    handleMapAddress,
    setAddress,
    address,
    setClickedLocation,
    clickedLocation,
  };
};

export default useSearchComponent;
