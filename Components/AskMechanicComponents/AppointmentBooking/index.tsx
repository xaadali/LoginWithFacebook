/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import DropDown from "@component/Components/__common/Dropdown/DropDown";
import { AiOutlineRight } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import styles from "./appointmentBooking.module.scss";
import UseAppointment from "./useAppointment";

const BookAppointmentComp = () => {
  const {
    formik,
    loading,
    setitem,
    filterBy,
    setFilterBy,
    carList,
    handlegetDetail,
    setPhone,
    savePhonenumberData,
    saveUserNamedata,
    dispatch,
    saveCarnameData,
    specficCarDetail,
    user,
    specficLoading,
  } = UseAppointment();
  console.log(
    "🚀 ~ file: index.tsx:29 ~ BookAppointmentComp ~ carList:",
    carList
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>Appointment Booking</div>
          <div className={styles.subHeading}>Personal Information</div>
          <div className={styles.details}>
            <form
              className={styles.perSonalInfo}
              onSubmit={formik.handleSubmit}
            >
              <div className={styles.formContent}>
                <div className={styles.subHeading}>Personal Information</div>
                <div className={styles.inputWrapper}>
                  <label>Personal information *</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="Name *"
                      type="text"
                      {...formik.getFieldProps("name")}
                      readOnly={user?.data?.user?.fullName ? true : false}
                      onChange={(e) => {
                        dispatch(saveUserNamedata(e.target.value)),
                          formik.setFieldValue("name", e.target.value);
                      }}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div className={styles.errorStyle}>
                      {formik?.errors?.name}
                    </div>
                  ) : null}
                </div>

                <div className={styles.inputWrapper}>
                  <label>Contact information *</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="Phone*"
                      type="text"
                      {...formik.getFieldProps("contactInfo")}
                      onChange={(e) => {
                        dispatch(savePhonenumberData(e.target.value)),
                          formik.setFieldValue("contactInfo", e.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.info}>
                    You will receive a code on this mobile to confirm the
                    appointment.
                  </div>

                  {formik.touched.contactInfo && formik.errors.contactInfo ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.contactInfo}
                    </div>
                  ) : null}
                </div>

                <div className={styles.inputWrapper}>
                  <label>Select Car*</label>
                  <div className={styles.dropDown}>
                    <DropDown
                      selected={filterBy}
                      setSelected={(res) => {
                        setFilterBy(res);
                        dispatch(saveCarnameData(res));
                        // handlegetDetail(res);
                        formik.setFieldValue("carName", res);
                      }}
                      // {...formik.getFieldProps("carName")}
                      options={carList?.data?.map((item: any) => item?.name)}
                      showRightIcon={false}
                      rightIcon={"/icons/dropDownList.svg"}
                      mainStyle={false}
                      border={true}
                      nav={true}
                    />
                  </div>

                  {formik.touched.carName && formik.errors.carName ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.carName}
                    </div>
                  ) : null}
                </div>
                {/* <div className={styles.inputWrapper}>
                  <label>Chassis Number*</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="Chassis Number*"
                      type="text"
                      // readOnly
                      readOnly={
                        specficCarDetail && specficCarDetail?.chassisNo
                          ? true
                          : false
                      }
                      {...formik.getFieldProps("chassisNo")}
                    />
                  </div>
                  {formik.touched.chassisNo && formik.errors.chassisNo ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.chassisNo}
                    </div>
                  ) : null}
                </div>
                <div className={styles.inputWrapper}>
                  <label>Registration Number*</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="Registration Number*"
                      type="text"
                      readOnly
                      {...formik.getFieldProps("registrationNo")}
                    />
                  </div>
                  {formik.touched.registrationNo &&
                  formik.errors.registrationNo ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.registrationNo}
                    </div>
                  ) : null}
                </div> */}

                <div className={styles.inputWrapper}>
                  <label>Comment for the Mechanic (optional)</label>
                  <div className={styles.areaStyle}>
                    <textarea
                      placeholder="You can add any comment that is of interest to the Mechanic "
                      {...formik.getFieldProps("comment")}
                    />
                  </div>
                </div>
                <div className={styles.btnWrapper}>
                  <button type="submit" disabled={specficLoading}>
                    {loading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="22"
                        visible={true}
                      />
                    ) : (
                      <>
                        <span>Confirm my appointment</span>
                        <AiOutlineRight />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className={styles.detailsWrapper}>
              <div className={styles.reviewsWrapper}>
                <div className={styles.header}>
                  <div className={styles.logo}>
                    <img src={setitem?.imageUrl} alt="no-image" />
                    {/* <img src="./icons/nissan.svg" /> */}
                  </div>
                  <div className={styles.detail}>
                    <div className={styles.brandName}>{setitem?.fullName}</div>
                    {/* <div className={styles.title}>
                      {setitem?.category?.map((item) => item?.value)} Mechanic
                    </div> */}
                    <div className={styles.ratingWrapper}>
                      <div className={styles.stars}>
                        {Math.round(setitem?.companyReviews) === 6 ? (
                          <>
                            {[...Array(Number(Math.round(5) || 0))]?.map(
                              (star, index) => {
                                return (
                                  <div
                                    className={styles.ratingBoxs}
                                    key={index}
                                  />
                                );
                              }
                            )}
                          </>
                        ) : (
                          <>
                            {[
                              ...Array(
                                Number(Math.round(setitem?.companyReviews) || 0)
                              ),
                            ]?.map((star, index) => {
                              return (
                                <div
                                  className={styles.ratingBoxs}
                                  key={index}
                                />
                              );
                            })}
                          </>
                        )}
                      </div>
                      <span>{setitem?.totalCount} reviews</span>
                    </div>
                  </div>
                </div>
                <div className={styles.location}>
                  <FaMapMarkerAlt />
                  <div className={styles.street}>
                    {/* Vinader Street 10, <span>Murcia</span> */}
                    {setitem?.workshopAddress?.title}
                  </div>
                </div>
                <div className={styles.devider}></div>
                <div className={styles.contactNumber}>
                  <BsTelephoneFill />{" "}
                  <span>
                    {setitem?.workshopContactNo
                      ? setitem?.workshopContactNo
                      : "N/A"}
                  </span>
                </div>
                {/* <div className={styles.contactNumber}>
                  <BsTelephoneFill /> <span>636 16..... Show number</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointmentComp;
