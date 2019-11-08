export const simpleAction = () => {
  console.log("invocou")
  return{
    type: 'SIMPLE_ACTION',
    payload: 'result_of_simple_action'
   }
}