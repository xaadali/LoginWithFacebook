import CarsComp from "@component/Components/DashboardComp/Car";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";

const AddCar = () => {
  //
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CarsComp />
      </div>
    </div>
  );
};
AddCar.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default AddCar;
