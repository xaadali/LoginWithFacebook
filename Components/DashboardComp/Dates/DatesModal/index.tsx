/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { EmptyCompo } from "@component/Components/__common/Empty";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import useDate from "../useDate";
import styles from "./datesModal.module.scss";

interface Props {
  setpopupvisible?: () => void;
  data?: object;
}

const DatesModal = (prop: Props) => {
  const { setpopupvisible: toogleState, data: specficData } = prop;
  const {
    handleDeleteAppointment,
    loading,
    userAppointmentList,
    count,
    setDelloading,
    delLoading,
    delAppointmentloading,
  } = useDate(toogleState, specficData);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [curentItems, setCurrentItems] = useState([]);
  let itemsPerPage = 1;
  useEffect(() => {
    const endOffset = +itemsPerPage * +currentPage + +itemsPerPage;
    const itemOffset = +itemsPerPage * +currentPage;
    setCurrentItems(userAppointmentList?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userAppointmentList?.length / itemsPerPage));
  }, [itemsPerPage, delLoading, userAppointmentList, currentPage]);
  useEffect(() => {
    if (!count) {
      setCurrentPage(0);
    }
  }, [count]);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {delLoading ? (
          <CompLoader />
        ) : !Boolean(curentItems?.length) ? (
          <EmptyCompo />
        ) : (
          curentItems?.map((item: any, index) => (
            <>
              <div className={styles.heading} key={index}>
                Appointment Slot {item?.userSlot?.startTime} |{" "}
                {item?.userSlot?.endTime}
              </div>
              <div className={styles.detailsWrapper}>
                <div className={styles.detail}>
                  <div className={styles.logo}>
                    {/* <img src="./icons/nissan.svg" /> */}
                    <img src={item?.imageUrl} alt="no-image" />
                  </div>
                  <div className={styles.review}>
                    <div className={styles.brandName}>{item?.fullName}</div>
                    <div className={styles.ratingWrapper}>
                      <div className={styles.stars}>
                        {Math.round(item?.companyReviewsAvg) === 6 ? (
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
                                Number(Math.round(item?.companyReviewsAvg) || 0)
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
                <div className={styles.contactWrapper}>
                  <div className={styles.contactHeading}>Contact Info</div>
                  <div className={styles.contactNumber}>
                    <BsTelephoneFill /> <span>{item?.companyPhoneNo}</span>
                  </div>
                  {/* <div className={styles.contactNumber}>
              <BsTelephoneFill /> <span>636 16..... Show number</span>
            </div> */}
                </div>
                <div className={styles.dateTimeWrapper}>
                  <div className={styles.dataWrapper}>
                    <div className={styles.id}>Booked ID</div>
                    <span>{item?.bookingId}</span>
                  </div>
                  <div className={styles.dataWrapper}>
                    <div className={styles.id}>Date and Time</div>
                    <span>{item?.bookingDate}</span>
                    <span>
                      {item?.userSlot?.startTime} - {item?.userSlot?.endTime}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.informationWrapper}>
                <div className={styles.infoHeading}>Information</div>
                <div className={styles.infoWrapper}>
                  <div className={styles.nameWrapper}>Name: {item?.name}</div>
                  <div className={styles.nameWrapper}>
                    Phone: {item?.userPhoneNo}
                  </div>
                  <div className={styles.nameWrapper}>Car: {item?.carName}</div>
                  <div className={styles.nameWrapper}>
                    Comment:
                    {item?.comment.length > 350 ? (
                      <>
                        {" "}
                        <div
                          className={styles.commentWrapper}
                          dangerouslySetInnerHTML={{ __html: item?.comment }}
                        />
                      </>
                    ) : (
                      <>
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.comment === "" ? "N/A" : item?.comment,
                          }}
                        />
                      </>
                    )}
                    {/* () */}
                  </div>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.btnWrapper}>
                  <div
                    className={styles.backBtn}
                    onClick={() => handleDeleteAppointment(item)}
                  >
                    {delAppointmentloading ? (
                      <RotatingLines
                        strokeColor="#3d83df"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="22"
                        visible={true}
                      />
                    ) : (
                      "Cancel Appointment"
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.pagintaionContainer}>
                <ReactPaginate
                  activeClassName={"item activee "}
                  breakClassName={"item break-me "}
                  breakLabel={"..."}
                  nextLabel="Next >"
                  forcePage={currentPage}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  disabledClassName={"disabled-page"}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< Prev"
                  pageClassName={"item pagination-page "}
                  pageRangeDisplayed={2}
                />
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default DatesModal;
