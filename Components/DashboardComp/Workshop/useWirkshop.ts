/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  deleteCompWorkshopPhotos,
  UploadCompProfileImage,
  UploadMultipleCompImages,
} from "@component/services/UploadImages";
import {
  createCompWorkshop,
  fecthCompWorkshop,
  updateCompWorkshop,
} from "@component/services/Workshop";

import modifyError from "@component/helper";
import {
  AgriculturalSubCategory,
  BikeSubCategory,
  BusSubCategory,
  CarSubCategory,
  LaundrySubCategory,
  PlanTypeEnum,
  TruckSubCategory,
  VanSubCategory,
} from "@component/utills/enum";
import {
  FreeworkShopSchema,
  ProfessionalworkShopSchema,
} from "@component/utills/Schema";
import moment from "moment";
import {
  saveCompImage,
  saveExpireTimeDuration,
  saveUserData,
} from "@component/store/reducers/userReducer";
import { currentPlan } from "@component/services/PricePlans";
import { saveCurrentPlan } from "@component/store/reducers/planReducer";
import { showBanneronCompanyside } from "@component/store/reducers/companyCalendarReducer";
import { isPlanExpires } from "@component/utills/dates/planExpires";

const UseWorkshop = () => {
  const handleCurrentCompanyPlan = async () => {
    try {
      const response = await currentPlan(user?.data?.user?.id);
      dispatch(saveCurrentPlan(response.data));
      const dataCheck = isPlanExpires(response?.data?.renewDate);
      dispatch(saveExpireTimeDuration(dataCheck));
    } catch (error) { }
  };
  useEffect(() => {
    handleCurrentCompanyPlan();
  }, []);
  //Use Ref for unmounting component
  const stopRef = useRef(false);
  const dispatch = useDispatch();
  // For Edit Data State
  const [editData, setEditData] = useState<boolean>(false);

  // Get user details from Redux
  const { user, planTitle, updateCompName, expireTimeDuration, firbaseToken } =
    useSelector((state: any) => state?.user);

  const { plansDetails, currentPlanInfo } = useSelector(
    (state: any) => state.plan
  );

  const { showBanner } = useSelector((state: any) => state.compCalendar);

  // Save WorkshopId for Data update
  const [workshopId, setWorkshopId] = useState<string>("");

  //for progressbar
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [findIndex, setFindIndex] = useState(0)
  const [deleteIndex, setDeleteIndex] = useState(0)
  const [deleteLoading, setDeleteLoading] = useState(false)
  //Loading States
  const [fetchLoading, setFetchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  //For Company Avatar Uploading and displaying
  const [companyAvatar, setCompanyAvatar] = useState("");
  const [profileImg, setProfileImg] = useState<any>("");
  const [loaderspecficFile, setLoaderspecficFile] = useState(false);
  // Country Value
  const [countryValue, setCountryValue] = useState<any>([]);
  // Specialties Value
  const [filterBy, setFilterBy] = useState<any>({ tags: [] });

  // Slot Duration value
  const [hours, setHours] = useState<{ value: string; label: string }>({
    value: "",
    label: "",
  });

  const hoursOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  // Offers Value
  const [offersValue, setOffersValue] = useState<any>([]);
  const [address, setAddress] = useState();
  const [clickedLocation, setClickedLocation] = useState<any>();
  // Company Languages value
  const [companyLanguages, setCompanyLanguages] = useState<any>([]);

  // Reload component State
  const [reload, setReload] = useState<boolean>(false);
  const [formReload, setFormRelod] = useState<boolean>(false);
  // For Category and SubCategory
  const [categoryValue, setCategoryValue] = useState<any>([]);
  const [subCategoryValue, setSubCategoryValue] = useState<any>([]);
  const [subCategoryOption, setSubCategoryOption] = useState<any>([]);

  // User Validation State
  const [companyUserValidate, setCompanyUserValidate] = useState<any>({
    planStatus: false,
    planInfo: "",
  });
  // For Photos,Certifications,Videos State
  const [uploadDocuments, setUploadDocuments] = useState<any>({
    photos: [],
    certifications: [],
    videos: [],
  });

  const [location, setLocation] = useState("");
  const [longtitude, setlongtitude] = useState(null);

  const [popupvisible, setpopupvisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>();

  const handleLocation = (latitude, longitude: any) => {
    setlongtitude({ latitude, longitude } as any);
  };

  const handleChangelocation = (event) => {
    setLocation(event.target.value);
    let latitude = "";
    let longitude = "";
    handleLocation(latitude, longitude);
  };
  // For Slot Booking Values
  const [slotTime, setSlotTime] = useState<any>({
    Monday: {
      slotConcurrence: "",
      startTime: "",
      endTime: "",
      isOpen: false,
      isOpenCheck: false,
    },
    Tuesday: {
      slotConcurrence: "",
      startTime: "",
      endTime: "",
      isOpen: false,
      isOpenCheck: false,
    },
    Wednesday: {
      slotConcurrence: "",
      startTime: "",
      endTime: "",
      isOpen: false,
      isOpenCheck: false,
    },
    Thursday: {
      slotConcurrence: "",
      startTime: "",
      endTime: "",
      isOpen: false,
      isOpenCheck: false,
    },
    Friday: {
      slotConcurrence: "",
      startTime: "",
      endTime: "",
      isOpen: false,
      isOpenCheck: false,
    },
    Saturday: {
      slotConcurrence: "",
      startTime: "",
      endTime: "",
      isOpen: false,
      isOpenCheck: false,
    },
    Sunday: {
      slotConcurrence: "",
      startTime: "",
      endTime: "",
      isOpen: false,
      isOpenCheck: false,
    },
  });
  // const formatTime = (time) => {
  //   if (!time) return "";

  //   const date = new Date();
  //   const [hours, minutes] = time.split(":");
  //   date.setHours(hours);
  //   date.setMinutes(minutes);

  //   return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  // };
  const compareTimes = (time1, time2) => {
    const [hours1, minutes1] = time1.split(":");
    const [hours2, minutes2] = time2.split(":");

    const date1 = new Date();
    date1.setHours((hours1 % 12) + (hours1 >= 12 ? 12 : 0));
    date1.setMinutes(minutes1);

    const date2 = new Date();
    date2.setHours((hours2 % 12) + (hours2 >= 12 ? 12 : 0));
    date2.setMinutes(minutes2);

    if (hours1 >= 12 && hours2 < 12) {
      date2.setDate(date2.getDate() + 1);
    } else if (hours1 >= 12 && hours2 === 12) {
      date2.setDate(date2.getDate() + 1);
      date2.setHours(0);
      date2.setMinutes(0);
    } else if (hours1 >= 12 && hours2 >= 12 && hours2 < 24) {
      date2.setHours(23);
      date2.setMinutes(59);
    }
    if (date1 === date2 && time1 < time2) return true;
    if (date1 < date2 && time1 < time2) return true;
    if (date2 > date1) return false;
  };
  const onChangeState = (key: any, value: any, dayName: string) => {
    if (planTitle === PlanTypeEnum.StarterPlan) {
      toast.info("Please subscribe enterprice plan to use this feature.");
      return;
    }
    let end = "";
    let start = "";

    if (key === "startTime") {
      start = moment(value, ["h:mm A"]).format("HH:mm");
      end = slotTime[dayName]?.endTime || "";
    }

    if (key === "endTime") {
      end = moment(value, ["h:mm A"]).format("HH:mm");
      start = slotTime[dayName]?.startTime || "";
    }

    if (start && end) {
      const result = compareTimes(start, end);
      if (!result) {
        toast.error("Start time should be less then end time");
        return;
      }
    }

    let daySlot = { ...slotTime[dayName], [key]: value };
    setSlotTime((prev) => ({ ...prev, [dayName]: daySlot }));
  };

  // const offerOptions = [
  //   { value: "Profile Editor", label: "Profile Editor" },
  //   { value: "Upload Photos", label: "Upload Photos" },
  //   { value: "Add Description", label: "Add Description" },
  //   { value: "User Ratings", label: "User Ratings" },
  //   { value: "Booking System", label: "Booking System" },
  //   { value: "Client Chat", label: "Client Chat" },
  // ];

  // Our Offer dropdown by plan title//

  const offerOptions = useMemo(() => {
    if (planTitle === PlanTypeEnum.StarterPlan) {
      return [
        { value: "Profile Editor", label: "Profile Editor" },
        { value: "Upload Photos", label: "Upload Photos" },
        { value: "Add Description", label: "Add Description" },
      ];
    } else {
      return [
        { value: "Profile Editor", label: "Profile Editor" },
        { value: "Upload Photos", label: "Upload Photos" },
        { value: "Add Description", label: "Add Description" },
        { value: "User Ratings", label: "User Ratings" },
        { value: "Booking System", label: "Booking System" },
        { value: "Client Chat", label: "Client Chat" },
      ];
    }
  }, [planTitle]);

  const offerLanguges = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      reg: "",
      contact: "",
      des: "",
      offer: "",
      languages: "",
      specialties: "",
      duration: "",
      country: "",
      category: "",
      subcategory: "",
    },
    enableReinitialize: true,
    validationSchema: companyUserValidate?.planStatus
      ? ProfessionalworkShopSchema
      : FreeworkShopSchema,
    onSubmit: (values, actions) => {
      handleSubmit(values, actions);
    },
  });

  // Upload Workshop profile pic //

  const handleUploadProfilePic = async (workshopId) => {
    // setCompanyAvatar("");
    try {
      setProfileLoading(true);
      let imageResponse: any;
      if (profileImg) {
        const formData = new FormData();
        formData.append("file", profileImg === "" ? companyAvatar : profileImg);
        formData.append("workshopId", workshopId);
        formData.append("email", user?.data?.user?.email);
        imageResponse = await UploadCompProfileImage(formData);
      } else {
        imageResponse = companyAvatar
      }
      let modifyUsers = {
        ...user,
        data: {
          ...user.data,
          user: {
            ...user.data.user,
            imageUrl: imageResponse?.data?.data,
          },
        },
      };
      dispatch(saveUserData(modifyUsers));
      dispatch(saveCompImage(imageResponse?.data?.data));
      setCompanyAvatar(imageResponse?.data?.imageUrl);
      setProfileLoading(false);
    } catch (error) {
      setProfileLoading(false);
    }
  };

  const handleChange = (tags) => {
    setFilterBy({ tags });
  };

  //handle submit
  const handleSubmit = async (values: any, actions: any) => {
    try {
      setLoading(true);

      let modifySlots: any = [];
      for (const [key, value] of Object.entries(slotTime)) {
        modifySlots.push({
          day: key,
          // @ts-ignore
          ...value,
        });
      }
      const fillSlots = modifySlots?.map((item) => {
        const modifySlotsObject = {
          day: item?.day ? item?.day : "",
          slotConcurrence: item?.slotConcurrence ? item?.slotConcurrence : 1,
          startTime: item?.startTime
            ? moment(item?.startTime, "HH:mm").format("h:mm A")
            : moment("07:00", "HH:mm").format("h:mm A"),
          endTime: item?.endTime
            ? moment(item?.endTime, "HH:mm").format("h:mm A")
            : moment("23:59", "HH:mm").format("h:mm A"),
          isOpen: item?.isOpen ? item?.isOpen : false,
        };
        return modifySlotsObject;
      });
      const params = {
        fullName: values.name,
        email: user?.data?.user?.email,
        workshopContactNo: values?.contact,
        address: {
          type: "Point",
          coordinates: [clickedLocation?.lng, clickedLocation?.lat], // [lng,lat] array of numbers //
        },
        workshopAddress: {
          title: address,
          lat: clickedLocation?.lat,
          lng: clickedLocation?.lng,
        },
        registrationNo: values?.reg,
        duration: Number(values?.duration),
        specialties: filterBy?.tags,
        description: values?.des,
        companyId: user?.data?.user?.id,
        languages: companyLanguages,
        offers: offersValue,
        companySlots: fillSlots,
        category: categoryValue,
        subCategory: subCategoryValue,
        country: countryValue,
      };
      let response;

      if (editData) {
        response = await updateCompWorkshop(workshopId, params);
      } else {
        if (profileImg === "") {
          toast.error("Please select profile image");
          setLoading(false);
          return;
        }
        response = await createCompWorkshop(params);
      }
      if (response) {
        const findWorkshopId = workshopId
          ? workshopId
          : response?.data?.data?.id;
        // if (!companyAvatar) {

        const res = await handleUploadProfilePic(findWorkshopId);
        // }
        if (uploadDocuments.photos?.length > 0) {
          let formDataCheck = false;
          const formData = new FormData();
          for (let index = 0; index < uploadDocuments.photos?.length; index++) {
            const element = uploadDocuments.photos[index];
            if (!element?.key && !element?.url) {
              formData.append("files", element);
              formDataCheck = true;
            }
          }
          if (formDataCheck) {
            await UploadMultipleCompImages(formData, "photos", findWorkshopId, null);
          }
        }
        if (uploadDocuments.certifications?.length > 0) {
          let formDataCheck = false;
          const formData = new FormData();
          for (
            let index = 0;
            index < uploadDocuments.certifications?.length;
            index++
          ) {
            const element = uploadDocuments.certifications[index];
            if (!element?.key && !element?.url) {
              formData.append("files", element);
              formDataCheck = true;
            }
          }
          if (formDataCheck) {
            await UploadMultipleCompImages(
              formData,
              "certificates",
              findWorkshopId,
              null
            );
          }
        }
        if (uploadDocuments.videos?.length > 0) {
          let formDataCheck = false;
          for (let index = 0; index < uploadDocuments.videos?.length; index++) {
            const formData = new FormData();
            const element = uploadDocuments.videos[index];
            const options = {
              onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                if (percent < 100) {
                  setUploadPercentage(percent)
                  setFindIndex(index)
                }
              }
            }
            if (!element?.key && !element?.url) {
              formData.append("files", element);
              formDataCheck = true;
            }
            if (formDataCheck) {
              await UploadMultipleCompImages(formData, "videos", findWorkshopId, options);
              setUploadPercentage(0)
            }
          }
        }
        toast.success(response?.data?.message);
      }
      setFormRelod(!formReload);
      setLoading(false);
    } catch (error) {
      setUploadPercentage(0)
      modifyError(error);
      setLoading(false);
    }
  };

  //* For Upload Profile Photos *//
  const handleUploadImage = (event) => {
    let img = event.target.files[0];
    if (Number(img?.size) > 1e6) {
      toast.error("Profile size should be less than 1 MB");
      return;
    }
    setProfileImg(img);
  };

  // For Upload Photos,Certifications and Videos
  const handleUploadMultipleImages = async (event: any, type: string) => {
    if (!companyUserValidate.planStatus && type !== "photos") {
      toast.error(companyUserValidate.planInfo);
      return;
    }
    try {
      if (type === "photos") {
        for (let i = 0; i < event.target.files.length; i++) {
          let element = event.target.files[i];
          if (Number(element?.size) > 1e6) {
            toast.error("Photo size should be less than 1 MB");
            return;
          }
          uploadDocuments.photos.push(element);
        }
      } else if (type === "Certifications") {
        for (let i = 0; i < event.target.files.length; i++) {
          let element = event.target.files[i];
          if (Number(element?.size) > 1e6) {
            toast.error("Certificate size should be less than 1 MB");
            return;
          }
          uploadDocuments.certifications.push(element);
        }
      } else if (type === "videos") {
        for (let i = 0; i < event.target.files.length; i++) {
          let element = event.target.files[i];
          if (Number(element?.size) > 2.5e7) {
            toast.error("Video size should be less than or equal to 25 MB");
            return;
          }
          uploadDocuments.videos.push(element);
        }
      }
      setReload(!reload);
    } catch (error) { }
  };

  // For Delete Photos,Certifications and Videos
  const handleDeleteDocument = async (event: any, status: string, Index: number) => {
    try {
      setLoaderspecficFile(true);
      if (status === "photos") {
        const params = {
          workshopId: workshopId ? workshopId : "",
          type: "photos",
          key: event?.key,
        };
        if (event?.key && event?.url) {
          await deleteCompWorkshopPhotos(params);
        }
        const filterItem = uploadDocuments.photos?.filter(
          (item) => item?.name !== event?.name || item?.key !== event?.key
        );
        setUploadDocuments({
          photos: filterItem,
          certifications: uploadDocuments.certifications,
          videos: uploadDocuments.videos,
        });
      } else if (status === "certificates") {
        const params = {
          workshopId: workshopId ? workshopId : "",
          type: "certificates",
          key: event?.key,
        };
        if (event?.key && event?.url) {
          await deleteCompWorkshopPhotos(params);
        }
        const filterItem = uploadDocuments.certifications?.filter(
          (item) => item?.name !== event?.name || item?.key !== event?.key
        );
        setUploadDocuments({
          photos: uploadDocuments.photos,
          certifications: filterItem,
          videos: uploadDocuments.videos,
        });
      } else if (status === "videos") {
        setDeleteIndex(Index)
        setDeleteLoading(true)
        const params = {
          workshopId: workshopId ? workshopId : "",
          type: "videos",
          key: event?.key,
        };
        if (event?.key && event?.url) {
          await deleteCompWorkshopPhotos(params);
        }
        const filterItem = uploadDocuments.videos?.filter(
          (item) => item?.name !== event?.name || item?.key !== event?.key
        );
        setUploadDocuments({
          photos: uploadDocuments.photos,
          certifications: uploadDocuments.certifications,
          videos: filterItem,
        });
        setDeleteLoading(false)
      }
      setLoaderspecficFile(false);
    } catch (error) {
      setLoaderspecficFile(false);
    }
  };

  // For Get Commany Plan
  // const validateCompanyPlan = async () => {
  //   try {
  //     const response = await checkCompanyPlan(user?.data?.user?.id);
  //     setCompanyUserValidate({
  //       planStatus: response?.data,
  //       planInfo: "Please subscribe enterprise plan first",
  //     });
  //   } catch (error) {
  //     setCompanyUserValidate({
  //       planStatus: false,
  //       planInfo: error?.response?.data?.message,
  //     });
  //   }
  // };

  // For Arrange sub Category
  const handleSubcategory = () => {
    categoryValue &&
      categoryValue?.map((item: any, index: number) => {
        if (item?.label === "Car") {
          setSubCategoryOption(CarSubCategory);
        } else if (item?.label === "Motorcycle") {
          setSubCategoryOption(BikeSubCategory);
        } else if (item?.label === "Agriculture") {
          setSubCategoryOption(AgriculturalSubCategory);
        } else if (item?.label === "Truck") {
          setSubCategoryOption(TruckSubCategory);
        } else if (item?.label === "Bus") {
          setSubCategoryOption(BusSubCategory);
        } else if (item?.label === "Van") {
          setSubCategoryOption(VanSubCategory);
        } else if (item?.label === "Laundry") {
          setSubCategoryOption(LaundrySubCategory);
        }
      });
  };
  //Fetch Wrokshop data from server
  const handleFetchWorkshop = async () => {
    try {
      setFetchLoading(true);
      const companyId = user?.data?.user?.id;
      const response = await fecthCompWorkshop(companyId);
      let payload = response.data?.data;
      if (payload) {
        setWorkshopId(payload?.workshopId);
        setCompanyAvatar(payload?.imageUrl);

        formik.setFieldValue("specialties", payload?.specialties[0]);
        setFilterBy({ tags: payload?.specialties });

        formik.setFieldValue("country", payload?.country[0]?.label);
        setCountryValue(payload?.country);
        setAddress(payload?.workshopAddress?.title);
        setClickedLocation({
          lat: payload?.workshopAddress?.lat,
          lng: payload?.workshopAddress?.lng,
        });
        formik.setFieldValue("name", payload?.fullName);
        formik.setFieldValue("reg", payload?.registrationNo);
        // for QA testing
        // formik.setFieldValue("address", payload?.workshopAddress);
        formik.setFieldValue("address", "sample");
        formik.setFieldValue("contact", payload?.workshopContactNo);
        formik.setFieldValue("des", payload?.description);

        formik.setFieldValue("duration", payload?.duration);
        setHours({
          value: payload?.duration,
          label: payload?.duration,
        });

        setUploadDocuments({
          photos: payload?.photos,
          videos: payload?.videos,
          certifications: payload?.certificates,
        });

        formik.setFieldValue("offer", payload?.offers[0]?.value);
        setOffersValue(payload?.offers);

        formik.setFieldValue("languages", payload?.languages[0]?.value);
        setCompanyLanguages(payload?.languages);

        setCategoryValue(payload?.category);
        formik.setFieldValue("category", payload?.category[0]?.value);

        setSubCategoryValue(payload?.subCategory);
        formik.setFieldValue("subcategory", payload?.subCategory[0]?.value);


        payload?.slots?.map((elem, index) => {
          if (elem?.day === "Monday") {
            let monday = {
              slotConcurrence: elem?.slotConcurrence,
              startTime: elem?.isOpen
                ? moment(elem?.startTime, ["h:mm A"]).format("HH:mm")
                : "",
              endTime: elem?.isOpen
                ? moment(elem?.endTime, ["h:mm A"]).format("HH:mm")
                : "",
              isOpen: elem?.isOpen,
              isOpenCheck: elem?.isOpen,
            };
            slotTime.Monday = monday;
          } else if (elem?.day === "Tuesday") {
            let tuesday = {
              slotConcurrence: elem?.slotConcurrence,
              startTime: elem?.isOpen
                ? moment(elem?.startTime, ["h:mm A"]).format("HH:mm")
                : "",
              endTime: elem?.isOpen
                ? moment(elem?.endTime, ["h:mm A"]).format("HH:mm")
                : "",
              isOpen: elem?.isOpen,
              isOpenCheck: elem?.isOpen,
            };
            slotTime.Tuesday = tuesday;
          }
          if (elem?.day === "Wednesday") {
            let wednesday = {
              slotConcurrence: elem?.slotConcurrence,
              startTime: elem?.isOpen
                ? moment(elem?.startTime, ["h:mm A"]).format("HH:mm")
                : "",
              endTime: elem?.isOpen
                ? moment(elem?.endTime, ["h:mm A"]).format("HH:mm")
                : "",
              isOpen: elem?.isOpen,
              isOpenCheck: elem?.isOpen,
            };
            slotTime.Wednesday = wednesday;
          }
          if (elem?.day === "Thursday") {
            let thursday = {
              slotConcurrence: elem?.slotConcurrence,
              startTime: elem?.isOpen
                ? moment(elem?.startTime, ["h:mm A"]).format("HH:mm")
                : "",
              endTime: elem?.isOpen
                ? moment(elem?.endTime, ["h:mm A"]).format("HH:mm")
                : "",
              isOpen: elem?.isOpen,
              isOpenCheck: elem?.isOpen,
            };
            slotTime.Thursday = thursday;
          }
          if (elem?.day === "Friday") {
            let friday = {
              slotConcurrence: elem?.slotConcurrence,
              startTime: elem?.isOpen
                ? moment(elem?.startTime, ["h:mm A"]).format("HH:mm")
                : "",
              endTime: elem?.isOpen
                ? moment(elem?.endTime, ["h:mm A"]).format("HH:mm")
                : "",
              isOpen: elem?.isOpen,
              isOpenCheck: elem?.isOpen,
            };
            slotTime.Friday = friday;
          }
          if (elem?.day === "Saturday") {
            let saturday = {
              slotConcurrence: elem?.slotConcurrence,
              startTime: elem?.isOpen
                ? moment(elem?.startTime, ["h:mm A"]).format("HH:mm")
                : "",
              endTime: elem?.isOpen
                ? moment(elem?.endTime, ["h:mm A"]).format("HH:mm")
                : "",
              isOpen: elem?.isOpen,
              isOpenCheck: elem?.isOpen,
            };
            slotTime.Saturday = saturday;
          }
          if (elem?.day === "Sunday") {
            let sunday = {
              slotConcurrence: elem?.slotConcurrence,
              startTime: elem?.isOpen
                ? moment(elem?.startTime, ["h:mm A"]).format("HH:mm")
                : "",
              endTime: elem?.isOpen
                ? moment(elem?.endTime, ["h:mm A"]).format("HH:mm")
                : "",
              isOpen: elem?.isOpen,
              isOpenCheck: elem?.isOpen,
            };
            slotTime.Sunday = sunday;
          }
          return;
        });
        setEditData(true);
      }
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };
  useEffect(() => {
    handleSubcategory();
  }, [categoryValue]);

  useEffect(() => {
    setCompanyAvatar(user?.data?.user?.imageUrl);
    // if (stopRef.current === false) {
    handleFetchWorkshop();
    // validateCompanyPlan();
    // }
    if (planTitle === PlanTypeEnum.StarterPlan) {
      setCompanyUserValidate({
        planStatus: false,
        planInfo: "Please subscribe enterprise plan first",
      });
    } else {
      setCompanyUserValidate({
        planStatus: true,
        planInfo: "",
      });
    }
    // return () => { stopRef.current = true }
  }, [formReload]);

  useEffect(() => {

    return () => {
      setProfileImg("")
    }
  }, [reload]);
  const getBannerdate = (Bannerdate) => {
    // Parse the input date using Moment.js
    const date = moment(Bannerdate, "YYYY-MM-DD");
    // Subtract 5 days from the input date
    const resultDate = date.subtract(5, "days");
    // Format the result date as a string in the same format as the input
    const formattedDate = resultDate.format("YYYY-MM-DD");

    if (
      Bannerdate > formattedDate &&
      currentPlanInfo?.planTitle !== "Starter Plan"
    ) {
      dispatch(showBanneronCompanyside(true));
    } else {
      dispatch(showBanneronCompanyside(false));
    }
    return formattedDate;
  };

  useEffect(() => {
    getBannerdate(currentPlanInfo?.renewDate);
  }, [currentPlanInfo]);

  const getcurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLocation({
          lat: position.coords.latitude,
          lang: position.coords.longitude,
        });
      });
    } else {
      console.log("Not Available");
    }
  };

  useEffect(() => {
    getcurrentLocation();
  }, []);

  return {
    formik,
    loading,
    filterBy,
    hoursOptions,
    hours,
    setHours,
    handleUploadImage,
    companyAvatar,
    offerOptions,
    offersValue,
    setOffersValue,
    setCompanyLanguages,
    offerLanguges,
    companyLanguages,
    handleUploadMultipleImages,
    uploadDocuments,
    setCountryValue,
    countryValue,
    handleDeleteDocument,
    onChangeState,
    slotTime,
    companyUserValidate,
    profileLoading,
    categoryValue,
    setCategoryValue,
    setSubCategoryValue,
    subCategoryValue,
    subCategoryOption,
    user,
    handleChange,
    fetchLoading,
    editData,
    planTitle,
    profileImg,
    updateCompName,
    handleChangelocation,
    handleLocation,
    currentPlanInfo,
    showBanner,
    popupvisible,
    setpopupvisible,
    currentLocation,
    address,
    setAddress,
    clickedLocation,
    setClickedLocation,
    expireTimeDuration,
    loaderspecficFile,
    uploadPercentage,
    findIndex,
    deleteIndex,
    deleteLoading
  };
};

export default UseWorkshop;
