/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./DropDown.module.scss";
import { FiLogOut } from "react-icons/fi";
import OutsideClickHandler from "react-outside-click-handler";
import { BsChevronDown } from "react-icons/bs";
import Accordion from "../CustomAccordion";
import { accordionData } from "@component/utills/enum";
const SearchDropDown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdownbtn}
        onClick={(e) => setIsActive(!isActive)}
      >
        <span className={styles.selectedOptions}>
          {selected?.name ? selected?.name : "Search..."}
        </span>
        <BsChevronDown className={styles.withRightIcon} />
      </div>

      {isActive && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsActive(false);
          }}
        >
          <div className={styles.dropdowncontent}>
            {accordionData.map((AccordianItem) => (
              <Accordion
                AccordianItem={AccordianItem}
                setIsActive={setIsActive}
                setSelected={setSelected}
              />
            ))}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default SearchDropDown;
