import { HTTP_CLIENT } from "@component/utills/axiosClient";

interface BookingAPi {
  page: number;
  limit: number;
  status: string | number;
  bookingDate: string | number | null;
  companyId: string;
}
export const getBookingManagement = async (data: BookingAPi) => {
  return await HTTP_CLIENT.get(
    `/booking-management/get-bookings?page=${data?.page}&limit=${data?.limit}&status=${data?.status}&bookingDate=${data?.bookingDate}&companyId=${data?.companyId}`
  );
};

export const changeSingleBookingStatus = async (data: any) => {
  return await HTTP_CLIENT.post(
    `/booking-management/change-status?userId=${data?.userId}&companyId=${data?.companyId}&bookingId=${data?.bookingId}&status=${data?.status}&dateAsString=${data?.dateAsString}&today=${data?.today}&bookingDateAndTime=${data?.bookingDateAndTime}`
  );
};

export const postCompComment = async (data: any) => {
  return await HTTP_CLIENT.post("/booking-management/workshop-comment", data);
};
