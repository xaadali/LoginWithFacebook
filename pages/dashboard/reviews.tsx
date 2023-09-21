import BookingManagementComp from "@component/Components/DashboardComp/BookingManagemnet";
import ReviewsComp from "@component/Components/DashboardComp/Reviews";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";

const Reviews = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ReviewsComp />
      </div>
    </div>
  );
};
Reviews.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Reviews;
