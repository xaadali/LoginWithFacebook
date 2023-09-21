/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  checkCompanyValidity,
  companySingUp,
} from "@component/services/CompanySignup";
import modifyError from "@component/helper";
import useDebounce from "@component/utills/hooks/useDebounce";
import { SSOType } from "@component/utills/enum";
import { LanguagesEnum } from "@component/utills/languages";
import { AreYouProfessionalSchema } from "@component/utills/Schema";
const UseProfessionals = () => {
  const [checkEmail, setCheckEmail] = useState("");
  const [isCorrectEmail, setIsCorrectEmail] = useState<any>(null);
  const debouncedValue = useDebounce<string>(checkEmail, 1000);
  const dispatch = useDispatch();
  const location = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState();
  const [showPass, setShowPass] = useState(false);
  const [address, setAddress] = useState();
  const [clickedLocation, setClickedLocation] = useState<any>();
  const [popupvisible, setpopupvisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      vat: "",
      phone: "",
      email: "",
      password: "",
      rentingCompany: "",
      radioValue: "",
      id: "",
      terms: false,
    },
    validationSchema: AreYouProfessionalSchema,
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    if (!isCorrectEmail) {
      toast.error("Email already exist");
    }
    try {
      setLoading(true);
      let params = {
        fullName: values?.name,
        vatNo: values?.vat,
        address: address,
        email: values?.email,
        phoneNo: values?.phone,
        password: values?.password,
        rentingCompNames: values?.rentingCompany,
        workshopId: String(values?.id),
        terms: values.terms,
        loginAs: "normal",
        type: SSOType.Company,
      };
      const response = await companySingUp(params);
      toast.success(response?.data?.message);
      location.push("/login");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      modifyError(error);
    }
  };

  const handleCheckEmail = async () => {
    try {
      const params = {
        email: checkEmail,
        lang: LanguagesEnum.English,
      };
      const response = await checkCompanyValidity(params);
      setIsCorrectEmail(response?.data);
    } catch (error) {
      setIsCorrectEmail(false);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (checkEmail) handleCheckEmail();
  }, [debouncedValue]);

  useEffect(() => {
    setCheckEmail(formik.values.email);
  }, [formik.values.email]);

  return {
    formik,
    loading,
    value,
    setValue,
    showPass,
    setShowPass,
    isCorrectEmail,
    setAddress,
    address,
    setClickedLocation,
    clickedLocation,
    setpopupvisible,
    popupvisible,
  };
};

export default UseProfessionals;
