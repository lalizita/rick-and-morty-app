import axios from 'axios';

//Action Types

export const Types = {
  LOCATIONS_REQUESTED: 'LOCATIONS_REQUESTED',
  LOCATIONS_RECEIVED: 'LOCATIONS_RECEIVED',
  LOCATIONS_FAILED: 'LOCATIONS_FAILED',
};

// Reducer

const initialState = {
  locations: [],
  loading: false,
  filteredLocations: [],
};

export default function reducer(state = initialState, action = {}) {
  const { locations, error, filteredLocations } = action;
  switch (action.type) {
    case Types.LOCATIONS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case Types.LOCATIONS_RECEIVED:
      return {
        ...state,
        loading: false,
        locations,
      };
    case Types.LOCATIONS_FAILED:
      return {
        ...state,
        loading: false,
        error,
        locations: [],
      };
    default:
      return state;
  }
};

//Action cretors

export const getLocations = () => {
  return async (dispatch) => {
    dispatch({ type: Types.LOCATIONS_REQUESTED });
    try {
      const { data } = await axios.get('https://rickandmortyapi.com/api/location');
      dispatch({
        type: Types.LOCATIONS_RECEIVED,
        locations: data.results,
      });
    } catch (error) {
      dispatch({
        type: Types.LOCATIONS_FAILED,
        error,
      });
    }
  };
};

export const filterLocations = ({ filter, search }) => {
  const searchFilter = {
    name: `?name=${search.toLowerCase()}`,
    dimension: `?dimension=${search.toLowerCase()}`,
  };

  return async (dispatch) => {
    dispatch({ type: Types.LOCATIONS_REQUESTED });
    try {
      const { data } = await axios.get(`https://rickandmortyapi.com/api/location${searchFilter[filter]}`);
      dispatch({
        type: Types.LOCATIONS_RECEIVED,
        locations: data.results,
      });
    } catch (error) {
      dispatch({
        type: Types.LOCATIONS_FAILED,
        error,
      });
    }
  };
};