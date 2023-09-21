/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FcGlobe } from "react-icons/fc";
import styles from "./DropDown.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
interface prop {
  selected?: {} | any;
  setSelected?: {} | any;
  options?: any[] | any;
  showRightIcon?: any;
  rightIcon?: any;
  disable?: Boolean;
  border?: Boolean;
}
//
const CountryCodes = (Props: prop) => {
  const { selected, setSelected, options, showRightIcon, rightIcon, border } =
    Props;
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={
        Props.disable ? styles.disableDropdown : styles.countryDropDown
      }
    >
      <div
        className={styles.dropdownbtn}
        style={border ? { border: "1px solid #DCDFE3" } : undefined}
        onClick={(e) => {
          Props.disable ? null : setIsActive(!isActive);
        }}
      >
        <span>{selected}</span>
        <div className={styles.withRightIcon}>
          <img
            src="/icons/arrow-down.svg"
            alt="icon"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </div>

      {isActive && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsActive(false);
          }}
        >
          <div className={styles.dropdowncontent}>
            {options.map((option: any, index: any) => (
              <div
                key={index}
                onClick={(e) => {
                  setSelected(option?.name ? option?.name : option);
                  setIsActive(false);
                }}
                className={styles.dropdownitems}
              >
                {option?.name ? option?.name : option}
              </div>
            ))}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default CountryCodes;