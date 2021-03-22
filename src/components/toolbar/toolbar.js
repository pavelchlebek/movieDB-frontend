import React from "react";

import NavItems from "../navItems/navItems";
import DrawerToggle from "../drawerToggle/drawerToggle";
import Logo from "../logo/logo";

import classes from "./toolbar.module.css";

const toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <Logo />
      <nav className={classes.DesktopOnly}>
        <NavItems />
      </nav>
    </div>
  );
};

export default toolbar;
