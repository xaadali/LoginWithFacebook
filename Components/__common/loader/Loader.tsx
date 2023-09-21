/* eslint-disable @next/next/no-img-element */
import { Bars, ThreeDots } from "react-loader-spinner";
import StylesCompo from "./CompoLoader.module.css";

export const BarLoader = ({ height, width }) => {
  return (
    <>
      <Bars
        height={height}
        width={width}
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
};

export const CompLoader = () => {
  return (
    <div className={StylesCompo.container}>
      <div className={StylesCompo.wrapper}>
        <div className={StylesCompo.logo}>
          {/* <img src={"/icons/logo.svg"} alt="" style={{ cursor: "pointer" }} /> */}
          <img
            src={"/icons/darkLogo.png"}
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>
        <ThreeDots
          height="70"
          width="70"
          radius="9"
          color="#3D83DF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export const BookingSlotsLoader = () => {
  return (
    <div className={StylesCompo.container}>
      <div className={StylesCompo.wrapper}>
        <div className={StylesCompo.logo}>
          <img
            src={"/icons/LoadingBookingSlots.gif"}
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export const CircularLoader = () => {
  return (
    <div>
      <div className={StylesCompo.circularLoader}></div>
    </div>
  );
};
