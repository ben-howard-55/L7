import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { SchemaOf } from 'yup';
import Centered from '../../components/Layout/Centered';
import Header from '../../components/Header';
import TextField from '../../components/Form/TextField';
import TextArea from '../../components/Form/TextArea';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../redux/store';
import { addCard } from '../../redux/appSlice/thunks/addCard';

interface AddCardFields {
  frontText: string;
  backText: string;
}

const fields = {
  frontText: 'frontText',
  backText: 'backText',
};

const schema: SchemaOf<AddCardFields> = object().shape({
  frontText: string().required('Please enter front text'),
  backText: string().required('Please enter back text'),
});

const AddCard: React.FC = () => {
  const formMethods = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit, reset } = formMethods;

  const submitHandler = ({ frontText, backText }: AddCardFields) => {
    setLoading(true);
    const res = dispatch(
      addCard({
        frontText,
        backText,
      })
    );
    toast('Card Created successfully!', {
      type: 'success',
      position: 'bottom-center',
    });
    reset();
    setLoading(false);
  };

  return (
    <Container fluid>
      <Header />
      <Centered>
        <Container fluid>
          <Row>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <Card>
                <Card.Header>Add Card</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit(submitHandler)}>
                    <TextField
                      label={'Card Front Text'}
                      methods={formMethods}
                      name={fields.frontText}
                      required
                      disabled={loading}
                    />
                    <TextArea
                      label={'Card Back Text'}
                      methods={formMethods}
                      name={fields.backText}
                      required
                      disabled={loading}
                    />
                    <hr />
                    <Form.Group>
                      <Button type={'submit'} disabled={loading}>
                        Add Card
                      </Button>
                      <Button
                        className={'ml-3'}
                        variant={'outline-primary'}
                        onClick={() => history.push('/cards')}
                      >
                        View all cards
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Centered>
    </Container>
  );
};

export default AddCard;
