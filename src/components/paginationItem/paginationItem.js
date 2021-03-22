import React from "react";

import classes from "./paginationItem.module.css";

const paginationItem = (props) => {
  let attachedClasses = classes.Item;
  if (props.active) {
    attachedClasses = [classes.Item, classes.Active].join(" ");
  }
  return (
    <h5 className={attachedClasses} onClick={props.onClick}>
      {props.order}
    </h5>
  );
};

export default paginationItem;
