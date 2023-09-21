import React, { useEffect, useRef, useState } from "react";
import styles from "./notification.module.scss";
// import NotificationIcon from "../../../Assets/image/bell.svg";
// import NotificationImag from "../../../Assets/image/notification-image.svg";
// import { HTTP_CLIENT } from "../../../utils/services";
import moment from "moment";

const Notification = (props) => {
  // const ref = useRef(null);
  const [notification, setnotification] = useState(false);
  const [colneNotification, setCloneNotification] = useState(false);
  const [notificationNumber, setNotificationNumber] = useState();
  const [notificationData, setNotificationData] = useState([]);
  useEffect(() => {
    //   FatchDate();
  }, []);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        setnotification(notification);
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);
  const FatchDate = async () => {
    // let response = await HTTP_CLIENT.get("/notification");
    // setNotificationData(response.data);
    // setInterval(async () => {
    //   let res = localStorage.getItem("authToken");
    //   if (res) {
    //     let response = await HTTP_CLIENT.get("/notification");
    //     setNotificationData(response.data);
    //   }
    // }, 60000 * 5);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper} ref={ref}>
          <div
            className={styles.notification}
            onClick={() => setnotification(!notification)}
          >
            {/* <img src={NotificationIcon} alt="Notification" /> */}
            {notificationNumber ? (
              <div className={styles.notificationbadge}>
                <span>6</span>
              </div>
            ) : (
              ""
            )}
          </div>
          {notification ? (
            <div className={styles.bellmessage}>
              <div className={styles.heading}>
                <span>Notifications</span>
              </div>
              {notificationData.map((items, index) => {
                return (
                  <div className={styles.card} key={index}>
                    {/* <div className={styles.left}>
                        <img src={NotificationImag} alt="Notification" />
                      </div> */}
                    <div className={styles.right} key={index}>
                      <label className={styles.notificationMessage}>
                        {items.message}
                      </label>
                      {/* <h6>Yogle Ishmada</h6> */}
                      <label>
                        {moment(items.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
