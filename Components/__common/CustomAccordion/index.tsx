/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
const Accordion = ({ AccordianItem, setIsActive, setSelected }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  return (
    <div className="accordion-item">
      <div
        className="accordion-title"
        onClick={() => setIsActiveMenu(!isActiveMenu)}
      >
        <div>{AccordianItem?.title}</div>
        <div>{isActiveMenu ? <SlArrowUp /> : <SlArrowDown />}</div>
      </div>
      {isActiveMenu && (
        <div className="accordion-content">
          {AccordianItem?.content?.map((item, index) => {
            return (
              <div
                className="text-Accordion"
                key={index}
                onClick={() => {
                  setSelected({
                    name: item?.label,
                    Category: AccordianItem,
                  }),
                    setIsActive(false);
                }}
              >
                {item?.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Accordion;
