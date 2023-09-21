/* eslint-disable @next/next/no-css-tags */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  BackgroundWrapper,
  Navigate,
  EventWrapper,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./companyCalender.module.scss";
import DetailModal from "./DetailModal";
import Modal from "@component/Components/__common/modal";
import UseCompanyCalender from "./useCompanyCalender";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import {
  EmptyBookedSlots,
  EmptyCompo,
} from "@component/Components/__common/Empty";
import { Calendar as ReactCalendar } from "react-multi-date-picker";
import Banner from "@component/Components/__common/Banner";
// import "react-calendar/dist/Calendar.css";
const localizer = momentLocalizer(moment);

const CompanyCalendarDetail = () => {
  const {
    calendarList,
    modifyBookingSlots,
    setState,
    State,
    loading,
    userDate,
    setUserDate,
    currentPlanInfo,
    showBanner,
    expireTimeDuration,
  } = UseCompanyCalender();
  const [popupvisible, setpopupvisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>("");
  const [active, setActive] = useState<any>({ status: true, Index: null });

  const handleUserInfo = (e) => {
    setUserInfo(e);
    setpopupvisible(true);
  };

  // const handleEventSelected = (event) => {
  // setState({
  //   openEvent: true,
  //   clickedEvent: event,
  //   start: event.start,
  //   end: event.end,
  //   title: event.title,
  //   desc: event.desc
  // });
  // };

  //  Allows user to click on calendar slot and handles if appointment exists
  const handleSlotSelected = (slotInfo) => {
    setUserDate(null);
    setState({
      title: "",
      desc: "",
      start: slotInfo.start,
      end: slotInfo.end,
      openSlot: true,
    });
  };

  const handleDateChange = async (e) => {
    setState(null);
    setUserDate(e);
  };

  const handleMonthChange = () => {};
  return (
    <>
      <div className={styles.container}>
        <h1>Calendar</h1>
        <div style={{ width: "91%" }}>
          {showBanner && expireTimeDuration ? (
            <Banner currentPlanInfo={currentPlanInfo} />
          ) : null}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.calendarDesktop}>
            <div
              style={{
                height: "500pt",
                // border: "1px solid #DCDFE3",
                padding: "0.5rem 0 0rem 0",
                borderRadius: "5px",
              }}
            >
              <Calendar
                localizer={localizer}
                events={calendarList}
                defaultDate={moment().toDate()}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                selectable={true}
                // onSelectEvent={event => handleEventSelected(event)}
                onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
                //  onNavigate={() => event.slice(Math.random())}
              />
            </div>
          </div>
          <div className={styles.calendarMobile}>
            <ReactCalendar
              className={styles.libraryCalender}
              value={userDate}
              onChange={handleDateChange}
              onMonthChange={handleMonthChange}
              // multiple={false}
              minDate={new Date()}
            />
          </div>

          <div className={styles.bookingSide}>
            <div className={styles.bookedSlots}>
              <div className={styles.bookedheading}>Recent Booked Slots</div>

              <div className={styles.bookedDetails}>
                {userDate
                  ? moment(new Date(userDate?.unix * 1000)).format("LL")
                  : State?.start
                  ? moment(State?.start).format("LL")
                  : ""}
              </div>
            </div>
            <div className={styles.timeSlots}>
              {loading ? (
                <CompLoader />
              ) : !Boolean(modifyBookingSlots?.length) ? (
                <EmptyBookedSlots />
              ) : (
                modifyBookingSlots?.map((item, index) => (
                  <>
                    <div
                      className={styles.time}
                      key={index}
                      onClick={() => setActive({ status: true, Index: index })}
                    >
                      <div className={styles.leftLine} />
                      <div className={styles.timeDetail}>
                        {item?.userSlot?.startTime} To {item?.userSlot?.endTime}
                      </div>
                      <div className={styles.rightLine} />
                    </div>
                    {index === active?.Index && active.status && (
                      <div className={styles.timesubDetail}>
                        <div
                          className={styles.details}
                          onClick={() => handleUserInfo(item)}
                        >
                          <div className={styles.left}>
                            <p className={styles.name}>{item?.name}</p>
                            <p className={styles.contact}>
                              Contact: {item?.phoneNo}
                            </p>
                            <p className={styles.alerts}>
                              {item?.userSlot?.alert}
                            </p>
                          </div>
                          <div className={styles.right}>
                            <p>{item?.userSlot?.isOpen ? "View" : "View"}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={popupvisible}
        btn
        onClose={() => setpopupvisible(false)}
        showModal2
      >
        <DetailModal
          userInfo={userInfo}
          setpopupvisible={() => setpopupvisible(false)}
        />
      </Modal>
    </>
  );
};

export default CompanyCalendarDetail;
