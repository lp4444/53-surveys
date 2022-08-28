import axios from "axios";
import { FETCH_SURVEYS, FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys =
  (userId = "") =>
  async (dispatch) => {
    const params = userId ? `?userId=${userId}` : "";

    const res = await axios.get(`/api/surveys${params}`);

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  };
