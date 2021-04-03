import { Card } from '../../api/client';

type GameState = {
  hydratedGameState: boolean;
  practiceList: Array<Card>;
  currentCard?: Card;
  hasAnswered: boolean;
};

export default GameState;
