import axios from 'axios';

export const getCharacters = () => {
  console.log("GET CHARACTERS")
  return async (dispatch) => {
    dispatch({ type: 'CHARACTERS_REQUESTED' });
    try {
      const { data } = await axios.get('https://rickandmortyapi.com/api/character');
      console.log("DATA", data);
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

export default { getCharacters };
