

const initialCharactersState = {
  data: [],
  charactersToShow: [],
  selectedCharacter: [],
};

const charactersReducer = (state = initialCharactersState, action) => {
  if (action.type === "setData") {
    return {
      data: action.payload,
      charactersToShow: state.charactersToShow,
      selectedCharacter: state.selectedCharacter,
    };
  }

  if (action.type === "setCharacters") {
    return {
      data: state.data,
      charactersToShow: action.payload,
      selectedCharacter: state.selectedCharacter,
    };
  }

  if (action.type === "setSelectedCharacter") {
    return {
      data: state.data,
      charactersToShow: state.charactersToShow,
      selectedCharacter: action.payload,
    };
  }

  return state;
};

export default charactersReducer;
