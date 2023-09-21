import WorkshopComp from "@component/Components/DashboardComp/Workshop";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";

const Workshop = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <WorkshopComp />
      </div>
    </div>
  );
};
Workshop.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Workshop;
