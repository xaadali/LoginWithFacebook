import {
  getsearchingData,
  setLookforData,
} from "@component/store/reducers/bookAppointmentReducer";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setTruestate } from "@component/store/reducers/mechanic";
import { getNotificationsApi } from "@component/services/chat";
import { saveCompMessageData } from "@component/store/reducers/userReducer";
import { removeNotification } from "@component/store/reducers/notificationsSlice";

const useNavigation = () => {
  const router = useRouter();
  const location = useRouter();
  const dispatch = useDispatch();
  const notificationsRef: any = useRef(null);
  const { user } = useSelector((state: any) => state?.user);
  let userid = user?.data?.user?.id;
  let username = user?.data?.user?.fullName;

  // ################
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any>(null);

  // #####################

  const getNotifications = async () => {
    setNotifications(null);
    await getNotificationsApi({ userId: userid })
      .then((res) => {
        setNotifications(res.data.chatRooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationsRef.current &&
      !notificationsRef.current.contains(event.target as Node)
    ) {
      setShowNotifications(false);
    }
  };

  const handleCloseNotifications = (payload) => {
    console.log(
      "🚀 ~ file: useNavigation.ts:50 ~ handleCloseNotifications ~ payload:",
      payload
    );
    let param = {
      _id: payload?.data?.["gcm.notification.userId"],
      fullName: payload?.notification?.title,
      imageUrl: payload?.notification?.image,
    };
    dispatch(saveCompMessageData(param));
    dispatch(
      removeNotification({
        messageId: payload?.data?.["gcm.notification.chatRoomId"],
      })
    );
    router.push("/dashboard/chat");
    setShowNotifications(false);
  };

  // useEffect(() => {
  //   if (showNotifications) {
  //     getNotifications();
  //   }
  // }, [showNotifications]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    showNotifications,
    setShowNotifications,
    getNotifications,
    notifications,
    userid,
    handleCloseNotifications,
    notificationsRef,
  };
};

export default useNavigation;
