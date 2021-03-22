import React from "react";

import PaginationItem from "../paginationItem/paginationItem";

import classes from "./paginationQuery.module.css";

const pagination = (props) => {
  const moviesCount = props.moviesCount;
  const moviesPerPage = props.moviesPerPage;
  const pagesCount = Math.ceil(moviesCount / moviesPerPage);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={classes.Wrapper}>
      {props.showPrevious && (
        <PaginationItem order="Předchozí" key="previous" onClick={() => props.previous()} />
      )}
      {pages.map((page) => {
        return (
          <PaginationItem
            order={page}
            key={page}
            onClick={() => props.onClick(page)}
            active={props.active(page)}
          />
        );
      })}
      {props.showNext && <PaginationItem order="Další" key="next" onClick={() => props.next()} />}
    </div>
  );
};

export default pagination;
