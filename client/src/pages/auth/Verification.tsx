import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { object, SchemaOf, string } from 'yup';
import Centered from '../../components/Centered';
import TextField from '../../components/Form/TextField';
import { confirmSignup } from '../../redux/authSlice/thunks/confirmSignupThunk';
import { RootState, useAppDispatch } from '../../redux/store';

interface verificationFields {
  code: string;
}

const field = {
  code: 'code',
};

const schema: SchemaOf<verificationFields> = object().shape({
  code: string().required('Please enter a verification code'),
});

const Verification: React.FC = () => {
  const selector = (state: RootState) => state.auth.user;

  const [loading, setLoading] = useState<boolean>(false);
  const username = useSelector(selector);
  const methods = useForm<verificationFields>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const submitHandler = async ({ code }: verificationFields) => {
    setLoading(true);
    await dispatch(
      confirmSignup({
        username,
        code,
      })
    );
    setLoading(false);
  };

  const { handleSubmit } = methods;

  return (
    <Centered>
      <div className={'pb-5'}>
        <h1>L7</h1>
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <TextField
                methods={methods}
                label={'Verification Code'}
                name={field.code}
                disabled={loading}
              />
              <Form.Group>
                <Button type={'submit'} disabled={loading} block>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <div className={'text-center mt-3'}>
          Didnt recieve a code?
          <br />
          <Link to={'/signup'}>Resend verification code</Link>
        </div>
      </div>
    </Centered>
  );
};

export default Verification;
