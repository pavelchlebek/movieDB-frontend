import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/layout/layout";
import MyMoviesScreen from "./components/myMoviesScreen/myMoviesScreen";
import SettingsScreen from "./components/settingsScreen/settingsScreen";
import Login from "./components/login/login";
import PostMovieScreen from "./components/postMovieScreen/postMovieScreen";
import MoviesPagination from "./components/moviesPagination/moviesPagination";
import MovieDetail from "./components/movieDetail/movieDetail";

class App extends Component {
  state = {};

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/settings" component={SettingsScreen} />
          <Route path="/my-movies" component={MyMoviesScreen} />
          <Route path="/authenticate" exact component={Login} />
          <Route path="/post-movie" exact component={PostMovieScreen} />
          <Route path="/" exact component={MoviesPagination} />
          <Route path="/movie-detail/:movieId" exact component={MovieDetail} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
