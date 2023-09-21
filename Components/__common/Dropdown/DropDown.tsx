import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FiChevronDown } from "react-icons/fi";
import { FcGlobe } from "react-icons/fc";
import styles from "./DropDown.module.scss";
interface prop {
  selected?: {} | any;
  setSelected?: {} | any;
  options?: any[] | any;
  showRightIcon?: any;
  rightIcon?: any;
  disable?: Boolean;
  border?: Boolean;
  mainStyle?: boolean;
  nav?: boolean;
  onChange?: any;
  radius?: any;
  radiusStyle?: any;
}
const DropDown = (Props: prop) => {
  const {
    selected,
    setSelected,
    options,
    showRightIcon,
    rightIcon,
    border,
    mainStyle,
    nav,
    onChange,
    radius,
  } = Props;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {}, [isActive]);
  return (
    <div
      className={
        Props.disable
          ? styles.disableDropdown
          : Props.mainStyle
          ? styles.Category
          : Props.nav
          ? styles.dropdownNav
          : Props.radiusStyle
          ? styles.radiusStyling
          : styles.dropdown
      }
    >
      <div
        className={styles.dropdownbtn}
        style={border ? { border: "1px solid #ffffff7a" } : undefined}
        onClick={(e) => {
          Props.disable ? null : setIsActive(!isActive);
        }}
      >
        {showRightIcon === false ? null : (
          <div className={styles.imgContainer}>
            <div className={styles.leftIcon}>
              {radius ? <img src="/icons/radius.svg" /> : <FcGlobe />}
            </div>
          </div>
        )}
        <span>{selected}</span>
        <div className={styles.withRightIcon}>
          <FiChevronDown />
        </div>
      </div>

      {isActive && (
        <div className={styles.dropdowncontent}>
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsActive(false);
            }}
          >
            {(mainStyle || nav) && !radius ? (
              <div className={styles.inputWrapper}>
                <div className={styles.inputStyle}>
                  {" "}
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={onChange}
                  />
                </div>
              </div>
            ) : null}

            {options?.map((option: any, index: any) => (
              <div
                key={index}
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
                className={styles.dropdownitems}
              >
                {option}
              </div>
            ))}
          </OutsideClickHandler>
        </div>
      )}
    </div>
  );
};

export default DropDown;
