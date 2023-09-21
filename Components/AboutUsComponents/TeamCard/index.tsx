/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./teamCard.module.scss";
import { AiFillLinkedin } from "react-icons/ai";
import TeamData from "./teamData";
import Slider from "@component/Components/__common/Slider/slider";
import { SwiperSlide } from "swiper/react";
const TeamCards = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cardWrapper}>
          <Slider
            desktopWidth={4}
            medium={3}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            slidesPerView={3}
          >
            {TeamData?.map((item, index) => (
              <SwiperSlide className={styles.card} key={index}>
                <img src={item?.img} alt="img" />
                <div className={styles.boardWrapper}>
                  <div className={styles.btn}>{item?.btn}</div>
                  <div className={styles.icon}>
                    <AiFillLinkedin />
                  </div>
                </div>
                <div className={styles.name}>{item?.name}</div>
              </SwiperSlide>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TeamCards;
