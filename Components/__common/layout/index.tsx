import React from "react";
import styles from "./layout.module.scss";

interface layoutInterface {
  children: any;
}

const Layout = (prop: layoutInterface) => {
  return (
    <>
      <div className={styles.container}>{prop.children}</div>
    </>
  );
};

export default Layout;
