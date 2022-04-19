import React from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../assets/searchIcon.png";
import { RootState } from "../../store";

import "./Search.scss";

type SearchProps = {
  charactersTransformHandler: () => void;
  startSearch: () => void;
  setCurrentPage: (arg0: number) => void;
};

const Search: React.FC<SearchProps> = ({
  charactersTransformHandler,
  startSearch,
  setCurrentPage,
}) => {
  const inputQuery = useSelector((state: RootState) => state.searchString);

  const dispatch = useDispatch();

  const executeSearch = () => {
    setCurrentPage(1);
    dispatch({
      type: "setCharactersToShow",
      payload: charactersTransformHandler(),
    });
    startSearch();
  };

  const searchOnEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      executeSearch();
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
          executeSearch();
        }}
      >
        <img className="searchIcon" src={searchIcon} alt="" />
      </button>
    </div>
  );
};

export default Search;
