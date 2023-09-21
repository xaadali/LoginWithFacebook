/* eslint-disable react/no-unescaped-entities */
import Slider from "@component/Components/__common/Slider/slider";
import { SwiperSlide } from "swiper/react";
import styles from "./reviews.module.scss";
import ReviewsData from "./reviewsData";
import { PiDotOutlineFill } from "react-icons/pi";


const ReviewsComp = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>Reviews that speak volumes.</div>
          <div className={styles.subHeading}>
            Don't just take our word for it, hear what people have to say about
            us.
          </div>
          <div className={styles.cardWrapper}>
            <Slider
              desktopWidth={3}
              medium={2}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 3000,
              }}
              slidesPerView={3}
              navigation={true}
              pagination={false}
            >
              {ReviewsData?.map((item, index) => (
                <SwiperSlide className={styles.card} key={index}>
                  <div className={styles.des}>{item?.des}</div>
                  <div className={styles.stars}>
                    <PiDotOutlineFill />
                    <PiDotOutlineFill />
                    <PiDotOutlineFill />
                    <PiDotOutlineFill />
                    <PiDotOutlineFill />
                  </div>
                  <div className={styles.profileWrapper}>
                    <img src={item?.img} alt="img" />
                    <div className={styles.nameWrapper}>
                      <div className={styles.name}>{item?.name}</div>
                      <div className={styles.title}>{item?.subtitle}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsComp;
