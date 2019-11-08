import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { simpleAction } from './actions/charactersAction';

function App(props) {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters);
  const handleAction = () => dispatch(simpleAction());
  return (
    <div className="App">
      <button onClick={handleAction}>Test redux action</button>
      <pre>
      {
        JSON.stringify(characters)
      }
      </pre>
    </div>
  );
}

export default App;
