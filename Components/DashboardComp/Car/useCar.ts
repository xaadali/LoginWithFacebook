import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from "draft-js";
// import htmlToDraft from "html-to-draftjs";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  getCarSpecficDetail,
  getcarData,
} from "@component/store/reducers/carReducer";
import {
  addCar,
  deleteSpecficCarId,
  getCarlisting,
  getSpecficCarDetail,
  updateCar,
} from "@component/services/Car";
const htmlToDraft = dynamic<any>((): any => import("html-to-draftjs"), {
  ssr: false,
});
const useCar = (setCarEditing?: any, stateForUpdateing?: any) => {
  const location = useRouter();
  const dispatch = useDispatch();
  const [openAddCar, setOpenAddCar] = useState(false);
  const [updateState, setUpdatestate] = useState(false);
  const [popupvisible, setpopupvisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Deleteloading, setDeleteloading] = useState(false);
  const [saveCarloading, setSavecarLoading] = useState(false);
  const [carId, setCarId] = useState<string>();
  const { user } = useSelector((state: any) => state?.user);
  const { carList, specficCarDetail } = useSelector((state: any) => state?.car);
  let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;

  const [editorState, setEditorState] = useState<any>("");
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  // useEffect(() => {
  //   if (specficCarDetail && specficCarDetail?.description) {
  //     // @ts-ignore
  //     const blocksFromHtml = htmlToDraft(specficCarDetail?.description);
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     const contentState = ContentState.createFromBlockArray(
  //       contentBlocks,
  //       entityMap
  //     );
  //     const editorState = EditorState.createWithContent(contentState);
  //     setEditorState(editorState);
  //   }
  // }, [specficCarDetail]);
  const formik = useFormik({
    initialValues: {
      name:
        specficCarDetail && specficCarDetail
          ? (specficCarDetail.name as string)
          : "",
      modal:
        specficCarDetail && specficCarDetail
          ? (specficCarDetail.modelNo as string)
          : "",
      year:
        specficCarDetail && specficCarDetail
          ? (specficCarDetail.year as string)
          : "",
      registration:
        specficCarDetail && specficCarDetail
          ? (specficCarDetail.registrationNo as string)
          : "",
      chaseNumber:
        specficCarDetail && specficCarDetail
          ? (specficCarDetail.chassisNo as string)
          : "",
      rentingName:
        specficCarDetail && specficCarDetail
          ? (specficCarDetail.rentingcompName as string)
          : "",
      description:
        specficCarDetail && specficCarDetail
          ? (specficCarDetail.description as string)
          : "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Name must be longer than or equal to 2 characters")
        .max(30, "Name must not be longer than 30 characters")
        .required("Car Name is required")
        .trim("The name cannot include leading and trailing spaces"),
      modal: yup
        .string()
        .min(2, "Modal must be longer than or equal to 2 characters")
        .max(30, "Modal must not be longer than 30 characters")
        .required("Modal is required")
        .trim("The Modal cannot include leading and trailing spaces"),
      year: yup.number().required("Year is required"),
      registration: yup
        .string()
        .min(
          2,
          "Registration  number must be longer than or equal to 2 characters"
        )
        .max(30, "Registration  number must not be longer than 30 characters")
        .required("Registration is required")
        .trim(
          "The Registration  number cannot include leading and trailing spaces"
        ),
      // chaseNumber: yup.number().required("Chase number is required"),
      // rentingName: yup.string().max(255).required("Renting Name is required"),
      // description: yup.string().max(255).required("Description is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const getlisting = async () => {
    try {
      setLoading(true);
      const res = await getCarlisting(userid);
      dispatch(getcarData(res?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getlisting();
  }, []);
  const handleSubmit = async (values: any) => {
    let convert;

    try {
      if (editorState) {
        convert = await draftToHtml(
          convertToRaw(editorState?.getCurrentContent())
        );
      }
      if (stateForUpdateing === false) {
        setSavecarLoading(true);
        let params = {
          name: values?.name,
          modelNo: values?.modal,
          year: values?.year,
          registrationNo: values?.registration,
          chassisNo: values?.chaseNumber,
          rentingcompName: values?.rentingName,
          description: values.description || "",
          userId: userid,
          email: userEmail,
        };
        const res = await addCar(params);
        toast.success(res?.data?.message);
        setEditorState("");
      } else {
        setSavecarLoading(true);
        let params = {
          name: values?.name,
          modelNo: values?.modal,
          year: values?.year,
          registrationNo: values?.registration,
          chassisNo: values?.chaseNumber,
          rentingcompName: values?.rentingName,
          description: values.description || "",
        };
        const res = await updateCar(params, specficCarDetail?.carId);
        toast.success(res?.data?.message);
        setEditorState("");
      }
      setSavecarLoading(false);
      formik.resetForm();
      setCarEditing(false);
      setUpdatestate(false);
      dispatch(getCarSpecficDetail({}));
      getlisting();
    } catch (error) {
      setSavecarLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleOpendeleteModal = (id: string) => {
    setCarId(id);
    setpopupvisible(!popupvisible);
  };
  const handleDelete = async (id: string) => {
    try {
      setDeleteloading(true);
      const res = await deleteSpecficCarId(id);
      toast.success(res?.data?.message);
      setDeleteloading(false);
      setCarEditing(false);
      getlisting();
    } catch (error) {
      setDeleteloading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleOpenhelpModal = () => {
    setpopupvisible(!popupvisible);
  };
  const handleEdit = async (id: string) => {
    setOpenAddCar(true);
    setUpdatestate(true);
    try {
      const res = await getSpecficCarDetail(id);
      dispatch(getCarSpecficDetail(res?.data?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleUpdateClearstates = () => {
    dispatch(getCarSpecficDetail({}));
  };
  return {
    openAddCar,
    setOpenAddCar,
    handleOpendeleteModal,
    setpopupvisible,
    popupvisible,
    formik,
    loading,
    carList,
    carId,
    handleDelete,
    handleOpenhelpModal,
    handleEdit,
    updateState,
    setUpdatestate,
    handleUpdateClearstates,
    Deleteloading,
    saveCarloading,
    editorState,
    onEditorStateChange,
  };
};

export default useCar;
