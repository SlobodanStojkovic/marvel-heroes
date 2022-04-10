const initialCharactersState = {
  data: [],
  charactersToShow: [],
  selectedCharacter: [],
  searchString: "",
  totalCharacters: "",
};

const charactersReducer = (state = initialCharactersState, action) => {
  if (action.type === "setData") {
    return {
      data: action.payload,
      charactersToShow: state.charactersToShow,
      selectedCharacter: state.selectedCharacter,
      searchString: state.searchString,
      totalCharacters: state.totalCharacters,
    };
  }

  if (action.type === "setCharactersToShow") {
    return {
      data: state.data,
      charactersToShow: action.payload,
      selectedCharacter: state.selectedCharacter,
      searchString: state.searchString,
      totalCharacters: state.totalCharacters,
    };
  }

  if (action.type === "setSelectedCharacter") {
    return {
      data: state.data,
      charactersToShow: state.charactersToShow,
      selectedCharacter: action.payload,
      searchString: state.searchString,
      totalCharacters: state.totalCharacters,
    };
  }

  if (action.type === "setSearchString") {
    return {
      data: state.data,
      charactersToShow: state.charactersToShow,
      selectedCharacter: state.selectedCharacter,
      searchString: action.payload,
      totalCharacters: state.totalCharacters,
    };
  }

  if (action.type === "setTotalCharacters") {
    return {
      data: state.data,
      charactersToShow: state.charactersToShow,
      selectedCharacter: state.selectedCharacter,
      searchString: state.searchString,
      totalCharacters: action.payload,
    };
  }

  return state;
};

export default charactersReducer;
