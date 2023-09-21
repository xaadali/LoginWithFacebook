import Header from "@component/Components/HomeComponents/Header/Header";
import Professional from "@component/Components/HomeComponents/professional";
import RepairService from "@component/Components/HomeComponents/repairServices";
import ServiceModals from "@component/Components/HomeComponents/serviceModals";
import Service from "@component/Components/HomeComponents/Services/service";
import Technicians from "@component/Components/HomeComponents/Technicians";
import Layout from "@component/Components/__common/layout";
import styles from "../styles/about.module.scss";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Service />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.otherContainer}>
        <Technicians />
      </div>
      <div className={styles.repairContainer}>
        <RepairService />
      </div>
      <div className={styles.otherContainer}>
        <ServiceModals />
      </div>
      <Professional />
    </>
  );
};

export default Home;
