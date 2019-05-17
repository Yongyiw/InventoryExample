import { combineReducers } from "redux";
import items from "./items";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  items,
  errors,
  messages
});
