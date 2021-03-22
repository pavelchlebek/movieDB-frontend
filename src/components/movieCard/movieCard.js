import React from "react";

import TagList from "../tagList/tagList";

import classes from "./movieCard.module.css";

const MovieCard = (props) => {
  const getColor = (title) => {
    return "Default";
  };

  return (
    <div className={classes.Card} onClick={props.onClick}>
      <div className={classes.PictureContainer}>
        <img className={classes.Picture} src={props.src} alt={props.title} />
        {props.seen && <div className={classes.Sticker}>Viděl</div>}
      </div>

      <div className={classes.Details}>
        <h3 className={classes.Title}>{props.title}</h3>
        <h5 className={classes.Year}>({props.year})</h5>
        <div className={classes.TagList}>
          <TagList tags={props.tags} clicked={() => {}} color={(title) => getColor(title)} />
        </div>
        <h6 className={classes.Cast}>
          Hrají:{" "}
          {props.cast.map((actor, index) => {
            return `${actor}, `;
          })}
        </h6>
      </div>
    </div>
  );
};

export default MovieCard;
