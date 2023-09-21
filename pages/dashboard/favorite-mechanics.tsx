import MechanicsComp from "@component/Components/DashboardComp/Mechanics";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import React, { useMemo, useState } from "react";
import styles from "../../styles/dashboard/favoriteSpecialists.module.scss";

const FavoriteSpecialist = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <MechanicsComp />
      </div>
    </div>
  );
};
FavoriteSpecialist.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default FavoriteSpecialist;
