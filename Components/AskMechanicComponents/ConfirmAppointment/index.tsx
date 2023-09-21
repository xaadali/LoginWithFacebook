import React from "react";
import styles from "./confirmBoking.module.scss";
import { RotatingLines } from "react-loader-spinner";
import UseConfirmBooking from "./useConfirmBooking";
import { AiOutlineRight } from "react-icons/ai";
import ConfirmModal from "./ConfirmModal";
import Modal from "@component/Components/__common/modal";
import SuccessComp from "./SuccessComp";

const ConfirmAppointmentComp = () => {
  const {
    formik,
    loading,
    setpopupvisible,
    popupvisible,
    setTogglepage,
    togglePage,
    bookAppointmentpayload,
    handleSendagian,
    data,
  } = UseConfirmBooking();
  return (
    <>
      <Modal visible={popupvisible} onClose={setpopupvisible}>
        <ConfirmModal
          data={data}
          setpopupvisible={() => setpopupvisible(false)}
        />
      </Modal>
      {/* {!togglePage ? ( */}
      <>
        {" "}
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.heading}>Confirm your appointment</div>
            <div className={styles.subHeading}>
              We have sent you an SMS with the confirmation code to ***
              {bookAppointmentpayload?.phoneNo?.substring(
                bookAppointmentpayload?.phoneNo?.length - 3
              )}
              {/* <span>please re-enter it.</span> */}
            </div>
            <form
              className={styles.perSonalInfo}
              onSubmit={formik.handleSubmit}
            >
              <div className={styles.formContent}>
                <div className={styles.inputWrapper}>
                  <label>Enter the 6-digit code</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="- - - - - -"
                      type="text"
                      {...formik.getFieldProps("pinCode")}
                    />
                  </div>
                  <div className={styles.info}>
                    The SMS has not arrived in 2 minutes?{" "}
                    <span onClick={() => handleSendagian()}>
                      Send it again.
                    </span>
                  </div>
                  {formik.touched.pinCode && formik.errors.pinCode ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.pinCode}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <button type="submit">
                  {loading ? (
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="22"
                      visible={true}
                    />
                  ) : (
                    <>
                      <span>Confirm</span>
                      <AiOutlineRight />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
      {/* ) : (
         <>
           <SuccessComp />
         </>
       )} */}
    </>
  );
};

export default ConfirmAppointmentComp;
