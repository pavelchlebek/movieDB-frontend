import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import * as actionTypes from "../../store/actions/moviesActions";

import classes from "./movieDetail.module.css";
import TagList from "../tagList/tagList";
import Modal from "../modal/modal";
import Button from "../button/button";
import Spinner from "../spinner/spinner";

import { axiosURL } from "../../axios/axios";

import { arrayPrint } from "../../utilities/arrayPrint";

class MovieScreen extends Component {
  state = {
    // seen: false,
    modalShow: false,
    seenClicked: false,
  };

  seenHandler = (id) => {
    if (!this.props.userName) {
      this.setState({
        modalShow: true,
      });
    } else {
      this.setState({
        seenClicked: true,
      });
      axios
        .post(`${axiosURL}/add-movie`, {
          movieId: id,
          id: this.props.userId,
        })
        .then((result) => {
          axios
            .get(`${axiosURL}/get-user-movies/` + this.props.userId)
            .then((result) => {
              this.props.onSetMyMovies(result.data.movieArray);
              this.setState({
                seenClicked: false,
              });
            })
            .catch((err) => {
              console.log("getMyMoviesError: ", err);
            });
        })
        .catch((err) => {
          console.log("seenHanlderAxiosError: ", err);
        });
    }
  };

  getColor = (title) => {
    return "Default";
  };

  handleModalClosed = () => {
    this.setState({
      modalShow: false,
    });
  };

  handleRedirect = () => {
    this.props.history.push("/authenticate");
  };

  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    axios
      .get(`${axiosURL}/movie-details/` + movieId)
      .then((result) => {
        this.props.onSetCurrentMovie(result.data);
      })
      .catch((err) => {
        console.log("getMovieError: ", err);
      });
  }

  render() {
    let cast = [];
    if (Array.isArray(this.props.currentMovie.cast)) {
      cast = this.props.currentMovie.cast.slice(0, 10);
    }

    let tags = [];
    if (Array.isArray(this.props.currentMovie.genres)) {
      tags = this.props.currentMovie.genres;
    }

    let attachedClasses;
    if (this.props.myMovies.some((movie) => movie._id === this.props.currentMovie._id)) {
      attachedClasses = [classes.Toggle, classes.ToggleClicked].join(" ");
    } else {
      attachedClasses = classes.Toggle;
    }

    window.scrollTo(0, 0);

    return (
      <div className={classes.List}>
        <Modal show={this.state.modalShow} modalClosed={this.handleModalClosed}>
          <div className={classes.ModalContent}>
            <p>Pro p??id??n?? filmu do zhl??dnut??ch se pros??m p??ihlaste!</p>
            <Button onClick={this.handleRedirect} title="P??ihl??sit" />
          </div>
        </Modal>
        <div className={classes.MovieBox}>
          <div className={classes.HeadSection}>
            <h3 className={classes.Title}>{this.props.currentMovie.title}</h3>
            <h3 className={classes.Year}>{`(${this.props.currentMovie.year})`}</h3>
            <h3 className={classes.Rating}>{`${this.props.currentMovie.rating}%`}</h3>
          </div>
          {this.props.currentMovie.genres ? (
            <div className={classes.PictureBox}>
              <img
                className={classes.Picture}
                src={this.props.currentMovie.imageUrl}
                alt={this.props.currentMovie.title}
              />
              <div className={classes.Tags}>
                <TagList tags={tags} clicked={() => {}} color={this.getColor} />
                <div className={classes.Cast}>
                  <h5>
                    <span className={classes.Blue}>Re??ie: </span>
                    {this.props.currentMovie.direction &&
                      arrayPrint(this.props.currentMovie.direction)}
                  </h5>
                  <h5>
                    <span className={classes.Blue}>Hraj??: </span> {arrayPrint(cast)}
                  </h5>
                  <h5>{`${this.props.currentMovie.length} minut / 
                  ${
                    this.props.currentMovie.origin && arrayPrint(this.props.currentMovie.origin)
                  }`}</h5>
                </div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
          <div className={classes.SeenToggle}>
            {this.state.seenClicked ? (
              <Spinner />
            ) : (
              <h5
                onClick={this.seenHandler.bind(this, this.props.currentMovie._id)}
                className={attachedClasses}
              >
                Vid??l jsem
              </h5>
            )}
          </div>
          <div className={classes.Description}>
            <p className={classes.Paragraph}>{this.props.currentMovie.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myMovies: state.movies.movies,
    userId: state.movies.userId,
    userName: state.movies.userName,
    currentMovie: state.movies.currentMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCurrentMovie: (movie) =>
      dispatch({ type: actionTypes.SET_CURRENT_MOVIE, currentMovie: movie }),
    onToggleMovie: (seenMovies) =>
      dispatch({ type: actionTypes.ADD_MOVIE, seenMovies: seenMovies }),
    onSetMyMovies: (myMovies) => dispatch({ type: actionTypes.SET_MY_MOVIES, myMovies: myMovies }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieScreen);
