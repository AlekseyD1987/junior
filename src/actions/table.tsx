import axios from "axios";
import {
  FETCH_TABLE_START,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_ERROR,
  CHANGE_TABLE,
} from "./actionTypes";

export function fetchTable(url: string) {
  return async (dispatch: any) => {
    dispatch(fetchTableStart());
    try {
      const response = await axios.get(url);
      const table = response.data;
      dispatch(fetchTableSuccess(table));
    } catch (e) {
      dispatch(fetchTableError(e));
    }
  };
}
export function fetchTableSuccess(table: object) {
  return {
    type: FETCH_TABLE_SUCCESS,
    table,
  };
}

export function fetchTableStart() {
  return {
    type: FETCH_TABLE_START,
  };
}

export function fetchTableError(e: any) {
  return {
    type: FETCH_TABLE_ERROR,
    error: e,
  };
}
export function changeTable(data: any) {
  if (data) {
    return (dispatch: any) => {
      dispatch({
        type: CHANGE_TABLE,
        payload: data,
      });
      localStorage.setItem("table", data);
    };
  }
}
