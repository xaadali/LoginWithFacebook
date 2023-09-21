import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const postQuestion = async (data: any) => {
  return await HTTP_CLIENT.post(`/questions/create-question`, data);
};
export const getQuestion = async (data?: any) => {
  return await HTTP_CLIENT.get(`/questions/question-list`);
};
