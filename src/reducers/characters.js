
const initialState = {
  characters: ['rick', 'morty']
}
export default (state = initialState, action) => {
  console.log({action})
  switch (action.type) {
   case 'SIMPLE_ACTION':
    return {
      ...state,
     result: action.payload
    }
   default:
    return state;
  }
}