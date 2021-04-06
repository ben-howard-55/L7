import Auth, { CognitoUser } from '@aws-amplify/auth';
import axios, { AxiosRequestConfig } from 'axios';
import { logout } from '../redux/authSlice/thunks/logoutThunk';
import store from '../redux/store';

export interface Card {
  CardID: string;
  FrontText: string;
  BackText: string;
  Level: number;
  CycleLastSeen: number;
}

export type Calendar = Array<Array<1 | 2 | 3 | 4 | 5 | 6 | 7>>;

export interface Response<T> {
  status: number;
  body: T;
}

export interface GetCalendarResponse {
  Chart: Calendar;
  CurrentCyclePos: number;
}

export interface updateLevelResponse {
  CardID: string;
  Level: number;
  CycleLastSeen: number;
}

const API = async (config: AxiosRequestConfig) => {
  const user: CognitoUser = await Auth.currentAuthenticatedUser();
  const token = (user as any).signInUserSession.idToken.jwtToken;

  return axios({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: token,
    },
    ...config,
  }).catch((err) => {
    if (err.response.status === 401) {
      // If token has expired, log the user out
      store.dispatch(logout());
    }
    return err;
  });
};

const addCard = async (frontText: string, backText: string): Promise<Response<Card>> =>
  API({
    url: '/add-card',
    method: 'POST',
    data: {
      FrontText: frontText,
      BackText: backText,
    },
  })
    .then(
      (res) =>
        ({
          status: res.status,
          body: res.data,
        } as Response<Card>)
    )
    .catch(
      (err) =>
        ({
          status: err.status,
        } as Response<Card>)
    );

const updateLevel = async (
  cardId: string,
  correct: boolean
): Promise<Response<updateLevelResponse>> =>
  API({
    url: `/update-level`,
    method: 'PATCH',
    data: {
      CardID: cardId,
      Correct: correct,
    },
  })
    .then(
      (res) =>
        ({
          status: res.status,
          body: res.data,
        } as Response<updateLevelResponse>)
    )
    .catch(
      (err) =>
        ({
          status: err.status,
        } as Response<updateLevelResponse>)
    );

const deleteCard = async (cardId: string): Promise<Response<string>> =>
  API({
    url: `/delete-card/${cardId}`,
    method: 'DELETE',
  })
    .then(
      (res) =>
        ({
          status: res.status,
          body: res.data,
        } as Response<string>)
    )
    .catch(
      (err) =>
        ({
          status: err.status,
        } as Response<string>)
    );
const getTodaysCards = async (): Promise<Response<Array<Card>>> =>
  API({
    url: '/get-todays-cards',
    method: 'POST',
  })
    .then(
      (res) =>
        ({
          status: res.status,
          body: res.data,
        } as Response<Array<Card>>)
    )
    .catch(
      (err) =>
        ({
          status: err.status,
        } as Response<Array<Card>>)
    );

const getAllCards = async (): Promise<Response<Array<Card>>> =>
  API({
    url: '/get-all-cards',
    method: 'POST',
  })
    .then(
      (res) =>
        ({
          status: res.status,
          body: res.data,
        } as Response<Array<Card>>)
    )
    .catch(
      (err) =>
        ({
          status: err.status,
        } as Response<Array<Card>>)
    );

const getCalendar = async (): Promise<Response<GetCalendarResponse>> =>
  API({
    url: '/get-calendar',
    method: 'POST',
  })
    .then(
      (res) =>
        ({
          status: res.status,
          body: res.data,
        } as Response<GetCalendarResponse>)
    )
    .catch(
      (err) =>
        ({
          status: err.status,
        } as Response<GetCalendarResponse>)
    );

const updateCyclePosition = async (): Promise<Response<number>> =>
  API({
    url: `/update-cycle-position/${Math.floor(Date.now() / (60 * 60 * 24))}`,
    method: 'POST',
  })
    .then(
      (res) =>
        ({
          status: res.status,
          body: res.data,
        } as Response<number>)
    )
    .catch(
      (err) =>
        ({
          status: err.status,
        } as Response<number>)
    );

const mockAPI = {
  updateLevel,
  addCard,
  deleteCard,
  getTodaysCards,
  getAllCards,
  getCalendar,
  updateCyclePosition,
};

export default mockAPI;
