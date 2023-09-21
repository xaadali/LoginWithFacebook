import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const favouriteMechanic = async (
  companyId: string,
  userId: string,
  status: boolean,
  imageUrl: string,
  reviews: number,
  companyReviews: number
) => {
  return await HTTP_CLIENT.get(
    `/favourite/${companyId}/${userId}/${status}?imageUrl=${imageUrl}&reviews=${companyReviews}&totalCount=${reviews}`
  );
};
export const getAllfvtmechanic = async (email: string) => {
  return await HTTP_CLIENT.get(`/favourite/${email}`);
};
export const handleGetmechanicDetail = async (
  id: string,
  day: any

  // userId: any
) => {
  return await HTTP_CLIENT.get(
    `/workshop/workshop-details?companyId=${id}&day=${day}`
  );
};
export const getSinglefavoriteDetail = async (
  day: string | null,
  companyid: string,
  userid: string,
  date: Date | null | any
) => {
  return await HTTP_CLIENT.get(
    `/favourite/single/workshop?day=${day}&userId=${userid}&companyId=${companyid}&bookingDate=${date}`
  );
};
