import { GOOGLE_API_KEY } from "@component/utills/enum";
import axios from "axios";
import { toast } from "react-toastify";

// Geo Code Api //

export const handleGeocode = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_API_KEY.API_KEY}`
    );
    console.log("🚀 ~ file: index.ts:14 ~ handleGeocode ~ response:", response);

    if (response.data.results.length > 0) {
      const res = response.data.results[0].geometry.location;
      return res;
    } else {
      toast.error("Location not found. Please enter a valid address.");
    }
  } catch (error) {
    console.error("Error fetching geocode:", error);
  }
};

// Geo Address Api //

export const handleGeoAddress = async (address) => {
  // try {
  //   const response = await axios.get(
  //     "https://maps.googleapis.com/maps/api/place/autocomplete/json",
  //     {
  //       params: {
  //         input: address,
  //         key: GOOGLE_API_KEY.API_KEY,
  //         types: "address",
  //       },
  //     }
  //   );
  //   return response;
  // } catch (error) {
  //   console.error("Error fetching suggestions:", error);
  //   throw error; // Rethrow the error so the caller can handle it
  // }
};
