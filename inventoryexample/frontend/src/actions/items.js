import axios from "axios";
import { createMessage } from "./messages";

import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, GET_ERRORS } from "./types";

// GET ITEMS
export const getItems = () => dispatch => {
  axios
    .get("/api/items/")
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE ITEM
export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res => {
      dispatch(createMessage({ deleteItem: "Item Deleted." }));
      dispatch({
        type: DELETE_ITEM,
        id
      });
    })
    .catch(err => console.log(err));
};

// ADD ITEM
export const addItem = item => dispatch => {
  axios
    .post("/api/items/", item)
    .then(res => {
      dispatch(createMessage({ addItem: "Item Added." }));
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
