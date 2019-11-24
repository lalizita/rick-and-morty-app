import axios from 'axios';

//Action Types

export const Types = {
  CHARACTERS_REQUESTED: 'CHARACTERS_REQUESTED',
  CHARACTERS_RECEIVED: 'CHARACTERS_RECEIVED',
  CHARACTERS_FAILED: 'CHARACTERS_FAILED',
  FILTERED_CHARACTERS: 'FILTERED_CHARACTERS',
};

//Reducer

const initialState = {
  characters: [],
  loading: false,
  filteredCharacters: [],
};

export default function reducer(state = initialState, action={}) {
  const { characters, error, filteredCharacters } = action;
  switch (action.type) {
    case Types.CHARACTERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case Types.CHARACTERS_RECEIVED:
      return {
        ...state,
        loading: false,
        characters,
        filteredCharacters: characters,
      };
    case Types.CHARACTERS_FAILED:
      return {
        ...state,
        loading: false,
        error,
      };
    case Types.FILTERED_CHARACTERS:
      return {
        ...state,
        filteredCharacters,
      };
    default:
      return state;
  }
}

//Action Creators
export const getCharacters = () => {
  return async (dispatch) => {
    dispatch({ type: Types.CHARACTERS_REQUESTED });
    try {
      const { data } = await axios.get('https://rickandmortyapi.com/api/character');
      dispatch({
        type: Types.CHARACTERS_RECEIVED,
        characters: data.results,
      });
    } catch (error) {
      dispatch({
        type: Types.CHARACTERS_FAILED,
        error,
      });
    }
  };
};

export const filterCharacters = (values) => (dispatch) => dispatch({
  type: Types.FILTERED_CHARACTERS,
  filteredCharacters: values,
});
