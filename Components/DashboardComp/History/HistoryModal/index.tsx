import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import styles from "./historyModal.module.scss";
import { GoDotFill } from "react-icons/go";
import { BiCircle } from "react-icons/bi";

import UseHistory from "../useHistory";
import { RotatingLines } from "react-loader-spinner";
import { getInitials } from "@component/utills/enum";

interface Props {
  setpopupvisible?: () => void;
  specficData?: any;
}

const HistoryModal = (prop: Props) => {
  const { setpopupvisible, specficData: singleData } = prop;
  const { formik, reviewLoading, setRating } = UseHistory(
    setpopupvisible,
    singleData
  );
  const fourthExample = {
    activeColor: "#00c3a5",
    isHalf: false,
    emptyIcon: <BiCircle style={{ fontSize: "30px" }} />,
    halfIcon: <GoDotFill />,
    filledIcon: <GoDotFill style={{ fontSize: "30px" }} />,
    value: 0,
    onChange: (newValue) => {
      setRating(newValue);
    },
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>{singleData?.fullName}</div>
        <div className={styles.detailsWrapper}>
          <div className={styles.profileWrapper}>
            <div className={styles.profile}>
              {/* <img src={singleData?.imageUrl} alt="no-image"/> */}
              {getInitials(singleData?.name)}
            </div>
            <div className={styles.name}>{singleData?.name}</div>
          </div>
          <div className={styles.ratingStars}>
            {" "}
            <ReactStars count={5} {...fourthExample} />
            {/* <GoDotFill />
            <GoDotFill />
            <GoDotFill />
            <GoDotFill />
            <GoDotFill /> */}
          </div>

          <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <div className={styles.inputWrapper}>
              <div className={styles.textAreaStyle}>
                <textarea
                  placeholder="Add Comment"
                  {...formik.getFieldProps("description")}
                />
              </div>
              {formik.touched.description && formik.errors.description ? (
                <div className={styles.errorStyle}>
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <div className={styles.footer}>
              <div className={styles.btnWrapper}>
                <div className={styles.backBtn} onClick={setpopupvisible}>
                  Cancel
                </div>
                <div className={styles.btn2}>
                  <button type="submit">
                    {" "}
                    {reviewLoading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                      />
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
