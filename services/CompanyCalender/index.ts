import { HTTP_CLIENT } from "@component/utills/axiosClient";

interface payloadAPi {
  companyId: number | string;
  day: string
}
export const fetchCompanyCalender = async (data: payloadAPi) => {
  return await HTTP_CLIENT.get(`/booking-management/company-day-bookings?companyId=${data?.companyId}&day=${data?.day}`)
}