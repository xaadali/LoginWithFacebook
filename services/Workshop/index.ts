import { HTTP_CLIENT } from "@component/utills/axiosClient";


export const createCompWorkshop = async (data: object) => {
  return await HTTP_CLIENT.post("/workshop/create-workshop", data)
}

export const updateCompWorkshop = async (workshopId: number | string, data: object) => {
  return await HTTP_CLIENT.put(`/workshop/update-workshop/${workshopId}`, data)
}
export const fecthCompWorkshop = async (companyId: number | string) => {
  return await HTTP_CLIENT.get(`/workshop/get-workshop?companyId=${companyId}`)
}

