import React from "react";
import ReactPinInput from "react-pin-input";
import classNames from "classnames";
import styles from "./pinCode.module.scss";

export default class PinInputExamples extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
    };
  }

  quickReveal = (value, index) => {
    if (this)
      if (index == 0) {
        return;
      }
    document.querySelector(".pincode-input-container").children[
      index - 1
    ].type = "text";
    setTimeout(() => {
      document.querySelector(".pincode-input-container").children[
        index - 1
      ].type = "password";
    }, 200);
  };

  render() {
    const { code } = this.state;
    return (
      <div
        className={classNames(
          this.props.from === "settings" && styles.settings,
          this.props.from === "signin" && styles.signin,
          this.props.from === "forgot" && styles.forgot
        )}
      >
        <ReactPinInput
          length={6}
          initialValue=""
          focus={true}
          // secret
          onChange={this.quickReveal}
          autoSelect="true"
          type="numeric"
          // style={{ padding: "10px" }}
          inputStyle={{
            borderColor: "#DCDFE3",
            text: "#98A1AB",
            borderRadius: "3px",
            margin: "0 8px",
            color: "#98A1AB",
            margin: "10px",
          }}
          inputFocusStyle={{ borderColor: "#3D83DF" }}
          onComplete={(value, index) => {
            this.props.submit(value);
          }}
          isValid={true}
        />
      </div>
    );
  }
}
