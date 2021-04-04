import { Calendar, Card } from '../../api/client';

type AppState = {
  hydratedCalendar: boolean;
  calendar: Calendar;
  hydratedCards: boolean;
  cards: { [id: string]: Card };
  cyclePosition: number;
};

export default AppState;
