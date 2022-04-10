import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../assets/searchIcon.png";

import "./Search.scss";

const Search = ({ charactersTransformHandler, startSearch }) => {
  const inputQuery = useSelector((state) => state.searchString);

  const dispatch = useDispatch();

  const searchOnEnter = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "setCharactersToShow",
        payload: charactersTransformHandler(),
      });
      startSearch();
    }
  };

  return (
    <div className="search">
      <input
        className="searchInput"
        type="text"
        placeholder="Search for ..."
        value={inputQuery}
        onChange={(e) =>
          dispatch({
            type: "setSearchString",
            payload: e.target.value.trim().toLowerCase(),
          })
        }
        onKeyPress={searchOnEnter}
      />
      <button
        className="searchButton"
        onClick={() => {
          dispatch({
            type: "setCharactersToShow",
            payload: charactersTransformHandler(),
          });
          startSearch();
        }}
      >
        <img className="searchIcon" src={searchIcon} alt="" />
      </button>
    </div>
  );
};

export default Search;
