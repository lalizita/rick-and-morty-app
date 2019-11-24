import { combineReducers } from 'redux';
import characters from './ducks/characters';
import locations from './ducks/locations';
import episodes from './ducks/episodes';

export default combineReducers({
  characters,
  locations,
  episodes,
});