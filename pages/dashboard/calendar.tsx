import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";
import CompanyCalendarDetail from "@component/Components/DashboardComp/CompanyCalender";


const CompanyCalender = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CompanyCalendarDetail />
      </div>
    </div>
  );
};
CompanyCalender.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default CompanyCalender;