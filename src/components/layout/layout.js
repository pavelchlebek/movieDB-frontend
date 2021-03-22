import React, { Component } from "react";

import classes from "./layout.module.css";
import Toolbar from "../toolbar/toolbar";
import SideDrawer from "../sideDrawer/sideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <div className={classes.Content}>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default Layout;
