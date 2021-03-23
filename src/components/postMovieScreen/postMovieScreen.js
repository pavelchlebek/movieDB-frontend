import React, { Component } from "react";
import axios from "axios";

import classes from "./postMovieScreen.module.css";

import Input from "../input/input";
import Button from "../button/button";
import TagList from "../tagList/tagList";
import AlertMessage from "../alertMessage/alertMessage";

import { genres } from "../../data/data";

class PostMovieScreen extends Component {
  state = {
    title: "",
    year: "",
    imageUrl: "",
    tags: [],
    origin: "",
    length: "",
    direction: "",
    rating: "",
    cast: "",
    description: "",
    serverMessage: "",
    serverTitle: "",
    error: null,
  };

  handlePostMovie = (event) => {
    event.preventDefault();
    const {
      title,
      year,
      imageUrl,
      tags,
      origin,
      length,
      direction,
      rating,
      cast,
      description,
    } = this.state;
    if (
      title &&
      year &&
      imageUrl &&
      tags &&
      origin &&
      length &&
      direction &&
      rating &&
      cast &&
      description
    ) {
      axios
        .post("http://localhost:8080/post-movie", {
          title: title,
          year: year,
          imageUrl: imageUrl,
          genres: tags,
          origin: origin.split(",").map((item) => item.trim()),
          length: length,
          direction: direction.split(",").map((item) => item.trim()),
          rating: rating,
          cast: cast.split(",").map((actor) => actor.trim()),
          description: description,
        })
        .then((result) => {
          this.setState({
            serverMessage: result.data.message,
            serverTitle: result.data.title,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({
        error: "Prosím, vyplněte všechna pole formuláře!",
      });
    }
  };

  toggleTag = (tag) => {
    if (this.state.tags.includes(tag)) {
      this.setState({
        tags: this.state.tags.filter((item) => item !== tag),
      });
    } else {
      this.setState({
        tags: [...this.state.tags, tag],
      });
    }
  };

  getGenreColor = (tag) => {
    if (this.state.tags.includes(tag)) {
      return "Clicked";
    } else {
      return "Default";
    }
  };

  handleRedirect = () => {
    this.props.history.push("/");
  };

  render() {
    const form = (
      <div className={classes.List}>
        <h2 className={classes.Heading}>Přidat nový film do databáze</h2>
        <form id="form" className={classes.FormBody} onSubmit={this.handlePostMovie}>
          <Input
            type="text"
            placeholder="Název filmu"
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
          <Input
            type="text"
            placeholder="Natočen v roce"
            onChange={(event) => this.setState({ year: event.target.value })}
            value={this.state.year}
          />
          <Input
            type="text"
            placeholder="adresa obrázku"
            onChange={(event) => this.setState({ imageUrl: event.target.value })}
            value={this.state.imageUrl}
          />
          <div className={classes.TagContainer}>
            <TagList
              tags={genres}
              color={this.getGenreColor}
              clicked={this.toggleTag}
              justify="Center"
            />
          </div>
          <Input
            type="text"
            placeholder="Země původu"
            onChange={(event) => this.setState({ origin: event.target.value })}
            value={this.state.origin}
          />
          <Input
            type="text"
            placeholder="Délka filmu"
            onChange={(event) => this.setState({ length: event.target.value })}
            value={this.state.length}
          />
          <Input
            type="text"
            placeholder="Réžie"
            onChange={(event) => this.setState({ direction: event.target.value })}
            value={this.state.direction}
          />
          <Input
            type="text"
            placeholder="Hodnocení (0 - 100)"
            onChange={(event) => this.setState({ rating: event.target.value })}
            value={this.state.rating}
          />
          <Input
            type="text"
            placeholder="Herci (př.: Tom Hanks,Jodie Foster)"
            onChange={(event) => this.setState({ cast: event.target.value })}
            value={this.state.cast}
          />
          <textarea
            form="form"
            placeholder="Děj filmu..."
            className={classes.Description}
            onChange={(event) => this.setState({ description: event.target.value })}
            value={this.state.description}
          />
          <Button type="submit" title="Uložit film" />
        </form>
        <AlertMessage visible={this.state.error} message={this.state.error} />
      </div>
    );

    const movieAddedSucces = (
      <div className={classes.List}>
        <div className={classes.MovieSavedContainer}>
          <p>
            Film <span className={classes.ServerTitle}>{this.state.serverTitle}</span> uložen do
            databáze!
          </p>
          <Button onClick={this.handleRedirect} title="Filmy" />
        </div>
      </div>
    );

    return this.state.serverMessage ? movieAddedSucces : form;
  }
}

export default PostMovieScreen;
