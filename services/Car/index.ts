import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const getCarlisting = async (id: string) => {
  return await HTTP_CLIENT.get(`/cars/get-car-list/${id}`);
};

export const addCar = async (data: any) => {
  return await HTTP_CLIENT.post("/cars/add-car", data);
};
export const updateCar = async (data: any, id: string) => {
  return await HTTP_CLIENT.put(`/cars/update/${id}`, data);
};
export const deleteSpecficCarId = async (id: string) => {
  return await HTTP_CLIENT.delete(`/cars/delete/${id}`);
};

export const getSpecficCarDetail = async (id: string) => {
  return await HTTP_CLIENT.get(`/cars/get-car/${id}`);
};
