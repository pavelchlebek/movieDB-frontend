import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import MovieCard from "../movieCard/movieCard";
import Pagination from "../pagination/pagination";
import Modal from "../modal/modal";
import Button from "../button/button";

import classes from "./moviesPagination.module.css";

import * as actionTypes from "../../store/actions/moviesActions";

class MovieList extends Component {
  state = {
    count: 0,
    editedMovies: [],
    showMovies: [],
    currentPage: 1,
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
        .get("http://localhost:8080/movies-settings/" + this.props.currentPage + queryString)
        .then((result) => {
          // this.props.onGetAllMovies(result.data);
          this.setState({
            editedMovies: result.data.result,
            // showMovies: result.data.result.slice(0, this.state.moviesPerPage),
            count: result.data.count,
          });
        })
        .catch((error) => {
          console.log("allMovies error: ", error);
        });
    }

    // conditionally if (this.props.userId)
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

  // pageHandler = (page) => {
  //   const showMovies = this.state.editedMovies.slice(
  //     (page - 1) * this.state.moviesPerPage,
  //     page * this.state.moviesPerPage
  //   );
  //   this.setState({
  //     showMovies: showMovies,
  //     currentPage: page,
  //   });
  // };

  pageHandler = (page) => {
    const queryString = `/${this.props.genres[0]}/${this.props.actors[0]}/${this.props.directors[0]}/${this.props.origins[0]}`;
    axios.get("http://localhost:8080/movies-settings/" + page + queryString).then((result) => {
      this.setState({
        editedMovies: result.data.result,
        // showMovies: result.data.result.slice(0, this.state.moviesPerPage),
        currentPage: page,
      });
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
    // this.pageHandler(this.state.currentPage + 1);
    this.pageHandler(this.props.currentPage + 1);
  };

  previousHandler = () => {
    // this.pageHandler(this.state.currentPage - 1);
    this.pageHandler(this.props.currentPage - 1);
  };

  handleRedirect = () => {
    this.props.history.push("/settings");
  };

  render() {
    window.scrollTo(0, 0);
    // console.log("positionOnPage: ", window.pageYOffset);
    // console.log(window.scrollY);
    // console.log("currentPage: ", this.state.currentPage);
    // console.log("editedMovies: ", this.state.editedMovies);
    // console.log("count: ", this.state.count);
    // console.log("genres: ", this.props.genres[0]);
    // console.log("actors: ", this.props.actors[0]);
    console.log("editedMovies: ", this.state.editedMovies);
    return (
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
        {/* <div className={classes.Settings}>
          <p>genres: {this.props.genres}</p>
          <p>actors: {this.props.actors}</p>
          <p>directors: {this.props.directors}</p>
          <p>origins: {this.props.origins}</p>
        </div> */}
        {this.state.editedMovies.map((movie) => {
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
              onClick={this.goToDetails.bind(null, movie._id)}
              // seen={this.props.myMovies.includes(movie._id)}
              seen={this.props.myMovies.some((item) => item._id === movie._id)}
            />
          );
        })}
        <Pagination
          moviesCount={this.state.count}
          moviesPerPage={this.state.moviesPerPage}
          onClick={this.pageHandler}
          active={this.getActive}
          next={this.nextHandler}
          previous={this.previousHandler}
          // showPrevious={this.state.currentPage > 1 ? true : false}
          showPrevious={this.props.currentPage > 1 ? true : false}
          // showNext={
          //   this.state.currentPage < Math.ceil(this.state.count / this.state.moviesPerPage)
          //     ? true
          //     : false
          // }
          showNext={
            this.props.currentPage < Math.ceil(this.state.count / this.state.moviesPerPage)
              ? true
              : false
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myMovies: state.movies.movies,
    allMovies: state.movies.allMovies,
    userId: state.movies.userId,
    // redux settings
    genres: state.movies.genres,
    actors: state.movies.actors,
    directors: state.movies.directors,
    origins: state.movies.origins,
    currentPage: state.movies.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onGetAllMovies: (movies) => dispatch({ type: actionTypes.GET_ALL_MOVIES, allMovies: movies }),
    onSetMyMovies: (myMovies) => dispatch({ type: actionTypes.SET_MY_MOVIES, myMovies: myMovies }),
    onSetCurrentPage: (currentPage) =>
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, currentPage: currentPage }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
