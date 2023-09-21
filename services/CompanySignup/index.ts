import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const companySingUp = async (data: object) => {
  return await HTTP_CLIENT.post("/company/signup", data);
};

export const checkCompanyValidity = async (data: object) => {
  return await HTTP_CLIENT.post("/user/check-company", data);
};

export const checkCompanyPlan = async (id: string | number) => {
  return await HTTP_CLIENT.post(
    `/plans-subscription/company-plan?companyId=${id}`
  );
};

export const getCompanyAnswer = async () => {
  return await HTTP_CLIENT.get("/answers/answer-list");
};
export const getUserQuestions = async () => {
  return await HTTP_CLIENT.get("/questions/user-questions");
};
export const getUserAnswers = async () => {
  return await HTTP_CLIENT.get("/answers/user-answers");
};
export const getQuestionDetail = async (
  id: string,
  page: number,
  limit: number
) => {
  return await HTTP_CLIENT.get(
    `/questions/user-questions/${id}?page=${page}&limit=${limit}`
  );
};
