import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Graph from '../components/Graph';
import Header from '../components/Header';
import Centered from '../components/Layout/Centered';
import useHydrator from '../hooks/useHydrator';
import { fetchCalendarData } from '../redux/appSlice/thunks/fetchCalendarData';
import { fetchGameData } from '../redux/gameSlice/thunks/fetchGameData';
import { RootState } from '../redux/store';

const Dashboard: React.FC = () => {
  useHydrator((state) => state.app.hydratedCalendar, fetchCalendarData);
  useHydrator((state) => state.game.hydratedGameState, fetchGameData);
  const selector = (state: RootState) => ({
    calendar: state.app.calendar,
    cyclePosition: state.app.cyclePosition,
    numCards: state.game.practiceList.length,
  });

  const appState = useSelector(selector);
  const history = useHistory();

  return (
    <Container fluid>
      <Header />
      <Centered>
        <Container fluid className={'mb-5'}>
          <Row>
            <Col xs={12}>
              <Graph calendar={appState.calendar} />
            </Col>
          </Row>
          <Row className={'mt-4'}>
            <Col className={'text-center'}>
              {appState.numCards > 0
                ? `${appState.numCards} Questions to answer today`
                : `✨Youve answered all your questions for today! 🎉✨`}
            </Col>
          </Row>
          <Row className={'mt-4'}>
            <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
              <Centered>
                <Button size={'lg'} block disabled={appState.numCards === 0}>
                  Revise Now
                </Button>
              </Centered>
            </Col>
          </Row>
          <Row className={'mt-4'}>
            <Col md={{ span: 2, offset: 4 }} sm={{ span: 3, offset: 3 }} xs={{ span: 12 }}>
              <Centered>
                <Button size={'lg'} block onClick={() => history.push('/cards/add')}>
                  Add new card
                </Button>
              </Centered>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 3 }} md={2}>
              <Centered>
                <Button size={'lg'} block onClick={() => history.push('/cards')}>
                  View all cards
                </Button>
              </Centered>
            </Col>
          </Row>
        </Container>
      </Centered>
    </Container>
  );
};

export default Dashboard;
