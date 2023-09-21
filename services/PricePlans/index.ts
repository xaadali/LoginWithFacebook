import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const getPlans = async () => {
  return await HTTP_CLIENT.get("/plans/plan-list");
};

export const currentPlan = async (id: string | number) => {
  return await HTTP_CLIENT.get(`/plans-subscription/get-subscription/${id}`);
};
export const endPackage = async (data: any) => {
  return await HTTP_CLIENT.post(`/plans-subscription/cancel-plan`, data);
};
export const postBillingMethod = async (data: any) => {
  return await HTTP_CLIENT.get(
    `/billing/calculate-billing?companyId=${data?.companyId}&planId=${data?.planId}&billingType=${data?.billingType}`
  );
};
