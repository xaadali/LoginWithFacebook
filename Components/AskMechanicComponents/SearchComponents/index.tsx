/* eslint-disable @next/next/no-img-element */
import FiltersDropDown from "@component/Components/__common/Dropdown/filterDropDown";
import { BsSearch } from "react-icons/bs";
import React, { useState } from "react";
import CalenderComp from "./calenderComp";
import styles from "./search.module.scss";
import MapModal from "../MapModal/index";
import Modal from "@component/Components/__common/modal";
import useSearchComponent from "./useSearch";
import Maps from "@component/Components/__common/Popups/maps";

const Search = () => {
  const {
    popupvisible,
    setpopupvisible,
    filterBy,
    setFilterBy,
    options,
    handleSortdata,
    searchingList,
    handleMapAddress,
    clickedLocation,
    setClickedLocation,
    setAddress,
  } = useSearchComponent();

  return (
    <>
      <Maps
        clickedLocation={clickedLocation}
        setClickedLocation={setClickedLocation}
        setAddress={setAddress}
        popupvisible={popupvisible}
        setpopupvisible={setpopupvisible}
        // currentLocation={currentLocation}
        // address={address}
      />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputStyle}>
              <input placeholder="Search..." type="text" />
              <BsSearch className={styles.pIcon} />
            </div>
          </div>
          {searchingList === null ? null : (
            <>
              <div className={styles.header}>
                <div className={styles.filterWrapper}>
                  <FiltersDropDown
                    selected={filterBy}
                    setSelected={(res) => {
                      setFilterBy(res);
                      handleSortdata(res);
                    }}
                    options={options}
                    showRightIcon={true}
                    rightIcon={"/icons/dropDownList.svg"}
                  />
                </div>
                {/* <div className={styles.mapWrapper}>
                  <div
                    className={styles.mapBtn}
                    onClick={() => setpopupvisible(true)}
                  >
                    <img src="/icons/map.svg" alt="map" />
                    <span>Map</span>
                  </div>
                </div> */}
              </div>
            </>
          )}

          <div className={styles.top}>
            <CalenderComp handleMapAddress={handleMapAddress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
