import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import MovieCard from "../movieCard/movieCard";

import PaginationItem from "../paginationItem/paginationItem";
import Pagination from "../pagination/pagination";

import classes from "./testMovieList.module.css";

import * as actionTypes from "../../store/actions/moviesActions";

class MovieList extends Component {
  state = {
    // count: 0,
    editedMovies: [],
    showMovies: [],
    currentPage: 1,
    moviesPerPage: 4,
  };

  // goToDetails = (movieId) => {
  //   this.props.history.push("/details/" + movieId);
  // };

  componentDidMount() {
    axios
      .get("http://localhost:8080/get-edited-movies")
      .then((result) => {
        // this.props.onGetAllMovies(result.data);
        this.setState({
          editedMovies: result.data.result,
          showMovies: result.data.result.slice(0, this.state.moviesPerPage),
          count: result.data.count,
        });
      })
      .catch((error) => {
        console.log("allMovies error: ", error);
      });
    // conditionally if (this.props.userId)
    // if (this.props.userId) {
    //   axios
    //     .get("http://localhost:8080/get-my-movies/" + this.props.userId)
    //     .then((result) => {
    //       this.props.onSetMyMovies(result.data.myMovies);
    //     })
    //     .catch((err) => {
    //       console.log("getMyMoviesError: ", err);
    //     });
    // }
  }

  pageHandler = (page) => {
    const showMovies = this.state.editedMovies.slice(
      (page - 1) * this.state.moviesPerPage,
      page * this.state.moviesPerPage
    );
    this.setState({
      showMovies: showMovies,
      currentPage: page,
    });
  };

  getActive = (page) => {
    if (this.state.currentPage === page) {
      return true;
    } else {
      return false;
    }
  };

  nextHandler = () => {
    this.pageHandler(this.state.currentPage + 1);
  };

  previousHandler = () => {
    this.pageHandler(this.state.currentPage - 1);
  };

  render() {
    window.scrollTo(0, 0);
    // console.log("currentPage: ", this.state.currentPage);
    // console.log("showMovies: ", this.state.showMovies);
    return (
      <div className={classes.List}>
        {this.state.showMovies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              // src={movie.imageUrl}
              src={`http://localhost:8080/${movie.fileName}.png`}
              alt={movie.title}
              title={movie.title}
              year={movie.year}
              tags={movie.genres}
              cast={movie.cast.slice(0, 3)}
              // onClick={this.goToDetails.bind(null, movie._id)}
              // seen={this.props.myMovies.includes(movie._id)}
              // seen={this.props.myMovies.some((item) => item._id === movie._id)}
            />
          );
        })}
        <Pagination
          moviesCount={this.state.editedMovies.length}
          moviesPerPage={this.state.moviesPerPage}
          onClick={this.pageHandler}
          active={this.getActive}
          next={this.nextHandler}
          previous={this.previousHandler}
          showPrevious={this.state.currentPage > 1 ? true : false}
          showNext={
            this.state.currentPage <
            Math.ceil(this.state.editedMovies.length / this.state.moviesPerPage)
              ? true
              : false
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return {
  //   myMovies: state.movies.movies,
  //   allMovies: state.movies.allMovies,
  //   userId: state.movies.userId,
  // };
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //   onGetAllMovies: (movies) => dispatch({ type: actionTypes.GET_ALL_MOVIES, allMovies: movies }),
  //   onSetMyMovies: (myMovies) => dispatch({ type: actionTypes.SET_MY_MOVIES, myMovies: myMovies }),
  // };
};

export default MovieList;
