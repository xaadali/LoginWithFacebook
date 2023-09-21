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
import styles from "./dates.module.scss";
import useDate from "./useDate";
import Modal from "@component/Components/__common/modal";
import DatesModal from "./DatesModal";
import { CompLoader } from "@component/Components/__common/loader/Loader";
import { EmptyCompo } from "@component/Components/__common/Empty";
// import { events } from "./events";

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
  const {
    setpopupvisible,
    popupvisible,
    handleEventSelected,
    loading,
    data,
    events,
  } = useDate();
  const event = [
    {
      id: 14,
      title: "09:00 | 09:30 Appointment",
      name: "Appointment",
      start: moment().format("LLLL"),
      end: moment().format("LLLL"),
    },
  ];
  // const handleSlotSelected = (slotInfo) => {
  // };
  const newArray = events?.map((element: any) => {
    // let startTime = element?.userSlots?.map((item:any) =>{return item?.startTime});
    // let endTime =element?.userSlots?.map((item:any) =>{return item?.endTime});
    // let slotid =element?.userSlots?.map((item:any) =>{return item?.slotId});
    let startTime = element?.userSlot?.startTime;
    let endTime = element?.userSlot?.endTime;
    let slotid = element?.userSlot?.slotId;
    let day = element?.userSlot?.day;

    return {
      title: `${startTime} | ${endTime} Appointment`,
      start: new Date(element?.bookingDate),
      end: new Date(element?.bookingDate),
      slotId: slotid,
      bookingDate: element?.bookingDate,
      bookingId: element?.bookingId,
      companyId: element?.companyId,
      status: element?.status,
      userId: element?.userId,
      day: day,
    };
  });

  return (
    <>
      <Modal visible={popupvisible} btn onClose={setpopupvisible}>
        <DatesModal
          setpopupvisible={() => setpopupvisible(false)}
          data={data}
        />
      </Modal>
      <div className={styles.mainWrap}>
        <h1>My Dates</h1>
        {loading ? (
          <CompLoader />
        ) : !Boolean(newArray?.length) ? (
          <EmptyCompo />
        ) : (
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <Calendar
                localizer={localizer}
                events={newArray}
                defaultDate={moment().toDate()}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                onSelectEvent={(event) => handleEventSelected(event)}
                onSelectSlot={(e) => handleEventSelected(e)}
                // onNavigate={() => event.slice(Math.random())}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(MyCalendar);
