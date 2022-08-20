import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import surveysReducer from "./surveysReducer";
import authReducer from "./authReducer";
export default combineReducers({
  form: formReducer,
  surveys: surveysReducer,
  auth: authReducer,
});
