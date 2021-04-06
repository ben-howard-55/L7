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

const addCard = async (frontText: string, backText: string): Promise<Response<Card>> => ({
  status: 201,
  body: {
    cardId: `${Date.now()}`,
    frontText,
    backText,
    level: 1,
  },
});

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
      cardId: 'somethin',
      frontText: 'frontText',
      backText: 'some back text',
      level: 3,
    },
  ],
});

const getAllCards = async (): Promise<Response<Array<Card>>> => ({
  status: 200,
  body: [
    {
      cardId: '12',
      frontText: 'Sample card',
      backText: 'sample back',
      level: 1,
    },
  ],
});

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