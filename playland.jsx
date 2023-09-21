// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from "react";
// import styles from "./chat.module.scss";
// import { CiSearch } from "react-icons/ci";
// import { BsThreeDots } from "react-icons/bs";
// import { BiCheckDouble } from "react-icons/bi";
// import UseChat from "./useChat";
// import { IoIosSend } from "react-icons/io";
// import moment from "moment";
// import { BsArrowLeft } from "react-icons/bs";
// import { PlanCompo } from "@component/Components/__common/Empty";
// import {
//   getChatRoomMessages,
//   getChatRooms,
//   getChats,
//   SearchUsers,
// } from "@component/services/chat";
// import Select from "react-select";
// import AsyncSelect from "react-select/async";

// import { Autocomplete, TextField, CircularProgress, Avatar } from "@mui/material";

// import makeAnimated from "react-select/animated";
// import ClickOutside from "@component/Components/__common/clickOutside";
// const MyChat = () => {
//   const {
//     contactsData,
//     // chatSate,
//     setInputValue,
//     inputValue,
//     // setChatState,
//     showChat,
//     // lastMessage,
//     setMobileView,
//     mobileView,
//     setShowChat,
//     planInfo,

//     // ####
//     chatRooms,
//     searchInput,
//     searchResults,
//     messages,
//     handleChat,
//     handleSearch,
//     setSearchInput,
//     selectedRoom,
//     handleSendMessage,
//     message,
//     setMessage,
//     loading,
//     setLoading,
//     loadingRoom,
//   } = UseChat();
//   const animatedComponents = makeAnimated();
//   const [showSearchbar, setShowSearchbar] = useState(false);

//   const [open, setOpen] = useState(false);

