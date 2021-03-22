import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/moviesActions";

import MovieCard from "../movieCard/movieCard";

import classes from "./myMoviesScreen.module.css";

class MyMoviesScreen extends Component {
  state = {};

  goToDetails = (movieId) => {
    this.props.history.push("/movie-detail/" + movieId);
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/get-user-movies/" + this.props.userId)
      .then((result) => {
        // console.log("getMyMoviesResult: ", result.data.myMovies);
        this.props.onSetMyMovies(result.data.myMovies);
      })
      .catch((err) => {
        console.log("getMyMoviesError: ", err);
      });
  }

  render() {
    // const movieObjects = [];
    // for (let i = 0; i < this.props.allMovies.length; i++) {
    //   if (this.props.myMovies.includes(this.props.allMovies[i]._id)) {
    //     movieObjects.push(this.props.allMovies[i]);
    //   }
    // }

    return (
      <div className={classes.List}>
        {this.props.myMovies.length === 0 ? (
          <h3 className={classes.Heading}>No movies seen!</h3>
        ) : null}
        {this.props.myMovies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              src={movie.imageUrl}
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
    // allMovies: state.movies.allMovies,
    userId: state.movies.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onSeenClicked: (id) => dispatch({ type: "ADD_MOVIE", movieId: id }),
    onSetMyMovies: (myMovies) => dispatch({ type: actionTypes.SET_MY_MOVIES, myMovies: myMovies }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMoviesScreen);
