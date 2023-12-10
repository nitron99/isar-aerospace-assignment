import * as actionTypes from "../actionTypes.js";

const initialState = {
  data: null,
  webSocket: null
};

const spectrumReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SPECTRUM_STATUS:
      return { ...state, data: action.payload };
    case actionTypes.CLEAR_SPECTRUM_STATUS:
      return { ...state, data: null, webSocket: action.payload };
    case actionTypes.GET_SPECTRUM_WEB_SOCKET_STATUS:
      return { ...state, webSocket: action.payload }; 

    default:
      return state;
  }
};

export default spectrumReducer;
