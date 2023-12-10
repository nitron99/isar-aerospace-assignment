import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import SpectrumReducer from "./spectrumReducers";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  spectrum: SpectrumReducer,
});

export default persistReducer(persistConfig, rootReducer);