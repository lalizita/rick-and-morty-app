import axios from 'axios';

//Action Types

export const Types = {
  EPISODES_REQUESTED: 'EPISODES_REQUESTED',
  EPISODES_RECEIVED: 'EPISODES_RECEIVED',
  EPISODES_FAILED: 'EPISODES_FAILED',
  FILTERED_EPISODES: 'FILTERED_EPISODES',
};

// Reducer

const initialState = {
  episodes: [],
  loading: false,
  filteredEpisodes: [],
};

export default function reducer(state = initialState, action={}) {
  const { episodes, error, filteredEpisodes } = action;
  switch (action.type) {
    case Types.EPISODES_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case Types.EPISODES_RECEIVED:
      return {
        ...state,
        loading: false,
        episodes,
        filteredEpisodes: episodes,
      };
    case Types.EPISODES_FAILED:
      return {
        ...state,
        loading: false,
        error,
      };
    case Types.FILTERED_EPISODES:
      return {
        ...state,
        filteredEpisodes,
      };
    default:
      return state;
  }
};

//Action cretors

export const getEpisodes = () => {
  return async (dispatch) => {
    dispatch({ type: Types.EPISODES_REQUESTED });
    try {
      const { data } = await axios.get('https://rickandmortyapi.com/api/episode');
      dispatch({
        type: Types.EPISODES_RECEIVED,
        episodes: data.results,
      });
    } catch (error) {
      dispatch({
        type: Types.EPISODES_FAILED,
        error,
      });
    }
  };
};