import { HTTP_CLIENT } from "@component/utills/axiosClient";


export const historyDetaillist = async (id: string) => {
  return await HTTP_CLIENT.get(`/booking-management/user-history?userId=${id}`);
};


export const addReview = async (data:any) => {
    return await HTTP_CLIENT.post(`/reviews/create-review`, data);
}