/* eslint-disable react/jsx-key */
import moment from "moment";
import styles from "./reviews.module.scss";
import UseReviews from "./useReview";
import { getInitials } from "@component/utills/enum";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import { EmptyCompo, PlanCompo } from "@component/Components/__common/Empty";
import Description from "@component/Components/__common/Description";
import Banner from "@component/Components/__common/Banner";

const ReviewsComp = () => {
  const {
    reviewDetails,
    loading,
    planInfo,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  } = UseReviews();
  return (
    <>
      <div className={styles.container}>
        <h1>Reviews</h1>
        <div className={styles.wrapper}>
          <div style={{ width: "91%" }}>
            {showBanner && expireTimeDuration ? (
              <Banner currentPlanInfo={currentPlanInfo} />
            ) : null}
          </div>
          {planInfo ? (
            <PlanCompo />
          ) : loading ? (
            <CompLoader />
          ) : !Boolean(reviewDetails?.length) ? (
            <EmptyCompo />
          ) : (
            reviewDetails?.map((item, index) => (
              <>
                <div className={styles.cardWrapper} key={index}>
                  <div className={styles.topWrapper}>
                    <div className={styles.nameWrapper}>
                      <div className={styles.name}>User Name:</div>
                      <div className={styles.brandWrapper}>
                        <div className={styles.brand}>
                          {item?.userName ? getInitials(item?.userName) : ""}
                        </div>
                        <div className={styles.brandName}>
                          {item?.userName ? item?.userName : ""}
                        </div>
                      </div>
                    </div>
                    <div className={styles.detailWrapper}>
                      <div className={styles.name}>Car:</div>
                      <div className={styles.brandName}>
                        {item?.carName ? item?.carName : ""}
                      </div>
                    </div>
                    <div className={styles.detailWrapper}>
                      <div className={styles.name}>Date and Time</div>
                      <div className={styles.brandName}>
                        {item?.dateAndTime
                          ? moment(item?.dateAndTime).format("lll")
                          : ""}
                      </div>
                    </div>
                    <div className={styles.detailWrapper}>
                      <div className={styles.name}>Booked ID</div>
                      <div className={styles.brandName}>
                        {item?.bookingId ? item?.bookingId : ""}
                      </div>
                    </div>
                    <div className={styles.statusWrapper}>
                      <div className={styles.name}>Status</div>
                      <div className={styles.status}>
                        {item?.status ? item?.status.toUpperCase() : ""}
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottomWrapper}>
                    <div className={styles.leftSide}>
                      <div className={styles.reviewsWrapper}>
                        <div className={styles.name}>Review</div>
                        <div className={styles.brandName}>
                          {item?.review ? (
                            <>
                              {[...Array(Number(item?.review || 0))]?.map(
                                (star, index) => {
                                  if (index > 4) {
                                    return;
                                  } else {
                                    return <div className={styles.ratingBox} />;
                                  }
                                }
                              )}
                              Rating {Number(item?.review)} Star
                            </>
                          ) : (
                            "Not Yet"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.rightSide}>
                      <div className={styles.commentWrapper}>
                        <div className={styles.name}>Comment</div>
                        <div className={styles.brandName}>
                          {/* {item?.comment ? item?.comment : ""} */}
                          {item?.comment?.length > 400 ? (
                            <Description
                              faq={item?.comment ? item?.comment : ""}
                              length={368}
                            />
                          ) : (
                            item?.comment
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
        <div className={styles.mobileWrapper}>
          {planInfo ? (
            <PlanCompo />
          ) : loading ? (
            <CompLoader />
          ) : !Boolean(reviewDetails?.length) ? (
            <EmptyCompo />
          ) : (
            reviewDetails?.map((item, index) => (
              <>
                <div className={styles.mobileCardWrapper} key={index}>
                  <div className={styles.nameWrapper}>
                    <div className={styles.name}>User Name:</div>
                    <div className={styles.brandWrapper}>
                      <div className={styles.brand}>
                        {item?.userName ? getInitials(item?.userName) : ""}
                      </div>
                      <div className={styles.brandName}>
                        {item?.userName ? item?.userName : ""}
                      </div>
                    </div>
                  </div>
                  <div className={styles.mobileTopWrapper}>
                    <div className={styles.mobileLeftWrapper}>
                      <div className={styles.MobiledetailWrapper}>
                        <div className={styles.Mobilename}>Date & Time</div>
                        <div className={styles.MobilebrandName}>
                          {item?.dateAndTime
                            ? moment(item?.dateAndTime).format("lll")
                            : ""}
                        </div>
                      </div>
                      <div className={styles.MobiledetailWrapper}>
                        <div className={styles.Mobilename}>Car</div>
                        <div className={styles.MobilebrandName}>
                          {item?.carName ? item?.carName : ""}
                        </div>
                      </div>
                      <div className={styles.MobiledetailWrapper}>
                        <div className={styles.Mobilename}>Booked ID</div>
                        <div className={styles.MobilebrandName}>
                          {item?.bookingId ? item?.bookingId : ""}
                        </div>
                      </div>
                      <div className={styles.MobiledetailWrapper}>
                        <div className={styles.Mobilename}>Status</div>
                        <div className={styles.MobilebrandNamestatus}>
                          {item?.status ? item?.status : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.MobilebottomWrapper}>
                    <div className={styles.MobileleftSide}>
                      <div className={styles.MobilereviewsWrapper}>
                        <div className={styles.Mobilename}>Review</div>
                        <div className={styles.MobilebrandName}>
                          {item?.review ? (
                            <>
                              {[...Array(Number(item?.review || 0))]?.map(
                                (star) => {
                                  return <div className={styles.ratingBox} />;
                                }
                              )}
                              Rating {Number(item?.review)} Star
                            </>
                          ) : (
                            "Not Yet"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.MobilerightSide}>
                      <div className={styles.MobilecommentWrapper}>
                        <div className={styles.Mobilename}>Comment</div>
                        <div className={styles.MobilebrandName}>
                          {item?.comment ? item?.comment : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewsComp;
