import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { fetchAllCards } from '../../redux/appSlice/thunks/fetchAllCards';
import { removeCard } from '../../redux/appSlice/thunks/removeCard';
import { RootState, useAppDispatch } from '../../redux/store';

const CardList: React.FC = () => {
  const selector = (state: RootState) => ({
    cards: state.app.cards,
    hydrated: state.app.hydratedCards,
  });
  const dispatch = useAppDispatch();
  const cardState = useSelector(selector);
  const history = useHistory();

  const deleteCard = async (cardId: string) => {
    console.log(`Deleting id ${cardId}`);
    const res = await dispatch(removeCard({ cardId }));
    if (removeCard.fulfilled.match(res)) {
      toast('Card Deleted successfully!', {
        type: 'success',
        position: 'bottom-center',
      });
    }
  };

  useEffect(() => {
    if (cardState.hydrated === false) {
      dispatch(fetchAllCards());
    }
  }, [dispatch]);

  return (
    <Container fluid>
      <Header />
      <Container>
        <Card>
          <Card.Header>
            <Row>
              <Col xs={'auto'}>
                <h1>Cards</h1>
              </Col>
              <Col>
                <Button onClick={() => history.push('cards/add')}>Add Card</Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Table>
              <thead>
                <tr>
                  <th>Card Front Text</th>
                  <th>Card Back Text</th>
                  <th>Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(cardState.cards).map((c, i) => (
                  <tr key={i}>
                    <td>{c.FrontText}</td>
                    <td>{c.BackText}</td>
                    <td>{c.Level}</td>
                    <td>
                      <Button size={'sm'} variant={'link'} onClick={() => deleteCard(c.CardID)}>
                        delete me
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default CardList;
