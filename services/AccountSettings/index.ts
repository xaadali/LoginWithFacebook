import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const getuserName = async (email: string) => {
  return await HTTP_CLIENT.get(`/settings/get-name/${email}`);
};
export const addNewuserName = async (data: any) => {
  return await HTTP_CLIENT.post(`/settings/change-name`, data);
};

export const deleteUseraccount = async (data: any) => {
  return await HTTP_CLIENT.post(`/settings/delete-account`, data);
};

export const handleChangePassword = async (data: any) => {
  return await HTTP_CLIENT.post(`/auth/change-password`, data);
};
export const handleChangeEmail = async (data: any) => {
  return await HTTP_CLIENT.post(`/settings/change-email`, data);
};

export const changeCompanyName = async (params: any) => {
  return await HTTP_CLIENT.post("/settings/company-profile", params)
}