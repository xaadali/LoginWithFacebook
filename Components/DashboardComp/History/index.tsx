import { BsTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import HistoryModal from "./HistoryModal";
import styles from "./history.module.scss";

import Description from "@component/Components/__common/Description";
import { EmptyCompo } from "@component/Components/__common/Empty";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import Modal from "@component/Components/__common/modal";
import UseHistory from "./useHistory";

const HistoryComp = () => {
  const {
    apiData,
    popupvisible,
    setpopupvisible,
    setSpecficdata,
    specficData,
    loading,
  } = UseHistory();
  return (
    <>
      <Modal visible={popupvisible} onClose={setpopupvisible}>
        <HistoryModal
          setpopupvisible={() => setpopupvisible(false)}
          specficData={specficData}
        />
      </Modal>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>History</h1>
          <div className={styles.carBox}>
            <div className={styles.cardWrapper}>
              {loading ? (
                <CompLoader />
              ) : apiData?.length === 0 ? (
                <EmptyCompo />
              ) : (
                apiData?.map((item: any, index) => (
                  <>
                    <div className={styles.card} key={index}>
                      <div className={styles.header}>
                        <div className={styles.heading}>Appointment</div>
                        <div className={styles.btnWrapper}>
                          <button
                            className={
                              item?.status === "completed" && !item?.isReview
                                ? styles.reviewBtn
                                : styles.blockreviewbtn
                            }
                            onClick={() => {
                              if (
                                item?.status === "completed" &&
                                item?.isReview
                              ) {
                                return;
                              } else if (
                                item?.status === "completed" &&
                                !item?.isReview
                              ) {
                                setpopupvisible(!popupvisible),
                                  setSpecficdata(item);
                              } else {
                                return;
                              }
                            }}
                          >
                            Add Review
                          </button>
                        </div>
                      </div>
                      <div className={styles.detailsWrapper}>
                        <div className={styles.detail}>
                          <div className={styles.logo}>
                            <img src={item?.imageUrl} alt="no-image" />
                          </div>
                          <div className={styles.review}>
                            <div className={styles.brandName}>
                              {item?.fullName}
                            </div>
                            <div className={styles.ratingWrapper}>
                              {item?.companyReviewsAvg ? (
                                <>
                                  {[
                                    ...Array(
                                      Number(
                                        Math.round(item?.companyReviewsAvg) || 0
                                      )
                                    ),
                                  ]?.map((star, index) => {
                                    return (
                                      <div
                                        className={styles.ratingBox}
                                        key={index}
                                      />
                                    );
                                  })}
                                </>
                              ) : null}
                              <span>{item?.totalCount} reviews</span>
                            </div>
                            <div className={styles.location}>
                              <FaMapMarkerAlt />
                              <div className={styles.street}>
                                {item?.address?.title}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={styles.mobileView}>
                          <div className={styles.uppercontent}>
                            <div className={styles.contactWrapper2}>
                              <div className={styles.contactHeading}>
                                Contact Info
                              </div>
                              <div className={styles.contactNumber}>
                                <BsTelephoneFill />{" "}
                                <span>{item?.companyPhoneNo}</span>
                              </div>
                              {/* <div className={styles.contactNumber}>
                                <BsTelephoneFill />{" "}
                                <span>636 16..... Show number</span>
                              </div> */}
                            </div>

                            <div className={styles.dateTimeWrapper2}>
                              <div className={styles.dataWrapper}>
                                <div className={styles.id}>Booked ID</div>
                                <span className={styles.bookeddata}>
                                  {item?.bookingId}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className={styles.lowerContent2}>
                            <div className={styles.dataWrapper}>
                              <div className={styles.id}>Date and Time</div>
                              <span>
                                {item?.bookingDate} |{" "}
                                {item?.userSlot?.startTime} -{" "}
                                {item?.userSlot?.endTime}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.contactWrapper}>
                          <div className={styles.contactHeading}>
                            Contact Info
                          </div>
                          <div className={styles.contactNumber}>
                            <BsTelephoneFill />{" "}
                            <span>{item?.companyPhoneNo}</span>
                          </div>
                          {/* <div className={styles.contactNumber}>
                            <BsTelephoneFill />{" "}
                            <span>636 16..... Show number</span>
                          </div> */}
                        </div>
                        <div className={styles.dateTimeWrapper}>
                          <div className={styles.dataWrapper}>
                            <div className={styles.id}>Booked ID</div>
                            <span className={styles.bookeddata}>
                              {item?.bookingId}{" "}
                            </span>
                          </div>
                          <div className={styles.dataWrapper}>
                            <div className={styles.id}>Date and Time</div>
                            <span>
                              {item?.bookingDate} | {item?.userSlot?.startTime}{" "}
                              - {item?.userSlot?.endTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.informationWrapper}>
                        <div className={styles.infoHeading}>Information</div>
                        <div className={styles.infoWrapper}>
                          <div className={styles.nameWrapper}>
                            Name: {item?.name}
                          </div>
                          <div className={styles.nameWrapper}>
                            Phone: {item?.userPhoneNo}
                          </div>
                          <div className={styles.nameWrapper}>
                            Car: {item?.carName}
                          </div>
                          <div className={styles.nameWrapper}>
                            Comment:{" "}
                            {item?.comment?.length > 400 ? (
                              <Description
                                faq={item?.comment ? item?.comment : ""}
                                length={368}
                              />
                            ) : (
                              item?.comment
                            )}
                            {/* {item?.comment === "" ? "N/A" : item?.comment} */}
                          </div>
                          <div className={styles.nameWrapper}>
                            Status:{" "}
                            <span>
                              {/* {item?.status?.charAt(0).toUpperCase() +
                                item?.status?.slice(1)} */}
                              <button
                                key={index}
                                style={
                                  item?.status === "inprogress"
                                    ? {
                                        background: "rgba(61, 131, 223, 0.1)",
                                        color: "#3D83DF",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                      }
                                    : item?.status === "upcoming"
                                    ? {
                                        background: "rgba(61, 131, 223, 0.1)",
                                        color: "#3D83DF",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                      }
                                    : item?.status === "completed"
                                    ? {
                                        background: "rgba(39, 174, 96, 0.1)",
                                        color: "#27AE60",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                      }
                                    : item?.status === "canceled"
                                    ? {
                                        background: "rgba(223, 61, 61, 0.1)",
                                        color: "#DF3D3D",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                      }
                                    : item?.status === "blocked"
                                    ? {
                                        background: "rgba(113, 113, 113, 0.1)",
                                        color: "#717171",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                      }
                                    : item?.status === "pending"
                                    ? {
                                        background: "rgba(248, 201, 81, 0.1)",
                                        color: "#F8C951",
                                        fontFamily: "Roboto",
                                        fontSize: "15px",
                                        fontWeight: "400",
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
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryComp;
