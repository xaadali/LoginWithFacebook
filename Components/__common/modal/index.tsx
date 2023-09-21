/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React, { useCallback, useEffect, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./modal.module.scss";
interface prop {
  visible?: any;
  onClose?: any;
  children?: any;
  btn?: any;
  outerStyle?: any;
  btnStyle?: any;
  showModal2?: any;
  togglepopup?: () => any;
}
export default function (Prop: prop) {
  const {
    visible,
    onClose,
    children,
    btn,
    outerStyle,
    btnStyle,
    showModal2,
    togglepopup,
  } = Prop;
  const escFunction = useCallback(
    (e: any) => {
      if (e.type === "click") {
        e.preventDefault();
      }
      if (e.keyCode === 27) {
        // onClose();
      }
    },
    [onClose]
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    // visible ? disableBodyScroll(scrollRef) : enableBodyScroll(scrollRef);
  }, [visible]);
  if (visible) {
    return (
      <div
        className={`${showModal2 ? styles.modal2 : styles.modal}`}
        ref={scrollRef}
      >
        <div
          className={cn(showModal2 ? styles.outer2 : styles.outer)}
          style={outerStyle}
        >
          {/* <OutsideClickHandler onOutsideClick={onClose}> */}
          {btn && (
            <button
              className={styles.close}
              onClick={() => onClose(false)}
              style={btnStyle}
            >
              x
            </button>
          )}
          {/* </OutsideClickHandler> */}
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
