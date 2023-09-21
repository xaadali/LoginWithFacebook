import { EmptyCompo } from "@component/Components/__common/Empty";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import { AiFillHeart } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
import styles from "./mechanics.module.scss";
import useMechanic from "./useMechanic";

const MechanicsComp = () => {
  const {
    handleDetail,
    handleFavouritemechanics,
    fvrtMechanicList,
    loading,
    companyID,
    fvrtLoading,
    handleMessageData,
  } = useMechanic();
  return (
    <>
      <div className={styles.container}>
        <h1>Favorite Mechanics </h1>
        <div className={styles.wrapper}>
          <div className={styles.cardWrapper}>
            {loading ? (
              <CompLoader />
            ) : !Boolean(fvrtMechanicList?.length) ? (
              <EmptyCompo />
            ) : (
              fvrtMechanicList?.map((item, index) => (
                <>
                  <div className={styles.card}>
                    <div className={styles.left}>
                      <div className={styles.imgWrapper}>
                        {/* <img src="../icons/nissan.svg" /> */}
                        <img src={item?.imageUrl} alt="no-image" />
                      </div>
                      <div className={styles.content}>
                        <div className={styles.upperContent}>
                          <div
                            className={styles.title}
                            onClick={() => handleDetail(item)}
                          >
                            {item?.fullName}
                          </div>
                          <div className={styles.ratingBox}>
                            <div className={styles.stars}>
                              {Math.round(item?.reviews) === 6 ? (
                                <>
                                  {[...Array(Number(Math.round(5) || 0))]?.map(
                                    (star, index) => {
                                      return (
                                        <div
                                          className={styles.ratingBox}
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
                                      Number(Math.round(item?.reviews) || 0)
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
                              )}
                            </div>
                            <div className={styles.reviews}>
                              {item?.totalCount} Reviews
                            </div>
                          </div>
                        </div>

                        <div className={styles.btnWrapperInside}>
                          <div
                            className={styles.sendButton}
                            onClick={() => handleMessageData(item)}
                          >
                            <img src="../icons/messages.svg" />
                            <span>Send Message</span>
                          </div>

                          {/* <div className={styles.bookButton}>
                          <img src="../icons/calendar.svg" />
                          <span>Book Appointment</span>
                        </div> */}
                        </div>
                      </div>
                    </div>
                    <div className={styles.btnWrapper}>
                      <div
                        className={styles.sendButton}
                        onClick={() => handleMessageData(item)}
                      >
                        <img src="../icons/messages.svg" />
                        <span>Send Message</span>
                      </div>

                      {/* <div className={styles.bookButton}>
                      <img src="../icons/calendar.svg" />
                      <span>Book Appointment</span>
                    </div> */}
                    </div>

                    <div className={styles.right}>
                      {companyID === item?.companyId && fvrtLoading ? (
                        <RotatingLines
                          strokeColor="#00c3a5"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="22"
                          visible={true}
                        />
                      ) : (
                        <AiFillHeart
                          className={styles.icon}
                          onClick={() => handleFavouritemechanics(item)}
                        />
                      )}
                    </div>
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

export default MechanicsComp;
