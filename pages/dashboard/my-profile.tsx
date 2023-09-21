import BookingManagementComp from "@component/Components/DashboardComp/BookingManagemnet";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/profile.module.scss";
import ProfileSettingsComp from "@component/Components/DashboardComp/MyProfile/profile";

const Booking = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ProfileSettingsComp />
      </div>
    </div>
  );
};
Booking.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Booking;
