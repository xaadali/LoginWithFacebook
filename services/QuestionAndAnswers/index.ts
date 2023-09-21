import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const getQuestions = async () => {
  return await HTTP_CLIENT.get("/questions/question-list")
}

export const postAnswer = async (data: object) => {
  return await HTTP_CLIENT.post("/answers/write-answer", data)
}