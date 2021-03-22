import React from "react";

import classes from "./tag.module.css";

const Tag = (props) => {
  return (
    <span onClick={props.onClick} className={[classes.Title, classes[props.color]].join(" ")}>
      {props.title}
    </span>
  );
};
export default Tag;