//   const loadOption = async () => {
//     await SearchUsers({ searchInput: searchInput }).then((res) => {
//       res?.data?.results;
//       console.log(res?.data?.results);
//       // setSearchResults(res?.data?.results);
//     });
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         {planInfo ? (
//           <PlanCompo />
//         ) : (
//           <>
//             <div className={styles.Mobilewrapper}>
//               {mobileView ? (
//                 <div className={styles.contactsWrapper}>
//                   <div className={styles.header}>
//                     <div className={styles.leftSide}>
//                       <div className={styles.heading}>Chats</div>
//                     </div>
//                   </div>

//                   <div className={styles.contacts}>
//                     {chatRooms &&
//                       chatRooms.map((item) => {
//                         return (
//                           <>
//                             <div
//                               className={styles.chat}
//                               key={item?.id}
//                               onClick={(e) => {
//                                 setMobileView(false),
//                                   handleChat(e, item),
//                                   setShowChat(true);
//                               }}
//                             >
//                               <div className={styles.leftSide}>
//                                 <img src={item?.logo} alt="icon" />
//                                 <div className={styles.titleSection}>
//                                   <div className={styles.title}>
//                                     {item?.name}
//                                   </div>
//                                   <div className={styles.desc}>
//                                     <BiCheckDouble />
//                                     {item?.message}
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className={styles.rightSide}>
//                                 <div className={styles.timing}>
//                                   {item?.time}
//                                 </div>
//                                 <div className={styles.notification}>
//                                   {item?.notification}
//                                 </div>
//                               </div>
//                             </div>
//                           </>
//                         );
//                       })}
//                   </div>
//                 </div>
//               ) : (
//                 ""
//               )}
//               {showChat && !mobileView ? (
//                 <>
//                   <div className={styles.chatWrapper}>
//                     <div className={styles.headingParent}>
//                       <div
//                         className={styles.heading}
//                         onClick={() => {
//                           setMobileView(true);
//                         }}
//                       >
//                         <BsArrowLeft className={styles.arrowIcon} />
//                       </div>
//                       <div className={styles.header}>
//                         <img src="/icons/bmw.svg" alt="icon" />
//                         <div className={styles.title}>{selectedRoom?.name}</div>
//                       </div>
//                     </div>

//                     <div className={styles.messageWrapper}>
//                       <>
//                         {messages &&
//                           messages.map((item) => {
//                             const { message, author } = item;
//                             return (
//                               // <>
//                               //   {status ? (
//                               //     <>
//                               //       <div className={styles.inComing}>
//                               //         <div className={styles.inComingMessage}>
//                               //           <span className={styles.content}>
//                               //             {message}
//                               //           </span>
//                               //           {/* <p className={styles.timing}>{timing}</p> */}
//                               //         </div>
//                               //       </div>
//                               //     </>
//                               //   ) : (
//                               //     <>
//                               //       <div className={styles.outGoing}>
//                               //         <div className={styles.outGoing}>
//                               //           <div className={styles.outGoingMessage}>
//                               //             <span className={styles.content}>
//                               //               {message}
//                               //             </span>
//                               //             {/* <p className={styles.timing}>{timing}</p> */}
//                               //           </div>
//                               //         </div>
//                               //       </div>
//                               //     </>
//                               //   )}
//                               // </>
//                               <>
//                                 <div className={styles.outGoing}>
//                                   <div className={styles.outGoing}>
//                                     <div className={styles.outGoingMessage}>
//                                       <span className={styles.content}>
//                                         {message}
//                                       </span>
//                                       {/* <p className={styles.timing}>{timing}</p> */}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </>
//                             );
//                           })}
//                       </>
//                     </div>
//                     <div className={styles.inputContainer}>
//                       <div className={styles.inputWrapper}>
//                         <input
//                           type="text"
//                           disabled={loading}
//                           placeholder="Type your message here"
//                           value={message || ""}
//                           onChange={(e: any) => setMessage(e.target.value)}
//                           // onChange={(e) => setMessage(e.target.value)}
//                         />
//                         <IoIosSend
//                           className={styles.icon}
//                           // onClick={() =>
//                           //   setChatState((prev) => [
//                           //     ...prev,
//                           //     {
//                           //       id: 4 + 1,
//                           //       message: inputValue,
//                           //       timing: moment().format("h:mm:ss a"),
//                           //       status: true,
//                           //     },
//                           //   ])
//                           // }
//                           onClick={() => handleSendMessage(message)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 ""
//               )}
//             </div>
//             <div className={styles.Desktopwrapper}>
//               <div className={styles.contactsWrapper}>
//                 {showSearchbar ? (
//                   <ClickOutside onClickOutside={() => setShowSearchbar(false)}>
//                     <div style={{ padding: "14px" }}>
//                       {/* <AsyncSelect
//                       defaultOptions
//                       cacheOptions
//                       components={animatedComponents}
//                         // components={{Option: CustomOption}}
//                         loadOptions={loadOption}
//                         options={searchResults}
//                         onInputChange={(value) => setSearchInput(value)}
//                         onChange={(value) => console.log(value)}
//                       /> */}
//                       <Autocomplete
//                         id="search-bar"
//                         options={searchResults}
//                         loading={loading}
//                         size="small"
//                         onOpen={() => setOpen(true)}
//                         onClose={() => setOpen(false)}
//                         renderOption={renderOption} 
//                         getOptionLabel={(option: any) => option.fullName}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label="Search"
//                             InputProps={{
//                               ...params.InputProps,
//                               endAdornment: (
//                                 <>
//                                   {loading && (
//                                     <CircularProgress
//                                       color="inherit"
//                                       size={20}
//                                     />
//                                   )}
//                                   {params.InputProps.endAdornment}
//                                 </>
//                               ),
//                             }}
//                             onChange={setSearchInput}
//                           />
//                         )}
//                       />
//                     </div>
//                   </ClickOutside>
//                 ) : (
//                   <div className={styles.header}>
//                     <div className={styles.leftSide}>
//                       <div className={styles.heading}>All Messages</div>
//                     </div>
//                     <div className={styles.rightSide}>
//                       <CiSearch
//                         className={styles.icon}
//                         style={{ cursor: "pointer" }}
//                         onClick={() => setShowSearchbar(true)}
//                       />
//                       <BsThreeDots className={styles.icon} />
//                     </div>
//                   </div>
//                 )}
//                 <div className={styles.contacts}>
//                   {chatRooms &&
//                     chatRooms.map((item) => {
//                       return (
//                         <>
//                           <div
//                             className={styles.chat}
//                             style={{
//                               backgroundColor:
//                                 item?.id == selectedRoom?.id
//                                   ? "rgba(61, 131, 223, 0.2352941176)"
//                                   : " ",
//                             }}
//                             key={item?.id}
//                             onClick={(e) => {
//                               handleChat(e, item), setShowChat(true);
//                             }}
//                           >
//                             <div className={styles.leftSide}>
//                               <div className={styles.profile__image}>
//                                 {item?.image ? (
//                                   <img src={item?.logo} alt="icon" />
//                                 ) : (
//                                   <img
//                                     src="/icons/profile.png"
//                                     alt="sampple icon"
//                                   />
//                                 )}
//                               </div>
//                               <div className={styles.titleSection}>
//                                 <div className={styles.title}>{item?.name}</div>
//                                 <div className={styles.desc}>
//                                   {/* <BiCheckDouble /> */}
//                                   {item?.recentMessage?.text}
//                                 </div>
//                               </div>
//                             </div>
//                             {/* <div className={styles.rightSide}>
//                             <div className={styles.timing}>{item?.time}</div>
//                             <div className={styles.notification}>
//                               {item?.notification}
//                             </div>
//                           </div> */}
//                           </div>
//                         </>
//                       );
//                     })}
//                 </div>
//               </div>
//               {showChat ? (
//                 <>
//                   <div className={styles.chatWrapper}>
//                     <div className={styles.header}>
//                       <img src="/icons/bmw.svg" alt="icon" />
//                       <div className={styles.title}>{selectedRoom?.name}</div>
//                     </div>
//                     <div className={styles.messageWrapper}>
//                       <>
//                         {messages &&
//                           messages.map((item) => {
//                             const { id, message, timing, status } = item;
//                             return (
//                               <>
//                                 {status ? (
//                                   <>
//                                     <div className={styles.inComing}>
//                                       <div className={styles.inComingMessage}>
//                                         <span className={styles.content}>
//                                           {message}
//                                         </span>
//                                         <p className={styles.timing}>
//                                           {timing}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <div className={styles.outGoing}>
//                                       <div className={styles.outGoing}>
//                                         <div className={styles.outGoingMessage}>
//                                           <span className={styles.content}>
//                                             {message}
//                                           </span>
//                                           <p className={styles.timing}>
//                                             {timing}
//                                           </p>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </>
//                                 )}
//                               </>
//                             );
//                           })}
//                       </>
//                     </div>
//                     <div className={styles.inputContainer}>
//                       <div className={styles.inputWrapper}>
//                         <input
//                           type="text"
//                           value={message || ""}
//                           placeholder="Type your message here"
//                           onChange={(e: any) => setMessage(e.target.value)}
//                         />
//                         <IoIosSend
//                           className={styles.icon}
//                           onClick={() => handleSendMessage(message)}
//                           // onClick={() =>
//                           //   setChatState((prev) => [
//                           //     ...prev,
//                           //     {
//                           //       id: 4 + 1,
//                           //       message: inputValue,
//                           //       timing: moment().format("h:mm:ss a"),
//                           //       status: true,
//                           //     },
//                           //   ])
//                           // }
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className={styles.gifWrapper}>
//                     <img src="/icons/message.svg" alt="no data found" />
//                   </div>
//                 </>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyChat;

// const renderOption = (option) => (
//   <li {...option}>
//     <Avatar src={option.imageUrl} alt={option.imageUrl} />
//     {option.fullName}
//   </li>
// );




// onClick={() =>
                          //   setChatState((prev) => [
                          //     ...prev,
                          //     {
                          //       id: 4 + 1,
                          //       message: inputValue,
                          //       timing: moment().format("h:mm:ss a"),
                          //       status: true,
                          //     },
                          //   ])
                          // }