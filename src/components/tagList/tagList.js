import React from "react";

import Tag from "../tag/tag";

import classes from "./tagList.module.css";

const TagList = (props) => {
  const handleClick = (tagTitle) => {
    props.clicked(tagTitle);
  };

  return (
    <div className={[classes.TagList, classes[props.justify]].join(" ")}>
      {props.tags.map((tag, index) => {
        return (
          <Tag
            key={index}
            title={tag}
            color={props.color(tag)}
            onClick={handleClick.bind(null, tag)}
          />
        );
      })}
    </div>
  );
};

export default TagList;
