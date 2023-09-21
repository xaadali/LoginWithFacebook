import moment from "moment";
import styles from "./detail.module.scss";

interface Props {
  setpopupvisible?: () => void;
  userInfo?: any;
}

const DetailModal = (prop: Props) => {
  const { setpopupvisible, userInfo } = prop;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>{userInfo?.name}</div>
        <div className={styles.detailsWrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.dateCard}>
              <span>Date & Time:</span>&nbsp;
              <label>
                {userInfo?.bookingDate
                  ? `${moment(userInfo?.bookingDate).format("YYYY-MM-DD")} ${
                      userInfo?.userSlot?.startTime
                    } - ${userInfo?.userSlot?.endTime}`
                  : ""}
              </label>
            </div>
            <div className={styles.infoWrapper}>
              <div className={styles.infoCard}>
                <span>Contact information:</span>&nbsp;
                <label>{userInfo?.phoneNo ? userInfo?.phoneNo : ""}</label>
              </div>
              <div className={styles.carCard}>
                <span>Car:</span>&nbsp;
                <label>{userInfo?.carName ? userInfo?.carName : ""}</label>
              </div>
            </div>
            <div className={styles.dateCard}>
              <label>
                <span>Chassis Number:</span>&nbsp;{" "}
                {userInfo?.chassisNo ? userInfo?.chassisNo : "N/A"}
              </label>
            </div>
            <div className={styles.dateCard}>
              <label>
                <span>Registration Number:</span>&nbsp;{" "}
                {userInfo?.registrationNo ? userInfo?.registrationNo : "N/A"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
