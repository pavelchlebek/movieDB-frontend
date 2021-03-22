import React from "react";

import classes from "./alertMessage.module.css";

const alertMessage = (props) => {
  let attachedClasses = [classes.Alert];
  if (props.visible) {
    attachedClasses = [classes.Alert, classes.Visible].join(" ");
  }
  return <div className={attachedClasses}>{props.message}</div>;
};

export default alertMessage;
