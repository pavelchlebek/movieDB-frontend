import React from "react";

import classes from "./spinner.module.css";

const Spinner = (props) => (
  <div className={classes.Wrapper}>
    <div className={classes.loader}>Loading...</div>
  </div>
);

export default Spinner;
