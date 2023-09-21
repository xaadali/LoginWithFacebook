/* eslint-disable @next/next/no-img-element */
import styles from "./bookingManagement.module.scss";
import FiltersDropDown from "@component/Components/__common/Dropdown/filterDropDown";
import UseBookingManagement from "./useBookManagement";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import { EmptyCompo } from "@component/Components/__common/Empty";
import moment from "moment";
import Description from "@component/Components/__common/Description";
import { RotatingLines } from "react-loader-spinner";
import Banner from "@component/Components/__common/Banner";
const BookingManagementComp = () => {
  const {
    filterBy,
    setFilterBy,
    setGetDate,
    commentLoading,
    statusLoading,
    handlePostComment,
    postComment,
    getDate,
    loading,
    handleGetStatus,
    bookingList,
    setStatus,
    Status,
    setPostComment,
    // handleFilterBooking,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  } = UseBookingManagement();

  return (
    <div className={styles.container}>
      <h1>Booking Management</h1>
      <div style={{ width: "91%" }}>
        {showBanner && expireTimeDuration ? (
          <Banner currentPlanInfo={currentPlanInfo} />
        ) : null}
      </div>
      <div className={styles.bookingParent}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.date}>
              <div className={styles.label}>Filter By Date</div>
              <div className={styles.inputWrapper}>
                {/* <SlCalender /> */}
                <input
                  type="date"
                  value={getDate}
                  onChange={(e) => {
                    setGetDate(e.target.value);
                  }}
                />
                {/* <img src="/icons/dropDownList.svg" alt="icon" /> */}
              </div>
            </div>
          </div>
          <div className={styles.filter}>
            <div className={styles.label}>Filter By Status</div>
            <div className={styles.selectionDropdown}>
              <FiltersDropDown
                selected={filterBy}
                setSelected={(res) => {
                  setFilterBy(res);
                  // handleFilterBooking(res);
                }}
                options={[
                  "All",
                  "Pending",
                  "Inprogress",
                  "Completed",
                  "Blocked",
                  "Canceled",
                  "Hold",
                ]}
                showRightIcon={true}
                rightIcon={"/icons/dropDownList.svg"}
              />
            </div>
          </div>
        </div>
        <div className={styles.bookDetails}>
          {loading ? (
            <CompLoader />
          ) : !Boolean(bookingList?.length) ? (
            <EmptyCompo />
          ) : (
            bookingList?.map((item, index) => {
              return (
                <div className={styles.cardWrapper} key={index}>
                  <div className={styles.topWrapper}>
                    <div className={styles.leftWrapper}>
                      <div className={styles.heading}>
                        {item?.name ? item?.name : ""}
                      </div>
                      <div className={styles.statusWrapper}>
                        <button
                          key={index}
                          style={
                            item?.status === "inprogress"
                              ? {
                                  background: "rgba(61, 131, 223, 0.1)",
                                  color: "#3D83DF",
                                }
                              : item?.status === "upcoming"
                              ? {
                                  background: "rgba(61, 131, 223, 0.1)",
                                  color: "#3D83DF",
                                }
                              : item?.status === "completed"
                              ? {
                                  background: "rgba(39, 174, 96, 0.1)",
                                  color: "#27AE60",
                                }
                              : item?.status === "canceled"
                              ? {
                                  background: "rgba(223, 61, 61, 0.1)",
                                  color: "#DF3D3D",
                                }
                              : item?.status === "blocked"
                              ? {
                                  background: "rgba(113, 113, 113, 0.1)",
                                  color: "#717171",
                                }
                              : item?.status === "pending"
                              ? {
                                  background: "rgba(248, 201, 81, 0.1)",
                                  color: "#F8C951",
                                }
                              : item?.status === "Client Not Presented"
                              ? {
                                  background: "rgba(0, 255, 240, 0.1)",
                                  color: "#00FFF0",
                                }
                              : item?.status === "hold"
                              ? {
                                  background: "rgba(182, 64, 255, 0.1)",
                                  color: "#B640FF",
                                }
                              : undefined
                          }
                        >
                          {item?.status ? item?.status : ""}
                        </button>
                      </div>
                    </div>
                    <div className={styles.rightWrapper}>
                      <label>Status</label>
                      <div className={styles.dropDown}>
                        <FiltersDropDown
                          loading={
                            Status?.Index === index ? statusLoading : false
                          }
                          selected={
                            Status?.Index === index
                              ? Status?.status
                              : item?.status
                          }
                          setSelected={(res) => {
                            setStatus({
                              status: res,
                              userInfo: item,
                              Index: index,
                            });
                          }}
                          options={handleGetStatus(item?.status)}
                          showRightIcon={false}
                          rightIcon={"/icons/dropDownList.svg"}
                        />
                      </div>

                      {/* <span>In Progress</span> */}
                    </div>
                  </div>
                  <div className={styles.bottomWrapper}>
                    <div className={styles.leftWrapper}>
                      <div className={styles.dateCard}>
                        <span>Date & Time:</span>&nbsp;
                        <label>
                          {item?.bookingDate
                            ? `${moment(item?.bookingDate).format(
                                "YYYY-MM-DD"
                              )} ${" "} ${item?.startTime} - ${item?.endTime}`
                            : ""}
                        </label>
                      </div>
                      <div className={styles.infoWrapper}>
                        <div className={styles.infoCard}>
                          <span>Contact information:</span>&nbsp;
                          <label>{item?.phoneNo ? item?.phoneNo : ""}</label>
                        </div>
                        <div className={styles.carCard}>
                          <span>Car:</span>&nbsp;
                          <label>{item?.carName ? item?.carName : ""}</label>
                        </div>
                      </div>
                      <div className={styles.dateCard}>
                        <label>
                          <span>Chassis Number:</span>&nbsp;{" "}
                          {item?.chassisNo ? item?.chassisNo : "N/A"}
                        </label>
                      </div>
                      <div className={styles.dateCard}>
                        <label>
                          <span>Registration Number:</span>&nbsp;
                          {item?.registrationNo ? item?.registrationNo : "N/A"}
                        </label>
                      </div>
                    </div>
                    <div className={styles.rightWrapper}>
                      <div className={styles.cardWrapper}>
                        <label>Comment:</label>
                        <div className={styles.commentSection}>
                          {item?.comment?.length > 400 ? (
                            <Description
                              faq={item?.comment ? item?.comment : ""}
                              length={368}
                            />
                          ) : item?.comment ? (
                            item?.comment
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </div>
                      <div className={styles.cardWrapper}>
                        <label>Workshop Comment:</label>
                        <div className={styles.PostComment}>
                          <textarea
                            value={
                              postComment?.commentIndex === index &&
                              postComment?.comment
                                ? postComment?.comment
                                : item?.workshopComment
                            }
                            placeholder="Post Comment.."
                            onChange={(e) =>
                              setPostComment({
                                comment: e.target.value,
                                commentIndex: index,
                                bookingId: item?.bookingId,
                              })
                            }
                          />
                          <button
                            className={styles.PostButton}
                            type="submit"
                            onClick={() => handlePostComment()}
                          >
                            {postComment?.commentIndex === index &&
                            commentLoading ? (
                              <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="15"
                                visible={true}
                              />
                            ) : (
                              "Post"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagementComp;
