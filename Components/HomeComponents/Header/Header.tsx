/* eslint-disable @next/next/no-img-element */

import Button from "@component/Components/__common/Button";
import DropDown from "@component/Components/__common/Dropdown/DropDown";
import styles from "./Header.module.scss";
import useHeader from "./useHeader";
import Maps from "@component/Components/__common/Popups/maps";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GOOGLE_API_KEY } from "@component/utills/enum";
import { BiBorderRadius } from "react-icons/bi";
import dynamic from "next/dynamic";
const DynamicGooglePlacesAutocomplete = dynamic(
  () => import("react-google-places-autocomplete"),
  { ssr: false }
);

const Header = () => {
  const {
    navigateExplore,
    filterBy,
    setFilterBy,
    loading,
    category,
    handleSubcategory,
    subCategoryOption,
    onchange,
    setAddress,
    address,
    setClickedLocation,
    clickedLocation,
    setpopupvisible,
    popupvisible,
    setValue,
    value,
    setSelectedInputValue,
    selectedInputValue,
    locationDataRef,
    addressLoading,
    setFilterradiusBy,
    filterRadiusby,
    handleRadiusOncahnge,
    RadiusOption,
    t,
    btnLoading,
  } = useHeader();
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
          <label>
            {t("homePage.headerMainHeading.your")}{" "}
            <span> {t("homePage.headerMainHeading.mechanic")}</span>{" "}
            {t("homePage.headerMainHeading.oneStep")}
          </label>
          <div className={styles.searchContainer}>
            <div className={styles.categoryBtns}>
              <button
                className={category === "car" ? styles.btn : styles.categoryBtn}
                onClick={() => {
                  handleSubcategory("car");
                }}
              >
                {t("homePage.machines.car")}
              </button>
              <button
                className={
                  category === "motorcycle" ? styles.btn : styles.categoryBtn
                }
                onClick={() => {
                  handleSubcategory("motorcycle");
                }}
              >
                {t("homePage.machines.motorcycle")}
              </button>
              <button
                className={
                  category === "agriculture" ? styles.btn : styles.categoryBtn
                }
                onClick={() => {
                  handleSubcategory("agriculture");
                }}
              >
                {t("homePage.machines.agriculture")}
              </button>
              <button
                className={
                  category === "truck" ? styles.btn : styles.categoryBtn
                }
                onClick={() => {
                  handleSubcategory("truck");
                }}
              >
                {t("homePage.machines.truck")}
              </button>
              <button
                className={category === "bus" ? styles.btn : styles.categoryBtn}
                onClick={() => {
                  handleSubcategory("bus");
                }}
              >
                {t("homePage.machines.bus")}
              </button>
              <button
                className={category === "van" ? styles.btn : styles.categoryBtn}
                onClick={() => {
                  handleSubcategory("van");
                }}
              >
                {t("homePage.machines.van")}
              </button>
              <button
                className={
                  category === "laundry" ? styles.btn : styles.categoryBtn
                }
                onClick={() => {
                  handleSubcategory("laundry");
                }}
              >
                {t("homePage.machines.laundry")}
              </button>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <div className={styles.dropDown}>
                  <DropDown
                    selected={filterBy}
                    setSelected={(res) => {
                      setFilterBy(res);
                    }}
                    options={subCategoryOption?.map((item: any) => item?.value)}
                    showRightIcon={false}
                    rightIcon={"/icons/dropDownList.svg"}
                    mainStyle={true}
                    border={false}
                    onChange={onchange}
                  />
                </div>
                <div
                  className={styles.input}
                  // onClick={() => setpopupvisible(true)}
                >
                  <DynamicGooglePlacesAutocomplete
                    autocompletionRequest={{
                      componentRestrictions: {
                        country: ["ES"],
                      },
                    }}
                    apiKey={GOOGLE_API_KEY.API_KEY}
                    selectProps={{
                      value,
                      onChange: setValue,

                      placeholder: t("locationText"),
                      styles: {
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                          height: "100%",
                          border: "none !important",
                          cursor: "text",
                          outline: "none",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          "&:focus": {
                            boxShadow: "none",
                            border: "none",
                          },
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#222222",
                          border: "none !important",
                          outline: "none !important",
                          height: "100%",
                          // minHeight: "100%",
                          padding: "0.6rem 0",
                          borderRadius: "8px",
                        }),
                        option: (provided) => ({
                          ...provided,
                          color: "#808080",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#808080",
                        }),
                      },
                    }}
                  />
                </div>
                <div className={styles.dropDownTwo}>
                  <DropDown
                    selected={
                      filterRadiusby === "No Radius"
                        ? t("radiusText")
                        : `${filterRadiusby} KM`
                    }
                    setSelected={(res) => {
                      setFilterradiusBy(res);
                    }}
                    options={RadiusOption?.map((item: any) => item?.value)}
                    showRightIcon={true}
                    rightIcon={"/icons/dropDownList.svg"}
                    mainStyle={true}
                    border={false}
                    onChange={handleRadiusOncahnge}
                    radius={true}
                  />
                </div>
                <div className={styles.btnWrap}>
                  <Button
                    name={t("lookFor")}
                    changeStyle={false}
                    onClick={navigateExplore}
                    loading={btnLoading}
                  />
                </div>
              </div>
              {value?.length >= 1 && selectedInputValue && !addressLoading ? (
                <div className={styles.locationData} ref={locationDataRef}>
                  {[...Array(6)].map((e, i) => (
                    <div
                      className={styles.textWrapper}
                      key={i}
                      onClick={() => {
                        setValue("Testing Location");
                        setSelectedInputValue(false);
                      }}
                    >
                      Testing Location
                    </div>
                  ))}
                </div>
              ) : value?.length >= 1 && selectedInputValue && addressLoading ? (
                <div className={styles.locationData} ref={locationDataRef}>
                  {[...Array(5)].map((e, i) => (
                    <div className={styles.loadingTextWrapper} key={i}>
                      <Skeleton
                        // baseColor="#fff"
                        highlightColor="#666"
                        style={{
                          height: "20px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.circularWrapper}>
            <div className={styles.circle}>
              <img src={"/icons/circle.svg"} alt="circle_img" />
            </div>
            <div className={styles.arrowIcon}>
              <img src={"/icons/dowArrow.svg"} alt="circle_img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
