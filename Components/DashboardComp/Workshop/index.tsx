/* eslint-disable @next/next/no-img-element */

import Switch from "@component/Components/__common/ToggleSwitch/switch";
import { CgSoftwareUpload } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";
import { BsDash } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineAdd } from "react-icons/md";
import UseWorkshop from "./useWirkshop";
import TagsInput from "react-tagsinput";
import styles from "./workshop.module.scss";
import Select from "react-select";
import makeAnimated, { Input } from "react-select/animated";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import { Rings, RotatingLines } from "react-loader-spinner";
import HoverVideoPlayer from "react-hover-video-player";
import { useState } from "react";
import {
  CategoryOptions,
  countryOptionsforWorkshop,
  PlanTypeEnum,
} from "@component/utills/enum";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import Map from "@component/Components/__common/Map";
import Banner from "@component/Components/__common/Banner";
import Maps from "@component/Components/__common/Popups/maps";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { GetBrowserInfo } from "@component/services/browserServices";
import ProgressBarComp from "@component/Components/__common/ProgressbarComp";
const animatedComponents = makeAnimated();
const TimePicker = dynamic(() => import("react-time-picker-input"), {
  ssr: false,
});

const WorkshopComp = () => {
  const browser = GetBrowserInfo();
  const {
    formik,
    loading,
    filterBy,
    hoursOptions,
    hours,
    setHours,
    handleUploadImage,
    companyAvatar,
    offerOptions,
    offersValue,
    setOffersValue,
    setCompanyLanguages,
    offerLanguges,
    companyLanguages,
    handleUploadMultipleImages,
    uploadDocuments,
    setCountryValue,
    countryValue,
    handleDeleteDocument,
    onChangeState,
    slotTime,
    companyUserValidate,
    profileLoading,
    categoryValue,
    setCategoryValue,
    setSubCategoryValue,
    subCategoryValue,
    subCategoryOption,
    user,
    handleChange,
    fetchLoading,
    editData,
    planTitle,
    profileImg,
    updateCompName,
    handleChangelocation,
    handleLocation,
    currentPlanInfo,
    showBanner,
    popupvisible,
    setpopupvisible,
    currentLocation,
    address,
    setAddress,
    clickedLocation,
    setClickedLocation,
    expireTimeDuration,
    loaderspecficFile,
    uploadPercentage,
    findIndex,
    deleteIndex,
    deleteLoading
  } = UseWorkshop();

  const handleTestSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  // ############PlanTypeEnum
  // for QA testing
  // ############
  const format = "hh:mm A";
  useEffect(() => {
    formik.setFieldValue("address", "sample");
  }, [fetchLoading]);

  const planStatue = () => {
    if (
      currentPlanInfo?.isTrial === false &&
      currentPlanInfo?.planTitle === PlanTypeEnum.StarterPlan
    ) {
      return true;
    } else if (
      currentPlanInfo?.isTrial === true &&
      currentPlanInfo?.planTitle === PlanTypeEnum.StarterPlan
    ) {
      return true;
    } else {
      return false;
    }
  };

  // ############
  // for QA testing
  // ############

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {showBanner && expireTimeDuration ? (
            <div style={{ width: "90%" }}>
              <Banner currentPlanInfo={currentPlanInfo} />
            </div>
          ) : null}

          {fetchLoading ? (
            <CompLoader />
          ) : (
            <form onSubmit={formik.handleSubmit}>
              {/* <form onSubmit={handleTestSubmit} > */}
              <div className={styles.header}>
                <div className={styles.profileWrapper}>
                  <div className={styles.logoHeader}>
                    <div className={styles.logo}>
                      {profileLoading ? (
                        <Rings
                          height="80"
                          width="80"
                          color="#3d83df"
                          radius="6"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="rings-loading"
                        />
                      ) : (
                        <img
                          src={
                            profileImg
                              ? URL.createObjectURL(profileImg)
                              : companyAvatar
                                ? companyAvatar
                                : ""
                          }
                          alt="no-icon"
                          width={100}
                          height={100}
                        />
                      )}
                      <label className={styles.addBtn} htmlFor="UploadWorkshop">
                        <CgSoftwareUpload />
                        &nbsp; Add
                      </label>
                      <input
                        type="file"
                        id="UploadWorkshop"
                        onChange={(e) => handleUploadImage(e)}
                      />
                    </div>
                    <div className={styles.InfoText}>Recommended size: 1MB</div>
                  </div>
                  <div className={styles.brandName}>
                    {updateCompName
                      ? updateCompName
                      : user?.data?.user?.fullName}
                  </div>
                </div>
                <div className={styles.specialties}>
                  <div className={styles.headingWrapper}>
                    <div className={styles.heading}>Specialties & Country</div>
                    <div className={styles.addBtn}></div>
                  </div>
                  <div className={styles.dropDownWrapper}>
                    <TagsInput
                      value={filterBy?.tags?.length ? filterBy?.tags : []}
                      onChange={(event: any) => {
                        if (
                          planTitle === PlanTypeEnum.StarterPlan &&
                          filterBy?.tags?.length > 1
                        ) {
                          toast.error(
                            "You can add only 2 specialities in this plan."
                          );
                          return;
                        }
                        if (
                          planTitle === PlanTypeEnum.ProfessionalPlan &&
                          filterBy?.tags?.length > 3
                        ) {
                          toast.error(
                            "You can add only 4 specialities in this plan."
                          );
                          return;
                        }
                        handleChange(event);
                        formik.setFieldValue("specialties", event[0]);
                      }}
                      inputProps={{ placeholder: "Add Specialties" }}
                    />
                    {formik.touched.specialties && formik.errors.specialties ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.specialties}
                      </div>
                    ) : null}

                    <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={countryOptionsforWorkshop}
                      value={countryValue}
                      onChange={(event: any) => {
                        formik.setFieldValue("country", event?.value);
                        const modifyCountry = [event];
                        setCountryValue(modifyCountry);
                      }}
                      placeholder="Select Country"
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.country}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={styles.registrationWrapper}>
                <div className={styles.heading}>Registration Number</div>
                <div className={styles.inputs}>
                  <div className={styles.inputWrapper}>
                    <label>Name and Surname</label>
                    <div className={styles.inputStyle}>
                      <input
                        placeholder="eg Nissan"
                        type="text"
                        {...formik.getFieldProps("name")}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.inputWrapper}>
                    <label>Registration No.</label>
                    <div className={styles.inputStyle}>
                      <input
                        placeholder="e.g. J08000123"
                        type="text"
                        {...formik.getFieldProps("reg")}
                      />
                    </div>
                    {formik.touched.reg && formik.errors.reg ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.reg}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={styles.contactWrapper}>
                <div className={styles.heading}>Contact and Address</div>
                <div className={styles.inputWrapper}>
                  <label>Workshop Address</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="Workshop Address"
                      type="text"
                      // {...formik.getFieldProps("address")}
                      value={address}
                      onClick={() => setpopupvisible(true)}
                    // onChange={(e) => {
                    //   formik.setFieldValue("address", e?.target?.value);
                    //   handleChangelocation(e);
                    // }}
                    />
                  </div>
                  {/* {formik.touched.address && formik.errors.address ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.address}
                    </div>
                  ) : null} */}
                </div>
                <div className={styles.inputWrapper}>
                  <label>Contact Number</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="Contact Number"
                      type="text"
                      {...formik.getFieldProps("contact")}
                    />
                  </div>
                  {formik.touched.contact && formik.errors.contact ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.contact}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.desWrapper}>
                <div className={styles.header}>
                  <div className={styles.heading}>Description</div>
                  <div className={styles.badge}>
                    {PlanTypeEnum.EnterprisePlan}
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <div className={styles.inputStyle}>
                    <textarea
                      {...formik.getFieldProps("des")}
                      readOnly={!companyUserValidate.planStatus} // Use readOnly instead of disabled
                      placeholder="Add Description...."
                      onClick={() => {
                        if (!companyUserValidate.planStatus) {
                          toast.error(
                            "Please subscribe enterprise plan to use this feature."
                          );
                        }
                      }}
                    />
                  </div>
                  {formik.touched.des && formik.errors.des ? (
                    <div className={styles.errorStyle}>{formik.errors.des}</div>
                  ) : null}
                </div>
              </div>
              <div className={styles.hoursWrapper}>
                <div className={styles.heading}>Workshop Working Hours</div>
                <div className={styles.slots}>
                  <div className={styles.slotWrapper}>
                    <div className={styles.text}>Slot Duration</div>
                    <div className={styles.drowDownCountry}>
                      <Select
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        placeholder="Select Hours"
                        options={hoursOptions}
                        value={hours}
                        isDisabled={
                          slotTime?.Sunday?.isOpenCheck ||
                          slotTime?.Saturday?.isOpenCheck ||
                          slotTime?.Friday?.isOpenCheck ||
                          slotTime?.Thursday?.isOpenCheck ||
                          slotTime?.Wednesday?.isOpenCheck ||
                          slotTime?.Tuesday?.isOpenCheck ||
                          slotTime?.Monday?.isOpenCheck
                        }
                        onChange={(event: any) => {
                          formik.setFieldValue("duration", event?.value);
                          setHours(event);
                        }}
                      />
                      {formik.touched.duration && formik.errors.duration ? (
                        <div className={styles.errorStyle}>
                          {formik.errors.duration}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className={styles.weekContainer}>
                  <div className={styles.row}>
                    <div className={styles.weekWrapper}>
                      <div className={styles.weekDay}>Sunday</div>
                      <div className={styles.statusWrapper}>
                        <Switch
                          // disabledState={slotTime?.Sunday?.isOpenCheck}
                          onChange={onChangeState}
                          StarterPlan={planStatue()}
                          checked={
                            planStatue() ? false : slotTime?.Sunday?.isOpen
                          }
                          dayName="Sunday"
                          name="Sunday"
                          value={
                            planStatue() ? false : slotTime?.Sunday?.isOpen
                          }
                        />
                        <div className={styles.status}>
                          {slotTime?.Sunday?.isOpen ? "Open" : "Closed"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          value={slotTime?.Sunday?.startTime}
                          type="time"
                          name="starTime"
                          onChange={(e) => {
                            onChangeState(
                              "startTime",
                              e.target.value,
                              "Sunday"
                            );
                          }}
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            // disabled={
                            //   slotTime?.Sunday?.isOpenCheck ? true : false
                            // }
                            placeholder=""
                            value={slotTime?.Sunday?.startTime}
                            type="time"
                            typeof="time"
                            name="startTime"
                            onChange={(e) =>
                              onChangeState(
                                "startTime",
                                e.target.value,
                                "Sunday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={slotTime?.Sunday?.startTime || "10:00 PM"}
                            // disabled={
                            //   slotTime?.Sunday?.isOpenCheck ? true : false
                            // }
                            onChange={(newTime) =>
                              onChangeState("startTime", newTime, "Sunday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.dash}>
                        <BsDash />
                      </div>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Sunday?.endTime}
                          name="endTime"
                          onChange={(e) =>
                            onChangeState("endTime", e.target.value, "Sunday")
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Sunday?.endTime}
                            type="time"
                            typeof="time"
                            name="endTime"
                            onChange={(e) =>
                              onChangeState("endTime", e.target.value, "Sunday")
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={
                              slotTime?.Sunday?.endTime === "00:00"
                                ? "11:59 PM"
                                : slotTime?.Sunday?.endTime
                            }
                            onChange={(newTime) =>
                              onChangeState("endTime", newTime, "Sunday")
                            }
                          />
                        )}
                      </div> */}

                      <div className={styles.cross}>
                        <RxCross2 />
                      </div>
                    </div>
                    <div className={styles.slotSelection}>
                      <span>Slot Concurrence</span>
                      <input
                        readOnly={slotTime?.Sunday?.isOpenCheck ? true : false} // Use readOnly instead of disabled
                        onClick={() => {
                          if (slotTime?.Sunday?.isOpenCheck ? true : false) {
                            toast.error("You can only add slot once.");
                          }
                        }}
                        // disabled={slotTime?.Sunday?.isOpenCheck ? true : false}
                        type="number"
                        // min="1"
                        className={styles.SlotInput}
                        placeholder="slot concurrence"
                        value={slotTime?.Sunday?.slotConcurrence}
                        onChange={(e) =>
                          onChangeState(
                            "slotConcurrence",
                            Number(e.target.value),
                            "Sunday"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.weekWrapper}>
                      <div className={styles.weekDay}>Monday</div>
                      <div className={styles.statusWrapper}>
                        <Switch
                          // disabledState={slotTime?.Monday?.isOpenCheck}
                          onChange={onChangeState}
                          StarterPlan={planStatue()}
                          checked={
                            planTitle != PlanTypeEnum.StarterPlan
                              ? slotTime?.Monday?.isOpen
                              : false
                          }
                          dayName="Monday"
                          name="Monday"
                          value={slotTime?.Monday?.isOpen}
                        />
                        <div className={styles.status}>
                          {" "}
                          {slotTime?.Monday?.isOpen ? "Open" : "Closed"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Monday?.startTime}
                          name="starTime"
                          onChange={(e) =>
                            onChangeState("startTime", e.target.value, "Monday")
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Monday?.startTime}
                            type="time"
                            typeof="time"
                            name="startTime"
                            onChange={(e) =>
                              onChangeState(
                                "startTime",
                                e.target.value,
                                "Monday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={slotTime?.Monday?.startTime || "10:00 AM"}
                            onChange={(newTime) =>
                              onChangeState("startTime", newTime, "Monday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.dash}>
                        <BsDash />
                      </div>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Monday?.endTime}
                          name="endTime"
                          onChange={(e) =>
                            onChangeState("endTime", e.target.value, "Monday")
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Monday?.endTime}
                            type="time"
                            typeof="time"
                            name="endTime"
                            onChange={(e) =>
                              onChangeState("endTime", e.target.value, "Monday")
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={
                              slotTime?.Monday?.endTime === "00:00"
                                ? "11:59 PM"
                                : slotTime?.Monday?.endTime
                            }
                            onChange={(newTime) =>
                              onChangeState("endTime", newTime, "Monday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.cross}>
                        <RxCross2 />
                      </div>
                    </div>
                    <div className={styles.slotSelection}>
                      <span>Slot Concurrence</span>
                      <input
                        readOnly={slotTime?.Monday?.isOpenCheck ? true : false} // Use readOnly instead of disabled
                        onClick={() => {
                          if (slotTime?.Monday?.isOpenCheck ? true : false) {
                            toast.error("You can only add slot once.");
                          }
                        }}
                        type="number"
                        min="1"
                        className={styles.SlotInput}
                        placeholder="slot concurrence"
                        value={
                          slotTime?.Monday?.slotConcurrence
                            ? slotTime?.Monday?.slotConcurrence
                            : null
                        }
                        onChange={(e) =>
                          onChangeState(
                            "slotConcurrence",
                            Number(e.target.value),
                            "Monday"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.weekWrapper}>
                      <div className={styles.weekDay}>Tuesday</div>
                      <div className={styles.statusWrapper}>
                        <Switch
                          // disabledState={slotTime?.Tuesday?.isOpenCheck}
                          onChange={onChangeState}
                          StarterPlan={planStatue()}
                          checked={slotTime?.Tuesday?.isOpen}
                          dayName="Tuesday"
                          name="Tuesday"
                          value={slotTime?.Tuesday?.isOpen}
                        />
                        <div className={styles.status}>
                          {slotTime?.Tuesday?.isOpen ? "Open" : "Closed"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Tuesday?.startTime}
                          name="starTime"
                          onChange={(e) =>
                            onChangeState(
                              "startTime",
                              e.target.value,
                              "Tuesday"
                            )
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Tuesday?.startTime}
                            type="time"
                            typeof="time"
                            name="startTime"
                            onChange={(e) =>
                              onChangeState(
                                "startTime",
                                e.target.value,
                                "Tuesday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={slotTime?.Tuesday?.startTime || "10:00 AM"}
                            onChange={(newTime) =>
                              onChangeState("startTime", newTime, "Tuesday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.dash}>
                        <BsDash />
                      </div>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Tuesday?.endTime}
                          name="endTime"
                          onChange={(e) =>
                            onChangeState("endTime", e.target.value, "Tuesday")
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Tuesday?.endTime}
                            type="time"
                            typeof="time"
                            name="endTime"
                            onChange={(e) =>
                              onChangeState(
                                "endTime",
                                e.target.value,
                                "Tuesday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={
                              slotTime?.Tuesday?.endTime === "00:00"
                                ? "11:59 PM"
                                : slotTime?.Tuesday?.endTime
                            }
                            onChange={(newTime) =>
                              onChangeState("endTime", newTime, "Tuesday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.cross}>
                        <RxCross2 />
                      </div>
                    </div>
                    <div className={styles.slotSelection}>
                      <span>Slot Concurrence</span>
                      <input
                        readOnly={slotTime?.Tuesday?.isOpenCheck ? true : false} // Use readOnly instead of disabled
                        onClick={() => {
                          if (slotTime?.Tuesday?.isOpenCheck ? true : false) {
                            toast.error("You can only add slot once.");
                          }
                        }}
                        type="number"
                        // min="1"
                        className={styles.SlotInput}
                        placeholder="slot concurrence"
                        value={
                          slotTime?.Tuesday?.slotConcurrence
                            ? slotTime?.Tuesday?.slotConcurrence
                            : null
                        }
                        onChange={(e) =>
                          onChangeState(
                            "slotConcurrence",
                            Number(e.target.value),
                            "Tuesday"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.weekWrapper}>
                      <div className={styles.weekDay}>Wednesday</div>
                      <div className={styles.statusWrapper}>
                        <Switch
                          // disabledState={slotTime?.Wednesday?.isOpenCheck}
                          onChange={onChangeState}
                          StarterPlan={planStatue()}
                          checked={slotTime?.Wednesday?.isOpen}
                          dayName="Wednesday"
                          name="Wednesday"
                          value={slotTime?.Wednesday?.isOpen}
                        />
                        <div className={styles.status}>
                          {slotTime?.Wednesday?.isOpen ? "Open" : "Closed"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Wednesday?.startTime}
                          name="starTime"
                          onChange={(e) =>
                            onChangeState(
                              "startTime",
                              e.target.value,
                              "Wednesday"
                            )
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Wednesday?.startTime}
                            type="time"
                            typeof="time"
                            name="startTime"
                            onChange={(e) =>
                              onChangeState(
                                "startTime",
                                e.target.value,
                                "Wednesday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={slotTime?.Wednesday?.startTime || "10:00 AM"}
                            onChange={(newTime) =>
                              onChangeState("startTime", newTime, "Wednesday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.dash}>
                        <BsDash />
                      </div>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Wednesday?.endTime}
                          name="endTime"
                          onChange={(e) =>
                            onChangeState(
                              "endTime",
                              e.target.value,
                              "Wednesday"
                            )
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Wednesday?.endTime}
                            type="time"
                            typeof="time"
                            name="endTime"
                            onChange={(e) =>
                              onChangeState(
                                "endTime",
                                e.target.value,
                                "Wednesday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={
                              slotTime?.Wednesday?.endTime === "00:00"
                                ? "11:59 PM"
                                : slotTime?.Wednesday?.endTime
                            }
                            onChange={(newTime) =>
                              onChangeState("endTime", newTime, "Wednesday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.cross}>
                        <RxCross2 />
                      </div>
                    </div>
                    <div className={styles.slotSelection}>
                      <span>Slot Concurrence</span>
                      <input
                        readOnly={
                          slotTime?.Wednesday?.isOpenCheck ? true : false
                        } // Use readOnly instead of disabled
                        onClick={() => {
                          if (slotTime?.Wednesday?.isOpenCheck ? true : false) {
                            toast.error("You can only add slot once.");
                          }
                        }}
                        type="number"
                        min="1"
                        className={styles.SlotInput}
                        value={
                          slotTime?.Wednesday?.slotConcurrence
                            ? slotTime?.Wednesday?.slotConcurrence
                            : null
                        }
                        placeholder="slot concurrence"
                        onChange={(e) =>
                          onChangeState(
                            "slotConcurrence",
                            Number(e.target.value),
                            "Wednesday"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.weekWrapper}>
                      <div className={styles.weekDay}>Thursday</div>
                      <div className={styles.statusWrapper}>
                        <Switch
                          // disabledState={slotTime?.Thursday?.isOpenCheck}
                          onChange={onChangeState}
                          StarterPlan={planStatue()}
                          checked={slotTime?.Thursday?.isOpen}
                          dayName="Thursday"
                          name="Thursday"
                          value={slotTime?.Thursday?.isOpen}
                        />
                        <div className={styles.status}>
                          {slotTime?.Thursday?.isOpen ? "Open" : "Closed"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Thursday?.startTime}
                          name="starTime"
                          onChange={(e) =>
                            onChangeState(
                              "startTime",
                              e.target.value,
                              "Thursday"
                            )
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Thursday?.startTime}
                            type="time"
                            typeof="time"
                            name="startTime"
                            onChange={(e) =>
                              onChangeState(
                                "startTime",
                                e.target.value,
                                "Thursday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={slotTime?.Thursday?.startTime || "10:00 AM"}
                            onChange={(newTime) =>
                              onChangeState("startTime", newTime, "Thursday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.dash}>
                        <BsDash />
                      </div>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Thursday?.endTime}
                          name="endTime"
                          onChange={(e) =>
                            onChangeState("endTime", e.target.value, "Thursday")
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Thursday?.endTime}
                            type="time"
                            typeof="time"
                            name="endTime"
                            onChange={(e) =>
                              onChangeState(
                                "endTime",
                                e.target.value,
                                "Thursday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={
                              slotTime?.Thursday?.endTime === "00:00"
                                ? "11:59 PM"
                                : slotTime?.Thursday?.endTime
                            }
                            onChange={(newTime) =>
                              onChangeState("endTime", newTime, "Thursday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.cross}>
                        <RxCross2 />
                      </div>
                    </div>
                    <div className={styles.slotSelection}>
                      <span>Slot Concurrence</span>
                      <input
                        readOnly={
                          slotTime?.Thursday?.isOpenCheck ? true : false
                        } // Use readOnly instead of disabled
                        onClick={() => {
                          if (slotTime?.Thursday?.isOpenCheck ? true : false) {
                            toast.error("You can only add slot once.");
                          }
                        }}
                        type="number"
                        min="1"
                        className={styles.SlotInput}
                        value={
                          slotTime?.Thursday?.slotConcurrence
                            ? slotTime?.Thursday?.slotConcurrence
                            : null
                        }
                        placeholder="slot concurrence"
                        onChange={(e) =>
                          onChangeState(
                            "slotConcurrence",
                            Number(e.target.value),
                            "Thursday"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.weekWrapper}>
                      <div className={styles.weekDay}>Friday</div>
                      <div className={styles.statusWrapper}>
                        <Switch
                          // disabledState={slotTime?.Friday?.isOpenCheck}
                          onChange={onChangeState}
                          StarterPlan={planStatue()}
                          checked={slotTime?.Friday?.isOpen}
                          dayName="Friday"
                          name="Friday"
                          value={slotTime?.Friday?.isOpen}
                        />
                        <div className={styles.status}>
                          {slotTime?.Friday?.isOpen ? "Open" : "Closed"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Friday?.startTime}
                          name="starTime"
                          onChange={(e) =>
                            onChangeState("startTime", e.target.value, "Friday")
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Friday?.startTime}
                            type="time"
                            typeof="time"
                            name="startTime"
                            onChange={(e) =>
                              onChangeState(
                                "startTime",
                                e.target.value,
                                "Friday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={slotTime?.Friday?.startTime || "10:00 AM"}
                            onChange={(newTime) =>
                              onChangeState("startTime", newTime, "Friday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.dash}>
                        <BsDash />
                      </div>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Friday?.endTime}
                          name="endTime"
                          onChange={(e) =>
                            onChangeState("endTime", e.target.value, "Friday")
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Friday?.endTime}
                            type="time"
                            typeof="time"
                            name="endTime"
                            onChange={(e) =>
                              onChangeState("endTime", e.target.value, "Friday")
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={
                              slotTime?.Friday?.endTime === "00:00"
                                ? "11:59 PM"
                                : slotTime?.Friday?.endTime
                            }
                            onChange={(newTime) =>
                              onChangeState("endTime", newTime, "Friday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.cross}>
                        <RxCross2 />
                      </div>
                    </div>
                    <div className={styles.slotSelection}>
                      <span>Slot Concurrence</span>
                      <input
                        readOnly={slotTime?.Friday?.isOpenCheck ? true : false} // Use readOnly instead of disabled
                        onClick={() => {
                          if (slotTime?.Friday?.isOpenCheck ? true : false) {
                            toast.error("You can only add slot once.");
                          }
                        }}
                        type="number"
                        min="1"
                        className={styles.SlotInput}
                        value={
                          slotTime?.Friday?.slotConcurrence
                            ? slotTime?.Friday?.slotConcurrence
                            : null
                        }
                        placeholder="slot concurrence"
                        onChange={(e) =>
                          onChangeState(
                            "slotConcurrence",
                            Number(e.target.value),
                            "Friday"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.weekWrapper}>
                      <div className={styles.weekDay}>Saturday</div>
                      <div className={styles.statusWrapper}>
                        <Switch
                          // disabledState={slotTime?.Saturday?.isOpenCheck}
                          onChange={onChangeState}
                          StarterPlan={planStatue()}
                          checked={slotTime?.Saturday?.isOpen}
                          dayName="Saturday"
                          name="Saturday"
                          value={slotTime?.Saturday?.isOpen}
                        />
                        <div className={styles.status}>
                          {slotTime?.Saturday?.isOpen ? "Open" : "Closed"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Saturday?.startTime}
                          name="starTime"
                          onChange={(e) =>
                            onChangeState(
                              "startTime",
                              e.target.value,
                              "Saturday"
                            )
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Saturday?.startTime}
                            type="time"
                            typeof="time"
                            name="startTime"
                            onChange={(e) =>
                              onChangeState(
                                "startTime",
                                e.target.value,
                                "Saturday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={slotTime?.Saturday?.startTime || "10:00 AM"}
                            onChange={(newTime) =>
                              onChangeState("startTime", newTime, "Saturday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.dash}>
                        <BsDash />
                      </div>
                      <div className={styles.inputStyle}>
                        <input
                          placeholder=""
                          type="time"
                          value={slotTime?.Saturday?.endTime}
                          name="endTime"
                          onChange={(e) =>
                            onChangeState("endTime", e.target.value, "Saturday")
                          }
                        />
                      </div>
                      {/* <div className={styles.inputStyle}>
                        {browser !== "Safari" ? (
                          <input
                            placeholder=""
                            value={slotTime?.Saturday?.endTime}
                            type="time"
                            typeof="time"
                            name="endTime"
                            onChange={(e) =>
                              onChangeState(
                                "endTime",
                                e.target.value,
                                "Saturday"
                              )
                            }
                          />
                        ) : (
                          <TimePicker
                            // @ts-ignore
                            hour12Format
                            eachInputDropdown
                            manuallyDispalyDropdown
                            value={
                              slotTime?.Saturday?.endTime === "00:00"
                                ? "11:59 PM"
                                : slotTime?.Saturday?.endTime
                            }
                            onChange={(newTime) =>
                              onChangeState("endTime", newTime, "Saturday")
                            }
                          />
                        )}
                      </div> */}
                      <div className={styles.cross}>
                        <RxCross2 />
                      </div>
                    </div>
                    <div className={styles.slotSelection}>
                      <span>Slot Concurrence</span>
                      <input
                        readOnly={
                          slotTime?.Saturday?.isOpenCheck ? true : false
                        } // Use readOnly instead of disabled
                        onClick={() => {
                          if (slotTime?.Saturday?.isOpenCheck ? true : false) {
                            toast.error("You can only add slot once.");
                          }
                        }}
                        type="number"
                        // min="1"
                        className={styles.SlotInput}
                        value={
                          slotTime?.Saturday?.slotConcurrence
                            ? slotTime?.Saturday?.slotConcurrence
                            : null
                        }
                        placeholder="slot concurrence"
                        onChange={(e) =>
                          onChangeState(
                            "slotConcurrence",
                            Number(e.target.value),
                            "Saturday"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.galleryWrapper}>
                <div className={styles.header}>
                  <div className={styles.heading}>Photos</div>
                  {/* <div className={styles.badge}>premium</div> */}
                </div>
                <div className={styles.photoPremium}>
                  <label className={styles.text1} htmlFor="premiumPhoto">
                    <MdOutlineAdd className={styles.Addicon} />
                    Add
                  </label>

                  <input
                    type="file"
                    id="premiumPhoto"
                    multiple={true}
                    onChange={(e) => handleUploadMultipleImages(e, "photos")}
                  />
                  <div className={styles.text2}>
                    {uploadDocuments.photos?.map((item, index) => (
                      <div className={styles.imageBox} key={index}>
                        <RxCrossCircled
                          className={styles.closeIcon}
                          onClick={() => handleDeleteDocument(item, "photos", index)}
                        />
                        <img
                          src={
                            item?.url ? item?.url : URL.createObjectURL(item)
                          }
                          alt="Certifications"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.header}>
                  <div className={styles.InfoText}>Recommended size: 1MB</div>
                </div>
              </div>
              <div className={styles.galleryWrapper}>
                <div className={styles.header}>
                  <div className={styles.heading}>Certificates</div>
                  <div className={styles.badge}>
                    {" "}
                    {PlanTypeEnum.EnterprisePlan}
                  </div>
                </div>
                <div
                  className={styles.certifications}
                  onClick={(e) => {
                    if (!companyUserValidate.planStatus) {
                      toast.error(
                        "Please subscribe enterprise plan to use this feature."
                      );
                      return;
                    }
                  }}
                >
                  <label className={styles.text1} htmlFor="Certifications">
                    <MdOutlineAdd className={styles.Addicon} />
                    Add
                  </label>

                  <input
                    type="file"
                    id="Certifications"
                    disabled={!companyUserValidate.planStatus ? true : false}
                    multiple={true}
                    onChange={(e) =>
                      handleUploadMultipleImages(e, "Certifications")
                    }
                  />
                  <div className={styles.text2}>
                    {uploadDocuments.certifications?.map((elem, index) => (
                      <div className={styles.imageBox} key={index}>
                        <RxCrossCircled
                          className={styles.closeIcon}
                          onClick={() =>
                            handleDeleteDocument(elem, "certificates", index)
                          }
                        />
                        <img
                          src={
                            elem?.url ? elem?.url : URL.createObjectURL(elem)
                          }
                          alt="Certifications"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.header}>
                  <div className={styles.InfoText}>Recommended size: 1MB</div>
                </div>
              </div>
              <div className={styles.galleryWrapper}>
                <div className={styles.header}>
                  <div className={styles.heading}>Videos</div>
                  <div className={styles.badge}>
                    {" "}
                    {PlanTypeEnum.EnterprisePlan}
                  </div>
                </div>
                <div
                  className={styles.youtubeVideos}
                  onClick={(e) => {
                    if (
                      !companyUserValidate.planStatus ||
                      planTitle === PlanTypeEnum.ProfessionalPlan
                    ) {
                      toast.error(
                        "Please subscribe enterprise plan to use this feature."
                      );
                      return;
                    }
                  }}
                >
                  <label className={styles.text1} htmlFor="videos">
                    <MdOutlineAdd className={styles.Addicon} />
                    Add
                  </label>

                  <input
                    type="file"
                    id="videos"
                    disabled={
                      !companyUserValidate.planStatus ||
                        planTitle === PlanTypeEnum.ProfessionalPlan
                        ? true
                        : false
                    }
                    accept="video/mp4,video/x-m4v,video/*"
                    multiple={true}
                    onChange={(e) => {
                      handleUploadMultipleImages(e, "videos");
                    }}
                  />
                  <div className={styles.text2}>
                    {uploadDocuments.videos?.map((elm, index) => (
                      <div className={styles.imageBox} key={index}>
                        {/* {loaderspecficFile ? (
                          <RotatingLines
                            strokeColor="#DF3D3D"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="15"
                            visible={true}
                          />
                        ) : ( */}
                        {loading ? "" :
                          <RxCrossCircled
                            className={styles.closeIcon}
                            onClick={deleteLoading ? undefined : () => handleDeleteDocument(elm, "videos", index)}
                          />
                        }
                        {/* )} */}

                        <HoverVideoPlayer
                          videoSrc={
                            elm?.url ? elm?.url : URL.createObjectURL(elm)
                          }
                          videoStyle={{
                            height: "100%",
                            width: "100%",
                            zIndex: 0,
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        />
                        <div className={deleteLoading ? styles.ProgressBarLoading : styles.ProgressBar}>
                          {deleteIndex === index && deleteLoading && <RotatingLines
                            strokeColor="#3D83DF"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="45"
                            visible={true}
                          />}
                          {findIndex === index && uploadPercentage > 0 &&

                            <ProgressBarComp percentage={uploadPercentage} />
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.header}>
                  <div className={styles.InfoText}>Recommended size: 25MB</div>
                </div>
              </div>
              <div className={styles.languageWrapper}>
                <div className={styles.left}>
                  <div className={styles.headingWrapper}>
                    <div className={styles.leftSide}>
                      <div className={styles.heading}>Our offer</div>
                      <div className={styles.badge}> {planTitle}</div>
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={offerOptions}
                      placeholder="View Offer"
                      value={offersValue}
                      onChange={(event: any) => {
                        // if (!companyUserValidate.planStatus) {
                        //   toast.error(
                        //     "Please subscribe enterprise plan to use this feature."
                        //   );
                        //   return;
                        // }
                        formik.setFieldValue("offer", event[0]?.value);
                        setOffersValue(event);
                      }}
                    />
                    {formik.touched.offer && formik.errors.offer ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.offer}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.left}>
                  <div className={styles.headingWrapper}>
                    <div className={styles.leftSide}>
                      <div className={styles.heading}>Languages</div>
                      <div className={styles.badge}>
                        {" "}
                        {PlanTypeEnum.EnterprisePlan}
                      </div>
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder="Select Languages"
                      isMulti
                      options={offerLanguges}
                      value={companyLanguages}
                      onChange={(event: any) => {
                        if (!companyUserValidate.planStatus) {
                          toast.error(
                            "Please subscribe enterprise plan to use this feature."
                          );
                          return;
                        }
                        formik.setFieldValue("languages", event[0]?.value);
                        setCompanyLanguages(event);
                      }}
                    />
                    {formik.touched.languages && formik.errors.languages ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.languages}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={styles.languageWrapper}>
                <div className={styles.left}>
                  <div className={styles.headingWrapper}>
                    <div className={styles.leftSide}>
                      <div className={styles.heading}>Select Category</div>
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder="Select Category"
                      options={CategoryOptions}
                      value={categoryValue}
                      isMulti
                      onChange={(event: any) => {
                        if (
                          planTitle === PlanTypeEnum.StarterPlan &&
                          event?.length >= 2
                        ) {
                          toast.error(
                            "You can add only 1 Category in this plan."
                          );
                          return;
                        }
                        if (
                          planTitle === PlanTypeEnum.ProfessionalPlan &&
                          event?.length >= 3
                        ) {
                          toast.error(
                            "You can add only 2 Categorys in this plan."
                          );
                          return;
                        } else {
                          formik.setFieldValue("category", event[0]?.value);
                          // const modifyResponseCat = [event];
                          setCategoryValue(event);
                        }
                      }}
                    />
                    {formik.touched.category && formik.errors.category ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.category}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.left}>
                  <div className={styles.headingWrapper}>
                    <div className={styles.leftSide}>
                      <div className={styles.heading}>Select Sub Category</div>
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder="Select Sub Category"
                      isMulti
                      options={subCategoryOption}
                      value={subCategoryValue}
                      onChange={(event: any) => {
                        if (
                          planTitle === PlanTypeEnum.StarterPlan &&
                          event?.length >= 2
                        ) {
                          toast.error(
                            "You can add only 1 Sub Category in this plan."
                          );
                          return;
                        }
                        if (
                          planTitle === PlanTypeEnum.ProfessionalPlan &&
                          event?.length >= 3
                        ) {
                          toast.error(
                            "You can add only 2 Sub Categorys in this plan."
                          );
                          return;
                        } else {
                          formik.setFieldValue("subcategory", event[0]?.value);
                          setSubCategoryValue(event);
                        }
                      }}
                    />
                    {formik.touched.subcategory && formik.errors.subcategory ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.subcategory}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.left}>
                  <div className={styles.text}>
                    Remember to complete your profile as much as possible to get
                    the best results.
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.cancelBtn}>Cancel</div>
                  <button className={styles.saveBtn} disabled={loading ? true : false} type="submit">
                    {loading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="15"
                        visible={true}
                      />
                    ) : editData ? (
                      "Update Changes"
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      {/* <Map handleLocation={handleLocation} /> */}
      <Maps
        clickedLocation={clickedLocation}
        setClickedLocation={setClickedLocation}
        setAddress={setAddress}
        popupvisible={popupvisible}
        setpopupvisible={setpopupvisible}
      // currentLocation={currentLocation}
      // address={address}
      />
    </>
  );
};

export default WorkshopComp;
