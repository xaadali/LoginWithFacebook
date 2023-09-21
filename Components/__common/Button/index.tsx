import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { ButtonProps } from "./button.interface";
import styles from "./button.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

const Button = (buttonProps: ButtonProps) => {
  const { style, type, onClick, changeStyle, name, loading } = buttonProps;
  return (
    <>
      <button
        style={style}
        type={type}
        onClick={onClick}
        className={changeStyle ? styles.outlineBtn : styles.btn}
        disabled={loading ? true : false}
      >
        {loading ? (
          <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="22"
            visible={true}
          />
        ) : (
          <>
            {/* <AiOutlineSearch /> */}
            {name}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
