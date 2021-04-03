import Auth, { CognitoUser } from '@aws-amplify/auth';
import axios, { AxiosRequestConfig } from 'axios';

export interface Card {
  CardId: string;
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
  calendar: Calendar;
  cyclePosition: number;
}

const API = async (config: AxiosRequestConfig) => {
  const user: CognitoUser = await Auth.currentAuthenticatedUser();
  const token = (user as any).signInUserSession.idToken.jwtToken;

  return axios({
    baseURL: 'https://rn5fvsuky3.execute-api.ap-southeast-2.amazonaws.com/dev/',
    headers: {
      authorization: token,
    },
    ...config,
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

const updateLevel = async (cardId: string): Promise<Response<number>> => ({
  status: 200,
  body: 1,
});

const deleteCard = async (cardId: string): Promise<Response<undefined>> => ({
  status: 301,
  body: undefined,
});

const getTodaysCards = async (): Promise<Response<Array<Card>>> => ({
  status: 200,
  body: [
    {
      CardId: 'somethin',
      FrontText: 'frontText',
      BackText: 'some back text',
      Level: 3,
      CycleLastSeen: 1,
    },
  ],
});

const getAllCards = async (): Promise<Response<Array<Card>>> =>
  API({
    url: '/get-all-cards',
    method: 'GET',
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

const getCalendar = async (): Promise<Response<GetCalendarResponse>> => ({
  status: 200,
  body: {
    calendar: [[1, 2, 3], [1], [1, 2]],
    cyclePosition: 1,
  },
});

const updateCyclePosition = async (): Promise<Response<number>> => ({
  status: 201,
  body: 2,
});

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
