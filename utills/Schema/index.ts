import * as yup from "yup";

export const ProfessionalworkShopSchema = yup.object({
  name: yup.string().required("Please enter name and surname"),
  reg: yup.string().required("Please enter registration number"),
  // address: yup.string().required("Please enter workshop address"),
  contact: yup
    .string()
    .matches(/^\+\d{1,3}\d{9,}$/, "Phone number is not valid")
    .required("Please enter contract number"),
  des: yup.string().required("Please enter description"),
  // offer: yup.string().required("Please select an offer options"),
  // languages: yup.string().required("Please select an Language"),
  duration: yup.string().required("Please select slot duration"),
  specialties: yup.string().required("Please add atleast one specialties"),
  country: yup.string().required("Please select country"),
  category: yup.string().required("Please select category"),
  subcategory: yup.string().required("Please select subcategory"),
});

export const FreeworkShopSchema = yup.object({
  name: yup.string().required("Please enter name and surname"),
  reg: yup.string().required("Please enter registration number"),
  // address: yup.string().required("Please enter workshop address"),
  contact: yup
    .string()
    .matches(/^\+\d{1,3}\d{9,}$/, "Phone number is not valid")
    .required("Please enter contract number"),
  // des: yup.string().required("Please enter description"),
  // offer: yup.string().required("Please select an offer options"),
  // languages: yup.string().required("Please select an Language"),
  duration: yup.string().required("Please select slot duration"),
  specialties: yup.string().required("Please add atleast one specialties"),
  country: yup.string().required("Please select country"),
  category: yup.string().required("Please select category"),
  subcategory: yup.string().required("Please select subcategory"),
});

export const LoginSchema = yup.object({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .max(255)
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
export const ResetPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup.string().required("Please select subcategory"),
});

export const AreYouProfessionalSchema = yup.object({
  name: yup.string().required("Company name is required"),
  vat: yup
    .string()
    .min(9, "The VAT number must be 9-12 characters long.")
    .max(12, "The VAT number must be 9-12 characters long.")
    .required("Vat no. is required"),
  // address: yup.string().required("Address  is required"),
  phone: yup.number().required("Phone number  is required"),
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
  rentingCompany: yup.string().required("Renting company name is required"),
  radioValue: yup
    .mixed()
    .oneOf(["option1", "option2"], "Please select an option")
    .required("Please select an option"),
  id: yup.number(),
  terms: yup.boolean().oneOf([true], "Please accept the terms"),
});
