import axios from "axios";

const API = axios.create({
  baseURL: `https://webfrontendassignment-isaraerospace.azurewebsites.net/api/`,
});

export const getSpectrumStatus = () => API.get('SpectrumStatus');
export const actOnSpectrum = () => API.get('ActOnSpectrum');


// websocket routes
export const SPECTRUM_WEB_SOCKET = "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS";