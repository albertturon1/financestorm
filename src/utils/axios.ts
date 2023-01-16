import axios, { AxiosError } from 'axios';
import _ from 'lodash';

export const API_KEYS = [
  'HVNKI51T3XL21JI9',
  '3Z8LLAPQXEMXG5V9',
  'B7YJY049GG24COPG',
];

export const axiosClient = axios.create({
  baseURL: 'http://www.alphavantage.co/query',
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.warn('error: ', error);
    if (error.response) {
      console.warn('Error status: ', error.response.status);
      //console.warn(error.response.headers);
      console.warn('Error response: ', error);
      throw error.response;
    } else if (error.request) {
      throw error.request;
    }
    throw error;
  },
);
