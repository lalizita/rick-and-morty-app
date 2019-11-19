import axios from 'axios';

export const getCharacters = () => {
  return async (dispatch) => {
    dispatch({ type: 'CHARACTERS_REQUESTED' });
    try {
      const { data } = await axios.get('https://rickandmortyapi.com/api/character');
      dispatch({
        type: 'CHARACTERS_RECEIVED',
        characters: data.results,
      });
    } catch (error) {
      dispatch({
        type: 'CHARACTERS_FAILED',
        error,
      });
    }
  };
};

export const filterCharacters = (values) => (dispatch) => dispatch({
  type: 'FILTERED_CHARACTERS',
  filteredCharacters: values,
});
