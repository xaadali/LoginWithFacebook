import React from "react";

const filterArrayData = () => {
  const FilterType = (type) => {
    if (type === "user") {
      return true;
    }
    return false;
  };

  const FilterLocation = (type) => {
    if (type === "user") {
      return true;
    }
    return false;
  };

  return { FilterType, FilterLocation };
};

export default filterArrayData;
