import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/moviesActions";

import MovieCard from "../movieCard/movieCard";
import Button from "../button/button";

import classes from "./myMoviesScreen.module.css";

class MyMoviesScreen extends Component {
  state = {};

  goToDetails = (movieId) => {
    this.props.history.push("/movie-detail/" + movieId);
  };

  componentDidMount() {
    if (this.props.userId) {
      axios
        .get("http://localhost:8080/get-user-movies/" + this.props.userId)
        .then((result) => {
          this.props.onSetMyMovies(result.data.myMovies);
        })
        .catch((err) => {
          console.log("getMyMoviesError: ", err);
        });
    }
  }

  handleRedirect = () => {
    this.props.history.push("/authenticate");
  };

  render() {
    return (
      <div className={classes.List}>
        {!this.props.userId && (
          <div className={classes.Content}>
            <h5 className={classes.Heading}>Pro zobrazení shlednutých filmu se přihlaste</h5>
            <Button onClick={this.handleRedirect} title="Přihlásit" />
          </div>
        )}
        {this.props.myMovies.length === 0 && this.props.userId ? (
          <h4 className={classes.Heading}>No movies seen!</h4>
        ) : null}
        {this.props.myMovies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              src={movie.fileName ? `http://localhost:8080/${movie.fileName}.png` : movie.imageUrl}
              alt={movie.title}
              title={movie.title}
              year={movie.year}
              tags={movie.genres}
              cast={movie.cast.slice(0, 3)}
              onClick={this.goToDetails.bind(null, movie._id)}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myMovies: state.movies.movies,
    userId: state.movies.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMyMovies: (myMovies) => dispatch({ type: actionTypes.SET_MY_MOVIES, myMovies: myMovies }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMoviesScreen);
