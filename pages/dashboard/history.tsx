import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";
import HistoryComp from "@component/Components/DashboardComp/History";

const History = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <HistoryComp />
      </div>
    </div>
  );
};
History.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default History;
