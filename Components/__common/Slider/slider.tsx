import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface prop {
  children: any;
  modules?: any;
  navigation?: any;
  desktopWidth?: any;
  spaceBetween?: any;
  pagination?: any;
  slidesPerView?: any;
  className?: any;
  loop?: any;
  autoplay?: any;
  medium?: number;
}

//for inner map use <SwiperSlide>Slide 1</SwiperSlide>;
const Slider = (SliderProps: prop) => {
  const {
    children,
    navigation,
    desktopWidth,
    spaceBetween,
    pagination,
    slidesPerView,
    className,
    loop,
    autoplay,
    medium,
  } = SliderProps;

  return (
    <>
      <div style={{ width: "100%" }}>
        <Swiper
          slidesPerView={slidesPerView ? slidesPerView : 3}
          spaceBetween={spaceBetween}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={autoplay}
          pagination={pagination ? pagination : false}
          className={className}
          loop={loop}
          centeredSlides={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 1,
            },
            766: {
              slidesPerView: 2,
            },
            800: {
              slidesPerView: medium,
            },

            1265: {
              slidesPerView: desktopWidth ? desktopWidth : 2,
            },
          }}
          navigation={navigation}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
        >
          {children}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
