import React from "react";
import { connect } from "react-redux";

import classes from "./navItems.module.css";
import NavigationItem from "../navigationItem/navigationItem";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      All Movies
    </NavigationItem>
    <NavigationItem link="/movie-detail">Detail</NavigationItem>
    <NavigationItem link="/my-movies">Moje filmy</NavigationItem>
    <NavigationItem link="/settings">Nastavení</NavigationItem>
    <NavigationItem link="/post-movie">Přidat film</NavigationItem>
    <NavigationItem link="/authenticate">
      {props.userName ? props.userName : "Log In"}
    </NavigationItem>
    <NavigationItem link="/responsive-detail">Responsive</NavigationItem>
  </ul>
);

const mapStateToProps = (state) => {
  return {
    userName: state.movies.userName,
  };
};

export default connect(mapStateToProps)(NavigationItems);
