import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

// import { movies } from "../../data/movies";

import MovieCard from "../movieCard/movieCard";

import classes from "./movieList.module.css";

import * as actionTypes from "../../store/actions/moviesActions";

class MovieList extends Component {
  state = {};

  goToDetails = (movieId) => {
    this.props.history.push("/details/" + movieId);
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/movies")
      .then((result) => {
        this.props.onGetAllMovies(result.data);
      })
      .catch((error) => {
        console.log("allMovies error: ", error);
      });
    // conditionally if (this.props.userId)
    if (this.props.userId) {
      axios
        .get("http://localhost:8080/get-my-movies/" + this.props.userId)
        .then((result) => {
          this.props.onSetMyMovies(result.data.myMovies);
        })
        .catch((err) => {
          console.log("getMyMoviesError: ", err);
        });
    }
  }

  render() {
    // console.log("allMovies: ", this.props.allMovies);
    return (
      <div className={classes.List}>
        {this.props.allMovies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              src={movie.imageUrl}
              alt={movie.title}
              title={movie.title}
              year={movie.year}
              tags={movie.tags}
              cast={movie.cast}
              onClick={this.goToDetails.bind(null, movie._id)}
              // seen={this.props.myMovies.includes(movie._id)}
              seen={this.props.myMovies.some((item) => item._id === movie._id)}
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
    allMovies: state.movies.allMovies,
    userId: state.movies.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllMovies: (movies) => dispatch({ type: actionTypes.GET_ALL_MOVIES, allMovies: movies }),
    onSetMyMovies: (myMovies) => dispatch({ type: actionTypes.SET_MY_MOVIES, myMovies: myMovies }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
