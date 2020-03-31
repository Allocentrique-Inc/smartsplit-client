import { combineReducers } from 'redux';

const INITIAL_STATE = {
  
  myCollection: [
    'Allie',
    'Gator',
    'Lizzie',
    'Reptar',
  ]
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_CAR":
      const newState = {...state};
      if (action.payload) {
        newState.myCollection.push(action.payload)
      }
      return newState;
    default:
      return state
  }
};

export default combineReducers({
  cars: rootReducer,
});