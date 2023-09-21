import React from "react";
import styles from "./sideBar.module.scss";
import SideBarNav from "./sideBarNav/sideBarNav";
import NavigationSidebar from "./navigationSideBar";
interface prop {
  children?: any;
}
const Sidebar = (props: prop) => {
  const { children } = props;
  return (
    <div className={styles.container}>
      <div className={styles.navbarParent}>
        <NavigationSidebar />
      </div>

      <div className={styles.right}>
        <div className={styles.left}>
          <SideBarNav />
        </div>
        <div className={styles.rightChild}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
