import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyCalendar from "@component/Components/DashboardComp/Dates";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";
import WorkshopComp from "@component/Components/DashboardComp/Workshop";
import {
  companySideBarLink,
  userSideBarLink,
} from "@component/Components/__common/navBar/data";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state?.user);
  const [testing, setTesting] = useState<any>(0);
  useEffect(() => {
    if (user?.data?.user?.userType === "user" || user?.userType === "user") {
      setTesting(0);
    } else {
      setTesting(1);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {user?.data?.user?.userType === "user" || user?.userType === "user" ? (
          <>
            <MyCalendar />
          </>
        ) : user?.data?.user?.userType === "company" ||
          user?.userType === "company" ? (
          <WorkshopComp />
        ) : testing === 0 ? (
          <>
            <MyCalendar />
          </>
        ) : (
          <>
            <WorkshopComp />
          </>
        )}
      </div>
    </div>
  );
};
Dashboard.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Dashboard;
