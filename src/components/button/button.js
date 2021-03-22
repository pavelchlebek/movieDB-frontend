import React from "react";

import classes from "./button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.Button}
      onSubmit={props.onSubmit}
      onClick={props.onClick}
      type={props.type}
    >
      {props.title}
    </button>
  );
};

export default Button;
