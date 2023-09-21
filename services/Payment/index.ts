import { HTTP_CLIENT } from "@component/utills/axiosClient";

interface PlanValidity {
  currency: string;
  amount: number | string;
  companyId: string | number,
  planId: number;
  duration: number | string;
  planTitle: string | number,
  email: string | number
}

export const getStripeIntent = async (data: object) => {
  return await HTTP_CLIENT.post("/payments/stripe-payment", data)
}

export const getSepaIntent = async (data: object) => {
  return await HTTP_CLIENT.post("/payments/sepa-payment", data)
}

export const checkPlanValidity = async (data: PlanValidity) => {
  return await HTTP_CLIENT.post(`/plans-subscription/check-plan-validity?companyId=${data?.companyId}&planTitle=${data?.planTitle}`)
}