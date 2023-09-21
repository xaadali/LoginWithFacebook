/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Modal from "@component/Components/__common/modal";
import moment from "moment";
import { AiFillHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { Calendar } from "react-multi-date-picker";
import MapModal from "../../MapModal";
import ExperienceComp from "./ExperienceComp";
import styles from "./mechanicDetails.module.scss";
import useMechanicDetail from "./useMechanicDetail";
import Maps from "@component/Components/__common/Popups/maps";
import { useState } from "react";

const MechanicDetailsComp = () => {
  const {
    popupvisible,
    setpopupvisible,
    selectedItems,
    handleSelectSlot,
    navigateBookingAppointment,
    handleDateChange,
    handlebookAppointment,
    handleMonthChange,
    bookingDate,
    specficMechanicdetail,
    setitem,
    availableSlots,
    dataLoading,
    modifyArray,
    less,
    handleMorespecialties,
    user,
    handleFavourit,
    handleFavouritemechanics,
    favroriteLoading,
    simpleLoader,
    clickedLocation,
    setClickedLocation,
    handleMessageData,
    allFalse,
    handleMapAddress,
    btnLoading,
  } = useMechanicDetail();
  console.log(
    "🚀 ~ file: index.tsx:47 ~ MechanicDetailsComp ~ specficMechanicdetail:",
    specficMechanicdetail
  );
  console.log(
    "🚀 ~ file: index.tsx:47 ~ MechanicDetailsComp ~ setitem:",
    setitem
  );
  const [address, setAddress] = useState();

  // const [popupvisible, setpopupvisible] = useState(false);

  return (
    <>
      {/* <Modal visible={popupvisible} onClose={() => setpopupvisible(false)}>
        <MapModal />
      </Modal> */}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputStyle}>
              <input placeholder="Search..." type="text" />
              <BsSearch className={styles.pIcon} />
            </div>
          </div>
          <div className={styles.leftSide}>
            <div className={styles.card}>
              <div className={styles.left}>
                <div className={styles.upperContainer}>
                  <div className={styles.imgWrapper}>
                    {/* <img src="../icons/nissan.svg" /> */}
                    <img src={specficMechanicdetail?.imageUrl} alt="no-image" />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.title}>
                      {specficMechanicdetail?.fullName}
                    </div>
                    {/* <div className={styles.subTitle}>Car Mechanic</div> */}
                    <div className={styles.ratingBox}>
                      <div className={styles.stars}>
                        {Math.round(
                          specficMechanicdetail?.companyReviews
                            ? specficMechanicdetail?.companyReviews
                            : specficMechanicdetail?.reviews
                        ) === 6 ? (
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
                                Number(
                                  Math.round(
                                    specficMechanicdetail?.companyReviews
                                      ? specficMechanicdetail?.companyReviews
                                      : specficMechanicdetail?.reviews
                                  ) || 0
                                )
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
                      <div className={styles.reviews}>
                        {specficMechanicdetail?.companyReviews === null
                          ? 0
                          : specficMechanicdetail?.companyReviews
                          ? specficMechanicdetail?.totalCount
                          : specficMechanicdetail?.totalCount}{" "}
                        Reviews
                      </div>
                    </div>
                    <div className={styles.btnWrapper}>
                      <div
                        className={styles.sendButton}
                        onClick={() => handleMessageData(specficMechanicdetail)}
                      >
                        <RiMessage2Fill />
                        <span>Send Message</span>
                      </div>
                      {/* <div
                        className={styles.bookButton}
                        onClick={() => handlebookAppointment()}
                      >
                        <FaCalendarAlt className={styles.icon} />
                        <span>Book Appointment</span>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className={styles.footer}>
                  <div className={styles.btnWrapper}>
                    <div className={styles.sendButton}>
                      <RiMessage2Fill />
                      <span
                        onClick={() => handleMessageData(specficMechanicdetail)}
                      >
                        Send Message
                      </span>
                    </div>
                    {/* <div
                      className={styles.bookButton}
                      onClick={() => handlebookAppointment()}
                    >
                      <FaCalendarAlt className={styles.icon} />
                      <span>Book Appointment</span>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                {user?.data?.access_token == undefined ||
                user?.data?.access_token == "" ? (
                  <FaRegHeart onClick={() => handleFavourit()} />
                ) : (
                  <>
                    {favroriteLoading && simpleLoader === 0 ? (
                      <RotatingLines
                        strokeColor="#00c3a5"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="22"
                        visible={true}
                      />
                    ) : specficMechanicdetail?.isFavourite ? (
                      <AiFillHeart
                        onClick={() =>
                          handleFavouritemechanics(specficMechanicdetail, 0)
                        }
                      />
                    ) : null}
                    {favroriteLoading && simpleLoader === 1 ? (
                      <RotatingLines
                        strokeColor="#00c3a5"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="22"
                        visible={true}
                      />
                    ) : !specficMechanicdetail?.isFavourite ? (
                      <FaRegHeart
                        onClick={() =>
                          handleFavouritemechanics(specficMechanicdetail, 1)
                        }
                      />
                    ) : null}
                  </>
                )}
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.inquiries}>
                <div className={styles.heading}>Inquiries </div>
                <div className={styles.devider}></div>
                <div className={styles.locationCard}>
                  <div className={styles.leftSide}>
                    <div className={styles.left}>
                      <img src="../icons/route.svg" />
                    </div>
                    <div className={styles.right}>
                      <div className={styles.text1}>
                        {/* Liberty Avenue, 4 Entlo. 1ºC,<span> Murcia</span> */}
                        {specficMechanicdetail?.workshopAddress?.title}
                      </div>
                      {/* <div className={styles.text2}>Car Mechanic </div> */}
                    </div>
                  </div>
                  <div className={styles.rightSide}>
                    {specficMechanicdetail?.workshopAddress?.title != "" && (
                      <div
                        className={styles.addressBTn}
                        onClick={
                          () =>
                            handleMapAddress(
                              specficMechanicdetail?.workshopAddress
                            )
                          // setpopupvisible(true)
                        }
                      >
                        <FaMapMarkerAlt className={styles.icon} />
                        Address
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.languageCard}>
                  <div className={styles.left}>
                    <img
                      src={"../icons/languageIcon.svg"}
                      className={styles.icon}
                    />
                    {/* <SiWolframlanguage className={styles.icon} /> */}
                  </div>
                  <div className={styles.right}>
                    <div className={styles.text1}>Languages</div>
                    <div className={styles.text2}>{modifyArray?.join(",")}</div>
                  </div>
                </div>
                <div className={styles.phoneCard}>
                  <div className={styles.left}>
                    <img src="../icons/phone.svg" className={styles.icon} />
                    {/* <BsTelephoneFill className={styles.icon} /> */}
                  </div>
                  <div className={styles.right}>
                    <div className={styles.text1}>
                      {specficMechanicdetail?.workshopContactNo}
                    </div>
                    {/* <div className={styles.text2}>636 16..... Show number</div> */}
                  </div>
                </div>
                <div className={styles.workshopHrs}>
                  <div className={styles.left}>
                    {/* <MdWorkOutline />{" "} */}
                    <img src="../icons/timer.svg" className={styles.icon} />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.text1}>Workshop hours</div>
                    <div className={styles.slots}>
                      <div className={styles.days}>
                        Monday,{" "}
                        {specficMechanicdetail?.workingHours?.Monday ===
                        "00:00-00:00"
                          ? "  OFF"
                          : specficMechanicdetail?.workingHours?.Monday}
                      </div>
                      <div className={styles.days}>
                        Tuesday,{" "}
                        {specficMechanicdetail?.workingHours?.Tuesday ===
                        "00:00-00:00"
                          ? "  OFF"
                          : specficMechanicdetail?.workingHours?.Tuesday}
                      </div>
                      <div className={styles.days}>
                        Wednesday,{" "}
                        {specficMechanicdetail?.workingHours?.Wednesday ===
                        "00:00-00:00"
                          ? "  OFF"
                          : specficMechanicdetail?.workingHours?.Wednesday}
                      </div>
                    </div>
                    <div className={styles.slots}>
                      <div className={styles.days}>
                        Thursday,{" "}
                        {specficMechanicdetail?.workingHours?.Thursday ===
                        "00:00-00:00"
                          ? "  OFF"
                          : specficMechanicdetail?.workingHours?.Thursday}
                      </div>
                      <div className={styles.days}>
                        Friday,{" "}
                        {specficMechanicdetail?.workingHours?.Friday ===
                        "00:00-00:00"
                          ? "  OFF"
                          : specficMechanicdetail?.workingHours?.Friday}
                      </div>
                      <div className={styles.days}>
                        Saturday,{" "}
                        {specficMechanicdetail?.workingHours?.Saturday ===
                        "00:00-00:00"
                          ? "  OFF"
                          : specficMechanicdetail?.workingHours?.Saturday}
                      </div>
                    </div>

                    <div className={styles.slots}>
                      <div className={styles.days}>
                        Sunday,{" "}
                        {specficMechanicdetail?.workingHours?.Sunday ===
                        "00:00-00:00"
                          ? "  OFF"
                          : specficMechanicdetail?.workingHours?.Sunday}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Specialties}>
                <div className={styles.heading}>Specialties</div>
                <div className={styles.devider}></div>
                <div className={styles.buttons}>
                  {specficMechanicdetail?.specialties?.length > 8 ? (
                    <>
                      {less
                        ? specficMechanicdetail?.specialties
                            ?.slice(0, 7)
                            ?.map((item, index) => {
                              return <span key={index}>{item}</span>;
                            })
                        : specficMechanicdetail?.specialties?.map(
                            (item, index) => {
                              return <span key={index}>{item}</span>;
                            }
                          )}
                    </>
                  ) : (
                    specficMechanicdetail?.specialties?.map((item, index) => {
                      return <span key={index}>{item}</span>;
                    })
                  )}
                </div>
                {specficMechanicdetail?.specialties?.length > 8 ? (
                  <>
                    <div className={styles.moreless}>
                      <button onClick={handleMorespecialties}>
                        {less ? "Show More" : "Less More"}
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <ExperienceComp />
          </div>
          <div className={styles.rightSide}>
            <div className={styles.card}>
              {specficMechanicdetail?.companyPlan === "Starter Plan" ? (
                <>
                  <img src="../icons/nobooking.png" alt="no-icon" />{" "}
                </>
              ) : (
                <>
                  <div className={styles.calenderWrapper}>
                    <Calendar
                      className={styles.libraryCalender}
                      value={bookingDate}
                      onChange={(e) =>
                        handleDateChange(specficMechanicdetail, e)
                      }
                      onMonthChange={handleMonthChange}
                      minDate={new Date()}
                    />
                  </div>

                  <div className={styles.availbleSlots}>
                    <div className={styles.heading}>
                      Available Slots <br /> On{" "}
                      {moment(
                        availableSlots?.selectedDate
                          ? availableSlots?.selectedDate
                          : specficMechanicdetail?.currentDate
                      ).format("DD MMMM")}
                      {/* {moment(setitem?.currentDate).format("DD MMMM")} */}
                    </div>
                    <div className={styles.btnWrapper}>
                      {(specficMechanicdetail?.companySlots?.length === 0 &&
                        availableSlots?.slots?.length === 0) ||
                      allFalse ? (
                        <>
                          <p>
                            No Available slots on{" "}
                            {moment(
                              availableSlots?.selectedDate === undefined
                                ? bookingDate
                                : availableSlots?.selectedDate
                            ).format("DD MMMM")}
                          </p>
                        </>
                      ) : (
                        <>
                          {dataLoading ? (
                            <RotatingLines
                              strokeColor="#3d83df"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="22"
                              visible={true}
                            />
                          ) : (
                            availableSlots?.slots?.map((item, index) => {
                              return (
                                <div
                                  className={
                                    selectedItems.includes(item.startTime)
                                      ? styles.selected
                                      : styles.btn
                                  }
                                  key={index}
                                  onClick={() => handleSelectSlot(item)}
                                >
                                  {item?.startTime}
                                </div>
                              );
                            })
                          )}
                        </>
                      )}
                    </div>
                    <div
                      className={styles.bookBtn}
                      onClick={() =>
                        navigateBookingAppointment(
                          specficMechanicdetail,
                          setitem
                        )
                      }
                    >
                      <button>
                        {btnLoading ? (
                          <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="22"
                            visible={true}
                          />
                        ) : (
                          <>
                            <img src="../icons/cal.svg" />
                            &nbsp; Book Appointment
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
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

export default MechanicDetailsComp;
