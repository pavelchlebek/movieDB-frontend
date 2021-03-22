import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/layout/layout";
import MovieList from "./components/movieList/movieList";
import MovieScreen from "./components/movieScreen/movieScreen";
import MyMoviesScreen from "./components/myMoviesScreen/myMoviesScreen";
import SettingsScreen from "./components/settingsScreen/settingsScreen";
import Login from "./components/login/login";
import PostMovieScreen from "./components/postMovieScreen/postMovieScreen";
import MoviesPagination from "./components/moviesPagination/moviesPagination";
import MovieDetail from "./components/movieDetail/movieDetail";

// testing editedMovies
import TestMovieList from "./components/testMovieList/testMovieList";

class App extends Component {
  state = {};

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/settings" component={SettingsScreen} />
          <Route path="/details/:movieId" component={MovieScreen} />
          <Route path="/my-movies" component={MyMoviesScreen} />
          <Route path="/authenticate" exact component={Login} />
          <Route path="/post-movie" exact component={PostMovieScreen} />
          <Route path="/" exact component={MovieList} />
          <Route path="/get-edited-movies" exact component={TestMovieList} />
          <Route path="/pagination" exact component={MoviesPagination} />
          <Route path="/movie-detail/:movieId" exact component={MovieDetail} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
