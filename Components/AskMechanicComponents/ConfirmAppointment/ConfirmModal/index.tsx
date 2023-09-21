import moment from "moment";
import styles from "./confirmModal.module.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
// import { GoDot } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { BsTelephoneFill } from "react-icons/bs";
// import { FaMapMarkerAlt } from "react-icons/fa";
import UseConfirmBooking from "../useConfirmBooking";
// import styles from "./confirmModal.module.scss";

interface Props {
  setpopupvisible?: () => void;
  data?: any;
}

const ConfirmModal = (prop: Props) => {
  const { setpopupvisible, data } = prop;
  console.log("🚀 ~ file: index.tsx:18 ~ ConfirmModal ~ data:", data);
  const { navigaetBooking, navigateTosearching, setitem, btnLoading } =
    UseConfirmBooking();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <img src="/icons/tick.svg" className={styles.tick} /> Appointment
          Booked
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.detail}>
            <div className={styles.logo}>
              {/* <img src="./icons/nissan.svg" /> */}
              <img src={data?.companyImageUrl} alt="no-img" />
            </div>
            <div className={styles.review}>
              <div className={styles.brandName}>{data?.companyName}</div>
              <div className={styles.ratingWrapper}>
                <div className={styles.stars}>
                  {Math.round(setitem?.companyReviews) === 6 ? (
                    <>
                      {[...Array(Number(Math.round(5) || 0))]?.map(
                        (star, index) => {
                          return (
                            <div className={styles.ratingBoxs} key={index} />
                          );
                        }
                      )}
                    </>
                  ) : (
                    <>
                      {[
                        ...Array(
                          Number(Math.round(setitem?.companyReviews) || 0)
                        ),
                      ]?.map((star, index) => {
                        return (
                          <div className={styles.ratingBoxs} key={index} />
                        );
                      })}
                    </>
                  )}
                </div>
                <span>{setitem?.totalCount} reviews</span>
              </div>
              <div className={styles.location}>
                <FaMapMarkerAlt />
                <div className={styles.street}>
                  {data?.companyAddress?.title}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contactWrapper}>
            <div className={styles.contactHeading}>Contact Info</div>
            <div className={styles.contactNumber}>
              <BsTelephoneFill /> <span>{data?.companyPhoneNo}</span>
            </div>
            {/* <div className={styles.contactNumber}>
              <BsTelephoneFill /> <span>636 16..... Show number</span>
            </div> */}
          </div>
          <div className={styles.dateTimeWrapper}>
            <div className={styles.dataWrapper}>
              <div className={styles.id}>Booked ID</div>
              <span>{data?.bookingId}</span>
            </div>
            <div className={styles.dataWrapper}>
              <div className={styles.id}>Date and Time</div>
              <span>
                {moment(data?.bookingDate).format("ll")} |{" "}
                {data?.userSlot?.startTime} - {data?.userSlot?.endTime}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.informationWrapper}>
          <div className={styles.infoHeading}>Information</div>
          <div className={styles.infoWrapper}>
            <div className={styles.nameWrapper}>
              Name: {data?.name === "" ? "N/A" : data?.name}
            </div>
            <div className={styles.nameWrapper}>Phone: {data?.userPhoneNo}</div>
            <div className={styles.nameWrapper}>Car: {data?.carName}</div>
            <div className={styles.nameWrapper}>
              Comment:
              {/* {data?.comment === "" ? "N/A" : data?.comment} */}
              {data?.comment?.length > 500 ? (
                <>
                  {" "}
                  <div
                    className={styles.commentWrapper}
                    dangerouslySetInnerHTML={{ __html: data?.comment }}
                  />
                </>
              ) : (
                <>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data?.comment === "" ? "N/A" : data?.comment,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.btnWrapper}>
            <div
              className={styles.backBtn}
              onClick={() => navigateTosearching()}
            >
              {btnLoading ? (
                <RotatingLines
                  strokeColor="#3d83df"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                "Back"
              )}
            </div>
            <div className={styles.btn2} onClick={() => navigaetBooking()}>
              My Appointment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
