import {
  createRoom,
  deleteChatRoom,
  getChatRoomMessages,
  getChatRooms,
  getChatRoomsUnreadMessages,
  handleUpload,
  SearchUsers,
} from "@component/services/chat";
import { CHAT_SOCKET_TYPES, PlanTypeEnum } from "@component/utills/enum";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { SocketContext } from "@component/context/socket";
import {
  saveCompMessageData,
  saveNotificationUserData,
} from "@component/store/reducers/userReducer";
import { useRouter } from "next/router";
import { removeNotification } from "@component/store/reducers/notificationsSlice";

type Message = {
  author: string;
  message: string;
};

const UseChat = (setChatloading?: any) => {
  const searchData: any = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const [planInfo, setPlanInfo] = useState<boolean>(false);
  const { planTitle, firbaseToken, compMessageData } = useSelector(
    (state: any) => state?.user
  );

  const { showBanner } = useSelector((state: any) => state.compCalendar);
  const { expireTimeDuration } = useSelector((state: any) => state.user);
  const { currentPlanInfo } = useSelector((state: any) => state.plan);
  // const lastMessage = chatSate.pop();
  const [inputValue, setInputValue] = useState();
  const [mobileView, setMobileView] = useState<boolean>(true);
  const contactsData = [
    {
      id: 1,
      logo: "/icons/bmw.svg",
      title: "BMW",
      message: "Okay siap sama sama brother",
      time: "10:58 AM",
      notification: "1",
    },
    {
      id: 2,
      logo: "/icons/chevrolet.svg",
      title: "BMW",
      message: "Siapp nuhun pisan brader",
      time: "10:56 AM",
      notification: "1",
    },
    {
      id: 3,
      logo: "/icons/ford.svg",
      title: "FORD",
      message: "Kita keliling kota bogor aja yuu, sambil makan di cafe",
      time: "10:52 AM",
      notification: "1",
    },
    {
      id: 4,
      logo: "/icons/audi.svg",
      title: "Audi",
      message: "Kita keliling kota bogor aja yuu, sambil makan di cafe",
      time: "10:47 AM",
      notification: "1",
    },
    {
      id: 5,
      logo: "/icons/bmw.svg",
      title: "BMW",
      message: "Okay siap sama sama brother",
      time: "10:58 AM",
      notification: "1",
    },
    {
      id: 6,
      logo: "/icons/chevrolet.svg",
      title: "BMW",
      message: "Siapp nuhun pisan brader",
      time: "10:56 AM",
      notification: "1",
    },
    {
      id: 7,
      logo: "/icons/ford.svg",
      title: "FORD",
      message: "Kita keliling kota bogor aja yuu, sambil makan di cafe",
      time: "10:52 AM",
      notification: "1",
    },
    {
      id: 8,
      logo: "/icons/audi.svg",
      title: "Audi",
      message: "Kita keliling kota bogor aja yuu, sambil makan di cafe",
      time: "10:47 AM",
      notification: "1",
    },
  ];

  useEffect(() => {
    if (planTitle === PlanTypeEnum.StarterPlan) {
      setPlanInfo(true);
    }
  }, [planTitle]);

  // ################################
  // #### implementation of chat ####
  // ################################

  const socket: any = useContext(SocketContext);
  const { user } = useSelector((state: any) => state?.user);
  let userid = user?.data?.user?.id;
  let username = user?.data?.user?.fullName;
  let userImage = user?.data?.user?.imageUrl;
  const [chatRooms, setChatRooms] = useState<any>([]);
  const [searchInput, setSearchInput] = useState<any>();
  const [searchResults, setSearchResults] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState<any>("");
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [inputAction, setInputAction] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [showSearchbarMobile, setShowSearchbarMobile] = useState(false);
  const [lastReceivedMsg, setLastReceivedMsg] = useState<any>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState<any>(false);
  const [chatRoomPage, setChatRoomPage] = useState(1);
  const [chatPage, setChatPage] = useState(1);
  const [rawMessages, setRawMessages] = useState<any>([]);
  const [isRead, setIsRead] = useState(false);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [chatId, setChatid] = useState<string | any>("");
  const [Deleteloading, setDeleteloading] = useState(false);
  const [fileDataToSend, setFileDataToSend] = useState<any>(null);
  console.log(
    "🚀 ~ file: useChat.ts:151 ~ filDataToSend:",
    fileDataToSend?.target?.files
  );

  const otherUser =
    selectedRoom &&
    selectedRoom?.members?.filter((item) => item?.userId !== userid)[0];

  const handleCreateRoom = async (e, otherUserId, otherUserName, imageUrl) => {
    setLoading(true);
    setShowSearchbar(false);
    setLoading(false);

    setMessages([]);
    setSelectedRoom(null);
    setRawMessages([]);
    await createRoom({
      members: [
        {
          name: otherUserName,
          userId: otherUserId,
          profileImage: imageUrl,
        },
        {
          name: username,
          userId: userid,
          profileImage: userImage,
        },
      ],
      sender: userid,
    })
      .then((res) => {
        let chatRoomId = res?.data?.data?.chatRoomId;
        handleChat("e", {
          id: chatRoomId,
          members: [
            {
              name: otherUserName,
              id: otherUserId,
              userId: otherUserId,
              profileImage: imageUrl,
            },
            {
              name: username,
              id: userid,
              userId: userid,
              profileImage: userImage,
            },
          ],
        });
        setChatRooms([
          {
            id: chatRoomId,
            members: [
              {
                name: otherUserName,
                id: otherUserId,
                userId: otherUserId,
                profileImage: imageUrl,
              },
              {
                name: username,
                id: userid,
                userId: userid,
                profileImage: userImage,
              },
            ],
          },
          ...chatRooms,
        ]);
        setSelectedRoom({
          id: chatRoomId,
          members: [
            {
              name: otherUserName,
              id: otherUserId,
              userId: otherUserId,
              profileImage: imageUrl,
            },
            {
              name: username,
              id: userid,
              userId: userid,
              profileImage: userImage,
            },
          ],
        });

        setInputAction(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChat = (e, chatroom: any) => {
    setLoadingRoom(true);
    setShowSearchbar(false);
    setLoading(false);

    setRawMessages([]);
    setMessages([]);
    setSelectedRoom(null);
    setShowChat(false);
    setSelectedChatRoomId(chatroom.id);
    const otherUserId = chatroom.members.filter((item) => item.id !== userid)[0]
      .userId;
    socket.emit(
      CHAT_SOCKET_TYPES.ENTER_CHAT_ROOM,
      {
        chatRoomId: chatroom.id,
        otherUserId: otherUserId,
        userId: userid,
      },
      (data: any) => {
        // console.log("ENTER_CHAT_ROOM", data);
        setSelectedRoom(chatroom);
        setLoadingRoom(false);
        setChatPage(1);
        dispatch(
          saveNotificationUserData({
            chatRooomId: chatroom.id,
            userId: userid,
            otherUserId: otherUserId,
            selectedChatRoomId: selectedRoom?.id,
          })
        );
        // setShowChat(true);
        // setIsRead(true)
      }
    );
  };

  const listenersToPendingMessages = useCallback(async () => {
    if (selectedRoom) {
      socket
        .in(selectedRoom.id)
        .on(CHAT_SOCKET_TYPES.ALL_MESSAGES, (msg: any) => {
          // let index = messages.findIndex((data: any) => data._id == msg._id);
          // console.log(msg);
        });
    }
  }, []);

  // get all unread rooms data //

  const handleUnreadRoomMessages = () => {
    try {
    } catch (error) {}
  };

  // const getPendingMessages = async(chatroom) => {
  //   socket.on(
  //     CHAT_SOCKET_TYPES.ALL_MESSAGES,
  //     (data:any) => {
  //       console.log("ALL_MESSAGES", data)
  //       getchatRoomMessages(chatroom);
  //     }
  //   );
  // }

  // console.log("selected Room", selectedRoom)
  // console.log("Search Results", searchResults)
  // console.log("get Rooms", chatRooms)
  // useEffect(() => {
  //   if(chatRooms && chatRooms.lengt < 0) {
  //     console.log("other userName", chatRooms[0].members.filter(item => item.userId != userid))
  //   }
  // }, [chatRooms])

  // getting messages of a singleRoom from the server
  const getchatRooms = async () => {
    try {
      const resolvedPromise = await Promise.all([
        getChatRooms(chatRoomPage).catch((e) => e),
        getChatRoomsUnreadMessages(chatRoomPage, userid).catch((e) => e),
      ]);
      // isRead check in unread chat messages //
      const unreadChatRooms = resolvedPromise[1]?.data?.data.map((item) => {
        return {
          ...item,
          isMessageRead: true,
        };
      });
      // spreading two apis data in the state//
      if (chatRooms.length > 0) {
        setChatRooms([
          ...chatRooms,
          ...(resolvedPromise[0]?.data?.data || []),
          ...(unreadChatRooms || []),
        ]);
      } else {
        setChatRooms([
          ...(resolvedPromise[0]?.data?.data || []),
          ...(unreadChatRooms || []),
        ]);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleDelete = async (chatRoomId) => {
    try {
      // loading //
      setDeleteloading(true);

      // delete Api //
      await deleteChatRoom({
        chatRoomId: chatRoomId,
        userId: userid,
      });

      setSelectedRoom(null);
      setRawMessages([]);
      setShowChat(false);
      setDeleteloading(false);
      setChatloading(false);
      setDeleteloading(false);
    } catch (error) {
      setDeleteloading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDeleteModal = async () => {
    // await getchatRooms();
    setShowDeleteModal(false);
  };

  // useEffect(() => {}, [chatRoomPage]);

  const handleOpenModal = async (selectedItemId: string) => {
    setChatid(selectedItemId);
    setShowDeleteModal(true);
  };

  const handleUploadFile = async (e) => {
    const imageToUpload = e.target.files[0];
    setUploading(true);
    const formData = new FormData();

    formData.append("file", imageToUpload);
    formData.append("chatRoomId", selectedRoom.id);
    formData.append("sender", userid);
    formData.append("recipient", otherUser.userId);
    formData.append("fileType", imageToUpload.type);
    // formData.append("chatMembers", selectedRoom.members);

    try {
      const res = await handleUpload(formData);
      setUploading(false);

      // After uploading photo emit event for a new message //

      socket.emit(
        CHAT_SOCKET_TYPES.ADD_USER_MESSAGE,
        {
          isRead: true,
          message: "",
          fileType: imageToUpload.type,
          readByRecipient: false,
          recipient: otherUser?.userId,
          chatRoomId: selectedRoom.id,
          sender: userid,
          fcmToken: firbaseToken,
          photos: {
            key: res.data.key,
            url: res.data.url,
          },
          chatMembers: selectedRoom.members,
          _id: res?.data?._id,
        },
        (data) => {
          setRawMessages((prev: any) => [
            ...prev,
            {
              id: data?.data?._id,
              message: "",
              sender: userid,
              imageUrl: res.data.url,
              fileType: imageToUpload.type,
              chatRoomId: res?.data?.chatRoomId,
              date: res?.data?.date,
            },
          ]);
        }
      );
    } catch (error) {
      setUploading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const getchatRoomMessages = async (id) => {
    // console.log(userid);
    setShowChat(true);

    await getChatRoomMessages({
      chatRoomId: id,
      page: chatPage,
      userId: userid,
    })
      .then((res) => {
        // setMessages([...res?.data?.data].reverse());
        if (messages.length > 0) {
          let newMsgs = [...res?.data?.data].reverse();
          setRawMessages([...newMsgs, ...rawMessages]);
        } else {
          setRawMessages([...res?.data?.data].reverse());
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleDeleteChat = async (chatId: any, key: any) => {
    // console.log({ chatId, key });

    if (key && key?.length > 0) {
      socket.emit(
        "delete-user-message",
        { chatRoomId: selectedRoom?.id, chatId: chatId, key: key },
        (res) => {
          const filteredMessages = messages.filter(
            (message) => message.id != chatId
          );
          setRawMessages(filteredMessages);
        }
      );
      await getchatRooms();
    } else if (key?.length == 0) {
      socket.emit(
        "delete-user-message",
        { chatRoomId: selectedRoom?.id, chatId: chatId },
        (res) => {
          const filteredMessages = messages.filter(
            (message) => message.id != chatId
          );
          setRawMessages(filteredMessages);
        }
      );
      await getchatRooms();
    }
  };

  useEffect(() => {
    getchatRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      getchatRoomMessages(selectedRoom.id);
    }
  }, [chatPage]);

  const currentTimestampInMs = new Date().getTime();

  const handleSendMessage = async (e, value: string) => {
    e?.preventDefault();
    if (fileDataToSend === null) {
      if (selectedRoom && message?.length > 0) {
        const messageToSend = message;
        setMessage(null);
        socket.emit(
          CHAT_SOCKET_TYPES.ADD_USER_MESSAGE,
          {
            isRead: isRead,
            message: messageToSend,
            recipient: otherUser?.userId,
            chatRoomId: selectedRoom.id,
            sender: userid,
            fcmToken: firbaseToken,
            photos: {
              key: "",
              url: "",
            },
            chatMembers: selectedRoom.members,
          },
          (data) => {
            setRawMessages((prev) => [
              ...prev,
              {
                id: data?.data?._id,
                message: messageToSend,
                sender: userid,
                imageUrl: "",
                fileType: "",
                chatRoomId: selectedRoom.id,
                date: data?.data?.createdAt,
              },
            ]);
          }
        );
      }
    } else {
      const imageToUpload = fileDataToSend?.target?.files[0];
      setUploading(true);
      const formData = new FormData();

      formData.append("file", imageToUpload);
      formData.append("chatRoomId", selectedRoom.id);
      formData.append("sender", userid);
      formData.append("recipient", otherUser.userId);
      formData.append("fileType", imageToUpload.type);
      // formData.append("chatMembers", selectedRoom.members);

      try {
        const res = await handleUpload(formData);
        setUploading(false);
        setFileDataToSend(null);
        // After uploading photo emit event for a new message //

        socket.emit(
          CHAT_SOCKET_TYPES.ADD_USER_MESSAGE,
          {
            isRead: true,
            message: "",
            fileType: imageToUpload.type,
            readByRecipient: false,
            recipient: otherUser?.userId,
            chatRoomId: selectedRoom.id,
            sender: userid,
            fcmToken: firbaseToken,
            photos: {
              key: res.data.key,
              url: res.data.url,
            },
            chatMembers: selectedRoom.members,
            _id: res?.data?._id,
          },
          (data) => {
            setRawMessages((prev: any) => [
              ...prev,
              {
                id: data?.data?._id,
                message: "",
                sender: userid,
                imageUrl: res.data.url,
                fileType: imageToUpload.type,
                chatRoomId: res?.data?.chatRoomId,
                date: res?.data?.date,
              },
            ]);
          }
        );
      } catch (error) {
        setUploading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleSearch = async (value) => {
    if (value.length > 1) {
      setLoading(true);
      try {
        const res = await SearchUsers({ searchInput: value });
        setSearchResults(res?.data?.results);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      setSearchResults([]);
    }
    setLoading(false);
  };

  const listenerToConnect = useCallback(async () => {
    // if(socket?.connected) {
    socket.emit(CHAT_SOCKET_TYPES.USER_CONNECT, { userId: userid }, (res) => {
      getchatRooms();
    });
  }, []);

  const listenerToCheckOtherUserOnline = () => {
    socket.on("user-online", (res) => {
      console.log("user-online", res);
      setIsRead(true);
      setRecipientId(res);
    });
  };

  const listenerToCheckOtherUserOffline = () => {
    socket.on("user-offline", (res) => {
      console.log("user-offline", res);
      setIsRead(false);
      dispatch(saveNotificationUserData(null));
    });
  };

  const listenerToDeleteMessage = useCallback(async () => {
    socket.on("delete-user-message", { userId: userid }, (res) => {
      getchatRooms();
    });
  }, [selectedRoom]);

  const listenerForNewNotifications = () => {
    socket.on("new-notification", (res) => {
      console.log("new-notification: ", res);
    });
  };

  const listenersToReceiveMsgs = () => {
    if (selectedRoom) {
      socket
        // .in(selectedRoom.id)
        .on("new-user-message", (data: any) => {
          console.log("🚀 ~ file: useChat.ts:568 ~ .on ~ data:", data);
          // setting other user's messages only
          if (data?.sender != userid && data?.chatRoomId == selectedRoom?.id) {
            setRawMessages((prev) => [
              ...prev,
              {
                id: data._id,
                message: data.message,
                sender: data.sender,
                key: data.photos.key,
                imageUrl: data.photos.url,
                fileType: data.fileType,
                chatRoomId: data.chatRoomId,
                date: data?.createdAt,
              },
            ]);
          }
        });
    }
  };

  function filterDuplicatesById(jsonArray) {
    const uniqueJsons: any = {};
    const filteredArray: any = [];

    for (const jsonObj of jsonArray) {
      const idValue = jsonObj["id"];
      if (!uniqueJsons[idValue]) {
        // If the id is not present in the object, it's unique, so we add it to the filtered array
        uniqueJsons[idValue] = true;
        filteredArray.push(jsonObj);
      }
    }
    const filteredMsgs = filteredArray.filter(
      (message) => message.chatRoomId === selectedRoom?.id
    );
    setMessages(filteredMsgs);
  }

  // to filter duplicate msgs
  useEffect(() => {
    if (rawMessages) {
      filterDuplicatesById([...rawMessages]);
    }
  }, [rawMessages]);

  useEffect(() => {
    if (selectedRoom) {
      getchatRoomMessages(selectedRoom.id);
      setMessages([]);
      setRawMessages([]);
      listenerToCheckOtherUserOnline();
      listenerToCheckOtherUserOffline();
    } else {
      setRecipientId(null);
      dispatch(saveNotificationUserData(null));
      socket.emit("leave-user-room", { userId: userid });
    }
  }, [selectedRoom]);

  useEffect(() => {
    setMessages([]);
    setRawMessages([]);
    listenersToReceiveMsgs();
    dispatch(
      removeNotification({
        messageId: selectedChatRoomId,
      })
    );
    // listenersToPendingMessages();
  }, [selectedRoom]);

  useEffect(() => {
    listenerToConnect();
    listenerForNewNotifications();

    return () => {
      dispatch(saveNotificationUserData(null));
      socket.emit("leave-user-room", { userId: userid });
    };
  }, []);

  useEffect(() => {
    if (recipientId !== null) {
      setIsRead(true);
    } else {
      setIsRead(false);
    }
  }, [recipientId]);

  useEffect(() => {
    if (compMessageData != null) {
      handleCreateRoom(
        undefined,
        compMessageData?._id,
        compMessageData?.fullName,
        compMessageData?.imageUrl
      );
      dispatch(saveCompMessageData(null));
    }
  }, [compMessageData]);

  useEffect(() => {
    if (router.asPath != "/dashboard/chat") {
      setIsRead(false);
      dispatch(saveNotificationUserData(null));
    }
  }, [router.asPath]);

  return {
    contactsData,
    // chatSate,
    setInputValue,
    inputValue,
    // setChatState,
    showChat,
    // lastMessage,
    setMobileView,
    mobileView,
    setShowChat,
    planInfo,
    setSelectedRoom,
    // ####
    chatRooms,
    messages,
    handleChat,
    handleSearch,
    searchResults,
    searchInput,
    setSearchInput,
    selectedRoom,
    handleSendMessage,
    message,
    setMessage,
    loading,
    setLoading,
    loadingRoom,
    searchData,
    handleCreateRoom,
    inputAction,
    setInputAction,
    userid,
    showSearchbar,
    setShowSearchbar,
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
    handleUploadFile,
    uploading,
    setUploading,
    deleting,
    setDeleting,
    handleDeleteChat,
    showDeleteChatModal,
    setShowDeleteChatModal,
    chatRoomPage,
    setChatRoomPage,
    chatPage,
    setChatPage,
    showSearchbarMobile,
    setShowSearchbarMobile,
    isRead,
    setIsRead,
    handleOpenModal,
    chatId,
    Deleteloading,
    expireTimeDuration,
    showBanner,
    currentPlanInfo,
    handleDeleteModal,
    setChatRooms,
    setFileDataToSend,
    fileDataToSend,
  };
};

export default UseChat;
