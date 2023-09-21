import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./switch.module.scss";
interface prop {
  onChange: any;
  checked: any;
  value: any;
  name: any;
  dayName: any;
  StarterPlan?: boolean;
  disabledState?: boolean;
}
const Switch = ({
  onChange,
  checked,
  value,
  name,
  dayName,
  StarterPlan,
  disabledState,
}: prop) => {
  return (
    <label
      className={styles.switch}
      onClick={() => {
        if (StarterPlan) {
          toast.error("Please subscribe enterprise plan to use this feature.");
          return;
        }
      }}
    >
      <input
        type="checkbox"
        disabled={StarterPlan || disabledState}
        name="isOpen"
        value={StarterPlan ? false : value}
        onChange={(e) => {
          if (StarterPlan) {
            toast.error(
              "Please subscribe enterprise plan to use this feature."
            );
            return;
          } else {
            onChange("isOpen", e.target.checked, dayName);
          }
        }}
        defaultChecked={StarterPlan ? false : checked}
        style={
          StarterPlan
            ? { cursor: "not-allowed" }
            : {
                cursor: "pointer",
              }
        }
      />
      <span className={`${styles.round} ${styles.slider}`} />
    </label>
  );
};

export default Switch;
