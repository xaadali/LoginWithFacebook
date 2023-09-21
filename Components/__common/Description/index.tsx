import React, { useState } from "react";
import styles from "./Description.module.scss";
const Description = ({ faq, length }) => {
  const [less, setLess] = useState<boolean>(true);
  return faq?.length > length ? (
    <div className={styles.Wrapper}>
      {less ? (
        <div className={styles.Container}>
          {faq?.slice(0, 368)}
          <span className={styles.seeMore} onClick={() => setLess(!less)}>
            See More
          </span>
        </div>
      ) : (
        <label className={styles.Container}>
          {faq}
          <span className={styles.seeMore} onClick={() => setLess(!less)}>
            See Less
          </span>
        </label>
      )}
    </div>
  ) : (
    <span
      className={styles.seeMore}
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {faq}
    </span>
  );
};

export default Description;
