import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import SingleCharacter from "../../components/SingleCharacter/SingleCharacter";
import {
  marvelApiEndpointStart,
  marvelApiEndpointEnd,
} from "../../services/endpoints";
import Error from "../Error/Error";
import LoadingSpinner from "../Loader/LoadingSpinner";

import "./Main.scss";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const response = useSelector((state) => state.data);
  const charactersToShow = useSelector((state) => state.charactersToShow);
  const searchString = useSelector((state) => state.searchString);
  const totalCharacters = useSelector((state) => state.totalCharacters);
  const limitQuery = "limit=20";
  let offset = currentPage * 20 - 20;
  const offsetQuery = "&offset=" + offset;
  const searchInput = `&nameStartsWith=${searchString}&`;

  const apiEndpointWithoutSearchQuery =
    marvelApiEndpointStart + limitQuery + offsetQuery + marvelApiEndpointEnd;

  const apiEndpointWithSearchQuery =
    marvelApiEndpointStart + searchInput + offsetQuery + marvelApiEndpointEnd;

  const searchForCharacters = (fullApiEndpoint) => {
    setIsLoading(true);
    setError(null);

    let abortController;
    (async () => {
      abortController = new AbortController();
      let signal = abortController.signal;
      axios
        .get(fullApiEndpoint, { signal: signal })
        .then((response) => {
          dispatch({ type: "setData", payload: response.data.data.results });
          dispatch({
            type: "setTotalCharacters",
            payload: response.data.data.total,
          });
        })
        .catch((error) => {
          setError(error.message);
        });

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    })();

    return () => abortController.abort();
  };

  const charactersTransformHandler = useCallback(() => {
    const transformedCharacters = response.map((character) => {
      return {
        id: character.id,
        name: character.name,
        avatar: character.thumbnail.path,
        description:
          character.description ||
          `${character.name} is one of the Heroes from the Marvel universum.`,
        comics: character.comics,
        stories: character.stories,
        events: character.events,
        series: character.series,
      };
    });
    return transformedCharacters;
  }, [response, currentPage, searchInput]);

  const startSearch = () => {
    if (searchString.length === 0) {
      searchForCharacters(apiEndpointWithoutSearchQuery);
    } else {
      searchForCharacters(apiEndpointWithSearchQuery);
    }
  };

  useEffect(() => {
    startSearch();
  }, [currentPage]);

  useEffect(() => {
    dispatch({
      type: "setCharactersToShow",
      payload: charactersTransformHandler(),
    });
  }, [response, charactersTransformHandler]);

  return (
    <main>
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && error && <Error />}
      {!isLoading && !error && (
        <>
          <Search
            charactersTransformHandler={charactersTransformHandler}
            startSearch={startSearch}
          />
          <div className="charactersList">
            {charactersToShow.map((character) => (
              <SingleCharacter character={character} key={character.id} />
            ))}
          </div>

          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalCharacters}
            pageSize={20}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </main>
  );
};

export default Main;
