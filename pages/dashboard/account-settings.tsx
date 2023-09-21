import AccountSettingsComp from "@component/Components/DashboardComp/AccountSettings";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";
import { getSession } from "next-auth/react";

const AccountSettings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AccountSettingsComp />
      </div>
    </div>
  );
};
AccountSettings.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default AccountSettings;


