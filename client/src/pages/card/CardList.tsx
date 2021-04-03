import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Header from '../../components/Header';

const CardList: React.FC = () => {
  const a = 3;

  return (
    <Container fluid>
      <Header />
      <h1>Cards</h1>
      <Container fluid>
        <Row>
          <Col>
            <Table>
              <thead>
                <th>Card Front Text</th>
                <th>Card Back Text</th>
                <th>Level</th>
                <th>Actions</th>
              </thead>
              <tbody>
                <tr>
                  <td>some text</td>
                  <td>back text uwu</td>
                  <td>3</td>
                  <td>delete me</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CardList;
