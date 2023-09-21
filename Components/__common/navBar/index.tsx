/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdLanguage } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { navLink, MobilenavLink } from "./data";
import styles from "./navBar.module.scss";
import useNavBar from "./useNavBar";
import React, { useEffect } from "react";
import DropDown from "../Dropdown/DropDown";
import { saveSSOType } from "@component/store/reducers/userReducer";
import SearchDropDown from "../SearchDropdown";
import { useSelector } from "react-redux";
import Maps from "../Popups/maps";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GOOGLE_API_KEY } from "@component/utills/enum";
import dynamic from "next/dynamic";
const DynamicGooglePlacesAutocomplete = dynamic(
  () => import("react-google-places-autocomplete"),
  { ssr: false }
);
const NavBar = () => {
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
    handleBackscreen,
    searchMenu,
    setSearchMenu,
    handleSearch,
    dispatch,
    FilterType,
    user,
    filteredLinks,
    showNotifications,
    setShowNotifications,
    getNotifications,
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
    setFilterradiusBy,
    filterRadiusby,
    handleRadiusOncahnge,
    RadiusOption,
    i18n,
    t,
  } = useNavBar();
  useEffect(() => { }, [page]);
  useEffect(() => { }, [user]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
      <div
        className={page ? styles.activeContainer : styles.container}
        style={
          location.asPath.includes("null")
            ? { backgroundColor: "#edeff2", borderBottom: "1px solid #dcdfe3" }
            : undefined
        }
      >
        <div className={styles.wrapper}>
          <div className={styles.mainWrapper}>
            {location?.asPath?.includes("/login") ||
              location?.asPath?.includes("/login?callbackUrl=%2Fdashboard") ||
              location?.asPath?.includes("/change-email") ||
              location?.asPath?.includes("/change-password") ||
              location?.asPath?.includes("/professionals") ||
              location?.asPath?.includes("/signup") ||
              location?.asPath?.includes("/appointment-booking") ||
              location?.asPath?.includes("/confirm-appointment") ? null : (
              <>
                <div
                  className={
                    location.asPath.includes("dashboard")
                      ? styles.dashboardLeft
                      : styles.left
                  }
                >
                  {location.asPath.includes("dashboard") ? (
                    <>
                      <div className={styles.accountWrapper}>
                        <Link
                          href="/"
                          prefetch={false}
                          className={styles.blueLogo}
                        >
                          <img
                            // src={"/icons/logo.svg"}
                            src={"/icons/darkLogo.png"}
                            alt=""
                            style={{ cursor: "pointer", width: "100px" }}
                          />
                        </Link>
                      </div>
                    </>
                  ) : location.asPath.includes("ask-mechanics") ||
                    location.asPath.includes("/contact-us") ||
                    location.asPath.includes("/about-us") ||
                    location.asPath.includes("/terms") ||
                    location.asPath.includes("/terms") ||
                    location.asPath.includes("/search-booking") ||
                    location.asPath.includes("/ask-mechanic-detail") ||
                    location.asPath.includes("/mechanic-detail") ? (
                    <Link
                      href="/"
                      prefetch={false}
                      className={
                        location.asPath.includes("null")
                          ? styles.logo
                          : styles.blueLogo
                      }
                    >
                      <img
                        src={"/icons/darkLogo.png"}
                        // src={
                        //   page ? "/icons/whiteLogo.png" : "/icons/darkLogo.png"
                        // }
                        alt=""
                        width={150}
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                  ) : (
                    <Link
                      href="/"
                      prefetch={false}
                      className={
                        location.asPath.includes("null")
                          ? styles.logo
                          : styles.blueLogo
                      }
                    >
                      <img
                        // src={"/icons/darkLogo.png"}
                        src={
                          page ? "/icons/whiteLogo.png" : "/icons/darkLogo.png"
                        }
                        alt=""
                        width={150}
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                  )}
                </div>
              </>
            )}
            {location?.asPath?.includes("/appointment-booking") ||
              location?.asPath?.includes("/confirm-appointment") ? (
              <>
                <div className={styles.iconWrap} onClick={handleBackscreen}>
                  <FaArrowLeft className={styles.icon} />
                </div>
              </>
            ) : null}

            {location?.asPath?.includes("/login") ||
              location?.asPath?.includes("/login?callbackUrl=%2Fdashboard") ||
              location?.asPath?.includes("/change-email") ||
              location?.asPath?.includes("/change-password") ||
              location?.asPath?.includes("/professionals") ||
              location?.asPath?.includes("/signup") ||
              location?.asPath?.includes("/appointment-booking") ||
              location?.asPath?.includes("/confirm-appointment") ? (
              <>
                <Link href="/" prefetch={false} className={styles.loginLogo}>
                  <img
                    // src={"/icons/logo.svg"}
                    src={"/icons/darkLogo.png"}
                    alt=""
                    style={{ cursor: "pointer", width: "180px" }}
                  />
                </Link>
              </>
            ) : (
              <>
                <div className={styles.middleWrapper}>
                  <div className={styles.linksWrapper}>
                    {location.asPath.includes("dashboard") ? (
                      <>
                        {FilterType(
                          user?.userType !== "user" ||
                          user?.data?.user?.userType !== "user"
                        ) ? null : (
                          <>
                            <div className={styles.inputWrapper}>
                              <div className={styles.dashboardInput}>
                                <input
                                  type="text"
                                  placeholder="Search ..."
                                // onChange={(e: any) => searchQuery(e)}
                                />
                              </div>

                              <div className={styles.dropDown}>
                                <DropDown
                                  selected={filterBy}
                                  setSelected={(res) => {
                                    setFilterBy(res);
                                  }}
                                  options={options}
                                  showRightIcon={true}
                                  rightIcon={"/icons/dropDownList.svg"}
                                />
                              </div>
                              <div className={styles.searchIcon}>
                                <FiSearch />
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {location.asPath.includes("ask-mechanics") ||
                          location.asPath.includes("/contact-us") ||
                          location.asPath.includes("/search-booking") ||
                          location.asPath.includes("/mechanic-detail") ? (
                          <>
                            <div className={styles.inputContainer}>
                              <div className={styles.inputWrapper}>
                                <div className={styles.dropDown}>
                                  <SearchDropDown
                                    selected={searchMenu}
                                    setSelected={setSearchMenu}
                                  />
                                </div>

                                <div
                                  className={styles.inputCountry}
                                // onClick={() => setpopupvisible(true)}
                                >
                                  <div className={styles.country}>
                                    {/* <img src="/icons/spain.svg" alt="no-icon" />{" "} */}
                                    <DynamicGooglePlacesAutocomplete
                                      autocompletionRequest={{
                                        componentRestrictions: {
                                          country: ["ES"],
                                        },
                                      }}
                                      apiKey={GOOGLE_API_KEY.API_KEY}
                                      selectProps={{
                                        value,
                                        onChange: setValue,
                                        placeholder: t("locationText"),
                                        styles: {
                                          control: (provided) => ({
                                            ...provided,
                                            borderRadius: "8px",
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
                                            color: "black",
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
                                    options={RadiusOption?.map(
                                      (item: any) => item?.value
                                    )}
                                    showRightIcon={true}
                                    rightIcon={"/icons/dropDownList.svg"}
                                    mainStyle={false}
                                    border={false}
                                    onChange={handleRadiusOncahnge}
                                    radius={true}
                                    radiusStyle={true}
                                  />
                                </div>
                                <div
                                  className={styles.searchIcon}
                                  onClick={handleSearch}
                                >
                                  <FiSearch />
                                </div>
                              </div>
                              {value?.length >= 1 &&
                                selectedInputValue &&
                                !addressLoading ? (
                                <div
                                  className={styles.locationData}
                                  ref={locationDataRef}
                                >
                                  {[...Array(6)].map((e, i) => (
                                    <div
                                      className={styles.textWrapper}
                                      key={i}
                                      onClick={() => {
                                        setValue("Testing Location");
                                        setSelectedInputValue(false);
                                      }}
                                    >
                                      Testing Location
                                    </div>
                                  ))}
                                </div>
                              ) : value?.length >= 1 &&
                                selectedInputValue &&
                                addressLoading ? (
                                <div
                                  className={styles.locationData}
                                  ref={locationDataRef}
                                >
                                  {[...Array(5)].map((e, i) => (
                                    <div
                                      className={styles.loadingTextWrapper}
                                      key={i}
                                    >
                                      <Skeleton
                                        // baseColor="#fff"
                                        highlightColor="#666"
                                        style={{
                                          height: "20px",
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </>
                        ) : (
                          <>
                            {location.asPath.includes("/terms") ||
                              location.asPath.includes("/about-us") ? (
                              <>
                                {" "}
                                {navLink.map((item: any, index) => (
                                  <ul key={index}>
                                    <Link
                                      href={item.link}
                                      prefetch={false}
                                      passHref
                                      onClick={() =>
                                        dispatch(saveSSOType("Company"))
                                      }
                                    >
                                      <div
                                        className={
                                          location.asPath === item.link
                                            ? styles.active
                                            : styles.active
                                        }
                                        id={styles.specficNavbar}
                                      >
                                        {item.heading}
                                      </div>
                                    </Link>
                                  </ul>
                                ))}
                              </>
                            ) : (
                              <>
                                {" "}
                                {navLink.map((item: any, index) => (
                                  <ul key={index}>
                                    <Link
                                      href={item.link}
                                      prefetch={false}
                                      passHref
                                      onClick={() =>
                                        dispatch(saveSSOType("Company"))
                                      }
                                    >
                                      <div
                                        className={
                                          location.asPath === item.link
                                            ? styles.active
                                            : styles.active
                                        }
                                      >
                                        {item.heading}
                                      </div>
                                    </Link>
                                  </ul>
                                ))}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {location?.asPath?.includes("/login") ||
              location?.asPath?.includes("/login?callbackUrl=%2Fdashboard") ||
              location?.asPath?.includes("/change-email") ||
              location?.asPath?.includes("/change-password") ||
              location?.asPath?.includes("/professionals") ||
              location?.asPath?.includes("/signup") ||
              location?.asPath?.includes("/appointment-booking") ||
              location?.asPath?.includes("/confirm-appointment") ? null : (
              <>
                <div className={styles.btnWrapper}>
                  {location?.asPath?.includes("dashboard") ? (
                    <>
                      {FilterType(!user?.userType) ? (
                        <>
                          <div className={styles.dashboardRight}>
                            <img
                              src="/icons/notification.svg"
                              alt=""
                              onClick={() => getNotifications()}
                            />
                            <div
                              className="notifications__panel"
                              style={{ position: "absolute" }}
                            >
                              <h1>notification</h1>
                            </div>
                            <div className={styles.profileWrapper}>
                              <div className={styles.infoWrapper}>
                                <div className={styles.brandName}>NISSAN</div>
                                <div className={styles.email}>
                                  nissan@maiasal.com
                                </div>
                              </div>
                              <div className={styles.logo}>
                                <img src="/icons/nissan.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {user?.data?.access_token === undefined ||
                        user?.data?.access_token === "" ? (
                        <>
                          <div className={styles.authWrapper}>
                            <div
                              className={
                                location.asPath.includes("/ask-mechanics") ||
                                  location.asPath.includes("/contact-us") ||
                                  location.asPath.includes("/terms") ||
                                  location.asPath.includes("/search-booking") ||
                                  location.asPath.includes("/mechanic-detail")
                                  ? styles.signUp
                                  : styles.blueSignUp
                              }
                              onClick={handleSignup}
                            >
                              Sign Up
                            </div>
                            <button onClick={handleLogin}>Login</button>
                            <button
                              onClick={() =>
                                changeLanguage(
                                  i18n?.language === "es" ? "en" : "es"
                                )
                              }
                              className={styles.languageStyleButton}
                            >
                              <MdLanguage className={styles.iconStyle} />
                              {i18n?.language?.toLocaleUpperCase()}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className={styles.authWrapperaccountbtn}>
                            <button
                              onClick={handleMyaccount}
                              className={styles.signUp}
                            >
                              My Account
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div className={styles.mobileIcon} onClick={handleClose}>
                    {active === false ? (
                      <div className={styles.iconC}>
                        {" "}
                        <AiOutlineMenu />
                      </div>
                    ) : (
                      <div className={styles.iconC}>
                        {" "}
                        <HiMenuAlt1 />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* //**mobile Menu ** */}
      {active === true && (
        <div className={styles.mobileContainer}>
          <div className={styles.CloseIcon} onClick={() => handleClose()}>
            <IoMdClose className={styles.Icons} />
          </div>
          <div className={styles.mobileIconWrapper}>
            <div className={styles.mobileLinksWrapper}>
              <div className={styles.mobileMenuLogo}>
                {/* <img src="/icons/logo.svg" alt="" /> */}
                <img src="/icons/darkLogo.png" alt="" />
              </div>
              {location?.asPath?.includes("dashboard") ? (
                filteredLinks()?.map((item: any, index) => (
                  <ul
                    className={
                      location.asPath === item.link
                        ? styles.ActiveMobileMenu
                        : undefined
                    }
                    key={index}
                    onClick={() => handleClose()}
                  >
                    <Link href={item.link} prefetch={false}>
                      <li
                        style={
                          location.asPath === item.link
                            ? { color: "#3d83df" }
                            : undefined
                        }
                      >
                        {item.heading}
                      </li>
                    </Link>
                  </ul>
                ))
              ) : (
                <>
                  {MobilenavLink.map((item: any, index) => (
                    <ul
                      className={
                        location.asPath === item.link
                          ? styles.ActiveMobileMenu
                          : undefined
                      }
                      onClick={() => handleClose()}
                      key={index}
                    >
                      <Link href={item.link} prefetch={false}>
                        <li
                          style={
                            location.asPath === item.link
                              ? { color: "#3d83df" }
                              : { color: "#212121", fontSize: "16px" }
                          }
                        >
                          {item.heading}
                        </li>
                      </Link>
                    </ul>
                  ))}
                  {user?.data?.access_token == undefined ||
                    user?.data?.access_token == "" ? (
                    <>
                      {" "}
                      <ul onClick={() => handleClose()}>
                        <Link href="/login" prefetch={false}>
                          <li
                            style={
                              location.asPath === "/login"
                                ? { color: "#3d83df" }
                                : {
                                  color: "#212121",
                                  fontSize: "16px",
                                }
                            }
                          >
                            Login
                          </li>
                        </Link>
                      </ul>
                      <ul onClick={() => handleClose()}>
                        <Link href="/signup" prefetch={false}>
                          <li
                            style={
                              location.asPath === "/signup"
                                ? { color: "#3d83df" }
                                : { color: "#212121", fontSize: "16px" }
                            }
                          >
                            Sign Up
                          </li>
                        </Link>
                      </ul>
                    </>
                  ) : (
                    <>
                      <ul onClick={() => handleClose()}>
                        <Link href="/dashboard" prefetch={false}>
                          <li
                            style={
                              location.asPath === "/dashboard"
                                ? { color: "#3d83df" }
                                : {
                                  color: "#212121",
                                  fontSize: "16px",
                                }
                            }
                          >
                            My Account
                          </li>
                        </Link>
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* //**mobile Menu ** */}
    </>
  );
};

export default NavBar;
