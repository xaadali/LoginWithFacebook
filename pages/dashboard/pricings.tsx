import CompanyPricingPlan from "@component/Components/DashboardComp/PricingPlans";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";

const Pricing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CompanyPricingPlan />
      </div>
    </div>
  );
};
Pricing.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Pricing;
