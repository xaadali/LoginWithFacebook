import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FcGlobe } from "react-icons/fc";
import styles from "./select.module.scss";
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
}
const MultiSelectDropDown = (Props: prop) => {
  const {
    selected,
    setSelected,
    options,
    showRightIcon,
    rightIcon,
    border,
    mainStyle,
    nav,
  } = Props;
  const [isActive, setIsActive] = useState(false);
  return (
    <>
     <select>
  <optgroup label="Level One">
    <option> A.1 </option>
    <optgroup label="Level Two">
      <option> A.B.1 </option>
    </optgroup>
    <option> A.2 </option>
  </optgroup>
</select>
 {/* <select name="select_projects" id="select_projects">
    <option value="">project.xml</option>
    <optgroup label="client1">
        <option value="">project2.xml</option>
    </optgroup>
    <optgroup label="client2">
        <option value="">project5.xml</option>
        <option value="">project6.xml</option>
        <optgroup label="client2_a">
            <option value="">project7.xml</option>
            <option value="">project8.xml</option>
        </optgroup>
        <option value="">project3.xml</option>
        <option value="">project4.xml</option>
   </optgroup>
   <option value="">project0.xml</option>
   <option value="">project1.xml</option>
</select> */}
    </>
   
   
  );
};

export default MultiSelectDropDown;
