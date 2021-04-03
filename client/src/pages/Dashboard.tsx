import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Centered from '../components/Layout/Centered';
import Graph from '../components/Graph';
import Header from '../components/Header';
import { fetchCalendarData } from '../redux/appSlice/thunks/fetchCalendarData';
import { RootState, useAppDispatch } from '../redux/store';

const Dashboard: React.FC = () => {
  const selector = (state: RootState) => ({
    calendar: state.app.calendar,
    cyclePosition: state.app.cyclePosition,
    hydrated: state.app.hydratedCalendar,
  });
  const dispatch = useAppDispatch();
  const appState = useSelector(selector);
  const history = useHistory();

  useEffect(() => {
    if (appState.hydrated === false) {
      dispatch(fetchCalendarData());
    }
  }, [dispatch]);

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
            <Col className={'text-center'}>60 Questions to answer today</Col>
          </Row>
          <Row className={'mt-4'}>
            <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
              <Centered>
                <Button size={'lg'} block>
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
