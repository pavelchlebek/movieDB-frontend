import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import MovieCard from "../movieCard/movieCard";
import Pagination from "../pagination/pagination";
import Modal from "../modal/modal";
import Button from "../button/button";
import Spinner from "../spinner/spinner";

import { axiosURL } from "../../axios/axios";

import classes from "./moviesPagination.module.css";

import * as actionTypes from "../../store/actions/moviesActions";

class MovieList extends Component {
  state = {
    moviesPerPage: 10,
    modalShow:
      this.props.genres.length > 1 ||
      this.props.actors.length > 1 ||
      this.props.directors.length > 1 ||
      this.props.origins.length > 1
        ? true
        : false,
  };

  goToDetails = (movieId) => {
    this.props.history.push("/movie-detail/" + movieId);
  };

  componentDidMount() {
    if (!this.state.modalShow) {
      const queryString = `/${this.props.genres[0]}/${this.props.actors[0]}/${this.props.directors[0]}/${this.props.origins[0]}`;
      axios
        .get(`${axiosURL}/movies-settings/` + this.props.currentPage + queryString)
        .then((result) => {
          this.props.onSetAllMovies(result.data.result);
          this.props.onSetMoviesCount(result.data.count);
        })
        .catch((error) => {
          console.log("allMovies error: ", error);
        });
    }

    // conditionally if signed in
    if (this.props.userId) {
      axios
        .get(`${axiosURL}/get-user-movies/` + this.props.userId)
        .then((result) => {
          this.props.onSetMyMovies(result.data.movieArray);
        })
        .catch((err) => {
          console.log("getMyMoviesError: ", err);
        });
    }
  }

  pageHandler = (page) => {
    const queryString = `/${this.props.genres[0]}/${this.props.actors[0]}/${this.props.directors[0]}/${this.props.origins[0]}`;
    axios.get(`${axiosURL}/movies-settings/` + page + queryString).then((result) => {
      this.props.onSetAllMovies(result.data.result);
      this.props.onSetCurrentPage(page);
    });
  };

  getActive = (page) => {
    if (this.props.currentPage === page) {
      return true;
    } else {
      return false;
    }
  };

  nextHandler = () => {
    this.pageHandler(this.props.currentPage + 1);
  };

  previousHandler = () => {
    this.pageHandler(this.props.currentPage - 1);
  };

  handleRedirect = () => {
    this.props.history.push("/settings");
  };

  render() {
    window.scrollTo(0, 0);
    return this.props.allMovies.length > 0 ? (
      <div className={classes.List}>
        <Modal show={this.state.modalShow} modalClosed={this.handleModalClosed}>
          <div className={classes.ModalContent}>
            <p>
              Pro zobrazení doporučených filmů se, prosím, vraťte do Nastavení a vyberte v každé
              kategorii pouze jeden tag!
            </p>
            <Button onClick={this.handleRedirect} title="Nastavení" />
          </div>
        </Modal>
        {this.props.allMovies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              src={movie.fileName ? `${axiosURL}/${movie.fileName}.png` : movie.imageUrl}
              alt={movie.title}
              title={movie.title}
              year={movie.year}
              tags={movie.genres}
              cast={movie.cast.slice(0, 3)}
              onClick={this.goToDetails.bind(null, movie._id)}
              seen={this.props.myMovies.some((item) => item._id === movie._id)}
            />
          );
        })}
        <Pagination
          moviesCount={this.props.moviesCount}
          moviesPerPage={this.state.moviesPerPage}
          onClick={this.pageHandler}
          active={this.getActive}
          next={this.nextHandler}
          previous={this.previousHandler}
          showPrevious={this.props.currentPage > 1 ? true : false}
          showNext={
            this.props.currentPage < Math.ceil(this.props.moviesCount / this.state.moviesPerPage)
              ? true
              : false
          }
        />
      </div>
    ) : (
      <Spinner />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myMovies: state.movies.movies,
    allMovies: state.movies.allMovies,
    userId: state.movies.userId,
    genres: state.movies.genres,
    actors: state.movies.actors,
    directors: state.movies.directors,
    origins: state.movies.origins,
    currentPage: state.movies.currentPage,
    moviesCount: state.movies.moviesCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMyMovies: (myMovies) => dispatch({ type: actionTypes.SET_MY_MOVIES, myMovies: myMovies }),
    onSetCurrentPage: (currentPage) =>
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, currentPage: currentPage }),
    onSetAllMovies: (allMovies) =>
      dispatch({ type: actionTypes.SET_ALL_MOVIES, allMovies: allMovies }),
    onSetMoviesCount: (moviesCount) =>
      dispatch({ type: actionTypes.SET_MOVIES_COUNT, moviesCount: moviesCount }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
