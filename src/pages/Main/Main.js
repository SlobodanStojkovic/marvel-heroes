import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../components/Pagination/Pagination";
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
  const characters = useSelector((state) => state.charactersToShow);
  const limitQuery = "limit=20";
  const offset = currentPage * 20 - 20;
  const offsetQuery = "&offset=" + offset;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    let abortController;
    (async () => {
      abortController = new AbortController();
      let signal = abortController.signal;
      axios
        .get(
          marvelApiEndpointStart +
            limitQuery +
            offsetQuery +
            marvelApiEndpointEnd,
          { signal: signal }
        )
        .then((response) => {
          dispatch({ type: "setData", payload: response.data.data.results });
        })
        .catch((error) => {
          setError(error.message);
        });

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    })();

    return () => abortController.abort();
  }, [currentPage]);

  console.log(isLoading);

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
  }, [response]);

  useEffect(() => {
    dispatch({ type: "setCharacters", payload: charactersTransformHandler() });
  }, [charactersTransformHandler]);

  return (
    <main>
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && error && <Error />}
      {!isLoading && !error && (
        <>
          <div className="charactersList">
            {characters.map((character) => (
              <SingleCharacter character={character} key={character.id} />
            ))}
          </div>

          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={1500}
            pageSize={20}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </main>
  );
};

export default Main;
