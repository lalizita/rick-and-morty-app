import { combineReducers } from 'redux';
import characters from './ducks/characters';
import locations from './ducks/locations';

export default combineReducers({
  characters,
  locations,
});