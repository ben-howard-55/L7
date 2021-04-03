import { Calendar, Card } from '../../api/client';

type AppState = {
  hydrated: boolean;
  calendar: Calendar;
  cards: Array<Card>;
  cyclePosition: number;
};

export default AppState;
