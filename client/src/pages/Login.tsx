import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Centered from '../components/Centered';

const Login: React.FC = () => (
  <Centered>
    <div className={'pb-5'}>
      <h1>L7</h1>
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group>
              <Button block>Submit</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  </Centered>
);

export default Login;
