/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import styles from "./navigation.module.scss";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import useNavBar from "../../navBar/useNavBar";
import {
  companySideBarLink,
  userSideBarLink,
  companyMobSideBarLink,
} from "../../navBar/data";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LogoutPopup from "../../Popups/Logout";
import { getInitials, GOOGLE_API_KEY } from "@component/utills/enum";
import SearchDropDown from "../../SearchDropdown";
import { IoMdNotifications } from "react-icons/io";
import useNavigation from "./useNavigation";
import { CircularLoader } from "../../loader/Loader";
import Maps from "../../Popups/maps";
import dynamic from "next/dynamic";
import DropDown from "../../Dropdown/DropDown";
import { logoutUser } from "@component/services/UserSignup";
import { signOut } from "next-auth/react";
import {
  resetUserState,
  setLogout,
  setSplashLoader,
} from "@component/store/reducers/userReducer";
import { t } from "i18next";
const DynamicGooglePlacesAutocomplete = dynamic(
  () => import("react-google-places-autocomplete"),
  { ssr: false }
);

const Navigation = () => {
  const [menuOpenState, setMenuOpenState] = useState(false);
  const [newPopupvisible, setnewPopupvisible] = useState(false);
  const [testing, setTesting] = useState<any>(0);
  const {
    active,
    location,
    handleClose,
    handleLogin,
    handleSignup,
    options,
    filterBy,
    setFilterBy,
    page,
    handleMyaccount,
    handleProfile,
    searchMenu,
    setSearchMenu,
    handleSearch,
    setAddress,
    address,
    setClickedLocation,
    clickedLocation,
    setpopupvisible,
    popupvisible,
    setValue,
    value,
    setSelectedInputValue,
    selectedInputValue,
    locationDataRef,
    addressLoading,
    notificationsData,
    setFilterradiusBy,
    filterRadiusby,
    handleRadiusOncahnge,
    RadiusOption,
  } = useNavBar();
  const dispatch = useDispatch();
  const {
    getNotifications,
    showNotifications,
    notifications,
    userid,
    notificationsRef,
    setShowNotifications,
    handleCloseNotifications,
  } = useNavigation();
  const { user, compSidebar, updateCompName, updateCompImage } = useSelector(
    (state: any) => state?.user
  );
  const handleMenu = () => {
    setMenuOpenState(true);
  };
  useEffect(() => {
    if (user?.data?.user?.userType === "user" || user?.userType === "user") {
      setTesting(0);
    } else {
      setTesting(1);
    }
  }, []);
  // const handleLogOut = async () => {
  //   setnewPopupvisible(true);
  // };
  const filteredLinks = () => {
    if (user?.data?.user?.userType === "user" || user?.userType === "user") {
      return userSideBarLink;
    }
    return companySideBarLink;
  };
  const handleLogOut = async () => {
    try {
      await logoutUser(),
        location.replace("/"),
        setTimeout(() => {
          dispatch(resetUserState());
        }, 1000);
      // ]);
      signOut({
        callbackUrl: "/",
      }),
        // dispatch(resetUserState());
        toast.success("You have logged out successfully!");
      // const res = await Promise.all([
      //   signOut({
      //     callbackUrl: "/",
      //   }),
      //   logoutUser(),
      //   // location.replace("/"),
      // ]);
      // dispatch(resetUserState()),
      //   // dispatch(resetUserState());
      //   toast.success("You have logged out successfully!");
    } catch (error) {
      dispatch(resetUserState());
      dispatch(setSplashLoader(false));
    }
    dispatch(setLogout(true));
  };
  return (
    <>
      <Maps
        clickedLocation={clickedLocation}
        setClickedLocation={setClickedLocation}
        setAddress={setAddress}
        popupvisible={popupvisible}
        setpopupvisible={setpopupvisible}
        // currentLocation={currentLocation}
        // address={address}
      />
      <div className={styles.container}>
        <div
          className={
            user?.data?.user?.userType === "user" || user?.userType === "user"
              ? styles.userWrapper
              : styles.ContainerCompany
          }
        >
          {" "}
          <div className={styles.LogoWrap}>
            {user?.data?.user?.userType === "user" ? (
              <>
                <img
                  // src="/icons/logo.svg"
                  src="/icons/darkLogo.png"
                  alt="alt-Logo"
                  style={{ cursor: "pointer" }}
                  onClick={() => location.push("/")}
                />
              </>
            ) : (
              <>
                {/* <img src="/icons/logo.svg" alt="" /> */}
                <img src="/icons/darkLogo.png" alt="" />
              </>
            )}
          </div>
          {user?.data?.user?.userType === "user" ||
          user?.userType === "user" ? (
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <div className={styles.input}>
                  <SearchDropDown
                    selected={searchMenu}
                    setSelected={setSearchMenu}
                  />
                </div>

                <div
                  className={styles.inputCountry}
                  // onClick={() => setpopupvisible(true)}
                >
                  <DynamicGooglePlacesAutocomplete
                    apiKey={GOOGLE_API_KEY.API_KEY}
                    autocompletionRequest={{
                      componentRestrictions: {
                        country: ["ES"],
                      },
                    }}
                    selectProps={{
                      value,
                      onChange: setValue,

                      placeholder: t("locationText"),
                      styles: {
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                          width: "200px",
                          height: "55px",
                          minHeight: "55px",
                          border: "1px solid gray",
                          cursor: "text",
                          outline: "none",
                          color: "#161616",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          "&:focus": {
                            boxShadow: "none",
                            border: "none",
                          },
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#161616",
                          border: "none !important",
                          outline: "none !important",
                          height: "100%",
                          // minHeight: "100%",
                          padding: "0.6rem 0",
                          borderRadius: "8px",
                        }),
                        option: (provided) => ({
                          ...provided,
                          color: "#808080",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#808080",
                        }),
                      },
                    }}
                  />
                </div>
                <div className={styles.dropDownTwo}>
                  <DropDown
                    selected={
                      filterRadiusby === "No Radius"
                        ? t("radiusText")
                        : `${filterRadiusby} KM`
                    }
                    setSelected={(res) => {
                      setFilterradiusBy(res);
                    }}
                    options={RadiusOption?.map((item: any) => item?.value)}
                    showRightIcon={true}
                    rightIcon={"/icons/dropDownList.svg"}
                    mainStyle={false}
                    border={false}
                    onChange={handleRadiusOncahnge}
                    radius={true}
                    radiusStyle={true}
                  />
                </div>
                <div className={styles.searchIcon} onClick={handleSearch}>
                  <FiSearch />
                </div>
                <div
                  className={styles.dashboardRight}
                  ref={notificationsRef}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <div className={styles.notifications}>
                    <div
                      style={{ cursor: "pointer" }}
                      className={styles.notifications}
                    >
                      {notificationsData?.length > 0 && (
                        <div className={styles.notificationDot} />
                      )}
                      <IoMdNotifications
                        style={{ color: "ffffff", fill: "white" }}
                      />
                    </div>
                    {/* {const otherUserId = chatroom.members.filter((item) => item.id !== userid)[0]
                      .userId;} */}
                    {showNotifications && (
                      <div className={styles.notificationPanel}>
                        {/* @ts-ignore */}
                        {notificationsData ? (
                          <>
                            {/* @ts-ignore */}
                            {notificationsData?.length > 0 ? (
                              <>
                                {/* @ts-ignore */}
                                <div className={styles.NotificationWrapper}>
                                  <div className={styles.headingWrapper}>
                                    <label>Notification</label>
                                  </div>
                                  {notificationsData?.map((item) => (
                                    <div
                                      className={styles.notification}
                                      onClick={() =>
                                        handleCloseNotifications(item)
                                      }
                                    >
                                      <p>{item?.notification?.title}</p>
                                      <span>
                                        {item?.notification?.body
                                          ? item?.notification?.body
                                          : "Media Received"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <h3
                                style={{
                                  padding: "0.1rem 1rem",
                                }}
                              >
                                No New Notifications
                              </h3>
                            )}
                          </>
                        ) : (
                          <CircularLoader />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : user?.data?.user?.userType === "company" ||
            user?.userType === "company" ? (
            <div className={styles.CompanyDashboard}>
              <div className={styles.leftWrapper}>
                <div className={styles.headingText}>
                  {compSidebar ? compSidebar : compSidebar}
                </div>
              </div>
              <div className={styles.dashboardRight}>
                <div className={styles.notifications} ref={notificationsRef}>
                  <div
                    style={{ width: "50px", cursor: "pointer" }}
                    className={styles.notificationIcon}
                  >
                    {notificationsData?.length > 0 && (
                      <div className={styles.notificationDot} />
                    )}
                    <IoMdNotifications
                      style={{ color: "#3d83df" }}
                      onClick={() => setShowNotifications(!showNotifications)}
                    />
                  </div>
                  {/* {const otherUserId = chatroom.members.filter((item) => item.id !== userid)[0]
                      .userId;} */}
                  {showNotifications && (
                    <div className={styles.notificationPanel}>
                      {/* @ts-ignore */}
                      {notificationsData ? (
                        <>
                          {/* @ts-ignore */}
                          {notificationsData?.length > 0 ? (
                            <>
                              {/* @ts-ignore */}
                              <div className={styles.NotificationWrapper}>
                                <div className={styles.headingWrapper}>
                                  <label>Notification</label>
                                </div>
                                {notificationsData?.map((item) => (
                                  <div
                                    className={styles.notification}
                                    onClick={() =>
                                      handleCloseNotifications(item)
                                    }
                                  >
                                    <p>{item?.notification?.title}</p>
                                    <span>
                                      {item?.notification?.body
                                        ? item?.notification?.body
                                        : "Media Received"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <h3>No New Notifications</h3>
                          )}
                        </>
                      ) : (
                        <CircularLoader />
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.profileWrapper} onClick={handleProfile}>
                  <div className={styles.infoWrapper}>
                    <div className={styles.brandName}>
                      {updateCompName
                        ? updateCompName
                        : user?.data?.user?.fullName}
                    </div>
                    <div className={styles.email}>
                      {user?.data?.user?.email}
                    </div>
                  </div>
                  <div className={styles.Navigationlogo}>
                    {updateCompImage ? (
                      <img src={updateCompImage} alt="" />
                    ) : user?.data?.user?.imageUrl ? (
                      <img
                        src={
                          user?.data?.user?.imageUrl
                            ? user?.data?.user?.imageUrl
                            : ""
                        }
                        alt=""
                      />
                    ) : (
                      getInitials(user?.data?.user?.fullName)
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : testing === 0 ? (
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <div className={styles.input}>
                  <SearchDropDown
                    selected={searchMenu}
                    setSelected={setSearchMenu}
                  />
                </div>

                <div
                  className={styles.inputCountry}
                  // onClick={() => setpopupvisible(true)}
                >
                  <DynamicGooglePlacesAutocomplete
                    apiKey={GOOGLE_API_KEY.API_KEY}
                    autocompletionRequest={{
                      componentRestrictions: {
                        country: ["ES"],
                      },
                    }}
                    selectProps={{
                      value,
                      onChange: setValue,

                      placeholder: t("locationText"),
                      styles: {
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                          width: "200px",
                          height: "55px",
                          minHeight: "55px",
                          border: "1px solid gray",
                          cursor: "text",
                          outline: "none",
                          color: "#161616",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          "&:focus": {
                            boxShadow: "none",
                            border: "none",
                          },
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#161616",
                          border: "none !important",
                          outline: "none !important",
                          height: "100%",
                          // minHeight: "100%",
                          padding: "0.6rem 0",
                          borderRadius: "8px",
                        }),
                        option: (provided) => ({
                          ...provided,
                          color: "#808080",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#808080",
                        }),
                      },
                    }}
                  />
                </div>
                <div className={styles.dropDownTwo}>
                  <DropDown
                    selected={
                      filterRadiusby === "No Radius"
                        ? t("radiusText")
                        : `${filterRadiusby} KM`
                    }
                    setSelected={(res) => {
                      setFilterradiusBy(res);
                    }}
                    options={RadiusOption?.map((item: any) => item?.value)}
                    showRightIcon={true}
                    rightIcon={"/icons/dropDownList.svg"}
                    mainStyle={false}
                    border={false}
                    onChange={handleRadiusOncahnge}
                    radius={true}
                    radiusStyle={true}
                  />
                </div>
                <div className={styles.searchIcon} onClick={handleSearch}>
                  <FiSearch />
                </div>
                <div
                  className={styles.dashboardRight}
                  ref={notificationsRef}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <div className={styles.notifications}>
                    <div
                      style={{ cursor: "pointer" }}
                      className={styles.notifications}
                    >
                      {notificationsData?.length > 0 && (
                        <div className={styles.notificationDot} />
                      )}
                      <IoMdNotifications
                        style={{ color: "ffffff", fill: "white" }}
                      />
                    </div>
                    {/* {const otherUserId = chatroom.members.filter((item) => item.id !== userid)[0]
                    .userId;} */}
                    {showNotifications && (
                      <div className={styles.notificationPanel}>
                        {/* @ts-ignore */}
                        {notificationsData ? (
                          <>
                            {/* @ts-ignore */}
                            {notificationsData?.length > 0 ? (
                              <>
                                {/* @ts-ignore */}
                                <div className={styles.NotificationWrapper}>
                                  <div className={styles.headingWrapper}>
                                    <label>Notification</label>
                                  </div>
                                  {notificationsData?.map((item) => (
                                    <div
                                      className={styles.notification}
                                      onClick={() =>
                                        handleCloseNotifications(item)
                                      }
                                    >
                                      <p>{item?.notification?.title}</p>
                                      <span>
                                        {item?.notification?.body
                                          ? item?.notification?.body
                                          : "Media Received"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <h3
                                style={{
                                  padding: "0.1rem 1rem",
                                }}
                              >
                                No New Notifications
                              </h3>
                            )}
                          </>
                        ) : (
                          <CircularLoader />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.CompanyDashboard}>
              <div className={styles.leftWrapper}>
                <div className={styles.headingText}>
                  {compSidebar ? compSidebar : compSidebar}
                </div>
              </div>
              <div className={styles.dashboardRight}>
                <div className={styles.notifications} ref={notificationsRef}>
                  <div
                    style={{ width: "50px", cursor: "pointer" }}
                    className={styles.notificationIcon}
                  >
                    {notificationsData?.length > 0 && (
                      <div className={styles.notificationDot} />
                    )}
                    <IoMdNotifications
                      style={{ color: "#3d83df" }}
                      onClick={() => setShowNotifications(!showNotifications)}
                    />
                  </div>
                  {/* {const otherUserId = chatroom.members.filter((item) => item.id !== userid)[0]
                    .userId;} */}
                  {showNotifications && (
                    <div className={styles.notificationPanel}>
                      {/* @ts-ignore */}
                      {notificationsData ? (
                        <>
                          {/* @ts-ignore */}
                          {notificationsData?.length > 0 ? (
                            <>
                              {/* @ts-ignore */}
                              <div className={styles.NotificationWrapper}>
                                <div className={styles.headingWrapper}>
                                  <label>Notification</label>
                                </div>
                                {notificationsData?.map((item) => (
                                  <div
                                    className={styles.notification}
                                    onClick={() =>
                                      handleCloseNotifications(item)
                                    }
                                  >
                                    <p>{item?.notification?.title}</p>
                                    <span>
                                      {item?.notification?.body
                                        ? item?.notification?.body
                                        : "Media Received"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <h3>No New Notifications</h3>
                          )}
                        </>
                      ) : (
                        <CircularLoader />
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.profileWrapper} onClick={handleProfile}>
                  <div className={styles.infoWrapper}>
                    <div className={styles.brandName}>
                      {updateCompName
                        ? updateCompName
                        : user?.data?.user?.fullName}
                    </div>
                    <div className={styles.email}>
                      {user?.data?.user?.email}
                    </div>
                  </div>
                  <div className={styles.Navigationlogo}>
                    {updateCompImage ? (
                      <img src={updateCompImage} alt="" />
                    ) : user?.data?.user?.imageUrl ? (
                      <img
                        src={
                          user?.data?.user?.imageUrl
                            ? user?.data?.user?.imageUrl
                            : ""
                        }
                        alt=""
                      />
                    ) : (
                      getInitials(user?.data?.user?.fullName)
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.userAndCompanyNavbar}>
          <div className={styles.title}>
            {user?.data?.user?.userType === "user" ? (
              <>
                <img
                  // src="/icons/logo.svg"
                  src="/icons/darkLogo.png"
                  alt="alt-Logo"
                  style={{ cursor: "pointer" }}
                  onClick={() => location.push("/")}
                />
              </>
            ) : (
              <>
                {/* <img src="/icons/logo.svg" alt="" /> */}
                <img src="/icons/darkLogo.png" alt="" />
              </>
            )}
            {/* <img src="/icons/logo.svg" alt="" /> */}
          </div>
          <div className={styles.notification}>
            <div style={{ width: "50px", cursor: "pointer" }}>
              <IoMdNotifications
                style={{ color: "#3d83df" }}
                onClick={() => getNotifications()}
              />
            </div>
            <div className={styles.burgerIcon} onClick={() => handleMenu()}>
              <GiHamburgerMenu className={styles.burgerIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* //**mobile Menu ** */}
      {menuOpenState === true && (
        <div className={styles.mobileContainer}>
          <div
            className={styles.CloseIcon}
            onClick={() => setMenuOpenState(false)}
          >
            <IoMdClose className={styles.Icons} />
          </div>
          <div className={styles.mobileIconWrapper}>
            <div className={styles.mobileLinksWrapper}>
              <div className={styles.mobileMenuLogo}>
                {" "}
                {/* <img src="/icons/logo.svg" alt="" /> */}
                <img src="/icons/darkLogo.png" alt="" />
              </div>
              <div className={styles.linksWrapper}>
                {user?.data?.user?.userType === "user" ||
                user?.userType === "user" ? (
                  <>
                    {userSideBarLink.map((item: any, index) => (
                      <ul
                        onClick={() => setMenuOpenState(false)}
                        key={index}
                        className={
                          location.asPath === item.link
                            ? styles.Active
                            : styles.inActive
                        }
                      >
                        <Link
                          href={item.link}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <li
                            className={
                              location.asPath === item.link
                                ? styles.activeLi
                                : styles.inActiveLi
                            }
                          >
                            <img
                              src={
                                location.asPath === item.link
                                  ? item?.activeIcon
                                  : item?.inactiveIcon
                              }
                              alt="icon"
                              draggable="false"
                              style={{ height: "20px", width: "20px" }}
                            />
                            {item?.heading}
                          </li>
                        </Link>
                      </ul>
                    ))}

                    <div
                      className={styles.logoutWrap}
                      onClick={() => handleLogOut()}
                    >
                      <img
                        src="/inActive_user/logout.svg"
                        alt="icon"
                        draggable="false"
                        style={{ height: "20px", width: "20px" }}
                      />
                      <span>Logout</span>
                    </div>
                  </>
                ) : (
                  <>
                    {companyMobSideBarLink.map((item: any, index) => (
                      <ul
                        onClick={() => setMenuOpenState(false)}
                        key={index}
                        className={
                          location.asPath === item.link
                            ? styles.Active
                            : styles.inActive
                        }
                      >
                        <Link
                          href={item.link}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <li
                            className={
                              location.asPath === item.link
                                ? styles.activeLi
                                : styles.inActiveLi
                            }
                          >
                            <img
                              src={
                                location.asPath === item.link
                                  ? item?.activeIcon
                                  : item?.inactiveIcon
                              }
                              alt="icon"
                              draggable="false"
                              style={{ height: "20px", width: "20px" }}
                            />
                            {item?.heading}
                          </li>
                        </Link>
                      </ul>
                    ))}
                    <div
                      className={styles.logoutWrap}
                      onClick={() => handleLogOut()}
                    >
                      <img
                        src="/inActive_user/logout.svg"
                        alt="icon"
                        draggable="false"
                        style={{ height: "20px", width: "20px" }}
                      />
                      <span>Logout</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <LogoutPopup
        popupvisible={newPopupvisible}
        setpopupvisible={setnewPopupvisible}
      />
      {/* //**mobile Menu ** */}
    </>
  );
};

export default Navigation;
