import { useSelector } from "react-redux";

import "./SelectedCharacter.scss";

const SelectedCharacter = () => {
  const selectedCharacter = useSelector((state) => state.selectedCharacter);

  if (performance.navigation.type === 1) {
    window.location.href = "/";
  }

  return (
    <div className="selectedCharacter">
      <div className="basic-info">
        <img
          alt={selectedCharacter.name}
          src={`${selectedCharacter.avatar}/detail.jpg`}
        />
        <h1>{selectedCharacter.name}</h1>
        <p>{selectedCharacter.description}</p>
      </div>
      <div className="additional-info">
        <div className="comics">
          <h3>Comics</h3>
          <ol>
            {selectedCharacter.comics.items.length > 0 ? (
              selectedCharacter.comics.items.map((comic, index) => (
                <li key={comic.name + Date.now() + index}>{comic.name}</li>
              ))
            ) : (
              <li>{"There are no comics."}</li>
            )}
          </ol>
        </div>
        <div className="stories">
          <h3>Stories</h3>
          <ol>
            {selectedCharacter.stories.items.length > 0 ? (
              selectedCharacter.stories.items.map((story) => (
                <li key={story.name + Date.now()}>{story.name}</li>
              ))
            ) : (
              <li>{"There are no stories."}</li>
            )}
          </ol>
        </div>
        <div className="events">
          <h3>Events</h3>
          <ol>
            {selectedCharacter.events.items.length > 0 ? (
              selectedCharacter.events.items.map((event) => (
                <li key={event.name + Date.now()}>{event.name}</li>
              ))
            ) : (
              <li>{"There are no events."}</li>
            )}
          </ol>
        </div>
        <div className="series">
          <h3>Series</h3>
          <ol>
            {selectedCharacter.series.items.length > 0 ? (
              selectedCharacter.series.items.map((serie) => (
                <li key={serie.name + Date.now()}>{serie.name}</li>
              ))
            ) : (
              <li>{"There are no series."}</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SelectedCharacter;
