
const initialState = {
  characters: [],
  loading: false,
  filteredCharacters: [],
};

export default (state = initialState, action) => {
  const { characters, error, filteredCharacters } = action;
  switch (action.type) {
    case 'CHARACTERS_REQUESTED':
      return {
        ...state,
        loading: true,
      };
    case 'CHARACTERS_RECEIVED':
      return {
        ...state,
        loading: false,
        characters,
        filteredCharacters: characters,
      };
    case 'CHARACTERS_FAILED':
      return {
        ...state,
        loading: false,
        error,
      };
    case 'FILTERED_CHARACTERS':
      return {
        ...state,
        filteredCharacters,
      };
    default:
      return state;
  }
};