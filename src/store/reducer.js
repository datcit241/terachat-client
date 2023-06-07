import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userReducer from './userSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  user: userReducer
});

export default reducer;
