import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Graph from '../components/Graph';
import Header from '../components/Header';
import Centered from '../components/Layout/Centered';
import Loading from '../components/Loading';
import useHydrator from '../hooks/useHydrator';
import { fetchCalendarData } from '../redux/appSlice/thunks/fetchCalendarData';
import { fetchGameData } from '../redux/gameSlice/thunks/fetchGameData';
import { RootState } from '../redux/store';

const Dashboard: React.FC = () => {
  const calendarLoaded = useHydrator((state) => state.app.hydratedCalendar, fetchCalendarData);
  const gameLoaded = useHydrator((state) => state.game.hydratedGameState, fetchGameData);

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
      {!calendarLoaded || !gameLoaded ? (
        <Loading />
      ) : (
        <Centered>
          <Container fluid className={'mb-5'}>
            <Row className={'mb-5'}>
              <Col className={'text-center'}>
                <h1>
                  {appState.numCards > 0
                    ? `${appState.numCards} Questions to answer today`
                    : `✨Youve answered all your questions for today! 🎉✨`}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Graph calendar={appState.calendar} position={appState.cyclePosition} />
              </Col>
            </Row>
            <Row>
              <Col className={'mt-3'}>
                <Centered>
                  <div className={'graph-legend-1 m-2'}>53</div>
                  <div className={'graph-legend-2 m-2'}>60</div>
                  <div className={'graph-legend-3 m-2'}>45</div>
                  <div className={'graph-legend-4 m-2'}>13</div>
                  <div className={'graph-legend-5 m-2'}>22</div>
                  <div className={'graph-legend-6 m-2'}>0</div>
                  <div className={'graph-legend-7 m-2'}>0</div>
                </Centered>
              </Col>
            </Row>
            <Row className={'mb-3'}>
              <Col className={'text-center'}>
                <b>Levels</b>
                <br />
                Today: 1, 2
              </Col>
            </Row>
            <Row className={'mt-4'}>
              <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
                <Centered>
                  <Button
                    size={'lg'}
                    onClick={() => history.push('/revise')}
                    block
                    disabled={appState.numCards === 0}
                  >
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
      )}
    </Container>
  );
};

export default Dashboard;
