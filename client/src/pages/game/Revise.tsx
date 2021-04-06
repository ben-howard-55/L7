import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Header from '../../components/Header';
import Centered from '../../components/Layout/Centered';
import useHydrator from '../../hooks/useHydrator';
import { reveal, start } from '../../redux/gameSlice/gameSlice';
import { answerQuestion } from '../../redux/gameSlice/thunks/answerQuestion';
import { fetchGameData } from '../../redux/gameSlice/thunks/fetchGameData';
import { RootState, useAppDispatch } from '../../redux/store';
import confetti from 'canvas-confetti';
import { finishGame } from '../../redux/gameSlice/thunks/finishGame';

const Revise: React.FC = () => {
  useHydrator((state) => state.game.hydratedGameState, fetchGameData);
  const history = useHistory();
  const selector = (state: RootState) => ({
    card: state.game.currentCard,
    hasAnswered: state.game.hasAnswered,
    remainingCount: state.game.practiceList.length,
    isReady: state.game.hydratedGameState,
  });

  const { card, hasAnswered, remainingCount, isReady } = useSelector(selector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isReady) {
      dispatch(start());
      if (!card && remainingCount === 0) {
        // finished
        dispatch(finishGame());
      }
    }
  }, [dispatch, isReady]);

  if (isReady && !card && remainingCount === 0) {
    // finished
    confetti();
  }

  return (
    <Container fluid>
      <Header />
      <Centered>
        {card ? (
          <Container fluid>
            <Row>
              <Col xs={{ span: 6, offset: 3 }} className={'text-center'}>
                <span>{remainingCount} cards remaining</span>
                {!hasAnswered ? (
                  <Card>
                    <Card.Body>
                      {card.FrontText}
                      <br />

                      <Row>
                        <Col xs={12}>
                          <Button onClick={() => dispatch(reveal())}>Reveal</Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ) : (
                  <Card>
                    <Card.Body>
                      Answer:
                      <br />
                      {card.BackText}
                      <Row>
                        <Col xs={6}>
                          <Button
                            onClick={() =>
                              dispatch(
                                answerQuestion({
                                  cardId: card.CardID,
                                  correct: false,
                                })
                              )
                            }
                            block
                          >
                            Bad
                          </Button>
                        </Col>
                        <Col xs={6}>
                          <Button
                            onClick={() =>
                              dispatch(
                                answerQuestion({
                                  cardId: card.CardID,
                                  correct: true,
                                })
                              )
                            }
                            block
                          >
                            Good
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          <Container fluid className={'text-center'}>
            <Row>
              <Col>
                <h1>You've finished all of your cards for today!</h1>
                <br />
                <h1>🥳</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={() => history.push('/dashboard')}>Back to dashboard</Button>
              </Col>
            </Row>
          </Container>
        )}
      </Centered>
    </Container>
  );
};

export default Revise;
