import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const getDates = async (id: string, month: number, year: number) => {
  return await HTTP_CLIENT.get(
    `/booking-management/my-dates?userId=${id}&month=${month}&year=${year}`
  );
};
export const getSpecficappoitmentData = async (id: string, date: string) => {
  return await HTTP_CLIENT.get(
    `/booking-management/booking-details?userId=${id}&bookingDate=${date}`
  );
};
export const handleCancelappointment = async (data: any) => {
  return await HTTP_CLIENT.post(`/booking-management/cancel-booking`, data);
};
