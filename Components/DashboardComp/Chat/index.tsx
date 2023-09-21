/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "./chat.module.scss";
import { CiSearch } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi";
import UseChat from "./useChat";
import { IoIosSend } from "react-icons/io";
import moment from "moment";
import { BsArrowLeft } from "react-icons/bs";
import { PlanCompo } from "@component/Components/__common/Empty";
import { BsChevronDown } from "react-icons/bs";
import { GiSevenPointedStar } from "react-icons/gi";
import {
  deleteChatRoom,
  getChatRoomMessages,
  getChatRooms,
  getChats,
  SearchUsers,
} from "@component/services/chat";
import {
  BarLoader,
  CircularLoader,
} from "@component/Components/__common/loader/Loader";
import {
  AiOutlineDelete,
  AiOutlinePaperClip,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BsFiletypePdf } from "react-icons/bs";

import ClickOutside from "@component/Components/__common/clickOutside";
import Modal from "@component/Components/__common/modal";
import { toast } from "react-toastify";
import DeleteChatPopup from "./ChatDeletePopup";
import Banner from "@component/Components/__common/Banner";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { saveNotificationUserData } from "@component/store/reducers/userReducer";
const MyChat = () => {
  const {
    // contactsData,
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

    // ####
    chatRooms,
    searchInput,
    searchResults,
    messages,
    handleChat,
    handleSearch,
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
    deleting,
    uploading,
    showDeleteChatModal,
    setShowDeleteChatModal,
    handleDeleteChat,
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
    setChatRooms,
    expireTimeDuration,
    showBanner,
    currentPlanInfo,
    handleDeleteModal,
    setSelectedRoom,
    setFileDataToSend,
    fileDataToSend,
  } = UseChat();
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("chatRooms line no 93", chatRooms);

  const otherUser =
    selectedRoom &&
    selectedRoom?.members?.filter((item) => item?.userId != userid)[0];

  let uniqueChatRooms = chatRooms?.reduce((uniqueRooms, room) => {
    const existingRoom = uniqueRooms?.find((item) => item?.id === room?.id);
    if (!existingRoom) {
      uniqueRooms?.push(room);
    }
    return uniqueRooms;
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // @ts-ignore
      chatContainerRef.current.scrollTop =
        // @ts-ignore
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleDeleteChatRoom = async (roomId) => {
    try {
      // delete chat room using id //
      await handleDelete(roomId);
      // filter chat room from state //
      setChatRooms((existingRooms) => {
        return existingRooms.filter((room) => {
          return room.id !== roomId;
        });
      });
      // sempty all the states //
      setShowDeleteModal(false);
      setSelectedRoom(null);
      setShowChat(false);
    } catch (error) {
      setShowDeleteModal(false);
      toast.error(error?.response?.data?.message);
    }
  };

  // Call the scrollToBottom function after the component has rendered and whenever the chat messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div style={{ width: "100%" }}>
        {showBanner && expireTimeDuration ? (
          <div style={{ width: "100%", marginBottom: "1rem" }}>
            <Banner currentPlanInfo={currentPlanInfo} />
          </div>
        ) : null}
        <div className={styles.container}>
          {planInfo ? (
            <PlanCompo />
          ) : (
            <>
              {/* for mobile  */}
              <div className={styles.Mobilewrapper}>
                {!showChat ? (
                  <div className={styles.contactsWrapper}>
                    {showSearchbarMobile ? (
                      <ClickOutside
                        onClickOutside={() => setShowSearchbarMobile(false)}
                      >
                        <div className={styles.searchInput}>
                          <div
                            className={styles.inputWrapper}
                            onClick={() => setInputAction(true)}
                          >
                            <input
                              type="text"
                              placeholder="Search..."
                              onChange={(e) => handleSearch(e.target.value)}
                            />
                            {loading ? (
                              <CircularLoader />
                            ) : (
                              // <p>
                              //   Loading
                              // </p>
                              <BsChevronDown
                                style={{ marginTop: "5px" }}
                                className={styles.icon}
                              />
                            )}
                          </div>
                          {searchResults && inputAction && (
                            <div className={styles.inputTextWrapper}>
                              {searchResults?.length > 0 &&
                                searchResults.map((item, index) => (
                                  <div
                                    className={styles.searchResult}
                                    onClick={(e) =>
                                      handleCreateRoom(
                                        e,
                                        item._id,
                                        item.fullName,
                                        item.imageUrl
                                      )
                                    }
                                    key={index}
                                  >
                                    <div className={styles.image}>
                                      {otherUser && otherUser?.profileImage ? (
                                        <img
                                          src={otherUser?.profileImage}
                                          alt="icon"
                                        />
                                      ) : (
                                        <div
                                          className={styles.placeholderImage}
                                        >
                                          {item?.fullName?.charAt(0)}
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h3 style={{ fontWeight: "normal" }}>
                                        {item?.fullName}
                                      </h3>
                                      {/* <p style={{ fontSize: "12px" }}>{item._id}</p> */}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}

                          {/* <AsyncSelect
                          defaultOptions
                          cacheOptions
                          components={animatedComponents}
                            // components={{Option: CustomOption}}
                            loadOptions={loadOption}
                            // options={searchResults}
                            onInputChange={(value) => setSearchInput(value)}
                            onChange={(value) => console.log(value)}
                          /> */}
                        </div>
                      </ClickOutside>
                    ) : (
                      <div className={styles.header}>
                        <div className={styles.leftSide}>
                          <div className={styles.heading}>All Messages</div>
                        </div>
                        <div className={styles.rightSide}>
                          <CiSearch
                            className={styles.icon}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowSearchbarMobile(true)}
                          />
                          {/* <BsThreeDots className={styles.icon} /> */}
                        </div>
                      </div>
                    )}
                    <div className={styles.contacts}>
                      {chatRooms &&
                        uniqueChatRooms?.map((item) => {
                          const _otherUser =
                            item &&
                            item?.members?.filter(
                              (member) => member?.userId != userid
                            )[0];
                          return (
                            <>
                              <div
                                className={styles.chat}
                                style={{
                                  backgroundColor:
                                    item?.id == selectedRoom?.id
                                      ? "rgba(61, 131, 223, 0.2352941176)"
                                      : " ",
                                }}
                                key={item?.id}
                              >
                                <div
                                  className={styles.leftSide}
                                  onClick={(e) => {
                                    handleChat(e, item), setShowChat(true);
                                  }}
                                >
                                  <div
                                    className={styles.profile__image}
                                    style={{
                                      overflow: "hidden",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    {_otherUser && _otherUser?.profileImage ? (
                                      <img
                                        src={_otherUser?.profileImage}
                                        alt="icon"
                                      />
                                    ) : (
                                      <div className={styles.placeholderImage}>
                                        {_otherUser &&
                                          _otherUser?.name?.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div className={styles.titleSection}>
                                    <div className={styles.title}>
                                      {_otherUser && _otherUser?.name}
                                    </div>
                                    <div className={styles.desc}>
                                      {/* <BiCheckDouble /> */}
                                      {item?.recentMessage?.text}
                                    </div>
                                  </div>
                                </div>
                                {/* working */}
                                <div className={styles.rightSide}>
                                  <div className={styles.timing}>
                                    <AiOutlineDelete
                                      onClick={() =>
                                        setShowDeleteModal(item?.id)
                                      }
                                    />
                                  </div>
                                  {/* <div className={styles.timing}>
                                  11
                                </div> */}
                                  {/* <div className={styles.notification}>112</div> */}
                                </div>
                              </div>
                            </>
                          );
                        })}
                      {uniqueChatRooms?.length > 9 && (
                        <div style={{ margin: "0 1rem" }}>
                          <button
                            style={{
                              backgroundColor: "#3d83df",
                              color: "#fff",
                              borderRadius: "10px",
                              padding: "10px",
                              outline: 0,
                              border: 0,
                              cursor: "pointer",
                              width: "100%",
                            }}
                            onClick={() => setChatRoomPage(chatRoomPage + 1)}
                          >
                            More
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {showChat ? (
                  <>
                    <div className={styles.chatWrapper}>
                      <div className={styles.headingParent}>
                        <div
                          className={styles.heading}
                          onClick={() => {
                            setShowChat(false);
                          }}
                        >
                          <BsArrowLeft className={styles.arrowIcon} />
                        </div>
                        <div className={styles.header}>
                          {otherUser && otherUser?.profileImage ? (
                            <img src={otherUser?.profileImage} alt="icon" />
                          ) : (
                            <div className={styles.placeholderImage}>
                              {otherUser && otherUser.name.charAt(0)}
                            </div>
                          )}

                          <div
                            className={styles.title}
                            onClick={() =>
                              router.push({
                                pathname: "/mechanic-detail",
                                query: {
                                  companyId: otherUser?.userId,
                                }, // Add any other query parameters here
                              })
                            }
                          >
                            {otherUser && otherUser.name}
                          </div>
                        </div>
                      </div>

                      <div
                        className={styles.messageWrapper}
                        ref={chatContainerRef}
                      >
                        {messages?.length > 9 && (
                          <div style={{ margin: "0 1rem" }}>
                            <button
                              style={{
                                backgroundColor: "#3d83df",
                                color: "#fff",
                                borderRadius: "10px",
                                padding: "10px",
                                outline: 0,
                                border: 0,
                                cursor: "pointer",
                                width: "100%",
                              }}
                              onClick={() => setChatPage(chatPage + 1)}
                            >
                              More
                            </button>
                          </div>
                        )}
                        <>
                          {messages &&
                            messages?.map((item) => {
                              const { message, imageUrl, fileType } = item;
                              return (
                                <>
                                  {item?.sender != userid ? (
                                    <>
                                      <div className={styles.inComing}>
                                        <div className={styles.inComingMessage}>
                                          {message?.length > 0 ? (
                                            <span className={styles.content}>
                                              {message}
                                            </span>
                                          ) : (
                                            <>
                                              {fileType == "application/pdf" ? (
                                                <a
                                                  href={imageUrl}
                                                  download
                                                  target="_blank"
                                                >
                                                  <p
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "black",
                                                      textDecoration:
                                                        "underline",
                                                      margin: 0,
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <BsFiletypePdf
                                                      style={{
                                                        fontSize: "25px",
                                                      }}
                                                    />{" "}
                                                    click to download file
                                                  </p>
                                                </a>
                                              ) : (
                                                <a
                                                  href={imageUrl}
                                                  download
                                                  target="_blank"
                                                >
                                                  <img
                                                    src={imageUrl}
                                                    alt=""
                                                    style={{
                                                      width: "100%",
                                                      borderRadius: "7px",
                                                    }}
                                                  />
                                                </a>
                                              )}
                                            </>
                                          )}
                                          {/* <AiOutlineDelete
                                            style={{
                                              position: "absolute",
                                              color: "red",
                                              cursor: "pointer",
                                              right: "10px",
                                              top: "10px",
                                            }}
                                            onClick={() =>
                                              setShowDeleteChatModal({id: item?.id, key: item?.key})
                                            }
                                          /> */}
                                          {/* <p className={styles.timing}>{timing}</p> */}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className={styles.outGoing}>
                                        <div className={styles.outGoing}>
                                          <div
                                            className={styles.outGoingMessage}
                                          >
                                            {message?.length > 0 ? (
                                              <span className={styles.content}>
                                                {message}
                                              </span>
                                            ) : (
                                              <>
                                                {fileType ==
                                                "application/pdf" ? (
                                                  <a
                                                    href={imageUrl}
                                                    download
                                                    target="_blank"
                                                  >
                                                    <p
                                                      style={{
                                                        fontSize: "12px",
                                                        color: "white",
                                                        textDecoration:
                                                          "underline",
                                                        margin: 0,
                                                        display: "flex",
                                                        alignItems: "center",
                                                      }}
                                                    >
                                                      <BsFiletypePdf
                                                        style={{
                                                          fontSize: "25px",
                                                        }}
                                                      />{" "}
                                                      click to download file
                                                    </p>
                                                  </a>
                                                ) : (
                                                  <a
                                                    href={imageUrl}
                                                    download
                                                    target="_blank"
                                                  >
                                                    <img
                                                      src={imageUrl}
                                                      alt=""
                                                      style={{
                                                        width: "100%",
                                                        borderRadius: "7px",
                                                      }}
                                                    />
                                                  </a>
                                                )}
                                              </>
                                            )}
                                            {/* <AiOutlineDelete
                                              style={{
                                                position: "absolute",
                                                color: "red",
                                                cursor: "pointer",
                                                right: "10px",
                                                top: "10px",
                                              }}
                                              onClick={() =>
                                                setShowDeleteChatModal({id: item?.id, key: item?.key})
                                              }
                                            /> */}
                                            {/* <p className={styles.timing}>{timing}</p> */}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </>
                              );
                            })}
                        </>
                      </div>
                      <div className={styles.inputContainer}>
                        {/* <div className={styles.inputWrapper}> */}
                        {fileDataToSend && (
                          <div className={styles.fileView}>
                            {!uploading && (
                              <AiFillCloseCircle
                                className={styles.closeIcon}
                                onClick={() => setFileDataToSend(null)}
                              />
                            )}
                            {fileDataToSend?.target?.files[0]?.type ===
                            "application/pdf" ? (
                              <div className={styles.pdfView}>
                                {" "}
                                <BsFiletypePdf className={styles.icon} />{" "}
                                {fileDataToSend?.target?.files[0]?.name}
                              </div>
                            ) : (
                              <img
                                src={
                                  fileDataToSend === null
                                    ? ""
                                    : URL?.createObjectURL(
                                        fileDataToSend?.target?.files[0]
                                      )
                                }
                                alt=""
                              />
                            )}
                          </div>
                        )}
                        <form
                          onSubmit={(e) => handleSendMessage(e, message)}
                          className={styles.inputWrapper}
                        >
                          {!uploading ? (
                            <div className={styles.chatInput}>
                              <label className={styles.chatInputLabel}>
                                <input
                                  type="file"
                                  accept="application/pdf, image/jpeg, image/png"
                                  style={{ display: "none" }}
                                  onChange={(e) => setFileDataToSend(e)}
                                />
                                <AiOutlinePaperClip className={styles.icon} />
                              </label>
                            </div>
                          ) : (
                            <CircularLoader />
                          )}
                          <input
                            type="text"
                            // disabled={loading}
                            placeholder="Type a message"
                            value={message || ""}
                            onChange={(e: any) => setMessage(e.target.value)}
                            disabled={
                              fileDataToSend != null || loading ? true : false
                            }
                          />
                          {!uploading ? (
                            <IoIosSend
                              type="submit"
                              className={styles.icon}
                              onClick={(e) => handleSendMessage(e, message)}
                            />
                          ) : (
                            <CircularLoader />
                          )}
                        </form>
                        {/* </div> */}
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              {/* //for desktop  */}
              <div className={styles.Desktopwrapper}>
                <div className={styles.contactsWrapper}>
                  {showSearchbar ? (
                    <ClickOutside
                      onClickOutside={() => setShowSearchbar(false)}
                    >
                      <div className={styles.searchInput}>
                        <div
                          className={styles.inputWrapper}
                          onClick={() => setInputAction(true)}
                        >
                          <input
                            autoFocus
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                          {loading ? (
                            <CircularLoader />
                          ) : (
                            // <p>
                            //   Loading
                            // </p>
                            <BsChevronDown
                              style={{ marginTop: "5px" }}
                              className={styles.icon}
                            />
                          )}
                        </div>
                        {searchResults && inputAction && (
                          <div className={styles.inputTextWrapper}>
                            {searchResults?.length > 0 &&
                              searchResults.map((item, index) => (
                                <div
                                  className={styles.searchResult}
                                  onClick={(e) =>
                                    handleCreateRoom(
                                      e,
                                      item._id,
                                      item.fullName,
                                      item.imageUrl
                                    )
                                  }
                                  key={index}
                                >
                                  <div className={styles.image}>
                                    {item.imageUrl ? (
                                      <img src={item.imageUrl} alt="icon" />
                                    ) : (
                                      <div className={styles.placeholderImage}>
                                        {item?.fullName?.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <h3
                                      style={{
                                        fontWeight: "normal",
                                        fontSize: "16px",
                                      }}
                                    >
                                      {item?.fullName}
                                    </h3>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}

                        {/* <AsyncSelect
                          defaultOptions
                          cacheOptions
                          components={animatedComponents}
                            // components={{Option: CustomOption}}
                            loadOptions={loadOption}
                            // options={searchResults}
                            onInputChange={(value) => setSearchInput(value)}
                            onChange={(value) => console.log(value)}
                          /> */}
                      </div>
                    </ClickOutside>
                  ) : (
                    <div className={styles.header}>
                      <div className={styles.leftSide}>
                        <div className={styles.heading}>All Messages</div>
                      </div>
                      <div className={styles.rightSide}>
                        <CiSearch
                          className={styles.icon}
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowSearchbar(true)}
                        />
                        {/* <BsThreeDots className={styles.icon} /> */}
                      </div>
                    </div>
                  )}
                  <div className={styles.contacts}>
                    {chatRooms &&
                      uniqueChatRooms?.map((item) => {
                        const _otherUser =
                          item &&
                          item?.members?.filter(
                            (member) => member?.userId != userid
                          )[0];
                        return (
                          <>
                            <div
                              className={styles.chat}
                              style={{
                                backgroundColor:
                                  item?.id == selectedRoom?.id
                                    ? "rgba(61, 131, 223, 0.2352941176)"
                                    : " ",
                              }}
                              key={item?.id}
                            >
                              <div
                                className={styles.leftSide}
                                onClick={(e) => {
                                  handleChat(e, item),
                                    setShowChat(true),
                                    setIsRead(false);
                                }}
                              >
                                <div className={styles.profile__image}>
                                  {_otherUser && _otherUser?.profileImage ? (
                                    <img
                                      src={_otherUser?.profileImage}
                                      alt="icon"
                                    />
                                  ) : (
                                    <>
                                      {item?.isMessageRead === false && (
                                        <GiSevenPointedStar
                                          className={styles.icons}
                                        />
                                      )}
                                      <div className={styles.placeholderImage}>
                                        {_otherUser &&
                                          _otherUser?.name?.charAt(0)}
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div className={styles.titleSection}>
                                  <div className={styles.title}>
                                    {item?.isMessageRead === false && (
                                      <div className={styles.unreadMessages}>
                                        Unread
                                      </div>
                                    )}
                                    {_otherUser && _otherUser?.name}
                                  </div>
                                  <div className={styles.desc}>
                                    {item?.recentMessage?.text}
                                  </div>
                                </div>
                              </div>
                              {/* working */}
                              <div className={styles.rightSide}>
                                <div className={styles.timing}>
                                  <AiOutlineDelete
                                    onClick={() => handleOpenModal(item?.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    {uniqueChatRooms?.length > 9 && (
                      <div style={{ margin: "0 1rem" }}>
                        <button
                          style={{
                            backgroundColor: "#3d83df",
                            color: "#fff",
                            borderRadius: "10px",
                            padding: "10px",
                            outline: 0,
                            border: 0,
                            cursor: "pointer",
                            width: "100%",
                          }}
                          onClick={() => setChatRoomPage(chatRoomPage + 1)}
                        >
                          More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {showChat ? (
                  <>
                    <div className={styles.chatWrapper}>
                      <div className={styles.header}>
                        <div className={styles.profile__image}>
                          {otherUser && otherUser?.profileImage ? (
                            <img src={otherUser?.profileImage} alt="icon" />
                          ) : (
                            <div className={styles.placeholderImage}>
                              {selectedRoom &&
                                selectedRoom?.members
                                  ?.filter((item) => item?.userId != userid)[0]
                                  ?.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div
                          className={styles.title}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            router.push({
                              pathname: "/mechanic-detail",
                              query: {
                                companyId: selectedRoom?.members?.find(
                                  (item) => item?.userId != userid
                                )?.userId,
                              }, // Add any other query parameters here
                            })
                          }
                        >
                          {/* desktop{" "} */}
                          {selectedRoom &&
                            selectedRoom?.members?.filter(
                              (item) => item?.userId != userid
                            )[0]?.name}
                        </div>
                      </div>
                      <div
                        className={styles.messageWrapper}
                        ref={chatContainerRef}
                      >
                        {messages?.length > 9 && (
                          <div style={{ margin: "0 1rem" }}>
                            <button
                              style={{
                                backgroundColor: "#3d83df",
                                color: "#fff",
                                borderRadius: "10px",
                                padding: "10px",
                                outline: 0,
                                border: 0,
                                cursor: "pointer",
                                width: "100%",
                              }}
                              onClick={() => setChatPage(chatPage + 1)}
                            >
                              More
                            </button>
                          </div>
                        )}
                        <>
                          {messages &&
                            messages?.map((item) => {
                              console.log(
                                "🚀 ~ file: index.tsx:880 ~ messages?.map ~ item:",
                                item
                              );
                              const { message, imageUrl, fileType, date } =
                                item;
                              return (
                                <>
                                  {item?.sender != userid ? (
                                    <>
                                      <div className={styles.inComing}>
                                        <div className={styles.inComingMessage}>
                                          {message?.length > 0 ? (
                                            <span className={styles.content}>
                                              {message}
                                            </span>
                                          ) : (
                                            <>
                                              {fileType == "application/pdf" ? (
                                                <a
                                                  href={imageUrl}
                                                  download
                                                  target="_blank"
                                                >
                                                  <p
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "black",
                                                      textDecoration:
                                                        "underline",
                                                      margin: 0,
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <BsFiletypePdf
                                                      style={{
                                                        fontSize: "25px",
                                                      }}
                                                    />{" "}
                                                    click to download file
                                                  </p>
                                                </a>
                                              ) : (
                                                <a
                                                  href={imageUrl}
                                                  download
                                                  target="_blank"
                                                >
                                                  <img
                                                    src={imageUrl}
                                                    alt=""
                                                    style={{
                                                      width: "100%",
                                                      borderRadius: "7px",
                                                    }}
                                                  />
                                                </a>
                                              )}
                                            </>
                                          )}
                                          {/* <AiOutlineDelete
                                            style={{
                                              position: "absolute",
                                              color: "red",
                                              cursor: "pointer",
                                              right: "10px",
                                              top: "10px",
                                            }}
                                            onClick={() =>
                                              setShowDeleteChatModal({id: item?.id, key: item?.key})
                                            }
                                          /> */}
                                          {/* <p className={styles.timing}>
                                              {timing}
                                            </p> */}
                                          {date && (
                                            <div className={styles.dateWrapper}>
                                              {moment(date).format("LLL")}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className={styles.outGoing}>
                                        <div className={styles.outGoing}>
                                          <div
                                            className={styles.outGoingMessage}
                                          >
                                            {message.length > 0 ? (
                                              <span className={styles.content}>
                                                {message}
                                              </span>
                                            ) : (
                                              <>
                                                {fileType ==
                                                "application/pdf" ? (
                                                  <a
                                                    href={imageUrl}
                                                    download
                                                    target="_blank"
                                                  >
                                                    <p
                                                      style={{
                                                        fontSize: "12px",
                                                        color: "white",
                                                        textDecoration:
                                                          "underline",
                                                        margin: 0,
                                                        display: "flex",
                                                        alignItems: "center",
                                                      }}
                                                    >
                                                      <BsFiletypePdf
                                                        style={{
                                                          fontSize: "25px",
                                                        }}
                                                      />{" "}
                                                      click to download file
                                                    </p>
                                                  </a>
                                                ) : (
                                                  <a
                                                    href={imageUrl}
                                                    download
                                                    target="_blank"
                                                  >
                                                    <img
                                                      src={imageUrl}
                                                      alt=""
                                                      style={{
                                                        width: "100%",
                                                        borderRadius: "7px",
                                                      }}
                                                    />
                                                  </a>
                                                )}
                                              </>
                                            )}
                                            {/* <AiOutlineDelete
                                              style={{
                                                position: "absolute",
                                                color: "red",
                                                cursor: "pointer",
                                                right: "10px",
                                                top: "10px",
                                              }}
                                              onClick={() =>
                                                setShowDeleteChatModal({id: item?.id, key: item?.key})
                                              }
                                            /> */}
                                            {/* <p className={styles.timing}>
                                                {timing}
                                              </p> */}
                                            {date && (
                                              <div
                                                className={styles.dateWrapper}
                                              >
                                                {moment(date).format("LLL")}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </>
                              );
                            })}
                        </>
                      </div>
                      <div className={styles.inputContainer}>
                        {fileDataToSend && (
                          <div className={styles.fileView}>
                            {!uploading && (
                              <AiFillCloseCircle
                                className={styles.closeIcon}
                                onClick={() => setFileDataToSend(null)}
                              />
                            )}
                            {fileDataToSend?.target?.files[0]?.type ===
                            "application/pdf" ? (
                              <div className={styles.pdfView}>
                                {" "}
                                <BsFiletypePdf className={styles.icon} />{" "}
                                {fileDataToSend?.target?.files[0]?.name}
                              </div>
                            ) : (
                              <img
                                src={
                                  fileDataToSend === null
                                    ? ""
                                    : URL?.createObjectURL(
                                        fileDataToSend?.target?.files[0]
                                      )
                                }
                                alt=""
                              />
                            )}
                          </div>
                        )}
                        <form
                          onSubmit={(e) => handleSendMessage(e, message)}
                          className={styles.inputWrapper}
                        >
                          {!uploading ? (
                            <div className={styles.chatInput}>
                              <label className={styles.chatInputLabel}>
                                <input
                                  type="file"
                                  accept="application/pdf, image/jpeg, image/png"
                                  style={{ display: "none" }}
                                  onChange={(e: any) => setFileDataToSend(e)}
                                />
                                <AiOutlinePaperClip className={styles.icon} />
                              </label>
                            </div>
                          ) : (
                            ""
                          )}
                          <input
                            type="text"
                            value={message || ""}
                            placeholder="Type your message here"
                            onChange={(e: any) => setMessage(e.target.value)}
                            disabled={fileDataToSend != null ? true : false}
                          />
                          {!uploading ? (
                            <IoIosSend
                              type="submit"
                              className={styles.icon}
                              onClick={(e) => handleSendMessage(e, message)}
                            />
                          ) : (
                            <CircularLoader />
                          )}
                        </form>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.gifWrapper}>
                      <img src="/icons/message.svg" alt="no data found" />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <div>
          <Modal visible={showDeleteModal} onClose={handleDeleteModal}>
            <DeleteChatPopup
              handleDeleteChatRoom={handleDeleteChatRoom}
              onClose={handleDeleteModal}
              specficCarId={chatId}
            />
          </Modal>
        </div>
        <div>
          <Modal visible={showDeleteChatModal} onClose={() => {}}>
            <div className={styles.deleteChatModal}>
              <span>Are you sure? You want to delete this chat Message.</span>

              {/* <p>You want to delete this chat Message.</p> */}

              <div className={styles.btns}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowDeleteChatModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() =>
                    handleDeleteChat(
                      showDeleteChatModal?.id,
                      showDeleteChatModal?.key
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default React.memo(MyChat);

const CustomOption = ({ innerProps, label, data }) => (
  <div {...innerProps}>
    <h3>{data.fullName}</h3>
    <img
      src={data.imageUrl}
      alt={label}
      style={{ width: "24px", height: "24px", marginRight: "8px" }}
    />
    {label}
  </div>
);

{
  /* <Modal visible={showDeleteModal} onClose={() => {}}>
            <div className={styles.deleteChatModal}>
              <span>Are you sure? You want to delete this chat.</span>

              <p> You want to delete this chat.</p>
              <div className={styles.btns}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(showDeleteModal)}
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal> */
}
