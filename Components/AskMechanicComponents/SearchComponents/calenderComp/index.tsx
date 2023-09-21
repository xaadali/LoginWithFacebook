/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { EmptyCompo } from "@component/Components/__common/Empty";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import moment from "moment";
import { AiFillHeart } from "react-icons/ai";
import { FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { RotatingLines } from "react-loader-spinner";
import { Calendar } from "react-multi-date-picker";
import styles from "./calenderComp.module.scss";
import UseCalender from "./useCalender";
import Link from "next/link";
import useSearchComponent from "../useSearch";
import { useEffect } from "react";

const CalenderComp = ({ handleMapAddress }) => {
  const {
    handleDateChange,
    handleMonthChange,
    handleAvailableHours,
    navigateBookingAppointment,
    navigateToMechanicDetails,
    activeHours,
    bookingDate,
    loading,
    handleFavouritemechanics,
    handleSelectSlot,
    selectedItems,
    searchingList,
    availableSlots,
    fetchSlots,
    favroriteLoading,
    slotLoading,
    companyID,
    user,
    handleFavourit,
    simpleLoader,
    sortLoader,
    handleMorespecialties,
    less,
    handleMapLink,
    allFalse,
    compoentLoader,
    testLoading,
    btnLoading,
  } = UseCalender();

  const modifyPayload = searchingList?.map((item, index) => {
    let modifyObject = {
      ...item,
      // currentDate: new Date(),
      // currentDate: fetchSlots?.map((date) => date?.selectedDate),
    };
    return modifyObject;
  });
  useEffect(() => {}, [fetchSlots]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.cardWrapp}>
            {compoentLoader || testLoading ? (
              <CompLoader />
            ) : !Boolean(searchingList?.length) ? (
              <EmptyCompo search={true} />
            ) : (
              searchingList?.map((item: any, index: number) => (
                <>
                  <div className={styles.card}>
                    <div className={styles.detailsWrapper}>
                      <div className={styles.profileData}>
                        <div className={styles.header}>
                          {/* <Link href={`/workshop/${item?.companyId}`}>   */}
                          <div
                            className={styles.upperleftSide}
                            onClick={() => navigateToMechanicDetails(item)}
                          >
                            <div className={styles.logo}>
                              {/* <img src="./icons/nissan.svg" /> */}
                              <img src={item?.imageUrl} alt="no-image" />
                            </div>
                            <div className={styles.detail}>
                              <div className={styles.brandName}>
                                {item?.fullName}
                              </div>
                              {/* <div className={styles.title}>
                                {item?.category?.map(
                                  (element) => element?.value
                                )}{" "}
                                Mechanic
                              </div> */}
                              <div className={styles.ratingWrapper}>
                                {Math.round(item?.companyReviews) === 6 ? (
                                  <>
                                    {[
                                      ...Array(Number(Math.round(5) || 0)),
                                    ]?.map((star) => {
                                      return (
                                        <div className={styles.ratingBoxs} />
                                      );
                                    })}
                                  </>
                                ) : (
                                  <>
                                    {[
                                      ...Array(
                                        Number(
                                          Math.round(item?.companyReviews) || 0
                                        )
                                      ),
                                    ]?.map((star) => {
                                      return (
                                        <div className={styles.ratingBoxs} />
                                      );
                                    })}
                                  </>
                                )}
                                <span>{item?.totalCount} reviews</span>
                              </div>
                            </div>
                          </div>
                          {/* </Link> */}
                          <div className={styles.rightSide}>
                            {user?.data?.access_token == undefined ||
                            user?.data?.access_token == "" ? (
                              <FaRegHeart onClick={() => handleFavourit()} />
                            ) : (
                              <>
                                {companyID === item?.companyId &&
                                favroriteLoading &&
                                simpleLoader === 0 ? (
                                  <RotatingLines
                                    strokeColor="#00c3a5"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="22"
                                    visible={true}
                                  />
                                ) : item?.isFavourite ? (
                                  <AiFillHeart
                                    onClick={() =>
                                      handleFavouritemechanics(item, 0)
                                    }
                                  />
                                ) : null}
                                {companyID === item?.companyId &&
                                favroriteLoading &&
                                simpleLoader === 1 ? (
                                  <RotatingLines
                                    strokeColor="#00c3a5"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="22"
                                    visible={true}
                                  />
                                ) : !item?.isFavourite ? (
                                  <FaRegHeart
                                    onClick={() =>
                                      handleFavouritemechanics(item, 1)
                                    }
                                  />
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>

                        <div className={styles.add}>
                          <div className={styles.address}>Address</div>
                          <div className={styles.location}>
                            <FaMapMarkerAlt />
                            <div className={styles.street}>
                              {item?.workshopAddress?.title}
                              {/* Liberty Avenue, 4 Entlo. 1ºC, Murcia{" "} */}
                              {/* <span>
                <img src="/icons/dot.svg" alt="no-icon" />
              </span> */}
                            </div>
                            {item?.workshopAddress?.title != "" && (
                              <span
                                onClick={() =>
                                  handleMapAddress(item?.workshopAddress)
                                }
                                // handleMapAddress(item?.workshopAddress?.title)
                                // () =>
                              >
                                Map
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={styles.devider}></div>

                      <div className={styles.timings}>
                        <div className={styles.hours}>
                          <HiOutlineClock className={styles.icon} />
                          <span>Workshop hours</span>
                        </div>

                        <div className={styles.slots}>
                          <div className={styles.days}>
                            Monday,
                            {item?.workingHours?.Monday === "00:00-00:00"
                              ? "  OFF"
                              : item?.workingHours?.Monday}
                          </div>
                          <div className={styles.days}>
                            Tuesday,{" "}
                            {item?.workingHours?.Tuesday === "00:00-00:00"
                              ? "  OFF"
                              : item?.workingHours?.Tuesday}
                          </div>
                          <div className={styles.days}>
                            Wednesday,{" "}
                            {item?.workingHours?.Wednesday === "00:00-00:00"
                              ? "  OFF"
                              : item?.workingHours?.Wednesday}
                          </div>
                        </div>
                        <div className={styles.slots}>
                          <div className={styles.days}>
                            Thursday,{" "}
                            {item?.workingHours?.Thursday === "00:00-00:00"
                              ? "  OFF"
                              : item?.workingHours?.Thursday}
                          </div>
                          <div className={styles.days}>
                            Friday,{" "}
                            {item?.workingHours?.Friday === "00:00-00:00"
                              ? "  OFF"
                              : item?.workingHours?.Friday}
                          </div>
                          <div className={styles.days}>
                            Saturday,{" "}
                            {item?.workingHours?.Saturday === "00:00-00:00"
                              ? "  OFF"
                              : item?.workingHours?.Saturday}
                          </div>
                        </div>

                        <div className={styles.slots}>
                          <div className={styles.days}>
                            Sunday,{" "}
                            {item?.workingHours?.Sunday === "00:00-00:00"
                              ? "  OFF"
                              : item?.workingHours?.Sunday}
                          </div>
                        </div>
                      </div>
                      <div className={styles.devider}></div>

                      <div className={styles.spec}>
                        Specialties:
                        {/* {item?.specialties?.map((element) => (
                          <span>{element ? element : ""}</span>
                        ))} */}
                        {item?.specialties?.length > 8 ? (
                          <>
                            {less
                              ? item?.specialties
                                  ?.slice(0, 7)
                                  ?.map((item, index) => {
                                    return <span key={index}>{item}</span>;
                                  })
                              : item?.specialties?.map((item, index) => {
                                  return <span key={index}>{item}</span>;
                                })}
                          </>
                        ) : (
                          item?.specialties?.map((item, index) => {
                            return <span key={index}>{item}</span>;
                          })
                        )}
                        {item?.specialties?.length > 8 ? (
                          <>
                            <div className={styles.moreless}>
                              <p
                                onClick={handleMorespecialties}
                                className={styles.moreSpan}
                              >
                                {less ? "SEE All" : "See Less"}
                              </p>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                    <SearchCalendar
                      fetchSlots={fetchSlots}
                      item={item}
                      index={index}
                      availableSlots={availableSlots}
                      bookingDate={bookingDate}
                      handleDateChange={handleDateChange}
                      handleMonthChange={handleMonthChange}
                      selectedItems={selectedItems}
                      handleSelectSlot={handleSelectSlot}
                      navigateBookingAppointment={navigateBookingAppointment}
                      slotLoading={slotLoading}
                      allFalse={allFalse}
                      btnLoading={btnLoading}
                    />
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const SearchCalendar = ({
  fetchSlots,
  item,
  index,
  availableSlots,
  bookingDate,
  handleDateChange,
  handleMonthChange,
  selectedItems,
  handleSelectSlot,
  navigateBookingAppointment,
  slotLoading,
  allFalse,
  btnLoading,
}) => {
  return (
    <div className={styles.leftSide}>
      {item?.companyPlan === "Starter Plan" ? (
        <>
          <img src="./icons/nobooking.png" alt="no-icon" />{" "}
        </>
      ) : (
        <>
          {fetchSlots?.map((elem, i) => {
            if (elem?.slots?.isOpen === false) {
            }
            return (
              <>
                {elem?.companyIndex === item?.companyId && (
                  <>
                    <div className={styles.calenderWrapper}>
                      <Calendar
                        className={styles.libraryCalender}
                        value={elem?.value}
                        onChange={(e) => handleDateChange(item, e, index)}
                        onMonthChange={handleMonthChange}
                        minDate={new Date()}
                      />
                    </div>
                    <div className={styles.availbleSlots}>
                      <div className={styles.heading}>
                        Available Slots <br /> On{" "}
                        {moment(elem?.selectedDate).format("ll")}
                        {/* {moment(
                      elem?.selectedDate
                        ? moment(
                            new Date(elem?.selectedDate?.unix * 1000)
                          ).format("ll")
                        : item?.currentDate
                    ).format("DD MMMM")} */}
                      </div>
                      <div className={styles.btnWrapper}>
                        {/* {slotLoading ? (
                              <RotatingLines
                                strokeColor="#00c3a5"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="22"
                                visible={true}
                              />) : (
                                <>
                                
                                </>
                              )} */}
                        {elem?.slots?.length === 0 || allFalse ? (
                          <>
                            <p>
                              No Available slots on{" "}
                              {moment(elem?.selectedDate).format("ll")}
                            </p>

                            {/* {moment(
                          availableSlots?.selectedDate
                            ? availableSlots?.selectedDate
                            : item?.currentDate
                        ).format("DD MMMM")} */}
                          </>
                        ) : (
                          elem?.slots?.map((item, index) => {
                            // console.log(
                            //   "🚀 ~ file: index.tsx:383 ~ elem?.slots?.map ~ item:",
                            //   item
                            // );
                            // if (item?.isOpen === true) {
                            return (
                              <div
                                className={
                                  selectedItems.includes(item.slotId)
                                    ? styles.selected
                                    : styles.btn
                                }
                                key={index}
                                onClick={() => handleSelectSlot(item)}
                              >
                                {item?.startTime}
                              </div>
                            );
                            // }
                            // return null;
                          })
                        )}
                      </div>
                      <div
                        className={styles.bookBtn}
                        onClick={() => navigateBookingAppointment(item, elem)}
                      >
                        <button>
                          {/* {elem?.companyIndex === item?.companyId &&
                          btnLoading ? (
                            <>
                              {" "}
                              <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="22"
                                visible={true}
                              />
                            </>
                          ) : (
                            <>
                              {" "} */}
                          <img src="./icons/cal.svg" />
                          &nbsp; Book Appointment
                          {/* </>
                          )} */}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CalenderComp;
