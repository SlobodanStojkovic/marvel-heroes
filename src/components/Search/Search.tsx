import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../assets/searchIcon.png";
import { RootState } from "../../store";

import "./Search.scss";

type SearchProps = {
  charactersTransformHandler: () => void;
  startSearch: () => void;
};

const Search: React.FC<SearchProps> = ({
  charactersTransformHandler,
  startSearch,
}) => {
  const inputQuery = useSelector((state: RootState) => state.searchString);

  const dispatch = useDispatch();

  const searchOnEnter = (event: any) => {
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
