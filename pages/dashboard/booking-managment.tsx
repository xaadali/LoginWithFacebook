import BookingManagementComp from "@component/Components/DashboardComp/BookingManagemnet";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";

const Booking = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <BookingManagementComp />
      </div>
    </div>
  );
};
Booking.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Booking;
