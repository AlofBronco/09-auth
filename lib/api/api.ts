import axios from 'axios';

export interface ApiError {
  response: {
    data: {
      error: string;
      response: {
        statusCode: number;
        error: string;
        message: string;
        validation: {
          body: {
            source: string;
            keys: string[];
            message: string;
          };
        };
      };
    };
  };
}

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
