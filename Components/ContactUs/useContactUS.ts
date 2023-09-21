import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
const UseContactUs = () => {
  const dispatch = useDispatch();
  const [terms, setTerms] = useState(false);
  const location = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      des: "",
      terms: false,
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      des: yup.string().max(500).required("Description is required"),
      terms: yup
        .boolean()
        .oneOf([true], "You need to accept the terms and conditions"),
    }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      let params = {
        email: values?.email,
        des: values?.des,
      };
    } catch (error) {}
  };

  return {
    formik,
    loading,
    setTerms,
    terms,
  };
};

export default UseContactUs;
