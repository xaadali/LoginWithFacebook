import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const getReviews = async (companyId: number | string) => {
  return await HTTP_CLIENT.get(`/reviews/company-review-list?companyId=${companyId}`)
}
