import * as actionTypes from "../actionTypes";
import * as api from "../../api/index";

export const GetSpectrumStatus = (setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    const { data } = await api.getSpectrumStatus();
    dispatch({ type: actionTypes.GET_SPECTRUM_STATUS, payload: data });
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_ERRORS, payload: error?.response?.data });
    setLoading(false);
  }
}

export const ActOnSpectrum = (setLoading) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
  setLoading(true);
  try {
    
    setLoading(false);
  } catch (error) {
    dispatch({ type: actionTypes.SET_ERRORS, payload: error?.response?.data });
    setLoading(false);
  }
}