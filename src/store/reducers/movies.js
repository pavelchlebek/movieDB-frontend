import * as actionTypes from "../actions/moviesActions";

const initialState = {
  movies: [],
  allMovies: [],
  genres: [],
  actors: [],
  origins: [],
  directors: [],
  userId: "",
  userName: "",
  currentMovie: {},
  currentPage: 1,
  moviesCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.ADD_MOVIE:
    //   const movieSeen = state.movies.includes(action.movieId);
    //   if (!movieSeen) {
    //     return {
    //       ...state,
    //       movies: [...state.movies, action.movieId],
    //     };
    //   } else {
    //     const newMovies = state.movies.filter((movie) => movie !== action.movieId);
    //     return {
    //       ...state,
    //       movies: newMovies,
    //     };
    //   }
    case actionTypes.ADD_MOVIE:
      return {
        ...state,
        movies: action.seenMovies,
      };
    case actionTypes.ADD_GENRE_TAG:
      const tagAdded = state.genres.includes(action.genreTitle);
      if (!tagAdded) {
        return {
          ...state,
          genres: [...state.genres, action.genreTitle],
        };
      } else {
        const newGenreTags = state.genres.filter((tag) => tag !== action.genreTitle);
        return {
          ...state,
          genres: newGenreTags,
        };
      }
    case actionTypes.ADD_ACTOR_TAG:
      const actorTagAdded = state.actors.includes(action.genreTitle);
      if (!actorTagAdded) {
        return {
          ...state,
          actors: [...state.actors, action.genreTitle],
        };
      } else {
        const newActorTags = state.actors.filter((tag) => tag !== action.genreTitle);
        return {
          ...state,
          actors: newActorTags,
        };
      }
    case actionTypes.ADD_ORIGIN_TAG:
      const originTagAdded = state.origins.includes(action.genreTitle);
      if (!originTagAdded) {
        return {
          ...state,
          origins: [...state.origins, action.genreTitle],
        };
      } else {
        const newTypeTags = state.origins.filter((tag) => tag !== action.genreTitle);
        return {
          ...state,
          origins: newTypeTags,
        };
      }
    case actionTypes.ADD_DIRECTOR_TAG:
      const directorTagAdded = state.directors.includes(action.genreTitle);
      if (!directorTagAdded) {
        return {
          ...state,
          directors: [...state.directors, action.genreTitle],
        };
      } else {
        const newTypeTags = state.directors.filter((tag) => tag !== action.genreTitle);
        return {
          ...state,
          directors: newTypeTags,
        };
      }
    case actionTypes.LOGIN:
      return {
        ...state,
        userName: action.userName,
        userId: action.userId,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        userName: "",
        userId: "",
        movies: action.newMovies,
        actors: [],
        directors: [],
        origins: [],
        currentPage: 1,
        currentMovie: {},
        allMovies: [],
      };
    case actionTypes.SET_ALL_MOVIES:
      return {
        ...state,
        allMovies: action.allMovies,
      };
    case actionTypes.SET_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: action.currentMovie,
      };
    case actionTypes.SET_MY_MOVIES:
      return {
        ...state,
        movies: action.myMovies,
      };
    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case actionTypes.RESET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: 1,
      };
    case actionTypes.SET_MOVIES_COUNT:
      return {
        ...state,
        moviesCount: action.moviesCount,
      };
    default:
      return state;
  }
};

export default reducer;
