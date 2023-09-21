import React, { useState } from 'react'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { BsInfoCircle } from "react-icons/bs"


const ToolTipComponent = ({ right, text, width }) => {
  const [showToolTip, setShowToolTip] = useState(false)
  const style = {
    border: "2px solid #2384f9",
    background: "#2384f9",
    color: "white"
  }

  const overStyle = {
    color: "red",
    width: `${width ? width : "150px"}`,
    fontSize: "10px"
  }

  const handleChange = () => {
    setShowToolTip(!showToolTip)
  }
  return (
    <>
      <Tooltip placement={right} visible={showToolTip} overlay={text} overlayStyle={overStyle} onVisibleChange={handleChange} animation="zoom" overlayClassName='cursor-pointer' overlayInnerStyle={style}>
        <BsInfoCircle className='cursor-pointer dark:bg-[#1C2024]  dark:text-white text-black text-sm mb-1' />
      </Tooltip>
    </>
  )
}

export default ToolTipComponent