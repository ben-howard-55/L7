import { Calendar, Card } from '../../api/client';

type AppState = {
  hydratedCalendar: boolean;
  calendar: Calendar;
  hydratedCards: boolean;
  cards: Array<Card>;
  cyclePosition: number;
};

export default AppState;
