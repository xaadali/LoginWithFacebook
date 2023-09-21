/* eslint-disable @next/next/no-img-element */
import Slider from "@component/Components/__common/Slider/slider";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { FaCalendarAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { SwiperSlide } from "swiper/react";
import QuestionsData from "./questionsData";
import styles from "./questionSlider.module.scss";
import { setTotalcount } from "@component/store/reducers/mechanic";

const QuestionSlider = (prop: any) => {
  const { data } = prop;
  const location = useRouter();
  const dispatch = useDispatch();

  const BookAppointment = () => {
    location.push("/search-booking");
  };
  const handleDetailanswere = async (item) => {
    dispatch(setTotalcount(item?.answers?.length));
    location.push({
      pathname: "/ask-mechanic-detail",
      query: { questionId: item?._id }, // Add any other query parameters here
    });
  };
  return (
    <>
      <div className={styles.container}>
        {data?.length != 0 && (
          <div className={styles.wrapper}>
            <div className={styles.sliderWrapper} id="swiperBottomPadding">
              <Slider
                navigation={false}
                desktopWidth={1}
                // medium={1}
                spaceBetween={3}
                loop={false}
                pagination={{ clickable: true }}
                autoplay={false}
                className="swiper-wrapper"
              >
                {data?.map((item: any, index) => (
                  <SwiperSlide className={styles.cardWrapper} key={index}>
                    <div className={styles.card}>
                      <div className={styles.header}>
                        <label>
                          {" "}
                          <div className={styles.border} />
                          {item?.question}
                        </label>
                      </div>
                      <div className={styles.innerData}>
                        <div className={styles.content}>
                          <div className={styles.leftSide}>
                            <label>
                              {item?.answers[item?.answers.length - 1]?.answer
                                ?.length > 250
                                ? item?.answers[
                                    item?.answers.length - 1
                                  ]?.answer?.slice(0, 250) + "..."
                                : item?.answers[item?.answers.length - 1]
                                    ?.answer}
                            </label>
                          </div>
                          <div className={styles.rightSide}>
                            <div className={styles.imgWrapper}>
                              <img
                                src={
                                  item?.answers[item?.answers.length - 1]
                                    ?.imageUrl
                                }
                                alt=""
                              />
                            </div>
                            <div className={styles.content}>
                              <div className={styles.title}>
                                {item?.answers[item?.answers.length - 1]
                                  ?.workshopName?.length > 15
                                  ? item?.answers[
                                      item?.answers.length - 1
                                    ]?.workshopName?.slice(0, 10) + "..."
                                  : item?.answers[item?.answers.length - 1]
                                      ?.workshopName}
                                {}
                              </div>
                              <div className={styles.ratingBox}>
                                {[
                                  ...Array(
                                    Math.round(
                                      item?.answers[item?.answers.length - 1]
                                        ?.companyReviews
                                        ? Number(
                                            item?.answers[
                                              item?.answers.length - 1
                                            ]?.companyReviews
                                          )
                                        : 0
                                    )
                                  ),
                                ].map((e, i) => (
                                  <div className={styles.stars} key={i}>
                                    <GoDotFill />
                                  </div>
                                ))}

                                <div className={styles.reviews}>
                                  {Math.round(
                                    item?.answers[item?.answers.length - 1]
                                      ?.companyReviews
                                  )}{" "}
                                  Reviews
                                </div>
                              </div>
                              <div className={styles.btnWrapper}>
                                <div
                                  className={styles.bookButton}
                                  onClick={() => BookAppointment()}
                                >
                                  <img
                                    src="/icons/cal.svg"
                                    alt=""
                                    className={styles.icon}
                                  />
                                  {/* <FaCalendarAlt className={styles.icon} /> */}
                                  <span>Book Appointment</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {item?.answers?.length > 0 ? (
                      <>
                        <div
                          className={styles.totalAnswere}
                          onClick={() => {
                            handleDetailanswere(item);
                          }}
                        >
                          <p>{item?.answers?.length} answers</p>
                        </div>
                      </>
                    ) : null}
                  </SwiperSlide>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionSlider;
// item?.answers?.length === 1?
//                                null
//                               :
