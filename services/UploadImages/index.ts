import { HTTP_CLIENT } from "@component/utills/axiosClient";

export const UploadCompProfileImage = async (data: object) => {
  return await HTTP_CLIENT.post("/workshop/upload-image", data);
};

export const UploadMultipleCompImages = async (
  data: any,
  type: string,
  workshopId: string | number,
  options: any
) => {
  if (options) {
    return await HTTP_CLIENT.post(
      `/workshop/upload-images?type=${type}&workshopId=${workshopId}`,
      data,
      options
    );
  } else {
    return await HTTP_CLIENT.post(
      `/workshop/upload-images?type=${type}&workshopId=${workshopId}`,
      data
    );
  }
};

export const deleteCompWorkshopPhotos = async (data: object) => {
  return await HTTP_CLIENT.post("/workshop/delete-image", data);
};
