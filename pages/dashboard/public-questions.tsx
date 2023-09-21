import QuestionComp from "@component/Components/DashboardComp/PublicQuestion";
import Sidebar from "@component/Components/__common/sideBar/sidebar";
import React, { useMemo, useState } from "react";
import styles from "../../styles/dashboard/publicQuestions.module.scss";
const PublicQuestions = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <QuestionComp />
      </div>
    </div>
  );
};
PublicQuestions.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default PublicQuestions;
