import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'

const initialState = {
  shouldAppend: false
};

function append(state = initialState, action) {
  switch (action.type) {
    case 'SHOULDAPPEND':
      return {
        ...state,
        shouldAppend: !state.shouldAppend
      };
    default:
      return {
        ...state,
        shouldAppend: state.shouldAppend
      }
  }
}

export default combineReducers({
  routing,
  append
});
