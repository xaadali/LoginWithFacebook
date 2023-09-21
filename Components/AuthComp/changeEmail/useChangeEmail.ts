import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
  import { useSelector ,useDispatch} from "react-redux";
import { handleChangeEmail } from "@component/services/AccountSettings";
import { logoutUser } from "@component/services/UserSignup";
import { signOut } from "next-auth/react";
import { resetUserState } from "@component/store/reducers/userReducer";

const UseChangeEmail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);
    let userid = user?.data?.user?.id;
  let userEmail = user?.data?.user?.email;
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: yup
        .string()
        .max(255)
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),

    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, { resetForm });
    },
  });
  const handleSubmit = async (values: any, { resetForm }) => {
    try {
      setLoading(true);
      let params = {
        email:userEmail,
        newEmail: values?.email,
        password:values?.password
      };
   const res = await handleChangeEmail(params);
   toast.success(res?.data?.message);
   setLoading(false);
 resetForm();
 const response = await logoutUser();
 if (response) {
   await signOut({
     callbackUrl: "/",
   });
   dispatch(resetUserState()); }
    } catch (error) {
      setLoading(false);
      if(Array.isArray(error?.response?.data?.message)){
        toast.error(error?.response?.data?.message[0]);
        toast.error(error?.response?.data?.message[1]);
      }
      else {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  const handleBackscreen = () => {
    router.back();
  };

  return {
    formik,
    showPass,
    setShowPass,
    handleBackscreen,loading
  };
};

export default UseChangeEmail;
