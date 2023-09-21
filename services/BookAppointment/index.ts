import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const searchWorkshop = async (
  category: string,
  subCategory: string,
  country: string,
  day: string | null,
  date: Date | null | any,
  lat?: number,
  lng?: number,
  radius?: number,
  address?: string
) => {
  return await HTTP_CLIENT.get(
    `/workshop/look-for-companies?category=${category}&subCategory=${subCategory}&country=${country}&day=${day}&bookingDate=${date}&lat=${lat}&lng=${lng}&radius=${radius}&address=${address}`
  );
};
export const getSpecficslot = async (
  id: string,
  day: string | null,
  date: Date | null | any
) => {
  return await HTTP_CLIENT.get(
    `/workshop/get-workshop-slots?companyId=${id}&day=${day}&bookingDate=${date}`
  );
};

export const addAppointment = async (data: any) => {
  return await HTTP_CLIENT.post(`/booking-management/create-booking`, data);
};
export const handleSend = async (email: string, phoneNo: string) => {
  const newurl = new URLSearchParams();
  newurl.append("email", email);
  newurl.append("recipient", phoneNo);
  return await HTTP_CLIENT.post(`/sms/send?${newurl.toString()}`);
};
export const handleConfirmcode = async (data: any) => {
  return await HTTP_CLIENT.post(`/sms/verify-sms`, data);
};
export const handleResendcode = async (data: any) => {
  return await HTTP_CLIENT.post(``, data);
};
export const checkSlot = async (data: any) => {
  return await HTTP_CLIENT.post(`/booking-management/check-booking-slot`, data);
};
