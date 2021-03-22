import React from "react";

import classes from "./input.module.css";

const Input = (props) => {
  return (
    <input
      className={classes.Input}
      onChange={props.onChange}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
