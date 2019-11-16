
const initialState = {
  characters: [],
  loading: false,
};

export default (state = initialState, action) => {
  const { characters, error } = action;
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
      };
    case 'CHARACTERS_FAILED':
      return {
        ...state,
        loading: false,
        error,
      };
    default:
      return state;
  }
};