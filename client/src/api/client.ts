export interface Card {
  cardId: string;
  frontText: string;
  backText: string;
  level: number;
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

const addCard = (frontText: string, backText: string): Response<Card> => ({
  status: 201,
  body: {
    cardId: '1',
    frontText,
    backText,
    level: 1,
  },
});

const updateLevel = (cardId: string): Response<number> => ({
  status: 200,
  body: 1,
});

const deleteCard = (cardId: string): Response<undefined> => ({
  status: 301,
  body: undefined,
});

const getTodaysCards = (): Response<Array<Card>> => ({
  status: 200,
  body: [],
});

const getAllCards = (): Response<Array<Card>> => ({
  status: 200,
  body: [],
});

const getCalendar = (): Response<GetCalendarResponse> => ({
  status: 200,
  body: {
    calendar: [],
    cyclePosition: 1,
  },
});

const updateCyclePosition = (): Response<number> => ({
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
