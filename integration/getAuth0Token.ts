import axios, { AxiosResponse } from 'axios';
import { auth0request } from './Auth0_security';

const mapResponse = ({ status, statusText, data }: AxiosResponse) => ({ status, statusText, data });

console.log('AUTH REQUEST:\n', auth0request);

export const getAuth0Token = () =>
  axios.post(
    'https://taras-shedenko.eu.auth0.com/oauth/token',
    auth0request,
    { headers: { 'content-type': 'application/json' } }
  )
  .then(response => mapResponse(response))
  .catch(error => Promise.reject(mapResponse(error.response)));
