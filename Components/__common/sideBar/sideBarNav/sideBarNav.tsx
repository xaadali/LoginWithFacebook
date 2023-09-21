/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userSideBarLink, companySideBarLink } from "../../navBar/data";
import styles from "./sideBarNav.module.scss";
import LogoutPopup from "../../Popups/Logout";
import { useState, useEffect } from "react";
import {
  resetUserState,
  saveSidebar,
  setLogout,
  setSplashLoader,
} from "@component/store/reducers/userReducer";
import { logoutUser } from "@component/services/UserSignup";
const SideBarNav = () => {
  const location = useRouter();
  const { splashLoader } = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  const [popupvisible, setpopupvisible] = useState(false);
  const [testing, setTesting] = useState<any>([]);
  console.log("🚀 ~ file: sideBarNav.tsx:25 ~ SideBarNav ~ testing:", testing);
  const handleLogOut = async () => {
    try {
      // const res = await Promise.all([
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
    } catch (error) {
      dispatch(resetUserState());
      dispatch(setSplashLoader(false));
    }
    dispatch(setLogout(true));
  };
  const { user } = useSelector((state: any) => state?.user);
  useEffect(() => {
    if (user?.data?.user?.userType === "user" || user?.userType === "user") {
      setTesting(userSideBarLink);
    } else {
      setTesting(companySideBarLink);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* <div className={styles.logo}>
            {user?.data?.user?.userType === "user" ? (
              <>
                <img
                  src="/icons/logo.svg"
                  alt="alt-Logo"
                  style={{ cursor: "pointer" }}
                  onClick={() => location.push("/")}
                />
              </>
            ) : (
              <>
                <img src="/icons/logo.svg" alt="" />
              </>
            )}
          </div> */}
          <div className={styles.linksWrapper}>
            {user?.data?.user?.userType === "user" ||
            user?.userType === "user" ? (
              <>
                {userSideBarLink.map((item: any, index) => (
                  <ul
                    key={index}
                    className={
                      location.asPath === item.link
                        ? styles.Active
                        : styles.inActive
                    }
                  >
                    <Link href={item.link}>
                      <li
                        className={
                          location.asPath === item.link
                            ? styles.activeLi
                            : styles.inActiveLi
                        }
                      >
                        <div className={styles.hovering}>
                          <img
                            src={
                              location.asPath === item.link
                                ? item?.activeIcon
                                : item?.inactiveIcon
                            }
                            alt="icon"
                            draggable="false"
                            style={{ height: "20px", width: "30px" }}
                          />
                          {item?.heading}
                        </div>
                      </li>
                    </Link>
                  </ul>
                ))}
              </>
            ) : user?.data?.user?.userType === "company" ||
              user?.userType === "company" ? (
              <>
                {companySideBarLink.map((item: any, index) => (
                  <ul
                    key={index}
                    className={
                      location.asPath === item.link
                        ? styles.Active
                        : styles.inActive
                    }
                  >
                    <Link
                      href={item.link}
                      onClick={() => dispatch(saveSidebar(item?.heading))}
                    >
                      <li
                        className={
                          location.asPath === item.link
                            ? styles.activeLi
                            : styles.inActiveLi
                        }
                      >
                        <div className={styles.hovering}>
                          <img
                            src={
                              location.asPath === item.link
                                ? item?.activeIcon
                                : item?.inactiveIcon
                            }
                            alt="icon"
                            draggable="false"
                            style={{ height: "20px", width: "30px" }}
                          />
                          {item?.heading}
                        </div>
                      </li>
                    </Link>
                  </ul>
                ))}
              </>
            ) : (
              <>
                {testing.map((item: any, index) => (
                  <ul
                    key={index}
                    className={
                      location.asPath === item.link
                        ? styles.Active
                        : styles.inActive
                    }
                  >
                    <Link
                      href={item.link}
                      onClick={() => dispatch(saveSidebar(item?.heading))}
                    >
                      <li
                        className={
                          location.asPath === item.link
                            ? styles.activeLi
                            : styles.inActiveLi
                        }
                      >
                        <div className={styles.hovering}>
                          <img
                            src={
                              location.asPath === item.link
                                ? item?.activeIcon
                                : item?.inactiveIcon
                            }
                            alt="icon"
                            draggable="false"
                            style={{ height: "20px", width: "30px" }}
                          />
                          {item?.heading}
                        </div>
                      </li>
                    </Link>
                  </ul>
                ))}
              </>
            )}
          </div>

          <div className={styles.logoutWrapper} onClick={() => handleLogOut()}>
            <img
              src="/inActive_user/logout.svg"
              alt="logout"
              draggable="false"
              style={{ height: "20px", width: "20px" }}
            />
            <label>Logout</label>
          </div>
        </div>
      </div>
      {/* <LogoutPopup
        popupvisible={popupvisible}
        setpopupvisible={setpopupvisible}
      /> */}
    </>
  );
};

export default SideBarNav;
