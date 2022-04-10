import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./SingleCharacter.scss";

const SingleCharacter = ({ character }) => {
  const dispatch = useDispatch();

  return (
    <Link
      to="/selectedCharacter"
      onClick={() =>
        dispatch({ type: "setSelectedCharacter", payload: character })
      }
    >
      <div className="singleCharacter" key={character.id}>
        <img
          src={`${character.avatar}/standard_xlarge.jpg`}
          alt={character.name}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png";
          }}
        />
        <h1>{character.name}</h1>
        <p>{character.description}</p>
      </div>
    </Link>
  );
};

export default SingleCharacter;
