import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import * as actionTypes from "../../store/actions/moviesActions";
import TagList from "../tagList/tagList";
import AlertMessage from "../alertMessage/alertMessage";
import Button from "../button/button";
import Spinner from "../spinner/spinner";

import { axiosURL } from "../../axios/axios";

import classes from "./settingsScreen.module.css";

import { genres } from "../../data/data";

class SettingsScreen extends Component {
  state = {
    actors: [],
    directors: [],
    origins: [],
  };

  componentDidMount() {
    axios.get(`${axiosURL}/get-actors`).then((result) => {
      this.setState({
        actors: result.data,
      });
    });
    axios.get(`${axiosURL}/get-directors`).then((result) => {
      this.setState({
        directors: result.data,
      });
    });
    axios.get(`${axiosURL}/get-origins`).then((result) => {
      this.setState({
        origins: result.data,
      });
    });
  }

  toggleGenreTag = (tagTitle) => {
    this.props.onToggleGenreTag(tagTitle);
    this.props.onResetCurrentPage();
  };

  toggleActorTag = (tagTitle) => {
    this.props.onToggleActorTag(tagTitle);
    this.props.onResetCurrentPage();
  };

  toggleOriginTag = (tagTitle) => {
    this.props.onToggleOriginTag(tagTitle);
    this.props.onResetCurrentPage();
  };

  toggleDirectorTag = (tagTitle) => {
    this.props.onToggleDirectorTag(tagTitle);
    this.props.onResetCurrentPage();
  };

  getColor = (title) => {
    if (
      this.props.genreTags.includes(title) ||
      this.props.actorTags.includes(title) ||
      this.props.originTags.includes(title)
      // this.props.directorTags.includes(title)
    ) {
      return "Clicked";
    }
    return "Default";
  };

  getDirectorColor = (title) => {
    if (this.props.directorTags.includes(title)) {
      return "Clicked";
    } else {
      return "Default";
    }
  };

  handleRedirect = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className={classes.List}>
        <div className={classes.MovieBox}>
          <h2 className={classes.Heading}>Nastavení doporučení</h2>
          <div className={classes.Section}>
            <h4 className={classes.Title}>Žánry:</h4>
            <div className={classes.TagList}>
              <TagList
                tags={genres}
                justify="Center"
                clicked={this.toggleGenreTag}
                color={this.getColor}
              />
            </div>
            <AlertMessage
              visible={this.props.genreTags.length > 1}
              message="Prosím, vyberte pouze jeden žánr!"
            />
          </div>
          {this.state.actors.length > 0 &&
          this.state.directors.length > 0 &&
          this.state.origins.length > 0 ? (
            <div>
              <div className={classes.Section}>
                <h4 className={classes.Title}>Herci:</h4>
                <div className={classes.TagList}>
                  <TagList
                    tags={this.state.actors}
                    justify="Center"
                    clicked={this.toggleActorTag}
                    color={this.getColor}
                  />
                </div>
                <AlertMessage
                  visible={this.props.actorTags.length > 1}
                  message="Prosím, vyberte pouze jednoho herce!"
                />
              </div>
              <div className={classes.Section}>
                <h4 className={classes.Title}>Režiséři:</h4>
                <div className={classes.TagList}>
                  <TagList
                    tags={this.state.directors}
                    justify="Center"
                    clicked={this.toggleDirectorTag}
                    color={this.getDirectorColor}
                  />
                </div>
                <AlertMessage
                  visible={this.props.directorTags.length > 1}
                  message="Prosím, vyberte pouze jedenoho režiséra!"
                />
              </div>
              <div className={classes.Section}>
                <h4 className={classes.Title}>Původ:</h4>
                <div className={classes.TagList}>
                  <TagList
                    tags={this.state.origins}
                    justify="Center"
                    clicked={this.toggleOriginTag}
                    color={this.getColor}
                  />
                </div>
                <AlertMessage
                  visible={this.props.originTags.length > 1}
                  message="Prosím, vyberte pouze jednu zemi původu!"
                />
              </div>
            </div>
          ) : (
            <Spinner />
          )}
          <div className={classes.Button}>
            <Button onClick={this.handleRedirect} title="Přejít na Filmy" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genreTags: state.movies.genres,
    actorTags: state.movies.actors,
    originTags: state.movies.origins,
    directorTags: state.movies.directors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleGenreTag: (title) => dispatch({ type: actionTypes.ADD_GENRE_TAG, genreTitle: title }),
    onToggleActorTag: (title) => dispatch({ type: actionTypes.ADD_ACTOR_TAG, genreTitle: title }),
    onToggleOriginTag: (title) => dispatch({ type: actionTypes.ADD_ORIGIN_TAG, genreTitle: title }),
    onToggleDirectorTag: (title) =>
      dispatch({ type: actionTypes.ADD_DIRECTOR_TAG, genreTitle: title }),
    onResetCurrentPage: () => dispatch({ type: actionTypes.RESET_CURRENT_PAGE }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
